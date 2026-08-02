#!/usr/bin/env node
// Pricing guard, in two halves (JAR-660).
//
//   node scripts/check-prices.mjs           # always: no price literals in components
//   STRIPE_API_KEY=rk_... node scripts/check-prices.mjs         # + reconcile with Stripe
//   STRIPE_API_KEY=rk_... node scripts/check-prices.mjs --write # + rewrite pricing.ts
//
// Half one — no literals. Every dollar amount on this site renders from
// src/app/data/pricing.ts. The page used to carry them inline, which is how it
// advertised $24.95 for a Trip Pass we would never have charged, for weeks,
// with nothing failing. This half always runs and needs no credential.
//
// Half two — Stripe agrees. A shared constant nobody verifies drifts exactly
// as fast as a literal did, so the constants are reconciled against Stripe by
// lookup_key. Needs a read-only key. Without one it says so loudly and skips,
// rather than passing quietly and implying it checked.
//
// Fail closed: an unreadable file, an unparseable module or a Stripe error is
// a failure, never a pass.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const PRICING_FILE = join(ROOT, 'src/app/data/pricing.ts');
const COMPONENT_DIRS = ['src/app/pages', 'src/app/components', 'src/app'];
const WRITE = process.argv.includes('--write');

const fail = (msg) => {
  console.error(`prices: ${msg}`);
  process.exit(1);
};

// ── half one: no dollar literals outside the pricing module ─────────────────

// $24.99, $99, $1,195.00 — any currency-shaped literal. Deliberately naive:
// a false positive is a five-second conversation, a false negative is a wrong
// price on the public site.
const MONEY = /\$\s?\d[\d,]*(?:\.\d{2})?/g;

function sourceFiles(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(join(ROOT, dir));
  } catch {
    return out; // directory does not exist in this checkout
  }
  for (const entry of entries) {
    const rel = join(dir, entry);
    const abs = join(ROOT, rel);
    if (statSync(abs).isDirectory()) {
      out.push(...sourceFiles(rel));
    } else if (['.ts', '.tsx'].includes(extname(entry))) {
      out.push(rel);
    }
  }
  return out;
}

const scanned = new Set();
const literalHits = [];

for (const dir of COMPONENT_DIRS) {
  for (const rel of sourceFiles(dir)) {
    if (scanned.has(rel)) continue;
    scanned.add(rel);
    if (rel === 'src/app/data/pricing.ts') continue; // the one place amounts belong

    const text = readFileSync(join(ROOT, rel), 'utf8');
    text.split('\n').forEach((line, i) => {
      // Comments explaining the history are allowed to name old prices.
      const code = line.replace(/\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
      for (const hit of code.match(MONEY) ?? []) {
        literalHits.push(`${rel}:${i + 1}  ${hit}  ${line.trim().slice(0, 80)}`);
      }
    });
  }
}

if (literalHits.length) {
  console.error('prices: dollar amounts hardcoded outside src/app/data/pricing.ts\n');
  for (const hit of literalHits) console.error(`  - ${hit}`);
  console.error('\nRender them with priceOf(<lookup key>) instead. The site advertised');
  console.error('$24.95 for a $24.99 Trip Pass because the number lived in a component.');
  process.exit(1);
}

console.log(`prices: ok — no amount literals in ${scanned.size} component files`);

// ── half two: the constants match Stripe ────────────────────────────────────

const KEY = process.env.STRIPE_API_KEY;
if (!KEY) {
  console.log('prices: SKIPPED the Stripe reconciliation — STRIPE_API_KEY is not set.');
  console.log('        Set a restricted, read-only key to verify the amounts really match.');
  process.exit(0);
}
if (KEY.includes('_live_')) fail('refusing to run against a live key — use a restricted test key');

let module_;
try {
  module_ = readFileSync(PRICING_FILE, 'utf8');
} catch (err) {
  fail(`cannot read ${PRICING_FILE}: ${err.message}`);
}

// Parse the generated block rather than importing TS from node.
const BLOCK = /\/\/ BEGIN GENERATED PRICES[\s\S]*?\/\/ END GENERATED PRICES/;
const block = module_.match(BLOCK);
if (!block) fail('pricing.ts has no BEGIN/END GENERATED PRICES block to reconcile');

const local = new Map();
for (const m of block[0].matchAll(
  /(\w+):\s*\{\s*lookupKey:\s*'([^']+)',\s*amountCents:\s*(\d+),\s*currency:\s*'([^']+)',\s*interval:\s*(null|'[^']+')/g,
)) {
  local.set(m[2], { amountCents: Number(m[3]), currency: m[4], interval: m[5].replace(/'/g, '') });
}
if (local.size === 0) fail('could not parse any prices out of pricing.ts');

async function stripePrices() {
  const res = await fetch('https://api.stripe.com/v1/prices?limit=100&active=true', {
    headers: { Authorization: `Bearer ${KEY}` },
  });
  const body = await res.json();
  if (!res.ok) fail(`Stripe error (${res.status}): ${body?.error?.message ?? 'unknown'}`);
  return body.data ?? [];
}

const remote = new Map();
for (const price of await stripePrices()) {
  if (price.lookup_key) remote.set(price.lookup_key, price);
}

const mismatches = [];
const money = (c) => `$${(c / 100).toFixed(2)}`;

for (const [key, want] of local) {
  const got = remote.get(key);
  if (!got) {
    mismatches.push(`${key}: no active Stripe price with that lookup_key`);
    continue;
  }
  if (got.unit_amount !== want.amountCents) {
    mismatches.push(`${key}: site says ${money(want.amountCents)}, Stripe says ${money(got.unit_amount)}`);
  }
  const gotInterval = got.recurring?.interval ?? null;
  if (gotInterval !== (want.interval === 'null' ? null : want.interval)) {
    mismatches.push(`${key}: site says interval ${want.interval}, Stripe says ${gotInterval}`);
  }
}

if (WRITE) {
  const lines = [...local.keys()].map((key) => {
    const got = remote.get(key);
    if (!got) fail(`cannot rewrite: Stripe has no active price with lookup_key ${key}`);
    const interval = got.recurring?.interval ? `'${got.recurring.interval}'` : 'null';
    return `  ${key}: { lookupKey: '${key}', amountCents: ${got.unit_amount}, currency: '${got.currency}', interval: ${interval} },`;
  });
  const rebuilt = [
    '// BEGIN GENERATED PRICES — npm run sync:prices',
    'export const PRICES: Record<PriceLookupKey, Price> = {',
    ...lines,
    '};',
    '// END GENERATED PRICES',
  ].join('\n');
  writeFileSync(PRICING_FILE, module_.replace(BLOCK, rebuilt));
  console.log(`prices: rewrote ${local.size} prices in pricing.ts from Stripe`);
  process.exit(0);
}

if (mismatches.length) {
  console.error('\nprices: the site and Stripe disagree\n');
  for (const m of mismatches) console.error(`  - ${m}`);
  console.error('\nStripe is the source of truth. Run `npm run sync:prices` to take its answer,');
  console.error('or fix the price in Stripe if the site is what is right.');
  process.exit(1);
}

console.log(`prices: ok — ${local.size} prices match Stripe`);
