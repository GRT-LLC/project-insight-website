import {
  BookOpen,
  CloudSun,
  Map as MapIcon,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

// Home (JAR-431, reworked per brand-owner direction 2026-07-21): this page
// tells the story — what a traveler misses without JarvisTravel and what
// planning wrong costs — in benefit language. The Fatigue Index deep-dive
// (mechanics, inputs, the dial) lives on /features; here FI appears only as
// a benefit, always written with numeric digits (1–9, 7), never spelled out.
// The numbered section eyebrows were retired sitewide: they read like slides.
// Every factual claim still maps to shipped code.

interface Feature {
  icon: LucideIcon;
  name: string;
  desc: string;
  voice: 'accent' | 'journal';
}

// Shipped features only, written as benefits. Icons follow the app's row
// recipe — tinted voice containers, glyph in the voice color; coral belongs
// to the journal and appears nowhere else.
const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    name: 'Trip planning',
    desc: 'Jarvis drafts your days around your pace and the daylight you actually have. You decide; it does the homework.',
    voice: 'accent',
  },
  {
    icon: TrendingUp,
    name: 'The Fatigue Index',
    desc: 'Every day rated 1–9 before you commit, so the hard days show up while you can still fix them.',
    voice: 'accent',
  },
  {
    icon: Wallet,
    name: 'Budget',
    desc: 'Totals that move while you plan — not a surprise after you land back home.',
    voice: 'accent',
  },
  {
    icon: BookOpen,
    name: 'Trip journal',
    desc: 'Notes, photos, receipts and places become a story worth rereading — yours to keep.',
    voice: 'journal',
  },
  {
    icon: MapIcon,
    name: 'The map',
    desc: 'Your whole trip on one map, numbered by day, with the walk between stops visible.',
    voice: 'accent',
  },
  {
    icon: CloudSun,
    name: 'Weather & flights',
    desc: 'The forecast and your flights sit inside the plan — fewer surprises, fewer tabs.',
    voice: 'accent',
  },
];

/** Concentric contour rings — the Meridian motif, Moonlight at 13% on navy.
 *  pointer-events-none so the overlay can never intercept clicks on content. */
function ContourArcs({ className }: { className: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
    >
      {[130, 170, 210, 250].map((r) => (
        <circle
          key={r}
          cx="260"
          cy="260"
          r={r}
          stroke="#F0EEEB"
          strokeOpacity="0.13"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export function HomePage() {
  return (
    <div>
      {/* Hero — the story, not the mechanics. */}
      <section className="relative overflow-hidden bg-sky-600">
        <ContourArcs className="absolute -top-44 -left-44 w-[520px] h-[520px]" />
        <ContourArcs className="absolute -bottom-56 -right-40 w-[520px] h-[520px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 md:pt-44 md:pb-32 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight [text-wrap:balance] mb-6">
            Your vacation should be a break, not a second job.
          </h1>
          <p className="text-lg md:text-xl text-sky-100 leading-relaxed max-w-2xl mx-auto mb-10">
            JarvisTravel plans the pace, the budget and the map in one place —
            so the trip you take feels like the trip you imagined.
          </p>
          {/* Routes to the interest form until the app/payment flow is live. */}
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-amber-400 text-gray-900 rounded-full font-semibold hover:bg-amber-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </section>

      {/* The cost of planning wrong — what you miss without it. */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 [text-wrap:balance] mb-6">
            The trip you waited a year for shouldn&rsquo;t wear you out by
            Tuesday.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Twelve tabs and a shared spreadsheet will get you a plan — but they
            won&rsquo;t tell you that day 2 has six hours of walking after a
            red-eye, or that the museum, the market and the dinner across town
            don&rsquo;t fit in the same afternoon. That&rsquo;s the trip where
            you come home needing a vacation from the vacation.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Jarvis rates every day of your plan from 1 to 9 while you build it.
            When a day hits 7, you&rsquo;ll know before you&rsquo;re standing in
            it — and Jarvis offers a lighter version of the same day, so fixing
            it takes one tap instead of a family argument.
          </p>
          <Link
            to="/features"
            className="font-medium text-sky-600 underline underline-offset-4 decoration-1 hover:text-sky-700 transition-colors"
          >
            See how it works
          </Link>
        </div>
      </section>

      {/* What you get — the product, in benefit language. */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 [text-wrap:balance] mb-4">
              One plan, instead of twelve tabs.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Everything that makes a trip work — and everything you&rsquo;d
              rather not juggle — in one place.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="bg-gray-50 border border-gray-200 rounded-[14px] p-6"
                >
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${
                      feature.voice === 'journal'
                        ? 'bg-coral-600/10 text-coral-600'
                        : 'bg-sky-600/10 text-sky-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why you can trust the plan — differentiation as benefit. */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 [text-wrap:balance] mb-6">
            Advice that&rsquo;s on your side.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            When Jarvis suggests a place, it&rsquo;s because it fits your day —
            never because someone paid for the spot. No ads, no commissions, no
            sponsored detours. And the trip you take stays yours: the journal,
            the photos and the places belong to you, not to an algorithm.
          </p>
        </div>
      </section>

      {/* The invitation. */}
      <section className="relative overflow-hidden bg-slate-900">
        <ContourArcs className="absolute -top-40 -left-48 w-[520px] h-[520px]" />
        <ContourArcs className="absolute -bottom-52 -right-44 w-[520px] h-[520px]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-50 [text-wrap:balance] mb-4">
            Enjoy your vacation.
          </h2>
          <p className="text-lg text-sky-100 mb-10">
            Planning is hard. Jarvis does the heavy lifting — sign up and be
            first in when we launch.
          </p>
          {/* Routes to the interest form until the app/payment flow is live. */}
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-amber-400 text-gray-900 rounded-full font-semibold hover:bg-amber-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </section>
    </div>
  );
}
