const { useState, useEffect, createContext, useContext } = React;
const { MapPin, Check, ChevronDown, Menu, X, Star, Globe, Shield, Clock, CreditCard, Smartphone, ArrowRight, Users, Calendar, DollarSign, Plane, Hotel, Utensils, Camera, Heart, Zap, Mail, Phone, MessageCircle, Facebook, Twitter, Instagram, Linkedin, ChevronRight, Send, Sparkles, Bell, AlertCircle } = lucideReact;

// ============================================================================
// ROUTING CONTEXT (Standalone - no app integration)
// ============================================================================

const RouterContext = createContext();

function RouterProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return React.createElement(RouterContext.Provider, { value: { currentPage, navigate } }, children);
}

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================

function Navigation() {
  const { navigate, currentPage } = useContext(RouterContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', page: 'features' },
    { name: 'Pricing', page: 'pricing' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' }
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled || currentPage !== 'home' ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div onClick={() => navigate('home')} className="flex items-center cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className={`ml-3 text-xl font-bold ${
              isScrolled || currentPage !== 'home' ? 'text-gray-900' : 'text-white'
            }`}>JarvisTravel</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`font-medium transition-colors ${
                  currentPage === link.page ? 'text-blue-600'
                    : isScrolled || currentPage !== 'home' ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >{link.name}</button>
            ))}
            <button
              onClick={() => navigate('waitlist')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >Join Waitlist</button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled || currentPage !== 'home' ? 'text-gray-900' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-4 mb-4">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => { navigate(link.page); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors ${
                  currentPage === link.page ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >{link.name}</button>
            ))}
            <button
              onClick={() => { navigate('waitlist'); setIsMobileMenuOpen(false); }}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium"
            >Join Waitlist</button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

