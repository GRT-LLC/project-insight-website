
export function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl mb-8">Last updated: July 2026</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly, including name, email, and travel
              preferences. We also collect usage data to improve our service. We do not collect
              payment information; when payments launch, they will be processed by Stripe and card
              details will not touch our servers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p>
              Your data powers personalized travel recommendations, Fatigue Index™ calculations, and
              budget tracking. We never sell your personal information to third parties.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Data Security</h2>
            <p>
              Your data is encrypted in transit. We collect the minimum we need to plan your trips,
              and we delete your data on request.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Your Rights</h2>
            <p>
              You can export, modify, or delete your data at any time from your account settings.
              Contact us at privacy@jarvistravel.com for assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
