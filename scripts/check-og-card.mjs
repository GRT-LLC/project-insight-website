#!/usr/bin/env node
// Guard: public/og-card.png is the card carrying the REAL lockup.
//
// This exists because the regression already happened. JAR-628 said in as many
// words that marketing-website#32 "must be closed, not merged" — it installed a
// card drawing a placeholder mark, a Sea Buckthorn rounded square with the
// letters "JT" in it, invented because the old react-pdf generator could not
// draw the real lockup. It was merged anyway, so `main` shipped a placeholder
// on every link preview until #37 lands.
//
// A checksum is a blunt instrument and that is the point: the card is a binary
// this repo does not generate, so there is nothing subtler to assert. Anything
// that changes it — a good update or a bad one — has to come past this line and
// say which it is.
//
// To update the card legitimately:
//   1. rebuild it in design-library (og/build.mjs — see brand/logo/PROVENANCE.md)
//   2. copy the result to public/og-card.png
//   3. run `npm run lint:og-card -- --update` and commit the new digest
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CARD = resolve(ROOT, 'public/og-card.png');
const DIGEST_FILE = resolve(ROOT, 'public/og-card.png.sha256');

if (!existsSync(CARD)) {
  console.error('public/og-card.png is missing — every link preview loses its image.');
  process.exit(1);
}

const card = readFileSync(CARD);
const actual = createHash('sha256').update(card).digest('hex');

if (process.argv.includes('--update')) {
  writeFileSync(DIGEST_FILE, `${actual}\n`);
  console.log(`og-card: pinned ${actual.slice(0, 16)}…`);
  process.exit(0);
}

if (!existsSync(DIGEST_FILE)) {
  console.error(`No pinned digest. Run: npm run lint:og-card -- --update`);
  process.exit(1);
}

const expected = readFileSync(DIGEST_FILE, 'utf8').trim();
if (actual !== expected) {
  console.error(
    `public/og-card.png is not the pinned card.\n\n` +
      `  expected ${expected}\n` +
      `  actual   ${actual}\n\n` +
      `If you replaced it deliberately, rebuild in design-library and run:\n` +
      `  npm run lint:og-card -- --update\n\n` +
      `If you did not, something installed a different card — check whether it\n` +
      `carries the real lockup or the old "JT" placeholder tile (JAR-628).`
  );
  process.exit(1);
}

// Dimensions too: index.html declares og:image:width/height, and an unfurl bot
// that finds a mismatch may drop the image rather than scale it.
const width = card.readUInt32BE(16);
const height = card.readUInt32BE(20);
if (width !== 1200 || height !== 630) {
  console.error(`og-card is ${width}x${height}, but index.html declares 1200x630.`);
  process.exit(1);
}

console.log(`og-card: matches the pinned lockup card (1200x630)`);
