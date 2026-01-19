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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#1e3a5f] text-white py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+17135550123" className="flex items-center gap-1 hover:text-[#c9a227] transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">(713) 555-0123</span>
            </a>
            <a href="mailto:elisa@example.com" className="flex items-center gap-1 hover:text-[#c9a227] transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">elisa@example.com</span>
            </a>
          </div>
          <span className="text-xs text-gray-300">REALTOR® | Houston, TX</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#1e3a5f]">Elisa Rocha</span>
              <span className="text-xs text-[#c9a227] tracking-wider">LUXURY REAL ESTATE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#c9a227] font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          <div className="lg:hidden pb-4 border-t">
            <div className="flex flex-col gap-2 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#c9a227] rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mx-4 mt-2 btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
