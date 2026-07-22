import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const NAV_LINKS: { name: string; path: string }[] = [
  { name: 'How it works', path: '/features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightNav = location.pathname === '/' && !isScrolled;
  const currentPath = location.pathname;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || currentPath !== '/'
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Wordmark stands alone until the commissioned mark lands (JAR-354). */}
          <Link
            to="/"
            className={`text-xl font-bold tracking-tight ${
              isLightNav ? 'text-white' : 'text-gray-900'
            }`}
          >
            JarvisTravel
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all relative ${
                  currentPath === link.path
                    ? 'text-sky-500'
                    : isLightNav
                      ? 'text-white/90 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.name}
                {currentPath === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                )}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/app"
                  className="px-5 py-2.5 bg-amber-400 text-gray-900 rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Open App
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className={`font-medium ${
                    isLightNav ? 'text-white/80' : 'text-gray-500'
                  }`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-amber-400 text-gray-900 rounded-full font-medium hover:shadow-lg hover:shadow-amber-400/25 transition-all"
                >
                  Sign up
                </Link>
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
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-3 px-4 rounded-xl font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-amber-400 text-gray-900 rounded-xl font-medium block text-center"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
