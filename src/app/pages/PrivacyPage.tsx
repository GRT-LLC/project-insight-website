// Privacy Policy (JAR-432) - Meridian shell (Ateneo header band, Moonlight
// ground). Placeholder content is honest and current; final copy drops in
// later. The prose plugin is not installed, so sections are styled directly.

interface Section {
  title: string;
  body: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    title: '1. Information we collect',
    body: (
      <>
        We collect information you provide directly, including name, email, and
        travel preferences. We also collect usage data to improve our service.
        We don&rsquo;t collect card details; payments are processed by Stripe,
        and card details never touch our servers.
      </>
    ),
  },
  {
    title: '2. How we use your information',
    body: (
      <>
        We use your data to plan your trips: the suggestions you see, each
        day&rsquo;s Fatigue Index read, and your budget. We never sell your
        personal information.
      </>
    ),
  },
  {
    title: '3. Data security',
    body: (
      <>
        Your data is encrypted in transit. We collect the minimum we need to
        plan your trips, and we delete your data on request.
      </>
    ),
  },
  {
    title: '4. Your rights',
    body: (
      <>
        You can request a copy of your data, delete your account and its data,
        or update your information at any time. Write to{' '}
        <a
          href="mailto:privacy@jarvistravel.com"
          className="text-sky-600 underline underline-offset-4 decoration-1 hover:text-sky-700"
        >
          privacy@jarvistravel.com
        </a>{' '}
        and we&rsquo;ll take care of it.
      </>
    ),
  },
];

export function PrivacyPage() {
  return (
    <div className="pt-20">
      {/* Header - flat Ateneo band. */}
      <section className="bg-sky-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-400 mb-6">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight [text-wrap:balance]">
            Privacy Policy
          </h1>
          <p className="text-sky-200 text-sm mt-4">Last updated: July 2026</p>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="border-t border-gray-200">
            {SECTIONS.map((section) => (
              <div key={section.title} className="py-8 border-b border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
