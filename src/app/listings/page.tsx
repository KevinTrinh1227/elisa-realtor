'use client';

import { useState, useEffect } from 'react';
import { Home, Filter } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { getListings } from '@/lib/supabase';
import type { Listing } from '@/lib/types';

type StatusFilter = 'all' | 'active' | 'sold' | 'leased';

export default function ListingsPage() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const data = await getListings();
      setAllListings(data);
      setLoading(false);
    }

    fetchListings();
  }, []);

  // Filter listings based on selected filter
  const filteredListings = filter === 'all'
    ? allListings
    : allListings.filter((l) => l.status === filter);

  const filterButtons: { label: string; value: StatusFilter }[] = [
    { label: 'All Properties', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Sold', value: 'sold' },
    { label: 'Leased', value: 'leased' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white py-16">
        <div className="container">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Property Listings</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Browse my current listings, recently sold properties, and leased homes.
            Each property represents a family helped and a dream realized.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-[73px] z-40">
        <div className="container py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 shrink-0" />
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === btn.value
                    ? 'bg-[#1e3a5f] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredListings.length > 0 ? (
            <>
              <p className="text-gray-500 mb-6">
                Showing {filteredListings.length} {filter === 'all' ? 'properties' : `${filter} properties`}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Home className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Listings Found</h2>
              <p className="text-gray-500">
                {filter !== 'all'
                  ? `No ${filter} properties at the moment. Check back soon!`
                  : 'Properties will be added soon. Check back later!'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
