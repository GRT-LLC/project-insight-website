import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Approved offer structure (pricing handoff, 2026-07): exactly two offers.
// Trip Pass is a real single-trip product, not a trial. Explore is the hero
// offer; Annual and Monthly are billing cadences of ONE subscription, never
// separate tiers. Quarterly is deliberately not shown (brand-owner call,
// JAR-430). No scarcity language, no discount framing, no future tiers.
// Bullet copy is the handoff's card language verbatim.

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

export function PricingPage() {
  const [cadenceKey, setCadenceKey] = useState<CadenceKey>('annual');
  const cadence = CADENCES.find((c) => c.key === cadenceKey) ?? CADENCES[0];

  return (
    <div className="pt-20">
      {/* Header - flat Ateneo band. The h1 is the approved positioning line;
          the subhead is the handoff's approved pricing message. */}
      <section className="bg-sky-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight [text-wrap:balance] max-w-3xl mb-6">
            One trip at a time, or a year of ease?
          </h1>
          <p className="text-lg text-sky-100 max-w-2xl leading-relaxed">
            Trip Pass covers one trip, start to finish. Explore covers every
            trip, all year.
          </p>
        </div>
      </section>

      {/* The two offers - Moonlight ground, Explore is the hero. */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-5 gap-6 items-stretch">
            {/* Trip Pass - the entry offer. Simpler panel, secondary action. */}
            <div className="md:col-span-2 bg-white border border-gray-200 rounded-[14px] p-8 flex flex-col">
              <h2 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700 mb-4">
                Trip Pass
              </h2>
              <div className="mb-2 [font-variant-numeric:tabular-nums]">
                <span className="text-4xl font-bold text-gray-900">$24.95</span>
                <span className="text-gray-500 ml-2">per trip</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-6">
                One trip. Full access. No subscription required.
              </p>
              <ul className="space-y-3 mb-8">
                {TRIP_PASS_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check
                      className="w-4 h-4 text-sky-600 flex-shrink-0 mt-1"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
              {/* Routes to the interest form until the app/payment flow is live. */}
              <Link
                to="/contact"
                className="mt-auto self-start inline-flex items-center gap-1.5 py-2 font-medium text-sky-600 underline underline-offset-4 decoration-1 hover:text-sky-700 transition-colors"
              >
                Sign up
                <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>

            {/* Explore - the hero offer, on the Ateneo panel. */}
            <div className="md:col-span-3 bg-sky-600 rounded-[14px] p-8 flex flex-col">
              <h2 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-4">
                Explore
              </h2>
              <p className="text-lg font-semibold text-gray-50 mb-6">
                The full JarvisTravel subscription for travelers who want
                ongoing access.
              </p>

              {/* Billing cadence - two ways to pay for the same subscription. */}
              <div
                role="group"
                aria-label="Explore billing options"
                className="grid gap-2 mb-6"
              >
                {CADENCES.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    aria-pressed={cadenceKey === option.key}
                    onClick={() => setCadenceKey(option.key)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                      cadenceKey === option.key
                        ? 'border-sky-300 bg-sky-500/30'
                        : 'border-sky-400 hover:border-sky-300'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-medium text-gray-50">{option.label}</span>
                      {option.best && (
                        <span className="text-[11px] font-semibold tracking-wide uppercase text-amber-400 bg-amber-400/[0.12] border border-amber-400/30 px-2 py-0.5 rounded-full">
                          Best value
                        </span>
                      )}
                    </span>
                    <span className="text-sky-100 [font-variant-numeric:tabular-nums]">
                      {option.amount}
                      <span className="text-sky-200">/{option.per}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="mb-6 [font-variant-numeric:tabular-nums]">
                <span className="text-4xl font-bold text-gray-50">{cadence.amount}</span>
                <span className="text-sky-200 ml-2">per {cadence.per}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {EXPLORE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check
                      className="w-4 h-4 text-sky-300 flex-shrink-0 mt-1"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-sky-100">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Routes to the interest form until the app/payment flow is live. */}
              <Link
                to="/contact"
                className="mt-auto w-full py-3.5 bg-amber-400 text-gray-900 rounded-full font-semibold text-center hover:bg-amber-300 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* The upgrade path, framed simply - and the honesty line. */}
          <div className="max-w-2xl mx-auto text-center mt-14">
            <p className="text-gray-900 font-medium mb-3">
              Start with Trip Pass, then move to Explore when you're ready to
              travel more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
