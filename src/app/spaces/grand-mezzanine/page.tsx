import SpaceDetails from '@/components/SpaceDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Grand Mezzanine Banking Hall | Historic Event Space NYC | 48 Wall Street',
  description:
    'The Grand Mezzanine Banking Hall at 48 Wall Street offers 9,000 sq ft of original 1927 architecture with 30-foot ceilings, a grand marble staircase, and crystal chandeliers. Up to 500 guests in the Financial District.',
  alternates: {
    canonical: 'https://www.48wallnyc.com/spaces/grand-mezzanine',
  },
  openGraph: {
    title:
      'Grand Mezzanine Banking Hall | Historic NYC Event Space | 48 Wall Street',
    description:
      '9,000 sq ft of original 1927 architecture. 30-foot ceilings, grand marble staircase, crystal chandeliers. Seats 350, reception up to 500 — Financial District, NYC.',
    url: 'https://www.48wallnyc.com/spaces/grand-mezzanine',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/spaces/grand-mezzanine/hero-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Grand Mezzanine Banking Hall at 48 Wall Street — 30-foot ceilings and grand marble staircase',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grand Mezzanine Banking Hall | 48 Wall Street NYC',
    description:
      '9,000 sq ft historic banking hall. 30-foot ceilings, marble staircase, seats 350, reception 500. Financial District, NYC.',
    images: ['/spaces/grand-mezzanine/hero-1.jpg'],
  },
};

export default function GrandMezzaninePage() {
  return (
    <SpaceDetails
      levelLabel="01"
      title={'Grand Mezzanine\nBanking Hall'}
      subtitle=""
      description="The Grand Mezzanine Banking Hall is the heart of 48 Wall Street. At 9,000 square feet with 30-foot soaring ceilings, it makes an immediate impression that sets the tone for every event held here. Original 1920s architectural details have been preserved throughout, including the oversized crystal chandeliers, beautiful Palladian windows, and the grand dual marble staircase that greets guests at the entrance. The Banking Hall accommodates seated dinners for up to 350 guests and cocktail receptions for up to 500. For smaller gatherings, the floor plan divides comfortably to create a more intimate environment without losing the grandeur of the space. Whether you are hosting a corporate conference, a wedding reception, a charity gala, or a fashion show, this is a venue that gives your event genuine presence from the moment guests walk through the door."
      heroImages={[
        '/spaces/grand-mezzanine/hero-1.jpg',
        '/spaces/grand-mezzanine/hero-2.jpg',
        '/spaces/grand-mezzanine/hero-3.jpg',
      ]}
      images={[
        '/spaces/grand-mezzanine/gallery-1.jpg',
        '/spaces/grand-mezzanine/gallery-2.jpg',
        '/spaces/grand-mezzanine/gallery-3.jpg',
        '/spaces/grand-mezzanine/gallery-4.jpg',
        '/spaces/grand-mezzanine/gallery-5.jpg',
        '/spaces/grand-mezzanine/gallery-6.jpg',
      ]}
      videoUrl="https://player.vimeo.com/video/1207393496?h=81afd92077"
      floorPlanImage="/floor-plans/grand-mezzanine.svg"
      features={[
        'Grand dual marble staircase',
        'Oversized Crystal chandeliers',
        'Former Bank of New York',
        '30-foot soaring Ceilings',
        'Beautiful Palladian Windows',
        'Original 1920s architecture',
        '500 Guests Capacity',
        'Ceiling Height: 30 ft',
      ]}
      stats={{
        capacity: '350 seated | 500 cocktail reception',
        sqft: '9,000 sq ft',
      }}
      enquireHref="/contact"
    />
  );
}
