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
import { NAMED_ACCOUNT_RE, classifyAccountError } from '../lib/account-error.mjs';

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

// The guard's own classifier, imported and CALLED rather than grepped. It used
// to live inline in check-prices.mjs, which runs its whole check at import
// time, so this file could only read it as text -- and a source-grep proves a
// branch exists, never that it decides correctly. That is precisely how a pin
// naming a non-existent account survived here (JAR-1207).

// The verbatim shape Stripe returns for an under-scoped restricted key.
const STRIPE_PERMISSION_ERROR =
  "Permission denied. The provided key 'rk_test_XXXX' does not have the required " +
  "permissions for this endpoint on account 'acct_1ToBJsPDaNqc0Lek'. Enabling " +
  '"Basic Business Contact Information Read" (\'accounts_kyc_basic_read\') permissions ' +
  'on this key would allow this request to continue.';

// A DIFFERENT account, for the not-pinned branch. Synthetic and obviously so:
// the only real account we have is the one above, and manufacturing a second
// real-looking id invites someone to believe in it. Previously this branch was
// fed the captured error unmodified -- which only worked because the pin named
// an account that does not exist (JAR-1207).
const WRONG_ACCOUNT = 'acct_0000000000NOTOURS';
const WRONG_ACCOUNT_ERROR = STRIPE_PERMISSION_ERROR.replace(
  'acct_1ToBJsPDaNqc0Lek',
  WRONG_ACCOUNT,
);

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

// The test this file did not have, and the reason the wrong pin survived from
// the commit that introduced it. Everything else here checks the guard's
// mechanics against a fixture; nothing checked the guard's CONSTANT against
// reality. This is the assertion that goes red if EXPECTED_ACCOUNT drifts.
//
// It reads the pin out of the source and compares it to an account id captured
// from a real Stripe response, so the two cannot be reconciled by editing one
// of them -- which is exactly what the old `.replace()` below used to do.
test('the pin names the same account our captured Stripe error does', () => {
  const named = STRIPE_PERMISSION_ERROR.match(NAMED_ACCOUNT_RE)?.[1];
  if (named !== EXPECTED_ACCOUNT) {
    throw new Error(
      `the guard pins ${EXPECTED_ACCOUNT}, but the account Stripe actually named ` +
        `for our key is ${named}. One of them is wrong, and it is not Stripe.`,
    );
  }
});

test('recognises a different account as NOT the pinned one', () => {
  const named = WRONG_ACCOUNT_ERROR.match(NAMED_ACCOUNT_RE)?.[1];
  if (named !== WRONG_ACCOUNT) throw new Error('extraction broke on the wrong-account fixture');
  if (named === EXPECTED_ACCOUNT) {
    throw new Error('the wrong-account fixture equals the pin, so this test proves nothing');
  }
});

// The three outcomes the guard has to tell apart, exercised by calling it.
// The previous version of this test asserted that a particular EXPRESSION
// appeared in the source. That passes for a branch that is present and wrong,
// and it broke the moment the branch was rewritten without its behaviour
// changing -- a test coupled to the shape of the code rather than its result.

test('a denial naming the pinned account CONFIRMS it — the grant is not needed', () => {
  const { verdict, named } = classifyAccountError(STRIPE_PERMISSION_ERROR, EXPECTED_ACCOUNT);
  if (verdict !== 'confirmed') throw new Error(`verdict was ${verdict}, want confirmed`);
  if (named !== EXPECTED_ACCOUNT) throw new Error(`named ${named}, want ${EXPECTED_ACCOUNT}`);
});

test('a denial naming a different account is a failure no permission fixes', () => {
  const { verdict, named } = classifyAccountError(WRONG_ACCOUNT_ERROR, EXPECTED_ACCOUNT);
  if (verdict !== 'wrong') throw new Error(`verdict was ${verdict}, want wrong`);
  if (named !== WRONG_ACCOUNT) throw new Error(`named ${named}, want ${WRONG_ACCOUNT}`);
});

test('an error naming NO account is unknown, never assumed to be ours', () => {
  // The real message CI is failing on today. An expired key names no account,
  // so there is nothing to confirm and the only safe verdict is unknown.
  const expired = 'Expired API Key provided: rk_test_*****ER0mQf';
  const { verdict, named } = classifyAccountError(expired, EXPECTED_ACCOUNT);
  if (verdict !== 'unknown') throw new Error(`verdict was ${verdict}, want unknown`);
  if (named !== null) throw new Error(`named ${named}, want null`);
});

test('the guard still tells the reader a permission grant is not the fix', () => {
  if (!/No permission grant fixes this/i.test(source)) {
    throw new Error('the wrong-account message no longer says the permission is not the fix');
  }
});

// A name, not a shape — so asserting it in the source is the right tool here.
// The guard read STRIPE_API_KEY, which this org sets nowhere in Infisical; the
// same class of defect as the account pin, where the code named something that
// does not exist in our world and reported its absence as misconfiguration.
test('the guard reads the env var this org actually sets', () => {
  if (!/process\.env\.STRIPE_SECRET_KEY/.test(source)) {
    throw new Error('the guard does not read STRIPE_SECRET_KEY');
  }
  if (/STRIPE_API_KEY/.test(source)) {
    throw new Error('STRIPE_API_KEY still appears in check-prices.mjs');
  }
});

test('a matching account produces no extra noise', () => {
  // Uses the captured error AS CAPTURED. It used to be rewritten first --
  //   STRIPE_PERMISSION_ERROR.replace('acct_1ToBJsPDaNqc0Lek', EXPECTED_ACCOUNT)
  // -- which substituted reality with the expectation before comparing them, so
  // the fixture could never contradict the constant. That single line is what
  // let a wrong pin live in this repo from the commit that added it (JAR-1207).
  const named = STRIPE_PERMISSION_ERROR.match(NAMED_ACCOUNT_RE)?.[1];
  if (named !== EXPECTED_ACCOUNT) throw new Error('extraction broke on the matching-account case');
  // The guard's branch is `named !== EXPECTED_ACCOUNT`, so this case adds nothing.
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
