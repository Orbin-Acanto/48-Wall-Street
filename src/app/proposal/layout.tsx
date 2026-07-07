// app/proposal/layout.tsx
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Build Your Event Proposal | 48 Wall Street NYC',
  description:
    'Design your event in minutes with the 48 Wall Street AI-powered RFP Builder. Customize services, spaces, and details to receive a tailored proposal, budget, floor plan, and event timeline.',
  keywords: [
    'event proposal builder',
    'RFP builder NYC',
    'AI event proposal',
    '48 Wall Street event quote',
    'NYC event planning tool',
    'request for proposal event venue',
    'event budget estimate NYC',
  ],
  alternates: {
    canonical: 'https://www.48wallnyc.com/proposal',
  },
  openGraph: {
    title: 'Build Your Event Proposal | 48 Wall Street NYC',
    description:
      'Use the 48 Wall Street AI-powered RFP Builder to customize every aspect of your event and receive a tailored proposal, budget, floor plan, and timeline.',
    url: 'https://www.48wallnyc.com/proposal',
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
    title: 'Build Your Event Proposal | 48 Wall Street NYC',
    description:
      'Design your event in minutes with the 48 Wall Street AI-powered RFP Builder and receive a customized proposal, budget, floor plan, and timeline.',
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

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
