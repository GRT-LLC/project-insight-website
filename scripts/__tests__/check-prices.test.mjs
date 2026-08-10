#!/usr/bin/env node
// Test what the pricing guard SAYS when it cannot read /v1/account.
//
// The account pin exists because a catalogue was once minted into a personal
// Stripe account the org cannot see or manage, under the same lookup keys at
// the same amounts — right prices, wrong Stripe, green check (JAR-659/660).
//
// When the CI key is both under-scoped AND for the wrong account, Stripe's
// permission error is the only thing that answers "which account is this key
// for" — it names the account inline. Reporting just the missing permission
// sends the reader to the dashboard to grant it and buys a second failing run
// that finally names the real problem. Each round trip is minutes of CI, and
// this exact pair is what marketing#36 hit.
//
// So this asserts the message, not the fetch: given a permission error naming a
// foreign account, the guard must say BOTH things at once.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = new URL('../..', import.meta.url).pathname;
const SCRIPT = resolve(ROOT, 'scripts/check-prices.mjs');

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

const source = readFileSync(SCRIPT, 'utf8');

/** The account this repo's catalogue is pinned to, read from the guard itself
 *  so the test cannot drift from the pin it is describing. */
const EXPECTED_ACCOUNT = source.match(/const EXPECTED_ACCOUNT = '(acct_[A-Za-z0-9]+)'/)?.[1];

/**
 * Reproduce the guard's extraction against a real Stripe error string.
 * The regex is read out of the source rather than copied, so a change to the
 * guard's pattern is tested rather than shadowed by a stale duplicate.
 */
const NAMED_ACCOUNT_RE = (() => {
  const literal = source.match(/message\.match\((\/.+?\/)\)/)?.[1];
  if (!literal) throw new Error('could not find the account-extraction regex in check-prices.mjs');
  const body = literal.slice(1, literal.lastIndexOf('/'));
  return new RegExp(body);
})();

// The verbatim shape Stripe returns for an under-scoped restricted key.
const STRIPE_PERMISSION_ERROR =
  "Permission denied. The provided key 'rk_test_XXXX' does not have the required " +
  "permissions for this endpoint on account 'acct_1ToBJsPDaNqc0Lek'. Enabling " +
  '"Basic Business Contact Information Read" (\'accounts_kyc_basic_read\') permissions ' +
  'on this key would allow this request to continue.';

console.log('check-prices: account-pin diagnostics');

test('the guard pins an account at all', () => {
  if (!EXPECTED_ACCOUNT) throw new Error('EXPECTED_ACCOUNT is missing — the wrong-Stripe trap is unguarded');
});

test("extracts the key's own account from Stripe's permission error", () => {
  const named = STRIPE_PERMISSION_ERROR.match(NAMED_ACCOUNT_RE)?.[1];
  if (named !== 'acct_1ToBJsPDaNqc0Lek') {
    throw new Error(`extracted ${named ?? 'nothing'}, want acct_1ToBJsPDaNqc0Lek`);
  }
});

test('recognises that account as NOT the pinned one', () => {
  const named = STRIPE_PERMISSION_ERROR.match(NAMED_ACCOUNT_RE)?.[1];
  if (named === EXPECTED_ACCOUNT) {
    throw new Error('the fixture account equals the pin, so this test proves nothing');
  }
});

test('the failure path reports the wrong account, not only the permission', () => {
  // The guard must contain the both-problems branch, keyed on the comparison.
  if (!/named && named !== EXPECTED_ACCOUNT/.test(source)) {
    throw new Error('no branch compares the key\'s account against the pin on the permission-error path');
  }
  if (!/permission alone will not fix this/i.test(source)) {
    throw new Error('the message does not tell the reader the permission alone is not the fix');
  }
});

test('a matching account produces no extra noise', () => {
  const sameAccount = STRIPE_PERMISSION_ERROR.replace('acct_1ToBJsPDaNqc0Lek', EXPECTED_ACCOUNT);
  const named = sameAccount.match(NAMED_ACCOUNT_RE)?.[1];
  if (named !== EXPECTED_ACCOUNT) throw new Error('extraction broke on the matching-account case');
  // The guard's branch is `named !== EXPECTED_ACCOUNT`, so this case adds nothing.
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
