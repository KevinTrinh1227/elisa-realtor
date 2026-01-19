import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Home, Award, Clock, MapPin } from 'lucide-react';
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
      value: profile?.years_experience || '15+',
      label: 'Years Experience',
    },
    {
      icon: Home,
      value: profile?.total_sales || soldCount || '287+',
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
      {/* Hero Section - Black with gold accents */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23c9a227" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="container relative py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Houston&apos;s Trusted Realtor</span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Find Your Perfect Home in{' '}
                <span className="text-[#c9a227]">Houston</span>
              </h1>
              <div className="w-16 h-1 bg-[#c9a227] mb-6" />
              <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                With over {profile?.years_experience || '15'} years of experience in Houston real estate,
                I&apos;m dedicated to helping you find the home of your dreams with personalized service and expert guidance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/listings" className="btn-primary">
                  View Listings
                </Link>
                <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-[#0a0a0a]">
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full max-w-md mx-auto">
                {/* Gold accent frame */}
                <div className="absolute -inset-4 border border-[#c9a227]/30" />
                <div className="absolute -inset-8 border border-[#c9a227]/10" />
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={profile?.photo_url || '/images/elisa-portrait.jpg'}
                    alt={profile?.name || 'Elisa Rocha'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 bg-[#c9a227] text-[#0a0a0a] p-6">
                  <p className="text-3xl font-bold">{profile?.total_sales || '287'}+</p>
                  <p className="text-sm font-medium">Homes Sold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 border border-[#c9a227] flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#c9a227]" />
                </div>
                <p className="text-3xl font-bold text-[#0a0a0a]">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 lg:py-28 bg-[#faf9f6]">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="section-label">Featured Properties</span>
              <h2 className="section-title">Exclusive Listings</h2>
              <p className="text-gray-500 max-w-lg">Explore my latest listings and recent sales in Houston&apos;s most desirable neighborhoods.</p>
            </div>
            <Link
              href="/listings"
              className="flex items-center gap-2 text-[#0a0a0a] font-semibold hover:text-[#c9a227] transition-colors group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {listings.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-100">
              <Home className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Listings coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                  alt="Luxury home interior"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Gold accent */}
              <div className="absolute top-8 -right-8 w-full h-full border border-[#c9a227]/30 -z-10" />
            </div>
            <div>
              <span className="section-label">About Me</span>
              <h2 className="section-title">Your Trusted Partner in Houston Real Estate</h2>
              <div className="w-16 h-1 bg-[#c9a227] mb-6" />
              <p className="text-gray-600 mb-6 leading-relaxed">
                As a Houston native with 15 years of prior experience in business management,
                I bring a unique perspective to real estate. My expertise in marketing, finance,
                and client relations ensures a stress-free home buying or selling experience.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I have a particular passion for assisting veterans and first-time homebuyers,
                and I&apos;m dedicated to making every transaction as smooth as possible. Whether
                you&apos;re buying your first home or selling a luxury estate, I&apos;m here to guide
                you every step of the way.
              </p>
              <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a] text-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="section-label">Client Reviews</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">What My Clients Say</h2>
            <div className="w-16 h-1 bg-[#c9a227] mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don&apos;t just take my word for it — hear from the families I&apos;ve helped find their perfect homes.
            </p>
          </div>

          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#1a1a1a] mb-12">
              <Star className="w-12 h-12 mx-auto text-gray-700 mb-4" />
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

      {/* Neighborhoods */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="section-label">Service Areas</span>
            <h2 className="section-title">Houston&apos;s Finest Neighborhoods</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From River Oaks to The Heights, I specialize in Houston&apos;s most desirable neighborhoods.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['River Oaks', 'Bellaire', 'West University', 'Memorial', 'The Heights', 'Midtown', 'Montrose', 'Tanglewood'].map((area) => (
              <span
                key={area}
                className="px-6 py-3 border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#c9a227] hover:text-[#c9a227] transition-colors cursor-pointer"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="text-center">
            <Link href="/neighborhoods" className="btn-outline inline-flex items-center gap-2">
              Explore All Neighborhoods
              <MapPin className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-[#c9a227] to-[#d4b84a]">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0a0a0a] mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-[#0a0a0a]/80 mb-8 max-w-2xl mx-auto text-lg">
            Whether you&apos;re buying, selling, or just exploring your options, I&apos;m here to help.
            Let&apos;s start a conversation about your real estate goals.
          </p>
          <Link href="/contact" className="btn-secondary text-lg px-10 py-4">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