function Footer() {
  const { navigate } = useContext(RouterContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      setSubscribed(true);
      setEmail('');
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
            <p className="text-gray-300 mb-6">Get travel tips, product updates, and early access to new features</p>
            {subscribed ? (
              <div className="flex items-center justify-center text-green-400">
                <Check className="w-5 h-5 mr-2" />
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold">JarvisTravel</span>
            </div>
            <p className="text-gray-400">Your personal AI travel assistant. Plan, book, and experience unforgettable journeys.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => navigate('features')} className="hover:text-white transition-colors">Features</button></li>
              <li><button onClick={() => navigate('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-white transition-colors">About</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => navigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => navigate('terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={() => navigate('data')} className="hover:text-white transition-colors">Data Security</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JarvisTravel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// HOME PAGE
// ============================================================================

function HomePage() {
  const { navigate } = useContext(RouterContext);
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
}

// ============================================================================
// FEATURES PAGE
// ============================================================================

function FeaturesPage() {
  const { navigate } = useContext(RouterContext);

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

// ============================================================================
// PRICING PAGE
// ============================================================================

function PricingPage() {
  const { navigate } = useContext(RouterContext);
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

// ============================================================================
// ABOUT PAGE
// ============================================================================

function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About JarvisTravel</h1>
          <p className="text-xl text-gray-600">We're on a mission to make travel planning effortless and enjoyable for everyone</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">JarvisTravel was born from a simple frustration: planning trips shouldn't be stressful. Our founders, avid travelers themselves, spent countless hours juggling spreadsheets, bookmark folders, and messaging apps trying to coordinate trips with friends and family.</p>
            <p className="text-gray-600 mb-6">In 2023, we set out to build the travel companion we wished existed - an intelligent assistant that could handle everything from inspiration to booking to on-trip guidance. Using cutting-edge AI technology, we created Jarvis: your personal travel assistant.</p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Our Mission</h2>
            <p className="text-gray-600 mb-6">To democratize luxury travel planning by making personalized, intelligent travel assistance accessible to everyone, regardless of budget or experience level.</p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Simplicity', desc: 'Travel planning should be effortless', icon: Zap },
                { title: 'Intelligence', desc: 'AI that truly understands your needs', icon: Sparkles },
                { title: 'Privacy', desc: 'Your data is yours and yours alone', icon: Shield },
                { title: 'Accessibility', desc: 'Great travel experiences for everyone', icon: Globe }
              ].map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <value.icon className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Team</h2>
            <p className="text-gray-600 mb-6">We're a diverse team of travelers, engineers, designers, and dreamers united by our passion for exploration. Based across multiple time zones, we understand the challenges of travel firsthand.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// CONTACT PAGE
// ============================================================================

function ContactPage() {
  const { navigate } = useContext(RouterContext);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submission:', formData);
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">Have questions? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="waitlist">Waitlist Questions</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" required />
                  </div>
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">Send Message</button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4"><Mail className="w-6 h-6 text-blue-600" /></div>
                    <div><div className="font-medium text-gray-900">Email</div><a href="mailto:hello@jarvistravel.com" className="text-blue-600 hover:text-blue-800">hello@jarvistravel.com</a></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4"><Twitter className="w-6 h-6 text-blue-600" /></div>
                    <div><div className="font-medium text-gray-900">Twitter</div><a href="https://twitter.com/jarvistravel" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">@jarvistravel</a></div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h4 className="font-semibold text-gray-900 mb-4">Looking for Support?</h4>
                <p className="text-gray-600 mb-4">Check out our FAQ section for quick answers to common questions.</p>
                <button onClick={() => navigate('pricing')} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">Visit FAQ<ArrowRight className="w-4 h-4 ml-1" /></button>
              </div>

              <div className="bg-gray-900 text-white rounded-2xl p-8">
                <h4 className="font-semibold mb-4">For Press & Media</h4>
                <p className="text-gray-300 mb-4">For press inquiries, interviews, or media resources, please contact our media team.</p>
                <a href="mailto:press@jarvistravel.com" className="text-blue-400 hover:text-blue-300 font-medium">press@jarvistravel.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// WAITLIST PAGE
// ============================================================================

function WaitlistPage() {
  const { navigate } = useContext(RouterContext);
  const [formData, setFormData] = useState({ email: '', name: '', travelFrequency: '', interests: [] });
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState(null);

  const travelInterests = ['Adventure Travel', 'Beach & Relaxation', 'Cultural Experiences', 'Food & Culinary', 'Business Travel', 'Family Vacations', 'Solo Travel', 'Luxury Travel'];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Waitlist signup:', formData);
    setPosition(Math.floor(Math.random() * 5000) + 1000);
    setSubmitted(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {submitted ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">You're on the List!</h1>
            <p className="text-xl text-gray-600 mb-8">Thanks for joining the JarvisTravel waitlist, {formData.name}!</p>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="text-6xl font-bold mb-2">#{position.toLocaleString()}</div>
              <div className="text-blue-100">Your position in line</div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5"><span className="text-sm font-bold text-blue-600">1</span></div><span className="text-gray-600">We'll send you a confirmation email shortly</span></li>
                <li className="flex items-start"><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5"><span className="text-sm font-bold text-blue-600">2</span></div><span className="text-gray-600">You'll receive early access when we launch</span></li>
                <li className="flex items-start"><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5"><span className="text-sm font-bold text-blue-600">3</span></div><span className="text-gray-600">Get 30% off your first year as a waitlist member</span></li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('home')} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">Back to Home</button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"><Twitter className="w-5 h-5 mr-2" />Share on Twitter</button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="sticky top-24">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <span className="ml-3 text-2xl font-bold text-gray-900">JarvisTravel</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Join the Waitlist</h1>
                <p className="text-gray-600 mb-8">Be among the first to experience AI-powered travel planning when we launch.</p>

                <div className="space-y-4">
                  {[
                    { icon: Sparkles, text: 'Early access to all features' },
                    { icon: DollarSign, text: '30% off your first year' },
                    { icon: Bell, text: 'Exclusive updates & tips' },
                    { icon: Users, text: 'Join 10,000+ travelers' }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <benefit.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">How often do you travel?</label>
                    <select value={formData.travelFrequency} onChange={(e) => setFormData({...formData, travelFrequency: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select frequency</option>
                      <option value="rarely">Rarely (1-2 times/year)</option>
                      <option value="occasionally">Occasionally (3-5 times/year)</option>
                      <option value="frequently">Frequently (6-10 times/year)</option>
                      <option value="very-frequently">Very Frequently (11+ times/year)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">What types of travel interest you? (Select all that apply)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {travelInterests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.interests.includes(interest) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >{interest}</button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">Join the Waitlist</button>

                  <p className="text-center text-sm text-gray-500">
                    By joining, you agree to our{' '}
                    <button type="button" onClick={() => navigate('privacy')} className="text-blue-600 hover:text-blue-800">Privacy Policy</button>
                    {' '}and{' '}
                    <button type="button" onClick={() => navigate('terms')} className="text-blue-600 hover:text-blue-800">Terms of Service</button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// PRIVACY PAGE
// ============================================================================

function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-6">We collect information you provide directly to us, including name, email address, travel preferences, and payment information when you subscribe to our services.</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li>• Provide, maintain, and improve our services</li>
              <li>• Process transactions and send related information</li>
              <li>• Send promotional communications (with your consent)</li>
              <li>• Respond to your comments, questions, and requests</li>
              <li>• Monitor and analyze trends, usage, and activities</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Data Security</h2>
            <p className="text-gray-600 mb-6">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Your Rights</h2>
            <p className="text-gray-600 mb-6">You have the right to access, correct, or delete your personal information. You can also object to processing and request data portability where applicable.</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact Us</h2>
            <p className="text-gray-600 mb-6">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@jarvistravel.com" className="text-blue-600 hover:text-blue-800">privacy@jarvistravel.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// TERMS PAGE
// ============================================================================

function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">By accessing or using JarvisTravel, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Use License</h2>
            <p className="text-gray-600 mb-6">We grant you a limited, non-exclusive, non-transferable license to use our services for personal, non-commercial purposes subject to these terms.</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">User Accounts</h2>
            <p className="text-gray-600 mb-6">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Prohibited Uses</h2>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li>• Violating any applicable laws or regulations</li>
              <li>• Interfering with or disrupting the services</li>
              <li>• Attempting to gain unauthorized access</li>
              <li>• Using the service for fraudulent purposes</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">JarvisTravel shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Contact</h2>
            <p className="text-gray-600 mb-6">Questions about the Terms of Service should be sent to <a href="mailto:legal@jarvistravel.com" className="text-blue-600 hover:text-blue-800">legal@jarvistravel.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// DATA SECURITY PAGE
// ============================================================================

function DataPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Data, Your Control</h1>
          <p className="text-xl text-gray-600">We take your privacy and data security seriously</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security</h2>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <ul className="space-y-4">
                  {[
                    { title: '256-bit Encryption', desc: 'All data is encrypted both in transit and at rest using bank-level encryption standards' },
                    { title: 'PCI DSS Compliant', desc: 'Our payment processing meets the highest industry security standards' },
                    { title: 'Regular Security Audits', desc: 'Third-party security experts regularly audit our systems' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                      <div><h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3><p className="text-gray-600">{item.desc}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Privacy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What We Collect</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Account information</li>
                    <li>• Travel preferences</li>
                    <li>• Trip history</li>
                    <li>• Payment information (encrypted)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What We Don't Do</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Sell your data to third parties</li>
                    <li>• Share data without consent</li>
                    <li>• Store unencrypted payment details</li>
                    <li>• Track you across other sites</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights</h2>
              <div className="bg-blue-50 rounded-xl p-8">
                <p className="text-gray-700 mb-4">You have complete control over your data:</p>
                <ul className="space-y-3">
                  {['Request a copy of all your data', 'Delete your account and all associated data', 'Opt-out of marketing communications', 'Update your information at any time'].map((right, index) => (
                    <li key={index} className="flex items-center"><ArrowRight className="w-5 h-5 text-blue-600 mr-3" /><span className="text-gray-700">{right}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

function AppContent() {
  const { currentPage } = useContext(RouterContext);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'features' && <FeaturesPage />}
      {currentPage === 'pricing' && <PricingPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'waitlist' && <WaitlistPage />}
      {currentPage === 'privacy' && <PrivacyPage />}
      {currentPage === 'terms' && <TermsPage />}
      {currentPage === 'data' && <DataPage />}
      
      {currentPage !== 'waitlist' && <Footer />}
    </div>
  );
}

// ============================================================================
// RENDER
// ============================================================================

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
