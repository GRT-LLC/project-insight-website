#!/usr/bin/env node
// Guard: the site's typeface is served from our own origin, and stays served.
//
// Two failures this catches, and they are opposites.
//
// 1. SOMEONE PASTES THE GOOGLE FONTS SNIPPET BACK IN. Loading a webfont from
//    fonts.googleapis.com transmits every visitor's IP to Google before any
//    consent — unlawful under GDPR per LG Munchen I, 3 O 17493/20 — and it is
//    the one third-party connection that fires on EVERY page, so no privacy
//    policy can scope it to a feature. It also sits badly beside the "No ads.
//    No data selling." promise this site makes.
//
// 2. THE FONT FILES GO AWAY AND THE FAMILY NAME STAYS. That is the state this
//    repo was actually in: `font-family: 'Inter'` was declared, the Google link
//    had been removed, and no font was ever shipped — so Inter rendered only
//    for visitors who happened to have it installed and everyone else silently
//    got the system stack. The privacy problem and the typography were removed
//    together, and nothing said so.
//
// The second case is why this guard checks more than a list of banned hosts. A
// host check alone is satisfied by shipping no fonts at all.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = process.cwd();
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'use.typekit.net', 'fonts.bunny.net'];

const problems = [];
const read = (p) => (existsSync(resolve(ROOT, p)) ? readFileSync(resolve(ROOT, p), 'utf8') : null);

// Walk src/ for anything that names a font CDN. A @font-face can live in any
// stylesheet or be injected from a component, so scanning one file is not enough.
function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(css|scss|tsx?|jsx?|html)$/.test(entry)) out.push(full);
  }
  return out;
}

const html = read('index.html');
const files = walk(resolve(ROOT, 'src'));
if (html !== null) files.unshift(resolve(ROOT, 'index.html'));

// (1) no third-party font host, anywhere that ships
for (const f of files) {
  const body = readFileSync(f, 'utf8');
  // A comment explaining why we DON'T use one is not a load. Only flag a host
  // that appears inside a url()/href/src — or a CSS string-form @import, which
  // fetches the sheet and every font it declares without touching url() or an
  // attribute (JAR-1167 port). url( also legally allows whitespace before the
  // value, so the match tolerates it.
  const fetching = [
    ...body.matchAll(/(?:url\s*\(|href\s*=|src\s*=)\s*["']?(https?:\/\/[^"')\s]+)/g),
    ...body.matchAll(/@import\s+["'](https?:\/\/[^"']+)["']/g),
  ].map((m) => m[1]);
  for (const host of FONT_HOSTS) {
    if (fetching.some((u) => u.includes(host))) {
      problems.push(`${f.replace(ROOT + '/', '')} fetches from ${host} — every page load sends the visitor's IP there`);
    }
  }
  // Protocol-relative //host/... is the same third-party load with the scheme
  // omitted; compare the authority up to the first slash, case-insensitively
  // (JAR-1167 port).
  for (const m of body.matchAll(/(?:url\s*\(|href\s*=|src\s*=|@import\s+)["']?(\/\/[^"')\s/][^"')\s]*)/g)) {
    const authority = m[1].slice(2).split('/')[0].toLowerCase();
    if (FONT_HOSTS.some((h) => h.toLowerCase() === authority)) {
      problems.push(`${f.replace(ROOT + '/', '')} fetches from //${m[1]} (protocol-relative) — same third-party load, just spelled differently`);
    }
  }
}

// (2) the faces are declared, and (3) the files they name are on disk.
// Without these, deleting every @font-face passes check (1) and silently drops
// the typeface — the exact state this repo was in.
const css = files.filter((f) => f.endsWith('.css')).map((f) => readFileSync(f, 'utf8')).join('\n');
// url( tolerates whitespace before the value (JAR-1167 port); only /fonts/
// urls count as self-hosted — a CDN url is someone else's host and is caught
// by check (1) above, which keeps the "no self-hosted face" message from
// masking the real finding.
const faces = [...css.matchAll(/src:\s*url\(\s*["']?(\/fonts\/[^"')]+)["']?\s*\)/g)].map((m) => m[1]);

if (faces.length === 0) {
  problems.push('no self-hosted @font-face found — the family name is declared but no font is shipped, so most visitors get the system stack');
}
for (const f of faces) {
  if (!existsSync(resolve(ROOT, 'public', f.replace(/^\//, '')))) {
    problems.push(`public${f} is referenced by @font-face but missing — the browser falls back silently`);
  }
}

// (4) the OFL notice travels with the files, as the licence requires, and a
// shipped font that is really a placeholder is not shipped at all: a real
// Inter subset is tens of KiB, the licence is the full OFL text (JAR-1165).
if (faces.length > 0 && !existsSync(resolve(ROOT, 'public/fonts/LICENSE.txt'))) {
  problems.push('public/fonts/LICENSE.txt is missing — Inter is SIL OFL 1.1 and the notice must ship with the files');
}
if (faces.length > 0) {
  const licence = read('public/fonts/LICENSE.txt');
  if (licence !== null && licence.trim().length < 200) {
    problems.push('public/fonts/LICENSE.txt is a stub — the OFL notice must be the real licence text');
  }
  for (const f of faces) {
    const p = resolve(ROOT, 'public', f.replace(/^\//, ''));
    if (!existsSync(p)) continue; // already reported above
    if (statSync(p).size < 1024) {
      problems.push(`public${f} is suspiciously small (${statSync(p).size} bytes) — a real font subset is tens of KiB; this looks like a placeholder`);
    }
  }
}

if (problems.length > 0) {
  console.error('Font guard failed:\n');
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nFonts are self-hosted from public/fonts and declared in src/index.css. See JAR-1152.');
  process.exit(1);
}

console.log(`fonts: ${faces.length} self-hosted face(s), no third-party font host, licence present.`);
