import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Home, Award, Clock } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import ReviewCard from '@/components/ReviewCard';
import { getAgentProfile, getListings, getReviews } from '@/lib/supabase';
import { calculateAverageRating } from '@/lib/utils';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const [profile, listings, reviews] = await Promise.all([
    getAgentProfile(),
    getListings(undefined, 6),
    getReviews(3),
  ]);

  const avgRating = calculateAverageRating(reviews.map((r) => r.rating));
  const soldCount = listings.filter((l) => l.status === 'sold').length;

  const stats = [
    {
      icon: Clock,
      value: profile?.years_experience || '10+',
      label: 'Years Experience',
    },
    {
      icon: Home,
      value: profile?.total_sales || soldCount || '200+',
      label: 'Homes Sold',
    },
    {
      icon: Star,
      value: avgRating > 0 ? avgRating.toFixed(1) : '5.0',
      label: 'Average Rating',
    },
    {
      icon: Award,
      value: 'Top 1%',
      label: 'Houston Agent',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#1e3a5f] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] to-[#1e3a5f]/80" />
        <div className="container relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] font-semibold mb-4 tracking-wider">HOUSTON&apos;S TRUSTED REALTOR</p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Find Your Perfect Home in Houston
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                With over {profile?.years_experience || '10'} years of experience in Houston real estate,
                I&apos;m dedicated to helping you find the home of your dreams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/listings" className="btn-primary">
                  View Listings
                </Link>
                <Link href="/contact" className="btn-secondary bg-white text-[#1e3a5f] hover:bg-gray-100">
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-[#c9a227] rounded-full opacity-20 blur-3xl" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/20">
                  <Image
                    src={profile?.photo_url || '/images/elisa-portrait.jpg'}
                    alt={profile?.name || 'Elisa Rocha'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#c9a227]" />
                <p className="text-3xl font-bold text-[#1e3a5f]">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="section-title">Featured Properties</h2>
              <p className="section-subtitle mb-0">Explore my latest listings and recent sales</p>
            </div>
            <Link
              href="/listings"
              className="flex items-center gap-2 text-[#c9a227] font-semibold hover:underline"
            >
              View All Listings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {listings.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <Home className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Listings coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src="/images/elisa-working.jpg"
                  alt="Elisa Rocha working with clients"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#c9a227] text-white p-6 rounded-lg shadow-lg hidden sm:block">
                <p className="text-3xl font-bold">{profile?.total_sales || '200'}+</p>
                <p className="text-sm">Happy Clients</p>
              </div>
            </div>
            <div>
              <p className="text-[#c9a227] font-semibold mb-4 tracking-wider">ABOUT ME</p>
              <h2 className="section-title">Your Trusted Partner in Houston Real Estate</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {profile?.bio ||
                  `As a dedicated Houston real estate professional, I bring passion, expertise, and
                  personalized service to every client relationship. Whether you're buying your first
                  home, selling your property, or looking for an investment opportunity, I'm here to
                  guide you every step of the way.`}
              </p>
              <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
                Learn More About Me
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#c9a227] font-semibold mb-4 tracking-wider">CLIENT REVIEWS</p>
            <h2 className="section-title">What My Clients Say</h2>
            <p className="section-subtitle">
              Don&apos;t just take my word for it - hear from the families I&apos;ve helped
            </p>
          </div>

          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg mb-8">
              <Star className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Reviews coming soon</p>
            </div>
          )}

          <div className="text-center">
            <Link href="/reviews" className="btn-primary inline-flex items-center gap-2">
              Read All Reviews
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#1e3a5f] text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re buying, selling, or just exploring your options, I&apos;m here to help.
            Let&apos;s start a conversation about your real estate goals.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            Schedule a Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
