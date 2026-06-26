import SpaceDetails from '@/components/SpaceDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'The Alexander Hamilton Ballroom | 5th Floor Event Space NYC | 48 Wall Street',
  description:
    'The Alexander Hamilton Ballroom on the 5th floor of 48 Wall Street offers 14,444 sq ft of historic luxury event space. Expansive natural light, open floor plan, and white-glove hospitality in the Financial District.',
  alternates: {
    canonical: 'https://www.48wallnyc.com/spaces/5th-floor',
  },
  openGraph: {
    title:
      'The Alexander Hamilton Ballroom | 5th Floor Event Space NYC | 48 Wall Street',
    description:
      '14,444 sq ft where historic prestige meets modern luxury. Expansive natural light, open floor plan, and white-glove hospitality. Financial District, NYC.',
    url: 'https://www.48wallnyc.com/spaces/5th-floor',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/venue/5th-floor/hamilton-room.png',
        width: 1200,
        height: 630,
        alt: 'The Alexander Hamilton Ballroom at 48 Wall Street — 5th floor luxury event space NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Alexander Hamilton Ballroom | 48 Wall Street NYC',
    description:
      '14,444 sq ft historic luxury event space. Natural light, open floor plan, white-glove hospitality. Financial District, NYC.',
    images: ['/venue/5th-floor/hamilton-room.png'],
  },
};

export default function FifthFloorPage() {
  return (
    <SpaceDetails
      levelLabel="05"
      title="The Alexander Hamilton"
      subtitle="Ballroom"
      description="Perched on the fifth floor of the iconic 48 Wall Street, the Alexander Hamilton Ballroom offers an extraordinary setting where New York City's rich history seamlessly blends with contemporary sophistication. Designed to inspire unforgettable experiences, this 14,444-square-foot venue combines timeless architectural character with the flexibility of a modern event space. Bathed in abundant natural light from expansive perimeter windows, the ballroom features an elegant open floor plan that can be customized for executive conferences, luxury weddings, nonprofit galas, fashion presentations, product launches, and private celebrations. The refined interiors provide a sophisticated backdrop while accommodating both intimate gatherings and large-scale productions. Whether hosting an elegant gala, executive summit, corporate reception, or once-in-a-lifetime celebration, the Alexander Hamilton Ballroom delivers a setting where historic elegance, modern innovation, and impeccable service come together to create extraordinary events in the heart of New York City's Financial District."
      images={[
        '/venue/5th-floor/hamilton-room.png',
        '/venue/5th-floor/classroom.png',
        '/venue/3.jpg',
        '/venue/5.jpg',
        '/venue/7.jpg',
        '/venue/8.jpg',
      ]}
      lightboxImages={[
        '/venue/5th-floor/hamilton-room.png',
        '/venue/5th-floor/classroom.png',
        '/venue/3.jpg',
        '/venue/5.jpg',
        '/venue/7.jpg',
        '/venue/8.jpg',
      ]}
      videoUrl="https://player.vimeo.com/video/192677114?h=ec582da06e"
      floorPlanImage="/floor_planner/plan/ground.svg"
      features={[
        'State-of-the-art Audio, Video & Lighting',
        'High-speed Streaming & Hybrid Event Capabilities',
        'Award-Winning Culinary & Beverage Services',
        'Custom Event Design & Décor',
        'Luxury Furnishings & Lounge Collections',
        'Dedicated Event Planning & Production Management',
        'On-Site Technical Support',
        'Premium Guest Hospitality & Concierge Services',
      ]}
      stats={{
        capacity: 'Contact for details',
        sqft: '14,444 sq ft',
      }}
      enquireHref="/contact"
    />
  );
}
