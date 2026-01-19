import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import NeighborhoodCard from '@/components/NeighborhoodCard';
import { getNeighborhoods } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Neighborhoods',
  description: 'Explore Houston neighborhoods where Elisa Rocha can help you find your perfect home.',
};

export const revalidate = 3600;

export default async function NeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white py-16">
        <div className="container">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Houston Neighborhoods</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Discover the diverse communities that make Houston special. Each neighborhood has its own
            unique character, amenities, and lifestyle.
          </p>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          {neighborhoods.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoods.map((neighborhood) => (
                <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Neighborhoods Coming Soon</h2>
              <p className="text-gray-500 mb-8">
                I&apos;m adding neighborhood guides to help you find the perfect community.
                In the meantime, feel free to ask me about any area!
              </p>
              <Link href="/contact" className="btn-primary inline-block">
                Ask About a Neighborhood
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-6">Finding Your Perfect Neighborhood</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Choosing the right neighborhood is just as important as choosing the right home.
              I can help you understand the nuances of each Houston community—from school
              districts and commute times to local amenities and future development plans.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-[#1e3a5f] mb-2">Schools</h3>
                <p className="text-sm text-gray-600">
                  Information on school districts, ratings, and educational opportunities.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-[#1e3a5f] mb-2">Lifestyle</h3>
                <p className="text-sm text-gray-600">
                  Parks, restaurants, shopping, and community events in each area.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-[#1e3a5f] mb-2">Market Trends</h3>
                <p className="text-sm text-gray-600">
                  Current prices, appreciation rates, and investment potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let me help you find the neighborhood that fits your lifestyle, budget, and needs.
          </p>
          <Link href="/contact" className="btn-primary">
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </>
  );
}
