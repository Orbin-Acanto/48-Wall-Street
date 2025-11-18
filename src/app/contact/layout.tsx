import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact 48 Wall Street | Historic NYC Corporate Event Venue',
  description:
    "Contact 48 Wall Street, a historic corporate and private event venue in Lower Manhattan's Financial District. Call 1.877.885.0705 or email info@48WallNYC.com to plan your next NYC event.",
  keywords: [
    '48 Wall Street',
    '48 Wall Street NYC',
    'NYC corporate event venue',
    'New York corporate event space',
    'Lower Manhattan event venue',
    'Financial District event space',
    'Wall Street event venue',
    'NYC private event space',
    'NYC wedding venue',
    'NYC event space contact',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact 48 Wall Street | Historic NYC Corporate Event Venue',
    description:
      "Get in touch with 48 Wall Street, a historic corporate and private event venue in Lower Manhattan's Financial District. Call 1.877.885.0705 or email info@48WallNYC.com to inquire about events.",
    url: 'https://www.48wallnyc.com/contact',
    type: 'website',
    siteName: '48 Wall Street Events NYC',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Historic grand event space at 48 Wall Street in Lower Manhattan, NYC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact 48 Wall Street | Historic NYC Corporate Event Venue',
    description:
      "Plan your next corporate or private event at 48 Wall Street in NYC's Financial District. Call 1.877.885.0705 or email info@48WallNYC.com to get in touch.",
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
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
