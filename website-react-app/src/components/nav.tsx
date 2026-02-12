import { MapPin, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavProps {
  isScrolled: boolean;
  currentPage: string;
  navigate: (page: string) => void;
  navLinks: { name: string; page: string }[];
}

export const Nav = ({ currentPage, navigate, navLinks }: Omit<NavProps, 'isScrolled'>) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

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
  };

export default Nav;