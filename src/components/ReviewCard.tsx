import Image from 'next/image';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { formatDate, truncateText } from '@/lib/utils';
import type { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
  showFull?: boolean;
}

function getInitials(name: string | null): string {
  if (!name) return '?';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
}

export default function ReviewCard({ review, showFull = false }: ReviewCardProps) {
  const renderStars = (rating: number | null) => {
    if (rating === null) return null;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-[#c9a227] fill-[#c9a227]'
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <article className="bg-white border border-gray-100 p-6 transition-all hover:border-[#c9a227] hover:shadow-lg group">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-[#c9a227] opacity-20 mb-4" />

      {/* Review text */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {showFull
          ? review.review_text
          : truncateText(review.review_text, 180)}
      </p>

      {/* Divider */}
      <div className="w-12 h-0.5 bg-[#c9a227] mb-6" />

      {/* Reviewer info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        {review.reviewer_photo_url ? (
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9a227]">
            <Image
              src={review.reviewer_photo_url}
              alt={review.reviewer_name || 'Reviewer'}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#c9a227] flex items-center justify-center text-[#0a0a0a] font-bold text-lg">
            {getInitials(review.reviewer_name)}
          </div>
        )}

        {/* Name and details */}
        <div className="flex-1">
          <h3 className="font-semibold text-[#0a0a0a]">
            {review.reviewer_name || 'Anonymous'}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {renderStars(review.rating)}
            {review.transaction_type && (
              <span className="text-xs text-gray-400 border-l border-gray-200 pl-2 ml-1">
                {review.transaction_type}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Property and HAR link */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        {review.property_address && (
          <p className="text-xs text-gray-400">
            {review.property_address}
          </p>
        )}
        {review.har_url && (
          <a
            href={review.har_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#c9a227] hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            View on HAR.com
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
}
