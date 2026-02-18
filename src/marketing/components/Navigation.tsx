import { useEffect, useState } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { useMarketingRouter } from '../router/RouterContext';

const NAV_LINKS: { name: string; page: 'features' | 'pricing' | 'about' | 'contact' }[] = [
  { name: 'Features', page: 'features' },
  { name: 'Pricing', page: 'pricing' },
  { name: 'About', page: 'about' },
  { name: 'Contact', page: 'contact' },
];

export function Navigation() {
  const { navigate, currentPage, isAuthenticated, logout } = useMarketingRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightNav = currentPage === 'home' && !isScrolled;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || currentPage !== 'home'
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span
              className={`ml-3 text-xl font-bold tracking-tight ${
                isLightNav ? 'text-white' : 'text-gray-900'
              }`}
            >
              JarvisTravel
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => navigate(link.page)}
                className={`font-medium transition-all relative ${
                  currentPage === link.page
                    ? 'text-sky-500'
                    : isLightNav
                      ? 'text-white/90 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.name}
                {currentPage === link.page && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('app')}
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Open App
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className={`font-medium ${
                    isLightNav ? 'text-white/80' : 'text-gray-500'
                  }`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('signin')}
                  className={`font-medium px-4 py-2 rounded-full transition-all ${
                    isLightNav
                      ? 'text-white hover:bg-white/10'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigate('signup')}
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-sky-500/25 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={`md:hidden p-2 rounded-lg ${
              isLightNav ? 'text-white' : 'text-gray-900'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-4 mb-4 animate-in slide-in-from-top-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => {
                  navigate(link.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 rounded-xl font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  navigate('signin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate('signup');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-medium"
              >
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

