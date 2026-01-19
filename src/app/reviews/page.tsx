import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, Quote } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import { getReviews } from '@/lib/supabase';
import { calculateAverageRating } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'Read what clients say about working with Elisa Rocha for their real estate needs.',
};

export const revalidate = 3600;

export default async function ReviewsPage() {
  const reviews = await getReviews();
  const avgRating = calculateAverageRating(reviews.map((r) => r.rating));
  const totalReviews = reviews.length;

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white py-16">
        <div className="container">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Client Reviews</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Don&apos;t just take my word for it. Here&apos;s what my clients have to say about their
            experience working with me.
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Average Rating */}
            <div className="text-center md:text-left md:border-r md:pr-8">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <p className="text-5xl font-bold text-[#1e3a5f]">
                  {avgRating > 0 ? avgRating.toFixed(1) : '5.0'}
                </p>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(avgRating || 5)
                            ? 'text-[#c9a227] fill-[#c9a227]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingCounts.map(({ rating, count }) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-12">{rating} star</span>
                  <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#c9a227] rounded-full"
                      style={{
                        width: totalReviews > 0 ? `${(count / totalReviews) * 100}%` : '0%',
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showFull />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Quote className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Reviews Yet</h2>
              <p className="text-gray-500 mb-8">
                Reviews will be added soon. In the meantime, feel free to reach out!
              </p>
              <Link href="/contact" className="btn-primary inline-block">
                Get in Touch
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Have Your Own Success Story?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the hundreds of satisfied clients who&apos;ve found their perfect home with my help.
          </p>
          <Link href="/contact" className="btn-primary">
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </>
  );
}
