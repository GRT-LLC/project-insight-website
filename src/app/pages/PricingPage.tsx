import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Approved offer structure (pricing handoff, 2026-07): exactly two offers.
// Trip Pass is a real single-trip product, not a trial. Explore is the hero
// offer; Annual and Monthly are billing cadences of ONE subscription, never
// separate tiers. Quarterly is deliberately not shown (brand-owner call,
// JAR-430). No scarcity language, no discount framing, no future tiers.
// Bullet copy is the handoff's card language verbatim.
//
// The highlight travels (brand-owner direction): exactly one card wears the
// Ateneo treatment at a time. Explore holds it by default; while the visitor
// hovers or keyboard-focuses Trip Pass, the highlight shifts there and
// Explore goes quiet; it shifts back the moment they leave. One boolean
// drives both cards, so exactly one solid amber pill is visible at any
// moment. Touch devices keep the default (Explore highlighted).

const TRIP_PASS_POINTS = [
  'Full access to plan and execute one trip',
  'Your trip journal stays with you after the trip',
  'Good for travelers who have one trip in mind right now',
];

const EXPLORE_POINTS = [
  'Full subscription access',
  'Best choice for travelers planning more than one trip',
  'Explore Annual is the best value at $99 per year',
];

type CadenceKey = 'annual' | 'monthly';

interface Cadence {
  key: CadenceKey;
  label: string;
  amount: string;
  per: string;
  best?: boolean;
}

// Single source of truth for Explore pricing - rows and the summary price
// both render from here.
const CADENCES: Cadence[] = [
  { key: 'annual', label: 'Annual', amount: '$99', per: 'year', best: true },
  { key: 'monthly', label: 'Monthly', amount: '$11.95', per: 'month' },
];

// The two visual states a card can be in. Both keep a 1px border so nothing
// shifts when the highlight moves; the hero border matches its own ground.
const heroCard = 'bg-sky-600 border-sky-600';
const quietCard = 'bg-white border-gray-200';

