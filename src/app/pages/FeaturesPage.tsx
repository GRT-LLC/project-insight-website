import { Link } from 'react-router-dom';

// "How it works" (JAR-432) — five named traveler moments replace the eight
// identical feature rows with placeholder icon-boxes and unbuilt claims
// (bank sync, receipt scanning, group voting, multi-property, E2E/2FA all
// removed). Every moment below corresponds to shipped code: the planner and
// walk-between-stops, the FI >= 7 flag with the lighter-day offer, the
// day-numbered map, budget categories/totals/remaining, and the journal.

interface Moment {
  numeral: string;
  name: string;
  desc: string;
}

const MOMENTS: Moment[] = [
  {
    numeral: '01',
    name: 'The week before you go',
    desc: 'Jarvis drafts the days — pacing, order, and the walk between stops — with the forecast and your budget sitting inside the same plan. You move things; the numbers move with them.',
  },
  {
    numeral: '02',
    name: 'The day that reads seven',
    desc: 'When a day scores seven or above, the plan says so before you commit — and offers a lighter version of the same day, so you can see what dropping one thing buys you.',
  },
  {
    numeral: '03',
    name: 'The ground',
    desc: 'Your trip on one map, numbered by day. The route you would actually walk, not a cloud of pins.',
  },
  {
    numeral: '04',
    name: 'What it costs',
    desc: 'A budget that lives inside the plan: categories, running totals, and what is left — visible while you decide, not after.',
  },
  {
    numeral: '05',
    name: 'The flight home',
    desc: 'Notes, photos, receipts and places, assembled into a journal worth rereading — yours to keep after the trip ends.',
  },
];

export function FeaturesPage() {
  return (
    <div className="pt-20">
      {/* Header — flat Ateneo band. */}
      <section className="bg-sky-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6">
            How it works
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight [text-wrap:balance] max-w-3xl mb-6">
            Five moments a plan has to survive.
          </h1>
          <p className="text-lg text-sky-100 max-w-2xl leading-relaxed">
            Not a feature list — the points in a real trip where most plans
            quietly fail, and what Jarvis does at each one.
          </p>
        </div>
      </section>

      {/* The five moments — hairline rows on Moonlight, numerals on the left. */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <ol className="border-t border-gray-200 list-none m-0 p-0">
            {MOMENTS.map((moment) => (
              <li
                key={moment.numeral}
                className="grid grid-cols-[48px_1fr] gap-x-5 py-8 border-b border-gray-200"
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
                  <p className="text-gray-600 leading-relaxed">{moment.desc}</p>
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
