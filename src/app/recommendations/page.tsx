import type { Metadata } from 'next';
import Link from 'next/link';
import { Quote, User } from 'lucide-react';
import { getRecommendations } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Recommendations',
  description: 'Professional recommendations for Elisa Rocha from colleagues and clients.',
};

export const revalidate = 3600;

export default async function RecommendationsPage() {
  const recommendations = await getRecommendations();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white py-16">
        <div className="container">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Recommendations</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Professional endorsements and recommendations from colleagues, clients, and industry
            partners.
          </p>
        </div>
      </section>

      {/* Recommendations List */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          {recommendations.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-8">
              {recommendations.map((rec) => (
                <article key={rec.id} className="card p-8">
                  <Quote className="w-8 h-8 text-[#c9a227] mb-4" />
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                    &ldquo;{rec.recommendation_text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t">
                    <div className="w-12 h-12 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3a5f]">{rec.recommender_name}</p>
                      {rec.recommender_title && (
                        <p className="text-sm text-gray-500">{rec.recommender_title}</p>
                      )}
                      {rec.relationship && (
                        <p className="text-xs text-[#c9a227]">{rec.relationship}</p>
                      )}
                    </div>
                    {rec.recommendation_date && (
                      <p className="text-sm text-gray-400 ml-auto">
                        {formatDate(rec.recommendation_date)}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Quote className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Recommendations Yet</h2>
              <p className="text-gray-500 mb-8">
                Professional recommendations will be added soon.
              </p>
              <Link href="/reviews" className="btn-primary inline-block">
                View Client Reviews
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="section-title mb-4">Want to See More?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Check out my client reviews or get in touch to learn more about how I can help you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/reviews" className="btn-secondary">
              Read Client Reviews
            </Link>
            <Link href="/contact" className="btn-primary">
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
