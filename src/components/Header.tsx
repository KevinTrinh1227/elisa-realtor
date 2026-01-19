'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Listings', href: '/listings' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Neighborhoods', href: '/neighborhoods' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar - Black with gold accents */}
      <div className="bg-[#0a0a0a] text-white py-2.5 border-b border-gray-800">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+18327971410" className="flex items-center gap-2 text-gray-300 hover:text-[#c9a227] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs tracking-wide">(832) 797-1410</span>
            </a>
            <a href="mailto:contact@elisarocha.com" className="flex items-center gap-2 text-gray-300 hover:text-[#c9a227] transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs tracking-wide">contact@elisarocha.com</span>
            </a>
          </div>
          <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Houston, Texas</span>
        </div>
      </div>

      {/* Main navigation - White with black text */}
      <nav className="bg-white shadow-sm">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#0a0a0a] tracking-tight">Elisa Rocha</span>
                <span className="text-[10px] text-[#c9a227] tracking-[0.25em] uppercase font-medium">Luxury Real Estate</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-[#c9a227] font-medium transition-colors tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-4 btn-primary"
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-700 hover:text-[#c9a227] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-gray-100">
              <div className="flex flex-col pt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-gray-700 hover:text-[#c9a227] hover:bg-gray-50 font-medium transition-colors text-sm tracking-wide"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 pt-4">
                  <Link
                    href="/contact"
                    className="btn-primary w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
