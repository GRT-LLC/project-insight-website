
export function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl mb-8">Last updated: January 2025</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By using JarvisTravel, you agree to these terms. If you don't agree, please don't use
              our service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Service Description</h2>
            <p>
              JarvisTravel provides AI-powered travel planning, booking assistance, budget tracking,
              and the Fatigue Index™ system. Features may vary by subscription tier.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
            <p>
              You're responsible for maintaining account security and providing accurate information.
              Misuse of the platform may result in account termination.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Cancellation & Refunds
            </h2>
            <p>
              Cancel anytime from your account settings. Annual plans are refundable pro-rata within
              the first 30 days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
