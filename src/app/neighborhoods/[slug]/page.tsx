import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Home, TrendingUp, MapPin, ExternalLink } from 'lucide-react';
import { getNeighborhood, getListings } from '@/lib/supabase';
import { formatCurrency } from '@/lib/utils';
import ListingCard from '@/components/ListingCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = await getNeighborhood(slug);

  if (!neighborhood) {
    return { title: 'Neighborhood Not Found' };
  }

  return {
    title: neighborhood.name,
    description: neighborhood.description || `Explore homes in ${neighborhood.name}, Houston.`,
  };
}

export const revalidate = 3600;

export default async function NeighborhoodDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const neighborhood = await getNeighborhood(slug);

  if (!neighborhood) {
    notFound();
  }

  // Get listings in this neighborhood (simplified - in production you'd filter by neighborhood)
  const allListings = await getListings('active', 6);

  return (
    <>
      {/* Back Button */}
      <div className="container py-4">
        <Link
          href="/neighborhoods"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Neighborhoods
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="aspect-[3/1] relative">
          <Image
            src={neighborhood.image_url || '/images/placeholder-neighborhood.jpg'}
            alt={neighborhood.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{neighborhood.name}</h1>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-5 h-5" />
                <span>Houston, Texas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8">
            {neighborhood.avg_price !== null && (
              <div className="text-center">
                <div className="flex items-center gap-2 text-[#c9a227] mb-1">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Avg. Price</span>
                </div>
                <p className="text-2xl font-bold text-[#1e3a5f]">
                  {formatCurrency(neighborhood.avg_price)}
                </p>
              </div>
            )}
            {neighborhood.total_listings !== null && (
              <div className="text-center">
                <div className="flex items-center gap-2 text-[#c9a227] mb-1">
                  <Home className="w-5 h-5" />
                  <span className="text-sm font-medium">Active Listings</span>
                </div>
                <p className="text-2xl font-bold text-[#1e3a5f]">{neighborhood.total_listings}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Description */}
            {neighborhood.description && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-4">
                  About {neighborhood.name}
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {neighborhood.description}
                </p>
              </div>
            )}

            {/* Highlights */}
            {neighborhood.highlights && neighborhood.highlights.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-4">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {neighborhood.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#c9a227]" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HAR Link */}
            {neighborhood.har_url && (
              <a
                href={neighborhood.har_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#c9a227] hover:underline"
              >
                View on HAR.com
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Listings in Area */}
      {allListings.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a5f]">Available Properties</h2>
              <Link href="/listings" className="text-[#c9a227] hover:underline font-medium">
                View All Listings
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allListings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in {neighborhood.name}?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let me help you find the perfect home in this wonderful community.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule a Tour
          </Link>
        </div>
      </section>
    </>
  );
}
