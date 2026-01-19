import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/lib/utils';
import type { Listing } from '@/lib/types';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const statusColor = getStatusColor(listing.status);
  const imageUrl = listing.images?.[0] || '/images/placeholder-home.jpg';

  return (
    <Link href={`/listings/${listing.id}`} className="block">
      <article className="card overflow-hidden hover:transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 sm:h-56">
          <Image
            src={imageUrl}
            alt={listing.address}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
            </span>
          </div>
          {/* Price */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-xl font-bold">
              {listing.status === 'sold' && listing.sold_price
                ? formatCurrency(listing.sold_price)
                : formatCurrency(listing.price)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Address */}
          <div className="flex items-start gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#c9a227] mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-[#1e3a5f] line-clamp-1">{listing.address}</h3>
              <p className="text-sm text-gray-500">
                {listing.city}, {listing.state} {listing.zip}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
            {listing.bedrooms !== null && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{listing.bedrooms} bed</span>
              </div>
            )}
            {listing.bathrooms !== null && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{listing.bathrooms} bath</span>
              </div>
            )}
            {listing.sqft !== null && (
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span>{listing.sqft.toLocaleString()} sqft</span>
              </div>
            )}
          </div>

          {/* Property type */}
          {listing.property_type && (
            <p className="text-xs text-gray-400 mt-2">{listing.property_type}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
