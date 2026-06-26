import SpaceDetails from '@/components/SpaceDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hamilton Ballroom | Grand Event Space NYC | 48 Wall Street',
  description:
    'The Hamilton Ballroom at 48 Wall Street is a grand event space designed for large-scale celebrations, galas, and receptions in the Financial District. Experience timeless elegance on a grand scale.',
  alternates: {
    canonical: 'https://www.48wallnyc.com/spaces/hamilton-ballroom',
  },
  openGraph: {
    title: 'Hamilton Ballroom | Grand Event Space NYC | 48 Wall Street',
    description:
      'A grand event space designed for large-scale celebrations, galas, and receptions at 48 Wall Street. Timeless elegance on a grand scale in the Financial District.',
    url: 'https://www.48wallnyc.com/spaces/hamilton-ballroom',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/venue/4.JPG',
        width: 1200,
        height: 630,
        alt: 'Hamilton Ballroom at 48 Wall Street — grand event space NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamilton Ballroom | 48 Wall Street NYC',
    description:
      'Grand event space for large-scale celebrations and galas. Timeless elegance in the Financial District, NYC.',
    images: ['/venue/4.JPG'],
  },
};

export default function HamiltonBallroomPage() {
  return (
    <SpaceDetails
      levelLabel="06"
      title="Hamilton"
      subtitle="Ballroom"
      description="The Hamilton Ballroom at 48 Wall Street is the venue's grandest event space, purpose-built for celebrations that demand scale and sophistication. With expansive floor space, soaring ceilings, and refined architectural details, the Ballroom accommodates large-scale galas, wedding receptions, corporate celebrations, and black-tie affairs. The Hamilton Ballroom combines the historic prestige of 48 Wall Street with the capacity and flexibility required for your most ambitious events."
      images={[
        '/venue/8.jpg',
        '/venue/3.jpg',
        '/venue/4.JPG',
        '/venue/6.jpg',
        '/venue/12.jpg',
        '/venue/5.jpg',
      ]}
      videoUrl="https://player.vimeo.com/video/192677114?h=ec582da06e"
      floorPlanImage="/floor_planner/plan/ground.svg"
      features={[
        'Grand-scale event space',
        'Soaring ceilings',
        'Refined architectural details',
        'Large gala capacity',
        'Wedding reception ready',
        'Black-tie affair setting',
        'Flexible floor configurations',
        'Historic Wall Street prestige',
      ]}
      stats={{
        capacity: 'Contact for details',
        sqft: 'Contact for details',
      }}
      enquireHref="/contact"
    />
  );
}
