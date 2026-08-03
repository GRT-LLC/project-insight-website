#!/usr/bin/env node
// Test the logo generator's source validation against hostile SVGs.
//
// The generator is the ONLY gate between a design-library mark and markup that
// is inlined into every visitor's DOM. Inlining is deliberate — it is what makes
// fill="currentColor" work — and it is also what makes an unvalidated mark an
// XSS vector: a <script> rendered through JSX executes on insertion, an <image
// href> is an external fetch, and a `{` in a text node becomes an evaluated JSX
// expression at module scope.
//
// Reviewers proved all four reached the shipped component untouched by crafting
// a source SVG and running the real script (review H1). "The source is trusted"
// is not a control; this is.

import { mkdtempSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('../..', import.meta.url).pathname;
const SCRIPT = resolve(ROOT, 'scripts/gen-logo-component.mjs');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.error(`  ✗ ${name}\n    ${e.message}`);
  }
}

/** Run the real generator against a crafted library; report what it did. */
function generateWith(iconMarkup) {
  const dir = mkdtempSync(join(tmpdir(), 'logo-guard-'));
  try {
    const marks = join(dir, 'brand', 'logo', 'normalized');
    mkdirSync(marks, { recursive: true });
    // The two the case isn't probing stay real, so a failure is unambiguous.
    for (const name of ['lockup', 'wordmark']) {
      copyFileSync(
        resolve(ROOT, `brand/logo/jarvistravel-${name}-current.svg`),
        join(marks, `jarvistravel-${name}-current.svg`)
      );
    }
    writeFileSync(
      join(marks, 'jarvistravel-icon-current.svg'),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${iconMarkup}</svg>`
    );
    try {
      execFileSync('node', [SCRIPT, '--check'], {
        env: { ...process.env, DESIGN_LIBRARY: dir },
        stdio: 'pipe',
      });
      return { refused: false, stderr: '' };
    } catch (e) {
      return { refused: true, stderr: String(e.stderr ?? e.message) };
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function refuses(label, markup, expected) {
  test(`refuses ${label}`, () => {
    const { refused, stderr } = generateWith(markup);
    if (!refused) throw new Error('accepted hostile markup — it would be inlined into every visitor’s DOM');
    if (!expected.test(stderr)) throw new Error(`refused, but for the wrong reason: ${stderr.trim().split('\n')[0]}`);
  });
}

console.log('gen-logo-component source validation');

refuses('a script element', `<script>alert('xss')</script>`, /script/i);
refuses('an event handler', `<g onload="alert(1)"><path d="M0 0"/></g>`, /on\* event handler/i);
refuses('an external image', `<image href="https://evil.example/track.png"/>`, /image/i);
refuses('a use reference', `<use xlink:href="#x"/>`, /use|xlink/i);
refuses('a javascript: URL', `<path d="M0 0" fill="javascript:alert(1)"/>`, /javascript:/i);
refuses('a JSX brace', `<path d="M0 0"/><g>{process.env.SECRET}</g>`, /brace/i);
refuses('an unexpected element', `<foreignObject><b>hi</b></foreignObject>`, /foreignObject/i);
refuses('an unexpected attribute', `<path d="M0 0" style="fill:red"/>`, /style/i);

// ids are stripped from the markup but url(#…) references are not, so a
// gradient, mask or clip-path survives as a reference to a definition that no
// longer exists — and renders blank, silently.
refuses('a url(#…) whose definition it strips', `<path d="M0 0" fill="url(#grad)"/>`, /url\(#grad\)/);

test('accepts an ordinary mark', () => {
  const { refused, stderr } = generateWith(`<path d="M10 10 L90 90"/>`);
  // --check compares against the committed component, which this mark differs
  // from; a refusal for THAT reason is expected, a validation refusal is not.
  if (refused && !/out of date/i.test(stderr)) {
    throw new Error(`rejected a clean mark: ${stderr.trim().split('\n')[0]}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
