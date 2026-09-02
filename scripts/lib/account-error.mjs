// ============================================================================
// Classifying Stripe's permission-denied error, in one place.
//
// Extracted from check-prices.mjs so it can be tested by CALLING it. That file
// runs its whole check at import time, so its test could only ever read it as
// TEXT and assert on the shape of the source — which is how a guard whose
// constant named a non-existent account passed for three weeks (JAR-1207). A
// source-grep proves a branch is written, never that it decides correctly.
//
// One implementation, imported by both. A second copy in the test would be a
// silent bypass: the test would keep passing while the guard changed.
// ============================================================================

/** Stripe names the key's own account when it denies a request for scope. */
export const NAMED_ACCOUNT_RE = /account '(acct_[A-Za-z0-9]+)'/;

/**
 * Decide what a failed /v1/account response tells us about which account the
 * key belongs to.
 *
 *   confirmed — Stripe named the account we pin. That is the fact the request
 *               was asking for, so the caller may proceed without the
 *               accounts_kyc_basic_read grant.
 *   wrong     — Stripe named a DIFFERENT account. No permission fixes that.
 *   unknown   — the error names no account (expired key, revoked key, or a
 *               reworded message). Fail closed: never assume it is ours.
 *
 * @returns {{verdict: 'confirmed'|'wrong'|'unknown', named: string|null}}
 */
export function classifyAccountError(message, expected) {
  const named = String(message ?? '').match(NAMED_ACCOUNT_RE)?.[1] ?? null;
  if (!named) return { verdict: 'unknown', named: null };
  return { verdict: named === expected ? 'confirmed' : 'wrong', named };
}