export function PricingPage() {
  const [cadenceKey, setCadenceKey] = useState<CadenceKey>('annual');
  const cadence = CADENCES.find((c) => c.key === cadenceKey) ?? CADENCES[0];

  // True while the visitor is over (or keyboard-focused inside) Trip Pass.
  const [tripActive, setTripActive] = useState(false);
  const exploreHot = !tripActive;

  return (
    <div className="pt-20">
      {/* Header - flat Ateneo band. */}
      <section className="bg-sky-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight [text-wrap:balance] max-w-3xl mb-6">
            Pick the plan that fits the way you travel.
          </h1>
          <p className="text-lg text-sky-100 max-w-2xl leading-relaxed">
            Trip Pass covers one trip, start to finish. Explore covers every
            trip, all year.
          </p>
        </div>
      </section>

      {/* The two offers - Moonlight ground, one traveling highlight. */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-5 gap-6 items-stretch">
            {/* Trip Pass - the entry offer. */}
            <div
              onMouseEnter={() => setTripActive(true)}
              onMouseLeave={() => setTripActive(false)}
              onFocusCapture={() => setTripActive(true)}
              onBlurCapture={() => setTripActive(false)}
              className={`md:col-span-2 border rounded-[14px] p-8 flex flex-col transition-colors duration-200 ${
                tripActive ? heroCard : quietCard
              }`}
            >
              <h2
                className={`text-[11px] font-semibold tracking-[0.14em] uppercase mb-4 transition-colors ${
                  tripActive ? 'text-amber-400' : 'text-amber-700'
                }`}
              >
                Trip Pass
              </h2>
              <div className="mb-2 [font-variant-numeric:tabular-nums]">
                <span
                  className={`text-4xl font-bold transition-colors ${
                    tripActive ? 'text-gray-50' : 'text-gray-900'
                  }`}
                >
                  $24.95
                </span>
                <span
                  className={`ml-2 transition-colors ${
                    tripActive ? 'text-sky-200' : 'text-gray-500'
                  }`}
                >
                  per trip
                </span>
              </div>
              <p
                className={`text-lg font-semibold mb-6 transition-colors ${
                  tripActive ? 'text-gray-50' : 'text-gray-900'
                }`}
              >
                One trip. Full access. No subscription required.
              </p>
              <ul className="space-y-3 mb-8">
                {TRIP_PASS_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-1 transition-colors ${
                        tripActive ? 'text-sky-300' : 'text-sky-600'
                      }`}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span
                      className={`transition-colors ${
                        tripActive ? 'text-sky-100' : 'text-gray-600'
                      }`}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Routes to the interest form until the app/payment flow is live. */}
              <Link
                to="/contact"
                className={`mt-auto self-start px-8 py-3.5 rounded-full font-semibold border transition-colors text-gray-900 ${
                  tripActive
                    ? 'bg-amber-400 border-amber-400 hover:bg-amber-300 hover:border-amber-300'
                    : 'bg-transparent border-gray-300'
                }`}
              >
                Join Now
              </Link>
            </div>

            {/* Explore - the hero offer; holds the highlight unless Trip Pass
                has the visitor's attention. Entering Explore reclaims the
                highlight directly (not only via Trip Pass's mouseleave), so
                the shift back is immediate and robust. */}
            <div
              onMouseEnter={() => setTripActive(false)}
              onFocusCapture={() => setTripActive(false)}
              className={`md:col-span-3 border rounded-[14px] p-8 flex flex-col transition-colors duration-200 ${
                exploreHot ? heroCard : quietCard
              }`}
            >
              <h2
                className={`text-[11px] font-semibold tracking-[0.14em] uppercase mb-4 transition-colors ${
                  exploreHot ? 'text-amber-400' : 'text-amber-700'
                }`}
              >
                Explore
              </h2>
              <p
                className={`text-lg font-semibold mb-6 transition-colors ${
                  exploreHot ? 'text-gray-50' : 'text-gray-900'
                }`}
              >
                The full JarvisTravel subscription for travelers who want
                ongoing access.
              </p>

              {/* Billing cadence - two ways to pay for the same subscription. */}
              <div
                role="group"
                aria-label="Explore billing options"
                className="grid gap-2 mb-6"
              >
                {CADENCES.map((option) => {
                  const selected = cadenceKey === option.key;
                  // Both states give a clear hover fill (Meridian sky tints),
                  // so the unselected cadence responds when the visitor moves
                  // over it - not just a border change.
                  const rowClass = exploreHot
                    ? selected
                      ? 'border-sky-300 bg-sky-500/30'
                      : 'border-sky-400 bg-sky-500/0 hover:border-sky-300 hover:bg-sky-500/20'
                    : selected
                      ? 'border-sky-600 bg-sky-600/10'
                      : 'border-gray-300 bg-sky-600/0 hover:border-sky-600 hover:bg-sky-600/[0.06]';
                  return (
                    <button
                      key={option.key}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setCadenceKey(option.key)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${rowClass}`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-medium transition-colors ${
                            exploreHot ? 'text-gray-50' : 'text-gray-900'
                          }`}
                        >
                          {option.label}
                        </span>
                        {option.best && (
                          <span
                            className={`text-[11px] font-semibold tracking-wide uppercase bg-amber-400/[0.12] border border-amber-400/30 px-2 py-0.5 rounded-full transition-colors ${
                              exploreHot ? 'text-amber-400' : 'text-amber-700'
                            }`}
                          >
                            Best value
                          </span>
                        )}
                      </span>
                      <span
                        className={`[font-variant-numeric:tabular-nums] transition-colors ${
                          exploreHot ? 'text-sky-100' : 'text-gray-600'
                        }`}
                      >
                        {option.amount}
                        <span
                          className={`transition-colors ${
                            exploreHot ? 'text-sky-200' : 'text-gray-500'
                          }`}
                        >
                          /{option.per}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mb-6 [font-variant-numeric:tabular-nums]">
                <span
                  className={`text-4xl font-bold transition-colors ${
                    exploreHot ? 'text-gray-50' : 'text-gray-900'
                  }`}
                >
                  {cadence.amount}
                </span>
                <span
                  className={`ml-2 transition-colors ${
                    exploreHot ? 'text-sky-200' : 'text-gray-500'
                  }`}
                >
                  per {cadence.per}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {EXPLORE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-1 transition-colors ${
                        exploreHot ? 'text-sky-300' : 'text-sky-600'
                      }`}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span
                      className={`transition-colors ${
                        exploreHot ? 'text-sky-100' : 'text-gray-600'
                      }`}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Routes to the interest form until the app/payment flow is live. */}
              <Link
                to="/contact"
                className={`mt-auto w-full py-3.5 rounded-full font-semibold text-center border transition-colors text-gray-900 ${
                  exploreHot
                    ? 'bg-amber-400 border-amber-400 hover:bg-amber-300 hover:border-amber-300'
                    : 'bg-transparent border-gray-300'
                }`}
              >
                Join Now
              </Link>
            </div>
          </div>

          {/* The upgrade path, framed simply. */}
          <div className="max-w-2xl mx-auto text-center mt-14">
            <p className="text-gray-900 font-medium">
              Start with Trip Pass, then move to Explore when you're ready to
              travel more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
