import {
  Sparkles,
  TrendingUp,
  CreditCard,
  Users,
  Camera,
  MessageCircle,
  Hotel,
  Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  highlights: string[];
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI Trip Planning',
    desc: 'Tell Jarvis your preferences, and get a personalized itinerary in seconds. Our AI considers weather, local events, your interests, and optimal timing.',
    color: 'violet',
    highlights: ['Personalized recommendations', 'Time optimization', 'Local insights']
  },
  {
    icon: TrendingUp,
    title: 'Fatigue Index™',
    desc: 'Our patent-pending algorithm calculates your energy levels based on jet lag, sleep, and activities—then optimizes your schedule accordingly.',
    color: 'emerald',
    highlights: ['Energy tracking', 'Rest recommendations', 'Activity balancing']
  },
  {
    icon: CreditCard,
    title: 'Smart Budget Tracking',
    desc: 'Connect your bank, scan receipts with your camera, and track every expense in real-time. Get alerts before you overspend.',
    color: 'amber',
    highlights: ['Real-time tracking', 'Currency conversion', 'Split expenses']
  },
  {
    icon: Users,
    title: 'Group Collaboration',
    desc: 'Invite travel companions, vote on activities, split expenses fairly, and keep everyone on the same page with shared itineraries.',
    color: 'sky',
    highlights: ['Shared planning', 'Fair cost splitting', 'Group voting']
  },
  {
    icon: Camera,
    title: 'Trip Journal',
    desc: 'Capture memories with location-verified photos. Our AI generates captions and organizes your travel story automatically.',
    color: 'rose',
    highlights: ['Auto-organization', 'Location tagging', 'Shareable albums']
  },
  {
    icon: MessageCircle,
    title: 'AI Concierge',
    desc: 'Chat with Jarvis anytime for restaurant recommendations, translation help, booking changes, or local tips. Available 24/7.',
    color: 'indigo',
    highlights: ['Instant responses', 'Multi-language support', 'Emergency assistance']
  },
  {
    icon: Hotel,
    title: 'Multi-Property Management',
    desc: 'Staying at multiple hotels? Jarvis tracks check-in times, coordinates luggage, and ensures smooth transitions.',
    color: 'purple',
    highlights: ['Check-in tracking', 'Luggage coordination', 'Smooth transitions']
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    desc: 'Your data is encrypted end-to-end. We never sell your information, and you control what Jarvis remembers.',
    color: 'slate',
    highlights: ['End-to-end encryption', '2FA protection', 'Privacy controls']
  },
];

export function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Perfect Trips
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to plan, book, and experience unforgettable journeys
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{feature.desc}</p>
                  {feature.highlights.map((highlight) => (
                    <span key={highlight} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 h-64 flex items-center justify-center">
                  <feature.icon className="w-24 h-24 text-blue-600/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Travel?</h2>
          <p className="text-xl mb-8">Join our waitlist for early access</p>
          <button
            onClick={() => navigate('contact')}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Join the Waitlist
          </button>
        </div>
      </section>
    </div>
  );
}
