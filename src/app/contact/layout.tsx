// app/contact/layout.tsx
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact 48 Wall Street | NYC Corporate & Private Event Venue',
  description:
    'Contact 48 Wall Street, a historic corporate and private event venue in New York City’s Financial District. Call 1.877.885.0705 or email info@48WallNYC.com to inquire about corporate events, weddings, conferences, and holiday parties.',
  keywords: [
    'contact 48 Wall Street',
    'NYC corporate event venue',
    'New York corporate event space',
    'Financial District event venue',
    'Wall Street event space',
    'Lower Manhattan event venue',
    'NYC wedding venue',
    'NYC private event space',
    'event venue contact NYC',
    'book event 48 Wall Street',
  ],
  alternates: {
    canonical: 'https://www.48wallnyc.com/contact',
  },
  openGraph: {
    title: 'Contact 48 Wall Street | NYC Corporate & Private Event Venue',
    description:
      'Get in touch with 48 Wall Street, a historic corporate and private event venue in New York City’s Financial District. Call 1.877.885.0705 or email info@48WallNYC.com to plan your next event.',
    url: 'https://www.48wallnyc.com/contact',
    type: 'website',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street historic corporate and private event venue in Manhattan’s Financial District',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact 48 Wall Street | NYC Event Venue',
    description:
      'Plan your next corporate event, wedding, or private celebration at 48 Wall Street in NYC’s Financial District. Call 1.877.885.0705 or email info@48WallNYC.com.',
    images: ['/images/twitter-home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  category: 'Event Venue',
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'EventVenue',
      '@id': 'https://www.48wallnyc.com#eventvenue',
      name: '48 Wall Street',
      description:
        'Historic corporate and private event venue in New York City’s Financial District offering space for corporate events, weddings, conferences, fashion shows, and holiday parties.',
      url: 'https://www.48wallnyc.com',
      telephone: '+1-877-885-0705',
      email: 'info@48wallnyc.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '48 Wall St. Lobby 1',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10005',
        addressCountry: 'US',
      },
      sameAs: [
        'https://www.facebook.com/48wallst/',
        'https://www.instagram.com/48wallst/',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Contact 48 Wall Street',
      description:
        'Contact page for 48 Wall Street event venue in New York City’s Financial District. Reach our team to inquire about corporate events, weddings, conferences, and private celebrations.',
      url: 'https://www.48wallnyc.com/contact',
      isPartOf: {
        '@type': 'WebSite',
        name: '48 Wall Street NYC',
        url: 'https://www.48wallnyc.com',
      },
      about: {
        '@id': 'https://www.48wallnyc.com#eventvenue',
      },
      mainEntity: {
        '@type': 'Organization',
        name: '48 Wall Street',
        url: 'https://www.48wallnyc.com',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+1-877-885-0705',
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: ['en'],
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.48wallnyc.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: 'https://www.48wallnyc.com/contact',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I inquire about hosting an event at 48 Wall Street?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can submit the inquiry form on this page, call 1.877.885.0705, or email info@48WallNYC.com with your preferred date, estimated guest count, and event type, and our team will follow up with availability and next steps.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of events does 48 Wall Street host?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '48 Wall Street hosts corporate events, conferences, product launches, fashion shows, weddings, Bar and Bat Mitzvahs, non-profit galas, and holiday parties in its historic Financial District venue.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is 48 Wall Street located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '48 Wall Street is located at 48 Wall St. Lobby 1, New York, NY 10005, in the heart of Manhattan’s Financial District, steps from major subway lines and downtown landmarks.',
          },
        },
        {
          '@type': 'Question',
          name: 'How quickly will the events team respond to my inquiry?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most event inquiries receive a response within one business day. For urgent questions, you can call 1.877.885.0705 during business hours for faster assistance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I schedule a site tour of 48 Wall Street?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can request a site tour by using the contact form on this page, calling 1.877.885.0705, or emailing info@48WallNYC.com with your availability. Our team will coordinate a time to walk you through the venue.',
          },
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
