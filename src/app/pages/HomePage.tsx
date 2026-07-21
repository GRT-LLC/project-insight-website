import {
  BookOpen,
  CloudSun,
  Map as MapIcon,
  Plane,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

// NINE interim home page (JAR-431). Asset-light by design: no photography and
// no app captures yet, so the page rests on the two things that are real —
// the shipped 1–9 Fatigue Index and honest copy. Every factual claim below
// maps to shipped code; the five inputs are the engine's FATIGUE_WEIGHTS
// keys, and the dial uses the app's FI ramp hexes verbatim.
//
// Removed relative to the old page (audit findings): fabricated stats and
// testimonials framing, gradient hero + blur orbs + noise texture, gradient
// icon tiles wearing data-palette colors as chrome, min-h-screen hero,
// unbuilt-feature claims (bank sync, receipt scanning, group voting, 24/7,
// "sleep patterns" — restPeriods is not sleep debt).

interface FiInput {
  name: string;
  desc: string;
}

// The five engine inputs (FATIGUE_WEIGHTS): jetLag, travelTime,
// walkingDistance, activityDensity, restPeriods.
const FI_INPUTS: FiInput[] = [
  { name: 'Time-zone shift', desc: 'How far your body clock has to move.' },
  { name: 'Hours in transit', desc: 'Flights, trains, transfers — the time spent getting there.' },
  { name: 'Walking distance', desc: 'The miles a day actually asks of you.' },
  { name: 'Day density', desc: 'How much is packed in, and how tightly.' },
  { name: 'Downtime', desc: 'How much recovery the day leaves you.' },
];

interface Restraint {
  name: string;
  desc: string;
}

// Three restraints, not four: the fourth slot requires a measured claim and
// nothing is measured yet. Refusing to fill the grid is the point.
const RESTRAINTS: Restraint[] = [
  {
    name: 'No commissions.',
    desc: 'We’re not a seller of travel, and no company that appears in your plan pays us anything to appear there.',
  },
  {
    name: 'No ads.',
    desc: 'The product has no slot for one — now, or at scale.',
  },
  {
    // "never used to train anyone's model" is held back until the Privacy
    // Policy states it in writing — a published commitment must match the
    // policy word for word. Restore alongside the legal-pages phase.
    name: 'Your journal is yours.',
    desc: 'Entries, photos and locations are yours, and they are never sold.',
  },
];

interface ProductRow {
  icon: LucideIcon;
  name: string;
  desc: string;
  voice: 'accent' | 'journal';
}

// Shipped features only. Icons follow the app's row recipe: a w-9 tinted
// voice container with the glyph drawn in the voice color — coral belongs to
// the journal and appears nowhere else.
const PRODUCT_ROWS: ProductRow[] = [
  {
    icon: TrendingUp,
    name: 'The Fatigue Index',
    desc: 'Every day of your plan scored one to nine, so the hard days show up before you commit.',
    voice: 'accent',
  },
  {
    icon: Sparkles,
    name: 'Trip planning',
    desc: 'Jarvis drafts the days — pacing, order, and the walk between stops. You decide.',
    voice: 'accent',
  },
  {
    icon: Wallet,
    name: 'Budget',
    desc: 'A budget that sits inside the plan: categories, running totals, what’s left.',
    voice: 'accent',
  },
  {
    icon: BookOpen,
    name: 'Trip journal',
    desc: 'Notes, photos, receipts and places, kept together and worth rereading.',
    voice: 'journal',
  },
  {
    icon: MapIcon,
    name: 'The map',
    desc: 'Your trip on one map, numbered by day.',
    voice: 'accent',
  },
  {
    icon: CloudSun,
    name: 'Weather',
    desc: 'Seven days out, plus what the season usually does there.',
    voice: 'accent',
  },
  {
    icon: Plane,
    name: 'Flights',
    desc: 'Your flights, tracked inside the plan.',
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

/** The Fatigue Index dial — the shipped 1–9 ramp, drawn exactly.
 *  Not an app screenshot: a brand instrument rendering the real scale.
 *  Hexes are the app's DARK-ground ramp tokens (index.css --fi-* dark set) —
 *  the dial sits on navy, and the light-set red reads under 3:1 there.
 *  The figcaption is the text alternative; the drawing itself is aria-hidden
 *  so screen readers hear the reading once, not twice. */
function FiDial() {
  return (
    <figure className="mx-auto max-w-[340px]">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <g fill="none">
          <circle cx="100" cy="100" r="30" stroke="#38BDF8" strokeWidth="2.5" opacity="0.85" />
          <circle cx="100" cy="100" r="37" stroke="#38BDF8" strokeWidth="2.5" opacity="0.85" />
          <circle cx="100" cy="100" r="44" stroke="#38BDF8" strokeWidth="2.5" opacity="0.85" />
          <circle cx="100" cy="100" r="51" stroke="#34D399" strokeWidth="3" opacity="0.9" />
          <circle cx="100" cy="100" r="58" stroke="#34D399" strokeWidth="3" opacity="0.9" />
          <circle cx="100" cy="100" r="65" stroke="#34D399" strokeWidth="3" opacity="0.9" />
          <circle cx="100" cy="100" r="72" stroke="#FBBF24" strokeWidth="4" />
          <circle cx="100" cy="100" r="79" stroke="#FBBF24" strokeWidth="4" />
          <circle cx="100" cy="100" r="88" stroke="#F07668" strokeWidth="5" />
          <line x1="100" y1="100" x2="100" y2="12" stroke="#F0EEEB" strokeOpacity="0.3" strokeWidth="1" />
        </g>
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#F0EEEB"
          fontSize="42"
          fontWeight="700"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          7
        </text>
      </svg>
      <figcaption className="mt-4 text-[13px] text-sky-200 text-center">
        The Fatigue Index. Every day scored, one to nine — seven is a day
        you&rsquo;ll feel.
      </figcaption>
    </figure>
  );
}

export function HomePage() {
  return (
    <div>
      {/* 01 — The number. Flat Ateneo, no photograph: the scale is the image. */}
      <section className="relative overflow-hidden bg-sky-600">
        <ContourArcs className="absolute -top-44 -left-44 w-[520px] h-[520px]" />
        <ContourArcs className="absolute -bottom-56 -right-40 w-[520px] h-[520px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6 [font-variant-numeric:tabular-nums]">
                01 — The Fatigue Index
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight [text-wrap:balance] mb-6">
                Nine is a hard day.
              </h1>
              <p className="text-lg md:text-xl text-sky-100 leading-relaxed max-w-xl mb-4">
                JarvisTravel scores every day of a trip from one to nine. It
                reads how far your body clock will move, how long you&rsquo;ll be
                in transit, how far you&rsquo;ll walk, how densely the day is
                packed, and how much downtime it leaves you. One is easy. Nine
                you will feel.
              </p>
              <p className="text-sm text-sky-200 mb-10">
                Planning only. We take no commissions, and we&rsquo;re not a
                seller of travel.
              </p>
              {/* Routes to the interest form until the app/payment flow is live. */}
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-amber-400 text-gray-900 rounded-full font-semibold hover:bg-amber-300 transition-colors"
              >
                Sign up
              </Link>
            </div>
            <div className="lg:col-span-5">
              <FiDial />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — The belief. Tight, no image, no CTA: a belief with a button
          attached stops being a belief. */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700 mb-6 [font-variant-numeric:tabular-nums]">
            02 — Why it works this way
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 [text-wrap:balance] mb-6">
            We started from the end of the day.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Twelve tabs, a shared spreadsheet and a map full of pins will get
            you a plan. What none of them will tell you is whether Thursday is
            survivable. So we built the pacing model first and hung the
            itinerary off it — because the failure everyone recognizes is not a
            museum you missed. It&rsquo;s standing somewhere you spent a year
            wanting to be, too tired to want it.
          </p>
        </div>
      </section>

      {/* 03 — How the number is made. The dial's chapter carries no CTA. */}
      <section className="relative overflow-hidden bg-sky-600">
        <ContourArcs className="absolute -top-52 -right-44 w-[520px] h-[520px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6 [font-variant-numeric:tabular-nums]">
            03 — How the number is made
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-50 [text-wrap:balance] mb-6">
            Where the number comes from.
          </h2>
          <p className="text-lg text-sky-100 leading-relaxed mb-10">
            Five inputs, weighted. Out comes one number, one to nine. At seven
            and above, Jarvis flags the day before you commit and offers a
            lighter version of the same day.
          </p>
          <ul className="border-t border-white/15">
            {FI_INPUTS.map((input) => (
              <li
                key={input.name}
                className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-4 border-b border-white/15"
              >
                <span className="font-medium text-gray-50">{input.name}</span>
                <span className="text-sky-200">{input.desc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-sky-200">
            It describes what the day costs, not what it cures — a pacing
            model, not medical advice.
          </p>
        </div>
      </section>

      {/* 04 — Restraints. The honest replacement for the old stat bar. */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700 mb-6 [font-variant-numeric:tabular-nums]">
            04 — Restraints
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 [text-wrap:balance] mb-10">
            Three things it will never do.
          </h2>
          <ul className="border-t border-gray-200">
            {RESTRAINTS.map((item) => (
              <li key={item.name} className="py-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ul>
          {/* Routes to the interest form until the app/payment flow is live. */}
          <Link
            to="/contact"
            className="inline-block mt-10 px-8 py-4 bg-amber-400 text-gray-900 rounded-full font-semibold hover:bg-amber-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </section>

      {/* 05 — What's in the product. Shipped features only; the app's icon
          row recipe (tinted voice container, glyph in the voice color). */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-700 mb-6 [font-variant-numeric:tabular-nums]">
            05 — What&rsquo;s in the product
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 [text-wrap:balance] mb-10">
            What Jarvis does today.
          </h2>
          <ul className="border-t border-gray-200">
            {PRODUCT_ROWS.map((row) => {
              const Icon = row.icon;
              return (
                <li key={row.name} className="flex items-start gap-4 py-5 border-b border-gray-200">
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      row.voice === 'journal'
                        ? 'bg-coral-600/10 text-coral-600'
                        : 'bg-sky-600/10 text-sky-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{row.name}</h3>
                    <p className="text-gray-600">{row.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* The invitation — deliberately unnumbered: it is not a chapter, and
          ending the count on nine (our own definition of a hard day) would
          teach the wrong thing. The only centered section on the page. */}
      <section className="relative overflow-hidden bg-slate-900">
        <ContourArcs className="absolute -top-40 -left-48 w-[520px] h-[520px]" />
        <ContourArcs className="absolute -bottom-52 -right-44 w-[520px] h-[520px]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6">
            Early access
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-50 [text-wrap:balance] mb-4">
            Come plan something slow.
          </h2>
          <p className="text-lg text-sky-100 mb-10">
            Sign up to be the first to know when we launch.
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
