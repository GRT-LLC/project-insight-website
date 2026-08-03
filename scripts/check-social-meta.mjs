#!/usr/bin/env node
// Social-meta guard: fails if index.html stops shipping the route-invariant
// link-preview tags.
//
// Why a guard instead of setting these in useRouteMeta(): unfurl bots
// (iMessage, WhatsApp, Slack, Facebook, X) do not run JS, so anything the SPA
// writes at runtime is invisible to them. Only what is served in index.html
// counts. These four tags have the same value on every route, so they belong
// in the static HTML, and the hook deliberately leaves them alone.
//
// That split is safe only while the static tags actually exist. Deleting
// twitter:card from index.html would silently downgrade every shared link to a
// plain text preview, with no failing type-check, lint or build to catch it,
// which is exactly the failure mode raised in the PR #31 review. This script
// closes that gap: the invariant is enforced rather than assumed.
//
// Fail closed: an unreadable or unparseable index.html is a failure, never a pass.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const FILE = join(process.cwd(), 'index.html');

/** attr, key, and either an exact required value or a predicate. */
const REQUIRED = [
  { attr: 'name', key: 'twitter:card', equals: 'summary_large_image' },
  { attr: 'property', key: 'og:type', equals: 'website' },
  { attr: 'property', key: 'og:site_name', equals: 'JarvisTravel' },
  {
    attr: 'property',
    key: 'og:image',
    test: (v) => /^https:\/\/\S+\.(png|jpg|jpeg|webp)$/i.test(v),
    why: 'must be an absolute https URL to an image (scrapers do not resolve relative paths reliably)',
  },
];

let html;
try {
  html = readFileSync(FILE, 'utf8');
} catch (err) {
  console.error(`social-meta: cannot read ${FILE}: ${err.message}`);
  process.exit(1);
}

/** Parse every <meta> tag into { name|property -> content }. */
function parseMeta(source) {
  const found = new Map();
  for (const tag of source.match(/<meta\b[^>]*>/gi) ?? []) {
    const attr = /\b(name|property)\s*=\s*["']([^"']+)["']/i.exec(tag);
    const content = /\bcontent\s*=\s*["']([^"']*)["']/i.exec(tag);
    if (attr && content) found.set(`${attr[1].toLowerCase()}:${attr[2]}`, content[1]);
  }
  return found;
}

const meta = parseMeta(html);
const failures = [];

for (const rule of REQUIRED) {
  const value = meta.get(`${rule.attr}:${rule.key}`);
  if (value === undefined) {
    failures.push(`missing <meta ${rule.attr}="${rule.key}"> in index.html`);
    continue;
  }
  if (rule.equals !== undefined && value !== rule.equals) {
    failures.push(`${rule.key} is "${value}", expected "${rule.equals}"`);
    continue;
  }
  if (rule.test && !rule.test(value)) {
    failures.push(`${rule.key} is "${value}" — ${rule.why}`);
  }
}

if (failures.length) {
  console.error('social-meta: index.html is missing required link-preview tags\n');
  for (const f of failures) console.error(`  - ${f}`);
  console.error(
    '\nThese are route-invariant and intentionally not set by useRouteMeta(),',
  );
  console.error('because unfurl bots do not run JS. They must stay in index.html.');
  process.exit(1);
}

console.log(`social-meta: ok (${REQUIRED.length} route-invariant tags present in index.html)`);
