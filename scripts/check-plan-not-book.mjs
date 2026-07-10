#!/usr/bin/env node
// Plan-not-book guard: fails if travel-booking language reappears in source.
//
// JarvisTravel's legal posture (see the CA Seller of Travel registration
// analysis) is that it plans and never books/arranges travel. Under CA Bus. &
// Prof. Code § 17550.1, *advertising* the ability to arrange air/sea
// transportation is itself a trigger — so banned language in UI copy is a
// legal exposure even though the product never transacts travel.
//
// Allowlist: .plan-not-book-allow.txt (one regex per line, # comments).
// A flagged line is skipped when any allow pattern matches it.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['src'];
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.md']);
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', '.git']);

// Word-boundaried so bookmark/notebook/Facebook never match.
const BANNED = [
  { re: /\b(book|books|booked|booking|bookings)\b/i, why: 'travel-booking verb' },
  { re: /\bconcierge\s+(booking|contact)\b/i, why: 'concierge-arrangement claim' },
  { re: /\bone[- ]stop\s+shop\b/i, why: 'one-stop-shop claim' },
  { re: /\bsecure\s+(your\s+)?(flights?|hotels?|trips?)\b/i, why: 'secures-travel claim' },
  { re: /\barrang\w*\s+(your\s+)?(flights?|hotels?|travel|transport\w*)\b/i, why: 'arranges-travel claim' },
  { re: /\bemergency\s+assistance\b/i, why: 'travel-agent-style assistance claim' },
];

const allowPath = join(ROOT, '.plan-not-book-allow.txt');
const allow = existsSync(allowPath)
  ? readFileSync(allowPath, 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
      .map((l) => new RegExp(l, 'i'))
  : [];

const isCommentLine = (line) => /^\s*(\/\/|\/\*|\*|<!--)/.test(line);

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.has(p.slice(p.lastIndexOf('.')))) out.push(p);
  }
  return out;
};

const hits = [];
for (const dir of SCAN_DIRS) {
  if (!existsSync(join(ROOT, dir))) continue;
  for (const file of walk(join(ROOT, dir))) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (isCommentLine(line)) return; // comments document, they don't advertise
      for (const { re, why } of BANNED) {
        if (re.test(line) && !allow.some((a) => a.test(line))) {
          hits.push({ file: relative(ROOT, file), line: i + 1, why, text: line.trim().slice(0, 120) });
        }
      }
    });
  }
}

if (hits.length) {
  console.error(`plan-not-book check FAILED — ${hits.length} banned-language hit(s):\n`);
  for (const h of hits) console.error(`  ${h.file}:${h.line}  [${h.why}]\n    ${h.text}\n`);
  console.error('Fix the copy (prefer plan/open-on-provider language) or, for a legitimate');
  console.error('exception (see the cleanup spec §2), add a narrow regex to .plan-not-book-allow.txt.');
  process.exit(1);
}
console.log('plan-not-book check passed — no banned travel-booking language found.');
