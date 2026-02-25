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
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI Trip Planning',
    desc: 'Tell Jarvis your preferences, and get a personalized itinerary in seconds. Our AI considers weather, local events, your interests, and optimal timing.',
    color: 'violet',
  },
  {
    icon: TrendingUp,
    title: 'Fatigue Index™',
    desc: 'Our patent-pending algorithm calculates your energy levels based on jet lag, sleep, and activities—then optimizes your schedule accordingly.',
    color: 'emerald',
  },
  {
    icon: CreditCard,
    title: 'Smart Budget Tracking',
    desc: 'Connect your bank, scan receipts with your camera, and track every expense in real-time. Get alerts before you overspend.',
    color: 'amber',
  },
  {
    icon: Users,
    title: 'Group Collaboration',
    desc: 'Invite travel companions, vote on activities, split expenses fairly, and keep everyone on the same page with shared itineraries.',
    color: 'sky',
  },
  {
    icon: Camera,
    title: 'Trip Journal',
    desc: 'Capture memories with location-verified photos. Our AI generates captions and organizes your travel story automatically.',
    color: 'rose',
  },
  {
    icon: MessageCircle,
    title: 'AI Concierge',
    desc: 'Chat with Jarvis anytime for restaurant recommendations, translation help, booking changes, or local tips. Available 24/7.',
    color: 'indigo',
  },
  {
    icon: Hotel,
    title: 'Multi-Property Management',
    desc: 'Staying at multiple hotels? Jarvis tracks check-in times, coordinates luggage, and ensures smooth transitions.',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    desc: 'Your data is encrypted end-to-end. We never sell your information, and you control what Jarvis remembers.',
    color: 'slate',
  },
];

export function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Modern Travelers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every tool you need to plan, book, and enjoy your perfect trip—powered by AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-6`}
                  >
                    <IconComponent className={`w-7 h-7 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all"
            >
              Try All Features Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
