import Link from 'next/link';
import Image from 'next/image';
import { Home, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { Neighborhood } from '@/lib/types';

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

export default function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  const imageUrl = neighborhood.image_url || '/images/placeholder-neighborhood.jpg';

  return (
    <Link href={`/neighborhoods/${neighborhood.slug}`} className="block">
      <article className="card overflow-hidden hover:transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-40">
          <Image
            src={imageUrl}
            alt={neighborhood.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white text-lg font-bold">{neighborhood.name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            {neighborhood.avg_price !== null && (
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-4 h-4 text-[#c9a227]" />
                <span>Avg: {formatCurrency(neighborhood.avg_price)}</span>
              </div>
            )}
            {neighborhood.total_listings !== null && (
              <div className="flex items-center gap-2 text-gray-600">
                <Home className="w-4 h-4 text-[#c9a227]" />
                <span>{neighborhood.total_listings} listings</span>
              </div>
            )}
          </div>

          {/* Highlights */}
          {neighborhood.highlights && neighborhood.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {neighborhood.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
