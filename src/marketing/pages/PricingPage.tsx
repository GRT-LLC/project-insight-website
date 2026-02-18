import { useState } from 'react';
import { Check } from 'lucide-react';
import { useMarketingRouter } from '../router/RouterContext';

interface Plan {
  name: string;
  price: { monthly: number; annual: number };
  features: string[];
  color: string;
  popular: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Explorer',
    price: { monthly: 9.99, annual: 99 },
    features: ['3 trips per year', 'Basic AI planning', 'Budget tracking', 'Email support'],
    color: 'slate',
    popular: false,
  },
  {
    name: 'Adventurer',
    price: { monthly: 19.99, annual: 199 },
    features: [
      'Unlimited trips',
      'Advanced AI + Fatigue Index™',
      'Receipt scanning',
      'Group features',
      'Priority support',
    ],
    color: 'sky',
    popular: true,
  },
  {
    name: 'Globetrotter',
    price: { monthly: 39.99, annual: 399 },
    features: [
      'Everything in Adventurer',
      'Family sharing (5 users)',
      'Concierge phone support',
      'Travel insurance discounts',
      'Early feature access',
    ],
    color: 'indigo',
    popular: false,
  },
];

export function PricingPage() {
  const { navigate } = useMarketingRouter();
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 mb-8">Start free. Upgrade when you're ready.</p>

            <div className="inline-flex items-center p-1 bg-gray-100 rounded-full">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !annual ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  annual ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
              >
                Annual <span className="text-emerald-600 text-sm ml-1">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-3xl p-8 ${
                  plan.popular ? 'ring-2 ring-sky-500 shadow-xl' : 'shadow-sm border border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-gray-500">/{annual ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <Check className={`w-5 h-5 text-${plan.color}-500 mr-3 flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => navigate('signup')}
                  className={`w-full py-3 rounded-full font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
