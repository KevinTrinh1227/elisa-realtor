import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

// TikTok icon component
const TikTok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

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
    <footer className="bg-[#0a0a0a] text-white">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Elisa Rocha</h3>
              <p className="text-[#c9a227] text-sm tracking-[0.2em] uppercase mt-1">Luxury Real Estate</p>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Dedicated to helping you find your perfect home in Houston&apos;s finest neighborhoods with personalized service and expertise.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+18327971410" className="flex items-center gap-3 text-gray-300 hover:text-[#c9a227] transition-colors group">
                <span className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] group-hover:bg-[#c9a227] transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                (832) 797-1410
              </a>
              <a href="mailto:contact@elisarocha.com" className="flex items-center gap-3 text-gray-300 hover:text-[#c9a227] transition-colors group">
                <span className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] group-hover:bg-[#c9a227] transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                contact@elisarocha.com
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <span className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a]">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>Houston, Texas</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-[0.15em] uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#c9a227] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-[0.15em] uppercase mb-6">Properties</h4>
            <ul className="space-y-3">
              {listingLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#c9a227] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-[0.15em] uppercase mb-6">Connect</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Ready to find your dream home? Let&apos;s start the conversation.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/ElisaRocsRealEstate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-gray-400 hover:bg-[#c9a227] hover:text-[#0a0a0a] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/elisarocha.realtor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-gray-400 hover:bg-[#c9a227] hover:text-[#0a0a0a] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/elisarocha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-gray-400 hover:bg-[#c9a227] hover:text-[#0a0a0a] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@elisarocha.realtor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-gray-400 hover:bg-[#c9a227] hover:text-[#0a0a0a] transition-all"
                aria-label="TikTok"
              >
                <TikTok className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* TREC Notice Section */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-500">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <a
                href="https://www.trec.texas.gov/forms/consumer-protection-notice"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c9a227] transition-colors underline underline-offset-2"
              >
                Texas Real Estate Commission Consumer Protection Notice
              </a>
              <a
                href="https://www.trec.texas.gov/forms/information-about-brokerage-services"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#c9a227] transition-colors underline underline-offset-2"
              >
                TREC Information About Brokerage Services
              </a>
            </div>
            <p className="text-gray-600">
              Licensed by TREC
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-[#050505]">
        <div className="container py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p className="text-gray-500">
              &copy; {currentYear} Elisa Rocha Real Estate. All rights reserved.
            </p>
            <p className="text-gray-600">
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
      </div>
    </footer>
  );
}
