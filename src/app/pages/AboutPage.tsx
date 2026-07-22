// About (JAR-432) - the founder letter replaces the fabricated company page
// ("our founders" plural, "In 2023", the distributed-team claim, the empty
// team section, the four abstract values cards - all deleted; none were true).
//
// LETTER STATUS: DRAFT in the founder's voice, written for his edit. Do not
// merge until Brent has read and revised it - flagged on the PR.

export function AboutPage() {
  return (
    <div className="pt-20">
      {/* Header - flat Ateneo band. */}
      <section className="bg-sky-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight [text-wrap:balance] max-w-3xl">
            Who&rsquo;s building JarvisTravel.
          </h1>
        </div>
      </section>

      {/* The letter - one voice, signed and dated. */}
      <section className="bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              I started JarvisTravel after coming home from trips that looked
              perfect on paper, and feeling like I needed a vacation from the
              vacation. The tools I had were good at collecting places and
              terrible at telling me what a day would actually cost me: in
              hours, in miles, in energy.
            </p>
            <p>
              So we built the pacing model first. Jarvis reads every day of a
              plan as chill, balanced, or packed, based on what actually
              drains you: the time-zone shift, the transit, the walking, and
              the downtime you have left. The itinerary hangs off that read,
              not the other way around.
            </p>
            <p>
              Two commitments have shaped everything since. JarvisTravel plans;
              it never sells travel. No commissions, no placements; nothing
              appears in your plan because someone paid for the spot. And the
              trip you take is yours: the journal, the photos, the places
              belong to you.
            </p>
            <p>
              The app is nearly ready, and we&rsquo;re building it carefully. If
              planning a trip has ever felt like a second job, I&rsquo;d love
              for you to try it.
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="font-semibold text-gray-900">Brent Bailey</p>
            <p className="text-gray-500 text-sm">
              Founder, JarvisTravel · San Diego · July 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
