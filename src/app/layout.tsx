import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Elisa Rocha | Houston Real Estate Agent',
    template: '%s | Elisa Rocha Real Estate',
  },
  description: 'Elisa Rocha is a dedicated Houston real estate agent specializing in luxury homes and helping clients find their perfect property.',
  keywords: ['Houston real estate', 'real estate agent', 'homes for sale', 'Houston homes', 'luxury real estate', 'Elisa Rocha'],
  authors: [{ name: 'Elisa Rocha' }],
  openGraph: {
    title: 'Elisa Rocha | Houston Real Estate Agent',
    description: 'Dedicated Houston real estate professional helping you find your perfect home.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Elisa Rocha Real Estate',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
