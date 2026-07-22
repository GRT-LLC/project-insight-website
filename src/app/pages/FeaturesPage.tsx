import { Link } from 'react-router-dom';

// "How it works" (JAR-432, reworked per brand-owner direction 2026-07-21):
// the Fatigue Index deep-dive lives HERE (the home page tells the story;
// this page shows the machinery). FI numbers are always numeric digits.
// The scale graphic mirrors how the app itself displays FI - numbered day
// chips tinted by the shipped band colors (utils/fi.ts light tokens:
// 1-3 #0EA5E9 chill, 4-6 #059669 balanced, 7-8 #CA8A04 elevated,
// 9 #D35446 packed) with the app's ring treatment on the active reading.
// Each moment below ends with its "so what" - the benefit, not the feature.

interface FiBand {
  color: string;
  days: number[];
}

const FI_SCALE: FiBand[] = [
  { color: '#0EA5E9', days: [1, 2, 3] },
  { color: '#059669', days: [4, 5, 6] },
  { color: '#CA8A04', days: [7, 8] },
  { color: '#D35446', days: [9] },
];

interface Moment {
  numeral: string;
  name: string;
  desc: string;
  soWhat: string;
}

const MOMENTS: Moment[] = [
  {
    numeral: '1',
    name: 'The week before you go',
    desc: 'Jarvis drafts the days (pacing, order, and the walk between stops) with the forecast and your budget sitting inside the same plan. You move things; the numbers move with them. And it works the same for a staycation, a long weekend, or two weeks abroad.',
    soWhat: 'So the plan gets finished, and you get your evenings back.',
  },
  {
    numeral: '2',
    name: 'The day that comes up packed',
    desc: 'When a day reads packed, the plan says so before you commit, and offers a lighter version of the same day, so you can see what dropping one thing buys you.',
    soWhat: 'So you fix Tuesday at home, not mid-afternoon in a crowded plaza.',
  },
  {
    numeral: '3',
    name: 'The ground',
    desc: 'Your trip on one map, numbered by day. The route you would actually walk, not a cloud of pins.',
    soWhat: 'So you see the whole day before your feet commit to it.',
  },
  {
    numeral: '4',
    name: 'What it costs',
    desc: 'A budget that lives inside the plan: categories, running totals, and what is left, visible while you decide, not after.',
    soWhat: 'So the budget is a decision you make, not news you get.',
  },
  {
    numeral: '5',
    name: 'The flight home',
    desc: 'Notes, photos, receipts and places, assembled into a journal worth rereading. Yours to keep after the trip ends.',
    soWhat: 'So the trip doesn’t evaporate when the tan does.',
  },
];

export function FeaturesPage() {
  return (
    <div className="pt-20">
      {/* Header - flat Ateneo band. */}
      <section className="bg-sky-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6">
            How it works
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight [text-wrap:balance] max-w-3xl mb-6">
            Five moments a plan has to survive.
          </h1>
          <p className="text-lg text-sky-100 max-w-2xl leading-relaxed">
            Not a feature list: the points in a real trip where most plans
            quietly fail, and what Jarvis does at each one.
          </p>
        </div>
      </section>

      {/* The Fatigue Index - the machinery, shown the way the app shows it. */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 [text-wrap:balance] mb-2">
            The Fatigue Index: chill, balanced, or packed.
          </h2>
          {/* Filed; attached to the feature itself, never a site-wide badge.
              Diarize the provisional's 12-month expiry: the line comes down
              if the filing lapses. */}
          <p className="text-sm font-medium text-gray-500 mb-6">Patent pending</p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            As you build a plan, Jarvis reads each day and calls it chill,
            balanced, or packed. The read comes from how far your body clock
            moves, how long you&rsquo;re in transit, how far you walk, how much
            is packed in, and how much downtime is left.
          </p>

          {/* The scale, as the app displays it: numbered chips tinted by the
              shipped band colors; the current reading carries the ring. The
              words above carry the meaning, so no caption; the mapping is
              provided to screen readers via the aria-label. */}
          <div
            role="img"
            aria-label="The Fatigue Index scale: days 1 to 3 read chill, 4 to 6 balanced, and 7 to 9 packed, with 9 the peak. The example shows a day reading 7."
            className="flex flex-wrap gap-2 mb-8"
          >
            {FI_SCALE.flatMap((band) =>
              band.days.map((day) => (
                <span
                  key={day}
                  aria-hidden="true"
                  style={{ color: band.color, backgroundColor: `${band.color}1A` }}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold [font-variant-numeric:tabular-nums] ${
                    day === 7 ? 'ring-2 ring-current' : ''
                  }`}
                >
                  {day}
                </span>
              ))
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">
            When a day comes up packed, one tap shows you a lighter version of
            it. And that&rsquo;s all the Fatigue Index is: a read on how each
            day will feel, not medical advice.
          </p>
        </div>
      </section>

      {/* The five moments - each one ends with its "so what". */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <ol className="border-t border-gray-200 list-none m-0 p-0">
            {MOMENTS.map((moment) => (
              <li
                key={moment.numeral}
                className="grid grid-cols-[40px_1fr] gap-x-5 py-8 border-b border-gray-200"
              >
                <span
                  aria-hidden="true"
                  className="text-2xl font-bold text-gray-300 [font-variant-numeric:tabular-nums] leading-tight"
                >
                  {moment.numeral}
                </span>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                    {moment.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-3">{moment.desc}</p>
                  <p className="font-medium text-gray-900">{moment.soWhat}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Routes to the contact page's signup path until app/payment is live. */}
          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-amber-400 text-gray-900 rounded-full font-semibold hover:bg-amber-300 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
