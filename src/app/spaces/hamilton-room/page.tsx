import SpaceDetails from '@/components/SpaceDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hamilton Room | Private Event Space NYC | 48 Wall Street',
  description:
    'The Hamilton Room at 48 Wall Street offers an intimate and refined private event space in the Financial District, perfect for executive meetings, private dinners, and exclusive gatherings.',
  alternates: {
    canonical: 'https://www.48wallnyc.com/spaces/hamilton-room',
  },
  openGraph: {
    title: 'Hamilton Room | Private Event Space NYC | 48 Wall Street',
    description:
      'An intimate and refined private event space at 48 Wall Street. Perfect for executive meetings, private dinners, and exclusive gatherings in the Financial District.',
    url: 'https://www.48wallnyc.com/spaces/hamilton-room',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/venue/4.JPG',
        width: 1200,
        height: 630,
        alt: 'Hamilton Room at 48 Wall Street — intimate private event space NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamilton Room | 48 Wall Street NYC',
    description:
      'Intimate private event space for executive meetings and exclusive gatherings. Financial District, NYC.',
    images: ['/venue/4.JPG'],
  },
};

export default function HamiltonRoomPage() {
  return (
    <SpaceDetails
      levelLabel="03"
      title="Hamilton"
      subtitle="Room"
      description="The Hamilton Room at 48 Wall Street offers an intimate setting for private events that demand discretion and elegance. Named in honor of Alexander Hamilton, this refined space is ideal for executive board meetings, private dinners, and exclusive gatherings. With its classic architectural details and versatile layout, the Hamilton Room brings the historic character of 48 Wall Street into a more personal, focused environment."
      images={[
        '/venue/3.jpg',
        '/venue/6.jpg',
        '/venue/10.jpg',
        '/venue/5.jpg',
        '/venue/8.jpg',
        '/venue/7.jpg',
      ]}
      videoUrl="https://player.vimeo.com/video/192677114?h=ec582da06e"
      floorPlanImage="/floor_planner/plan/ground.svg"
      features={[
        'Intimate private setting',
        'Executive meeting capability',
        'Classic architectural details',
        'Flexible layout options',
        'Professional AV capabilities',
        'Private dining configurations',
        'Exclusive event space',
        'Historic character',
      ]}
      stats={{
        capacity: 'Contact for details',
        sqft: 'Contact for details',
      }}
      enquireHref="/contact"
    />
  );
}
