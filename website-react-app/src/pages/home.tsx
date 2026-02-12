import { useEffect, useState } from 'react';
import { Calendar, CreditCard, MessageCircle, Camera, Users, Shield, Sparkles, Star, Check, ChevronDown, ChevronRight } from 'lucide-react';

interface HomePageProps {
  navigate: (page: string) => void;
}

export const HomePage = ({ navigate }: HomePageProps) => {  
    const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => setScrollIndicatorVisible(window.scrollY < 100);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const features = [
      { icon: Calendar, title: 'Smart Itinerary Planning', description: 'AI-powered recommendations based on your preferences and travel style' },
      { icon: CreditCard, title: 'Budget Tracking', description: 'Real-time expense tracking with smart budget alerts and insights' },
      { icon: MessageCircle, title: '24/7 AI Concierge', description: 'Get instant help with bookings, recommendations, and travel questions' },
      { icon: Camera, title: 'Trip Journal', description: 'Automatically capture and organize your travel memories' },
      { icon: Users, title: 'Group Coordination', description: 'Easy planning and expense splitting for group trips' },
      { icon: Shield, title: 'Secure & Private', description: 'Bank-level encryption for your data and payment information' }
    ];
  
    const testimonials = [
      { quote: "The Fatigue Index feature alone is worth it. I used to come home from trips more exhausted than when I left!", name: "Sarah M.", role: "Frequent Traveler", rating: 5 },
      { quote: "Planning our family trip to Japan was effortless. Jarvis handled everything from flights to restaurant reservations.", name: "Michael T.", role: "Family Travel", rating: 5 },
      { quote: "As a business traveler, the budget tracking and expense reports have saved me hours every month.", name: "Jennifer L.", role: "Business Traveler", rating: 5 }
    ];
  
    return (
      <div>
        {/* Hero Section */}
        <section className="relative h-[95vh] min-h-[600px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920')` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>
  
          <div className="relative h-full flex flex-col justify-center items-center text-white px-4">
            <div className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">Launching Soon - Join the Waitlist</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 drop-shadow-2xl">Travel Reimagined</h1>
            <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl drop-shadow-lg">Your personal AI travel assistant that plans, books, and guides your perfect journey</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('waitlist')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl">
                Join the Waitlist
              </button>
              <button onClick={() => navigate('features')} className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all border border-white/30">
                Learn More
              </button>
            </div>
          </div>
  
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${scrollIndicatorVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="animate-bounce"><ChevronDown className="w-8 h-8 text-white" /></div>
          </div>
        </section>
  
        {/* Stats Section */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10K+', label: 'Beta Signups' },
                { value: '50+', label: 'Countries Supported' },
                { value: '4.9', label: 'Beta User Rating' },
                { value: '24/7', label: 'AI Availability' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need for Perfect Travel</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Jarvis handles every aspect of your journey, from planning to memories</p>
            </div>
  
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Fatigue Index™ Feature Highlight */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-yellow-400/20 rounded-full text-yellow-300 text-sm font-medium mb-4">
                  <Star className="w-4 h-4 mr-1" />
                  Exclusive Feature
                </div>
                <h2 className="text-4xl font-bold mb-6">Introducing Fatigue Index™</h2>
                <p className="text-xl text-blue-100 mb-6">Our proprietary algorithm monitors your travel fatigue in real-time, considering factors like jet lag, sleep patterns, and activity levels to ensure you never overextend yourself.</p>
                <ul className="space-y-4">
                  {['Personalized energy optimization', 'Smart rest day recommendations', 'Jet lag recovery tracking', 'Activity intensity balancing'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-green-400 mb-2">72</div>
                  <div className="text-lg text-blue-200">Your Fatigue Index</div>
                </div>
                <div className="h-4 bg-white/20 rounded-full overflow-hidden mb-6">
                  <div className="h-full w-[72%] bg-gradient-to-r from-green-400 to-yellow-400 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><div className="text-2xl font-bold text-blue-200">6h</div><div className="text-sm text-blue-300">Sleep Last Night</div></div>
                  <div><div className="text-2xl font-bold text-blue-200">+2h</div><div className="text-sm text-blue-300">Time Zone Shift</div></div>
                  <div><div className="text-2xl font-bold text-blue-200">3</div><div className="text-sm text-blue-300">Active Days</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How JarvisTravel Works</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Tell Us Your Dreams', desc: 'Share your travel preferences and budget' },
                { step: '2', title: 'Get AI Recommendations', desc: 'Receive personalized itinerary suggestions' },
                { step: '3', title: 'Book Everything', desc: 'Secure flights, hotels, and activities in one place' },
                { step: '4', title: 'Travel & Explore', desc: 'Enjoy your trip with Jarvis as your guide' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4 shadow-lg">{item.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  {index < 3 && <ChevronRight className="w-6 h-6 text-blue-400 mx-auto mt-4 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">What Beta Users Say</h2>
            <p className="text-xl text-gray-600 text-center mb-12">Early access users are already loving JarvisTravel</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-4">Be the First to Experience JarvisTravel</h2>
            <p className="text-xl mb-8">Join our waitlist and get early access when we launch</p>
            <button onClick={() => navigate('waitlist')} className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl">
              Join the Waitlist
            </button>
          </div>
        </section>
      </div>
    );
  };

  export default HomePage;