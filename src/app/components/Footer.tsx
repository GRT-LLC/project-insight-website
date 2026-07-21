import { Link } from 'react-router-dom';

const FOOTER_LINKS: Record<
  'Product' | 'Company' | 'Legal',
  { name: string; path: string }[]
> = {
  Product: [
    { name: 'Features', path: '/features' }    
  ],
  Company: [
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/about' },
    { name: 'Press', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/privacy' },
    { name: 'Data Security', path: '/data-security' }
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-xl font-bold">JarvisTravel</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your AI-powered travel companion. Plan smarter, travel better, and create unforgettable
              memories with personalized recommendations.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 JarvisTravel. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Made with ❤️ for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
