import { Star } from 'lucide-react';
import { formatDate, truncateText } from '@/lib/utils';
import type { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
  showFull?: boolean;
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
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <article className="card p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-[#1e3a5f]">
            {review.reviewer_name || 'Anonymous'}
          </h3>
          {review.transaction_type && (
            <p className="text-sm text-gray-500">{review.transaction_type}</p>
          )}
        </div>
        <div className="text-right">
          {renderStars(review.rating)}
          {review.review_date && (
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(review.review_date)}
            </p>
          )}
        </div>
      </div>

      {/* Review text */}
      <p className="text-gray-600 leading-relaxed">
        {showFull
          ? review.review_text
          : truncateText(review.review_text, 200)}
      </p>

      {/* Property address if available */}
      {review.property_address && (
        <p className="text-sm text-gray-400 mt-4 pt-4 border-t">
          Property: {review.property_address}
        </p>
      )}
    </article>
  );
}
