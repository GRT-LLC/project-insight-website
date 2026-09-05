// One Stripe Price compared against the one entry the site renders for it.
//
// Extracted from check-prices.mjs so the comparison can be tested against
// fixtures instead of against Stripe. The guard's other decisions already live
// in scripts/lib/ for the same reason (account-error, account-mode); this is
// the last block of real logic that only ran when a network call succeeded,
// which meant every one of its rules was believed rather than exercised.
//
// Returns an array of human-readable mismatch strings — empty means agreement.
// It never throws and never exits: the caller collects across all keys and
// reports once, so a reader sees every disagreement rather than the first.

const money = (c) => `$${(c / 100).toFixed(2)}`;

/**
 * @param key   the lookup_key both sides agree to address the price by
 * @param want  the site's entry, parsed out of pricing.ts
 * @param got   the Stripe Price object, or undefined if no active price carries the key
 */
export function comparePrice(key, want, got) {
  if (!got) return [`${key}: no active Stripe price with that lookup_key`];

  const out = [];

  if (got.unit_amount !== want.amountCents) {
    out.push(`${key}: site says ${money(want.amountCents)}, Stripe says ${money(got.unit_amount)}`);
  }

  // interval_count, not just interval: a quarterly price is interval=month
  // with count=3, and the page would render it as "per month" (L2).
  if ((got.recurring?.interval_count ?? 1) !== 1) {
    out.push(`${key}: Stripe bills every ${got.recurring.interval_count} ${got.recurring.interval}s — the site renders a simple "per ${got.recurring.interval}"`);
  }

  const gotInterval = got.recurring?.interval ?? null;
  if (gotInterval !== (want.interval === 'null' ? null : want.interval)) {
    out.push(`${key}: site says interval ${want.interval}, Stripe says ${gotInterval}`);
  }

  // currency was parsed and then never compared, so a price flipped to another
  // currency in Stripe passed green while the site kept rendering a $ sign.
  if (got.currency !== want.currency) {
    out.push(`${key}: site says ${want.currency}, Stripe says ${got.currency}`);
  }

  // tax_behavior (JAR-1319). Every JarvisTravel price is tax-exclusive: the
  // listed amount is what the customer pays BEFORE tax, which is how the
  // amounts in pricing.ts were decided.
  //
  // This is checked here, in CI, because it is the one field whose failure
  // surfaces at CHECKOUT rather than here — Stripe refuses to put a price with
  // tax_behavior `unspecified` on an automatic-tax invoice at all, so the plan
  // does not mis-charge, it stops selling. Both Explore prices sat `unspecified`
  // from 2026-05 to 2026-09-05 with nothing reporting it.
  //
  // The account-level `defaults.tax_behavior` does NOT cover this. It was
  // already `exclusive` for that entire window; a default applies where a price
  // is silent, it does not make a silent price explicit.
  //
  // And it cannot be repaired in place: tax_behavior is settable once and
  // immutable after, so a wrong price needs a new price id, a lookup_key
  // transfer, and a migration of anyone already subscribed. Catching it before
  // a price is used is the whole value of this check.
  if (got.tax_behavior !== 'exclusive') {
    out.push(`${key}: tax_behavior is ${got.tax_behavior ?? 'unset'}, must be exclusive — ` +
      `Stripe refuses this price on an automatic-tax invoice, so checkout fails for it. ` +
      `It cannot be changed once set: this needs a new Price and a lookup_key transfer`);
  }

  return out;
}
