import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, TrendingUp, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { getAgentProfile } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Elisa Rocha, your dedicated Houston real estate professional.',
};

export const revalidate = 3600;

export default async function AboutPage() {
  const profile = await getAgentProfile();

  const highlights = [
    {
      icon: Award,
      title: 'Top Producer',
      description: 'Consistently recognized as a top-performing agent in the Houston market.',
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Dedicated to providing personalized service for every client, every time.',
    },
    {
      icon: TrendingUp,
      title: 'Market Expert',
      description: 'Deep knowledge of Houston neighborhoods, trends, and property values.',
    },
    {
      icon: Heart,
      title: 'Passionate',
      description: 'Genuinely passionate about helping families find their perfect home.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] font-semibold mb-4 tracking-wider">ABOUT ME</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Hi, I&apos;m {profile?.name || 'Elisa Rocha'}
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                {profile?.title || 'REALTOR®'} | Houston, TX
              </p>
              <p className="text-gray-300 leading-relaxed">
                With over {profile?.years_experience || '10'} years of experience in Houston real estate,
                I&apos;ve helped hundreds of families achieve their homeownership dreams. My commitment to
                exceptional service, market expertise, and genuine care for my clients sets me apart.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden max-w-md mx-auto">
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
      </section>

      {/* Bio Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-8">My Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="leading-relaxed mb-6">
                {profile?.bio ||
                  `Real estate isn't just my career—it's my passion. I believe that finding the right home
                  is one of life's most important decisions, and I'm honored to guide my clients through
                  that journey.`}
              </p>
              <p className="leading-relaxed mb-6">
                Born and raised in Houston, I have an intimate understanding of what makes our city's
                neighborhoods unique. From the historic charm of the Heights to the modern luxury of
                River Oaks, I know the ins and outs of every community.
              </p>
              <p className="leading-relaxed mb-6">
                My approach is simple: listen first, advise second. Every client has unique needs,
                timelines, and dreams. By truly understanding what you're looking for, I can help you
                find not just a house, but a home where memories will be made.
              </p>
              <p className="leading-relaxed">
                Whether you're a first-time buyer, looking to upgrade, or ready to sell, I'm here to
                make the process as smooth and stress-free as possible. Let's work together to achieve
                your real estate goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container">
          <h2 className="section-title text-center mb-12">Why Work With Me</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#c9a227]/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-[#c9a227]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-[#1e3a5f] text-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-[#c9a227]">
                {profile?.years_experience || '10'}+
              </p>
              <p className="text-gray-300 mt-2">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-[#c9a227]">
                {profile?.total_sales || '200'}+
              </p>
              <p className="text-gray-300 mt-2">Homes Sold</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-[#c9a227]">5.0</p>
              <p className="text-gray-300 mt-2">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-[#c9a227]">98%</p>
              <p className="text-gray-300 mt-2">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-title mb-8">Let&apos;s Connect</h2>
            <p className="text-gray-600 mb-8">
              Ready to start your real estate journey? I&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
              <a
                href={`tel:${profile?.phone || '+17135550123'}`}
                className="flex items-center justify-center gap-2 text-[#1e3a5f] hover:text-[#c9a227] transition-colors"
              >
                <Phone className="w-5 h-5" />
                {profile?.phone || '(713) 555-0123'}
              </a>
              <a
                href={`mailto:${profile?.email || 'elisa@example.com'}`}
                className="flex items-center justify-center gap-2 text-[#1e3a5f] hover:text-[#c9a227] transition-colors"
              >
                <Mail className="w-5 h-5" />
                {profile?.email || 'elisa@example.com'}
              </a>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                Houston, TX
              </div>
            </div>
            <Link href="/contact" className="btn-primary inline-block">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
