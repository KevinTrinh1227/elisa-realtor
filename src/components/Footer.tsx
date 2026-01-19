import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Listings', href: '/listings' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Contact', href: '/contact' },
];

const listingLinks = [
  { name: 'Active Listings', href: '/listings?status=active' },
  { name: 'Sold Properties', href: '/listings?status=sold' },
  { name: 'Leased Properties', href: '/listings?status=leased' },
  { name: 'Neighborhoods', href: '/neighborhoods' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Elisa Rocha</h3>
            <p className="text-gray-300 text-sm mb-4">
              Dedicated to helping you find your perfect home in Houston&apos;s finest neighborhoods.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+17135550123" className="flex items-center gap-2 text-gray-300 hover:text-[#c9a227] transition-colors">
                <Phone className="w-4 h-4" />
                (713) 555-0123
              </a>
              <a href="mailto:elisa@example.com" className="flex items-center gap-2 text-gray-300 hover:text-[#c9a227] transition-colors">
                <Mail className="w-4 h-4" />
                elisa@example.com
              </a>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Houston, TX</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#c9a227] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Listings */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Properties</h4>
            <ul className="space-y-2">
              {listingLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#c9a227] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Let&apos;s Connect</h4>
            <p className="text-gray-300 text-sm mb-4">
              Ready to find your dream home or sell your property? I&apos;m here to help every step of the way.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} Elisa Rocha Real Estate. All rights reserved.</p>
          <p>
            Powered by{' '}
            <a
              href="https://visibleseed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a227] hover:underline"
            >
              VisibleSeed
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
