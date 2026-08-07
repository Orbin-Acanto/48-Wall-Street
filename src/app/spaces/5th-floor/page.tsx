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
        url: '/spaces/5th-floor/hero-01.jpg',
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
    images: ['/spaces/5th-floor/hero-01.jpg'],
  },
};

export default function FifthFloorPage() {
  return (
    <SpaceDetails
      levelLabel="05"
      title={'The Alexander Hamilton\nBallroom'}
      subtitle=""
      description={
        <>
          <p className="font-primary text-dark-black text-xl font-light tracking-wide italic md:text-2xl">
            Where Historic Prestige Meets Modern Luxury
          </p>
          <p>
            Perched on the fifth floor of the iconic 48 Wall Street, the
            Alexander Hamilton Ballroom offers an extraordinary setting where
            New York City&rsquo;s rich history seamlessly blends with
            contemporary sophistication. Designed to inspire unforgettable
            experiences, this 14,444-square-foot venue combines timeless
            architectural character with the flexibility of a modern event
            space.
          </p>
          <p>
            Bathed in abundant natural light from expansive perimeter windows,
            the ballroom features an elegant open floor plan that can be
            customized for executive conferences, luxury weddings, nonprofit
            galas, fashion presentations, product launches, and private
            celebrations. The refined interiors provide a sophisticated backdrop
            while accommodating both intimate gatherings and large-scale
            productions.
          </p>
          <p>
            Every event at the Alexander Hamilton Ballroom is elevated by 48
            Wall Street&rsquo;s signature white-glove hospitality, offering a
            fully integrated experience with:
          </p>
          <ul className="space-y-2.5">
            {[
              'State-of-the-art Audio, Video & Lighting Production',
              'High-speed Streaming & Hybrid Event Capabilities',
              'Award-Winning Culinary & Beverage Services',
              'Custom Event Design & Décor',
              'Luxury Furnishings & Lounge Collections',
              'Dedicated Event Planning & Production Management',
              'On-Site Technical Support',
              'Premium Guest Hospitality & Concierge Services',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Whether hosting an elegant gala, executive summit, corporate
            reception, or once-in-a-lifetime celebration, the Alexander Hamilton
            Ballroom delivers a setting where historic elegance, modern
            innovation, and impeccable service come together to create
            extraordinary events in the heart of New York City&rsquo;s Financial
            District.
          </p>
        </>
      }
      heroImages={[
        '/spaces/5th-floor/hero-01.jpg',
        '/spaces/5th-floor/hero-02.jpg',
        '/spaces/5th-floor/hero-03.jpg',
      ]}
      images={[
        '/spaces/5th-floor/gallery-01.jpg',
        '/spaces/5th-floor/gallery-02.jpg',
        '/spaces/5th-floor/gallery-03.jpg',
        '/spaces/5th-floor/gallery-04.jpg',
        '/spaces/5th-floor/gallery-05.jpg',
      ]}
      floorPlanImage="/floor-plans/alexander-hamilton-ballroom.png"
      features={[
        'Open, column-spaced ballroom floor',
        'Expansive perimeter windows',
        'Adjoining Historical Hamilton Suite',
        'Dedicated guest and main entrances',
        'On-floor coatcheck and pantry',
        'Nine passenger elevators plus freight',
        'Restrooms on floor',
      ]}
      stats={{
        capacity: 'Grand celebrations | Seated dinners & receptions',
        sqft: '14,444 sq ft',
      }}
      enquireHref="/contact"
    />
  );
}
