import { useState } from 'react';
import { Mail, Check, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  navigate: (page: string) => void;
}

export const Footer = ({ navigate }: FooterProps) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
  
    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
};

export default Footer;