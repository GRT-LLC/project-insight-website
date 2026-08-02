// ============================================================================
// PRICING — the only place on this site that knows what anything costs.
//
// Amounts live in Stripe. This file mirrors them, keyed by the same lookup_key
// the backend resolves at checkout (core: config/stripe/setup.js, migration
// 063, JAR-658/659). A lookup key is a stable handle: Stripe Prices are
// immutable, so a price change mints a new Price and the key transfers to it.
//
// Regenerate rather than hand-edit:
//
//   STRIPE_API_KEY=rk_test_... npm run sync:prices        # rewrite from Stripe
//   STRIPE_API_KEY=rk_test_... npm run lint:prices        # verify, change nothing
//
// The literals used to sit in PricingPage.tsx, where the site advertised
// $24.95 for a Trip Pass we would never have charged — for weeks, found by
// hand (JAR-660). Two guards stop that recurring: lint:prices fails when this
// file and Stripe disagree, and check-prices.mjs fails when a dollar amount
// reappears as a literal in a component.
// ============================================================================

/** Stable Stripe lookup keys. Shared contract with core — do not rename. */
export type PriceLookupKey = 'jt_trip_pass' | 'jt_explore_annual' | 'jt_explore_monthly';

export interface Price {
  lookupKey: PriceLookupKey;
  /** Minor units, exactly as Stripe stores them. */
  amountCents: number;
  currency: 'usd';
  /** Billing period, or null for a one-time purchase. */
  interval: 'month' | 'year' | null;
}

// BEGIN GENERATED PRICES — npm run sync:prices
export const PRICES: Record<PriceLookupKey, Price> = {
  jt_trip_pass: { lookupKey: 'jt_trip_pass', amountCents: 2499, currency: 'usd', interval: null },
  jt_explore_annual: { lookupKey: 'jt_explore_annual', amountCents: 9900, currency: 'usd', interval: 'year' },
  jt_explore_monthly: { lookupKey: 'jt_explore_monthly', amountCents: 1195, currency: 'usd', interval: 'month' },
};
// END GENERATED PRICES

/**
 * Format an amount the way the page shows it: no trailing ".00", because
 * "$99" reads as a price and "$99.00" reads as an invoice.
 */
export function formatPrice(cents: number, currency: string = 'usd'): string {
  const whole = cents % 100 === 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(cents / 100);
}

/** The display amount for a plan, e.g. "$24.99" or "$99". */
export function priceOf(key: PriceLookupKey): string {
  const price = PRICES[key];
  return formatPrice(price.amountCents, price.currency);
}
