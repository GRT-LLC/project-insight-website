import { Calendar, CreditCard, MessageCircle, Camera, Users, Shield, Zap, Globe } from 'lucide-react';

interface FeaturesPageProps {
  navigate: (page: string) => void;
}

export const FeaturesPage = ({ navigate }: FeaturesPageProps) => {
  
    const features = [
      { icon: Calendar, title: 'Smart Itinerary Planning', description: 'AI analyzes your preferences, travel history, and millions of data points to create perfectly optimized itineraries.', highlights: ['Personalized recommendations', 'Time optimization', 'Local insights'] },
      { icon: CreditCard, title: 'Intelligent Budget Management', description: 'Track expenses in real-time, get spending alerts, and receive smart suggestions to maximize your travel budget.', highlights: ['Real-time tracking', 'Currency conversion', 'Split expenses'] },
      { icon: MessageCircle, title: '24/7 AI Concierge', description: 'Your personal travel assistant is always available for bookings, recommendations, translations, and emergency support.', highlights: ['Instant responses', 'Multi-language support', 'Emergency assistance'] },
      { icon: Camera, title: 'Automatic Trip Journal', description: 'Capture memories effortlessly with AI-powered photo organization and automatic location tagging.', highlights: ['Auto-organization', 'Location tagging', 'Shareable albums'] },
      { icon: Users, title: 'Group Trip Coordination', description: 'Coordinate schedules, split costs fairly, and ensure everyone has input on the itinerary.', highlights: ['Shared planning', 'Fair cost splitting', 'Group voting'] },
      { icon: Zap, title: 'Fatigue Index™', description: 'Our exclusive technology monitors your energy levels to prevent travel burnout and optimize your experience.', highlights: ['Energy tracking', 'Rest recommendations', 'Activity balancing'] },
      { icon: Globe, title: 'Offline Access', description: 'Download your complete itinerary, maps, and essential information for offline use.', highlights: ['Offline maps', 'Downloaded itineraries', 'Emergency info'] },
      { icon: Shield, title: 'Bank-Level Security', description: 'Your data is protected with 256-bit encryption, two-factor authentication, and strict privacy controls.', highlights: ['End-to-end encryption', '2FA protection', 'Privacy controls'] }
    ];
  
    return (
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Powerful Features for Perfect Trips</h1>
            <p className="text-xl text-gray-600">Everything you need to plan, book, and experience unforgettable journeys</p>
          </div>
        </section>
  
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {features.map((feature, index) => (
                <div key={index} className={`grid md:grid-cols-2 gap-12 items-center`}>
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {feature.highlights.map((highlight, idx) => (
                        <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{highlight}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 h-64 flex items-center justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <feature.icon className="w-24 h-24 text-blue-600/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Travel?</h2>
            <p className="text-xl mb-8">Join our waitlist for early access</p>
            <button onClick={() => navigate('waitlist')} className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl">Join the Waitlist</button>
          </div>
        </section>
      </div>
    );
  }