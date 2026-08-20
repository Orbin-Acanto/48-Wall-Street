// app/location/layout.tsx
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title:
    'Location & Directions | Financial District Event Venue | 48 Wall Street',
  description:
    'Visit 48 Wall Street, a premier historic downtown venue located in the heart of the Financial District. Easily accessible by subway and steps from major Lower Manhattan landmarks.',
  keywords: [
    '48 Wall Street location',
    'NYC event venue location',
    'Financial District event space',
    'Wall Street event venue',
    'Lower Manhattan corporate event venue',
    'NYC event venue directions',
    'parking near 48 Wall Street',
    'hotels near 48 Wall Street',
    'Manhattan event space map',
    'NYC corporate event space location',
  ],
  alternates: {
    canonical: 'https://www.48wallnyc.com/location',
  },
  openGraph: {
    title: 'Location & Venue Overview | 48 Wall Street NYC Event Space',
    description:
      'See where 48 Wall Street is located in Manhattan’s Financial District, review floor descriptions, and explore nearby parking, hotels, and transit options for your next event.',
    url: 'https://www.48wallnyc.com/location',
    type: 'website',
    siteName: '48 Wall Street NYC',
    locale: 'en_US',
    images: [
      {
        url: '/shared/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street historic event venue in Manhattan’s Financial District',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '48 Wall Street Location | NYC Event Venue in the Financial District',
    description:
      'Find 48 Wall Street in the heart of Manhattan’s Financial District. View venue floors, nearby parking, hotels, and transit options for your NYC event.',
    images: ['/shared/og/twitter-home.jpg'],
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

export default function LocationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'EventVenue',
      '@id': 'https://www.48wallnyc.com#eventvenue',
      name: '48 Wall Street',
      description:
        'Historic corporate and private event venue located in Manhattan’s Financial District, featuring multiple floors for corporate events, weddings, social celebrations, and fashion shows.',
      url: 'https://www.48wallnyc.com',
      telephone: '212.971.5353',
      email: 'info@48wallnyc.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '48 Wall St. Lobby 1',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10005',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.707421,
        longitude: -74.009224,
      },
      sameAs: [
        'https://www.facebook.com/48wallst/',
        'https://www.instagram.com/48wallst/',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Location & Venue Overview',
      description:
        'Location and access information for 48 Wall Street, including floor descriptions, neighborhood overview, and interactive map of nearby parking and hotels.',
      url: 'https://www.48wallnyc.com/location',
      isPartOf: {
        '@type': 'WebSite',
        name: '48 Wall Street NYC',
        url: 'https://www.48wallnyc.com',
      },
      about: {
        '@id': 'https://www.48wallnyc.com#eventvenue',
      },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Event Types at 48 Wall Street',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Corporate Events',
            description:
              'Executive meetings, conferences, product launches, and corporate celebrations hosted in a flexible Financial District venue.',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Weddings',
            description:
              'Wedding ceremonies and receptions beneath soaring ceilings in a historic Manhattan setting.',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Social Events',
            description:
              'Milestone celebrations including Bar and Bat Mitzvahs, anniversaries, birthdays, and social gatherings.',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Fashion Shows',
            description:
              'Fashion presentations and runway shows utilizing the dramatic grand marble staircase and high-ceiling spaces.',
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
          name: 'Location',
          item: 'https://www.48wallnyc.com/location',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where is 48 Wall Street located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '48 Wall Street is located at 48 Wall St. Lobby 1, New York, NY 10005, in the heart of Manhattan’s Financial District, surrounded by major office buildings, shops, and landmarks.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there parking near 48 Wall Street?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, there are multiple parking garages within a short walk of 48 Wall Street. Our interactive map highlights nearby parking options so guests can easily plan their arrival.',
          },
        },
        {
          '@type': 'Question',
          name: 'What public transportation options are nearby?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '48 Wall Street is a short walk from several major subway lines serving Manhattan’s Financial District, making it convenient for guests traveling from across New York City and the surrounding area.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are there hotels within walking distance of the venue?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the venue is surrounded by a variety of hotels within a 5 to 10 minute walk. Our location page includes an interactive map showing nearby hotel options for out-of-town guests.',
          },
        },
        {
          '@type': 'Question',
          name: 'What floors and spaces are available at 48 Wall Street?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '48 Wall Street features multiple event levels, including a grand main floor, mezzanine, and lower-level spaces. Our location page includes floor descriptions so you can see how each level can be used for corporate events, weddings, social celebrations, and fashion shows.',
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
