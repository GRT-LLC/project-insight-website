#!/usr/bin/env node
// Test the font guard.
//
// The first case is the state this repo was ACTUALLY in before JAR-1152:
// `font-family: 'Inter'` declared, no Google link, and no font shipped. A guard
// that only banned font CDNs would have called that clean, which is why it is
// the first fixture rather than an afterthought.

import { mkdtempSync, writeFileSync, rmSync, mkdirSync, cpSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execSync } from 'node:child_process';

const CHECK = new URL('../check-fonts.mjs', import.meta.url).pathname;
const REAL_FONTS = new URL('../../public/fonts', import.meta.url).pathname;

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ok  ${name}`); }
  catch (e) { failed++; console.error(`  FAIL ${name}\n       ${e.message}`); }
}

/** A repo skeleton: real font files, a licence, and whatever css/html the case needs. */
function withRepo({ css, html = '<!doctype html><html><head></head><body></body></html>', fonts = true, licence = true }, fn) {
  const dir = mkdtempSync(join(tmpdir(), 'fontguard-'));
  try {
    mkdirSync(join(dir, 'src'), { recursive: true });
    mkdirSync(join(dir, 'public/fonts'), { recursive: true });
    if (fonts) {
      cpSync(join(REAL_FONTS, 'inter-latin.woff2'), join(dir, 'public/fonts/inter-latin.woff2'));
      cpSync(join(REAL_FONTS, 'inter-latin-ext.woff2'), join(dir, 'public/fonts/inter-latin-ext.woff2'));
    }
    if (licence) writeFileSync(join(dir, 'public/fonts/LICENSE.txt'), 'OFL 1.1');
    writeFileSync(join(dir, 'src/index.css'), css);
    writeFileSync(join(dir, 'index.html'), html);
    return fn(dir);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

function run(dir) {
  try { return { code: 0, out: execSync(`node ${CHECK}`, { cwd: dir, encoding: 'utf8', stdio: 'pipe' }) }; }
  catch (e) { return { code: e.status, out: (e.stdout || '') + (e.stderr || '') }; }
}

const GOOD = `@font-face{font-family:'Inter';src:url('/fonts/inter-latin.woff2') format('woff2');}
@font-face{font-family:'Inter';src:url('/fonts/inter-latin-ext.woff2') format('woff2');}
html{font-family:'Inter',system-ui,sans-serif;}`;

const assert = (c, m) => { if (!c) throw new Error(m); };

// THE REAL REGRESSION: family declared, nothing shipped.
test('refuses a font-family with no @font-face behind it', () => {
  withRepo({ css: `html{font-family:'Inter',system-ui,sans-serif;}`, fonts: false, licence: false }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed a site that declares Inter and ships no font');
    assert(/no self-hosted @font-face/.test(r.out), `wrong reason: ${r.out}`);
  });
});

test('refuses a Google Fonts stylesheet link in index.html', () => {
  withRepo({
    css: GOOD,
    html: `<!doctype html><html><head><link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet"></head><body></body></html>`,
  }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed a Google Fonts link');
    assert(/fonts\.googleapis\.com/.test(r.out), `wrong reason: ${r.out}`);
  });
});

test('refuses an @import from a font CDN inside css', () => {
  withRepo({ css: `@font-face{src:url('https://fonts.gstatic.com/s/inter/x.woff2');}\n${GOOD}` }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed a gstatic url()');
    assert(/fonts\.gstatic\.com/.test(r.out), `wrong reason: ${r.out}`);
  });
});

test('refuses an @font-face naming a file that is not there', () => {
  withRepo({ css: `@font-face{font-family:'Inter';src:url('/fonts/inter-missing.woff2') format('woff2');}`, }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed a missing font file');
    assert(/missing/.test(r.out), `wrong reason: ${r.out}`);
  });
});

test('refuses shipping fonts without the OFL notice', () => {
  withRepo({ css: GOOD, licence: false }, (d) => {
    const r = run(d);
    assert(r.code === 1, 'guard passed fonts with no LICENSE.txt');
    assert(/LICENSE\.txt/.test(r.out), `wrong reason: ${r.out}`);
  });
});

// THE CONTROL. Without it, a guard that always exits 1 would pass every test above.
test('passes a correctly self-hosted site', () => {
  withRepo({ css: GOOD }, (d) => {
    const r = run(d);
    assert(r.code === 0, `guard failed a correct site: ${r.out}`);
    assert(/2 self-hosted face/.test(r.out), `unexpected output: ${r.out}`);
  });
});

// A comment mentioning the host is not a load — the real index.css says why we
// do NOT use Google Fonts, and must not trip its own guard.
test('a comment naming a font CDN is not treated as a load', () => {
  withRepo({ css: `/* was fonts.googleapis.com before JAR-1152 */\n${GOOD}` }, (d) => {
    const r = run(d);
    assert(r.code === 0, `a prose mention tripped the guard: ${r.out}`);
  });
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
