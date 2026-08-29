// ============================================================================
// JARVISTRAVEL - LINKS INTO THE APP (JAR-1184)
// The marketing site's one way of handing a visitor to app.jarvistravel.com.
// ============================================================================

import type { PriceLookupKey } from './pricing';

/**
 * Where the app lives.
 *
 * Overridable so a preview build can point at a staging app, with the
 * production origin as the default: this site is deployed from the same branch
 * that serves jarvistravel.com, and an unset variable must not silently produce
 * a link to nowhere.
 */
const APP_ORIGIN = import.meta.env.VITE_APP_ORIGIN || 'https://app.jarvistravel.com';

/**
 * The signup link for a chosen plan.
 *
 * The lookup key is what crosses the boundary, never a plan id. Plan ids are
 * database rows in core; this site has no business knowing them, and they change
 * when the catalogue is re-minted. `PriceLookupKey` is already declared as the
 * shared contract in pricing.ts, and core's coupon-id guard covers the other
 * half of it.
 *
 * Deliberately NOT conditional on whether signup is currently open. The app owns
 * that decision through VITE_SELF_SIGNUP_ENABLED, and it already shows the Early
 * Access notice when signup is closed. Duplicating the flag here would create a
 * second answer to one question that drifts the first time only one is changed:
 * the site would keep sending people to a waitlist after signup opened, or into
 * a signup form after it closed. One flag, one owner.
 */
export function appJoinUrl(plan: PriceLookupKey): string {
  return `${APP_ORIGIN}/auth/sign-up?plan=${encodeURIComponent(plan)}`;
}
