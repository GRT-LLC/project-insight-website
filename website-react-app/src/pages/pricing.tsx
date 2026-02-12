import { useState } from 'react';
import { Bell, Check } from 'lucide-react';

interface PricingPageProps {
  navigate: (page: string) => void;
}

export const PricingPage = ({ navigate }: PricingPageProps) => {
    const [billingCycle, setBillingCycle] = useState('monthly');
  
    const plans = [
      { name: 'Explorer', price: { monthly: 9.99, annual: 99 }, features: ['1 Trip per month', 'Basic itinerary planning', 'Budget tracking', 'Email support', 'Mobile app access'], color: 'blue' },
      { name: 'Adventurer', price: { monthly: 19.99, annual: 199 }, features: ['Unlimited trips', 'AI-powered recommendations', 'Real-time expense tracking', 'Priority support', 'Group trip coordination', 'Travel journal', 'Offline access'], popular: true, color: 'purple' },
      { name: 'Explorer Plus', price: { monthly: 39.99, annual: 399 }, features: ['Everything in Adventurer', 'Concierge booking service', 'VIP support 24/7', 'Family account (up to 6)', 'Business expense reports', 'API access', 'Custom integrations'], color: 'indigo' }
    ];
  
    return (
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
              <Bell className="w-4 h-4 mr-2" />
              Early bird pricing - 30% off at launch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Choose the perfect plan for your travel needs. Cancel anytime.</p>
  
            <div className="inline-flex items-center p-1 bg-gray-100 rounded-full">
              <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600'}`}>Monthly</button>
              <button onClick={() => setBillingCycle('annual')} className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === 'annual' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-600'}`}>Annual<span className="ml-2 text-xs text-green-600 font-semibold">Save 20%</span></button>
            </div>
          </div>
        </section>
  
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div key={index} className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${plan.popular ? 'ring-2 ring-purple-600' : ''}`}>
                  {plan.popular && <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}</span>
                      <span className="text-gray-600 ml-2">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => navigate('waitlist')} className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>Join Waitlist</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                { q: 'Can I change plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.' },
                { q: 'Is there a free trial?', a: 'Yes! All plans come with a 14-day free trial. No credit card required to start.' },
                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.' }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }