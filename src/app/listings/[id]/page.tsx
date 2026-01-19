import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  Calendar,
  MapPin,
  Home,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { getListing, getListings } from '@/lib/supabase';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import ListingCard from '@/components/ListingCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    return { title: 'Listing Not Found' };
  }

  return {
    title: listing.address,
    description: `${listing.bedrooms} bed, ${listing.bathrooms} bath home in ${listing.city}, TX. ${listing.sqft?.toLocaleString()} sqft. ${formatCurrency(listing.price)}`,
  };
}

export const revalidate = 3600;

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    notFound();
  }

  const similarListings = await getListings(listing.status, 3);
  const filteredSimilar = similarListings.filter((l) => l.id !== listing.id).slice(0, 3);
  const statusColor = getStatusColor(listing.status);

  const details = [
    { icon: Bed, label: 'Bedrooms', value: listing.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: listing.bathrooms },
    { icon: Square, label: 'Square Feet', value: listing.sqft?.toLocaleString() },
    { icon: Calendar, label: 'Year Built', value: listing.year_built },
    { icon: Home, label: 'Property Type', value: listing.property_type },
    { icon: Tag, label: 'Lot Size', value: listing.lot_size },
  ];

  return (
    <>
      {/* Back Button */}
      <div className="container py-4">
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1e3a5f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>
      </div>

      {/* Main Content */}
      <section className="container pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gray-100">
              {listing.images && listing.images.length > 0 ? (
                <Image
                  src={listing.images[0]}
                  alt={listing.address}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Home className="w-16 h-16 text-gray-300" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {listing.images.slice(1, 5).map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image src={img} alt={`${listing.address} - ${idx + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {listing.description && (
              <div>
                <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">About This Property</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{listing.description}</p>
              </div>
            )}

            {/* Features */}
            {listing.features && listing.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listing.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-[#c9a227]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-[#1e3a5f]">
                  {listing.status === 'sold' && listing.sold_price
                    ? formatCurrency(listing.sold_price)
                    : formatCurrency(listing.price)}
                </p>
                {listing.status === 'sold' && listing.sold_date && (
                  <p className="text-sm text-gray-500 mt-1">Sold on {formatDate(listing.sold_date)}</p>
                )}
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 mb-6 pb-6 border-b">
                <MapPin className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1e3a5f]">{listing.address}</p>
                  <p className="text-gray-500">
                    {listing.city}, {listing.state} {listing.zip}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
                {details.map(
                  (detail, idx) =>
                    detail.value && (
                      <div key={idx} className="flex items-center gap-2">
                        <detail.icon className="w-4 h-4 text-[#c9a227]" />
                        <div>
                          <p className="text-xs text-gray-500">{detail.label}</p>
                          <p className="font-medium text-[#1e3a5f]">{detail.value}</p>
                        </div>
                      </div>
                    )
                )}
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Link href="/contact" className="btn-primary w-full text-center block">
                  Schedule a Viewing
                </Link>
                {listing.har_url && (
                  <a
                    href={listing.har_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#c9a227] transition-colors text-sm"
                  >
                    View on HAR.com
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Listings */}
      {filteredSimilar.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="section-title mb-8">Similar Properties</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSimilar.map((similar) => (
                <ListingCard key={similar.id} listing={similar} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
