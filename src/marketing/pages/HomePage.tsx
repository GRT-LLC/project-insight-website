import { useEffect, useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  CreditCard,
  Users,
  Camera,
  MessageCircle,
  ArrowRight,
  Play,
  ChevronDown,
  Award,
  CheckCircle,
  Star,
  Quote,
} from 'lucide-react';
import { useMarketingRouter } from '../router/RouterContext';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export function HomePage() {
  const { navigate } = useMarketingRouter();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollIndicator(window.scrollY < 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features: Feature[] = [
    {
      icon: Sparkles,
      title: 'AI-Powered Planning',
      desc: 'Smart recommendations tailored to your travel style and preferences',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: TrendingUp,
      title: 'Fatigue Index™',
      desc: 'Proprietary system that optimizes your itinerary for energy and enjoyment',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: CreditCard,
      title: 'Smart Budgeting',
      desc: 'Real-time expense tracking with bank sync and receipt scanning',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Users,
      title: 'Group Travel',
      desc: 'Coordinate plans and split expenses effortlessly with travel companions',
      color: 'from-sky-500 to-blue-600',
    },
    {
      icon: Camera,
      title: 'Trip Journal',
      desc: 'Capture memories with location-verified photos and AI captions',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: MessageCircle,
      title: '24/7 AI Concierge',
      desc: 'Get instant help with bookings, translations, and local tips',
      color: 'from-indigo-500 to-violet-600',
    },
  ];

  const stats: Stat[] = [
    { value: '50K+', label: 'Happy Travelers' },
    { value: '120+', label: 'Countries' },
    { value: '4.9', label: 'App Rating' },
    { value: '24/7', label: 'AI Support' },
  ];

  const reviews: Review[] = [
    {
      name: 'Sarah Chen',
      role: 'Digital Nomad',
      text: 'The Fatigue Index changed how I plan trips. No more exhausting first days trying to do everything at once.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Family Traveler',
      text: 'Finally an app that understands traveling with kids. The budget tracking saved us hundreds on our Europe trip.',
      rating: 5,
    },
    {
      name: 'Elena Rodriguez',
      role: 'Business Traveler',
      text: "Jarvis handles all my bookings and keeps me on schedule. It's like having a personal travel assistant 24/7.",
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.15"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-white/90 text-sm font-medium">
                Introducing Fatigue Index™ Technology
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Travel Smarter,<br />
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Not Harder
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              Your AI travel assistant that plans perfect itineraries, tracks budgets, and keeps you
              energized throughout your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                type="button"
                onClick={() => navigate('signup')}
                className="group px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/30 transition-all"
              >
                Start Free Trial
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => navigate('features')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
            showScrollIndicator ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Travel Better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make every trip unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={i}
                  className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fatigue Index Feature */}
      <section className="py-24 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-500/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 rounded-full mb-6 border border-emerald-500/30">
                <Award className="w-4 h-4 text-emerald-400 mr-2" />
                <span className="text-emerald-300 text-sm font-medium">Patent Pending Technology</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Introducing the<br />
                <span className="text-emerald-400">Fatigue Index™</span>
              </h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Our proprietary algorithm analyzes jet lag, sleep patterns, activity intensity, and
                travel time to optimize your itinerary for maximum enjoyment and minimum exhaustion.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Personalized energy predictions',
                  'Smart activity scheduling',
                  'Recovery time recommendations',
                  'Real-time adjustments',
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => navigate('features')}
                className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-all"
              >
                Learn More About FI™
              </button>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-emerald-400 mb-2">72</div>
                <div className="text-white/60">Current Fatigue Index</div>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-6">
                <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: 'Jet Lag', value: '+8' },
                  { label: 'Sleep Debt', value: '2h' },
                  { label: 'Activity', value: 'Med' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3">
                    <div className="text-lg font-semibold text-white">{item.value}</div>
                    <div className="text-xs text-white/50">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Travelers Worldwide</h2>
            <p className="text-xl text-gray-600">
              Join thousands who've transformed their travel experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-gray-200 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">{review.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {review.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Travel Smarter?</h2>
          <p className="text-xl text-white/80 mb-10">
            Start your free trial today. No credit card required.
          </p>
          <button
            type="button"
            onClick={() => navigate('signup')}
            className="px-10 py-5 bg-white text-indigo-600 rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
