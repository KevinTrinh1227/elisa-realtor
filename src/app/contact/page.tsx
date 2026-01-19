import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { getAgentProfile } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Elisa Rocha for all your Houston real estate needs.',
};

export const revalidate = 3600;

export default async function ContactPage() {
  const profile = await getAgentProfile();

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: profile?.phone || '(713) 555-0123',
      href: `tel:${profile?.phone || '+17135550123'}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || 'elisa@example.com',
      href: `mailto:${profile?.email || 'elisa@example.com'}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Houston, TX',
      href: null,
    },
    {
      icon: Clock,
      label: 'Availability',
      value: 'Mon-Sat, 9AM-7PM',
      href: null,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1e3a5f] text-white py-16">
        <div className="container">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Ready to start your real estate journey? I&apos;d love to hear from you. Fill out
            the form below or reach out directly.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">Send a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#c9a227]/10 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-[#c9a227]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#1e3a5f] font-medium hover:text-[#c9a227] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-[#1e3a5f] font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="card p-6 bg-[#1e3a5f] text-white">
                <h3 className="text-lg font-semibold mb-2">Quick Response Guarantee</h3>
                <p className="text-gray-300 text-sm">
                  I personally respond to every inquiry within 24 hours. Your real estate
                  questions and needs are my priority.
                </p>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">Common Questions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800">How do I get started?</p>
                    <p className="text-sm text-gray-600">
                      Simply fill out the contact form or give me a call. We&apos;ll schedule a
                      free consultation to discuss your needs.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Do you work with first-time buyers?</p>
                    <p className="text-sm text-gray-600">
                      I love working with first-time buyers and will guide you through every
                      step of the process.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">What areas do you serve?</p>
                    <p className="text-sm text-gray-600">
                      I serve the greater Houston area, including all major neighborhoods and
                      surrounding communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
