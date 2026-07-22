import { Link } from 'react-router-dom';

// Footer (JAR-432) - Ateneo ground per Meridian (the old bg-gray-900 was
// Neverything ink used as a web surface, which the brand bans). Every link
// resolves to a page that exists: Careers, Press and the duplicate Cookie
// Policy pointed nowhere and are gone until they have real destinations.
// Wordmark stands alone pending the commissioned mark (JAR-354).

const FOOTER_LINKS: Record<
  'Product' | 'Company' | 'Legal',
  { name: string; path: string }[]
> = {
  Product: [
    { name: 'How it works', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
  ],
  Company: [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Data Security', path: '/data-security' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-sky-600 text-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-xl font-bold">JarvisTravel</span>
            </div>
            <p className="text-sky-100 leading-relaxed max-w-sm">
              JarvisTravel plans the pace, the budget and the memories, so you
              can enjoy your vacation.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-gray-50">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sky-100 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/15 mt-12 pt-8">
          <p className="text-sky-200 text-sm">
            © 2026 JarvisTravel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
