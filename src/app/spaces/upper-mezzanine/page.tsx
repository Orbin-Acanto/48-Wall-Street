import SpaceDetails from '@/components/SpaceDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upper Mezzanine | Historic Event Space NYC | 48 Wall Street',
  description:
    'The Upper Mezzanine at 48 Wall Street is an elevated, intimate event space overlooking the Grand Banking Hall, ideal for VIP receptions and cocktail gatherings in the Financial District of Lower Manhattan.',
  alternates: {
    canonical: 'https://www.48wallnyc.com/spaces/upper-mezzanine',
  },
  openGraph: {
    title: 'Upper Mezzanine | Historic NYC Event Space | 48 Wall Street',
    description:
      'An elevated, intimate event space overlooking the Grand Banking Hall, ideal for VIP receptions and cocktail gatherings. Financial District, NYC.',
    url: 'https://www.48wallnyc.com/spaces/upper-mezzanine',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/spaces/upper-mezzanine/hero-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Upper Mezzanine at 48 Wall Street',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upper Mezzanine | 48 Wall Street NYC',
    description:
      'An elevated, intimate event space overlooking the Grand Banking Hall, ideal for VIP receptions and cocktail gatherings. Financial District, NYC.',
    images: ['/spaces/upper-mezzanine/hero-1.jpg'],
  },
};

export default function UpperMezzaninePage() {
  return (
    <SpaceDetails
      levelLabel="02"
      title="Upper Mezzanine"
      subtitle="Where Architectural Heritage Inspires Extraordinary Experiences"
      description={
        <p className="text-lg md:text-xl">
          An exclusive vantage point where historic grandeur, refined
          hospitality, and unforgettable moments come together above the Grand
          Banking Hall.
        </p>
      }
      heroImages={[
        '/spaces/upper-mezzanine/hero-1.jpg',
        '/spaces/upper-mezzanine/hero-2.jpg',
        '/spaces/upper-mezzanine/hero-3.jpg',
      ]}
      images={[
        '/spaces/upper-mezzanine/gallery-1.jpg',
        '/spaces/upper-mezzanine/gallery-2.jpg',
        '/spaces/upper-mezzanine/gallery-3.jpg',
        '/spaces/upper-mezzanine/gallery-4.jpg',
        '/spaces/upper-mezzanine/gallery-5.jpg',
        '/spaces/upper-mezzanine/gallery-6.jpg',
      ]}
      floorPlanImage="/floor-plans/upper-mezzanine.svg"
      features={[
        'Elevated views over the Grand Banking Hall',
        'Original 1920s architectural detail',
        'Intimate receptions & VIP experiences',
        'Cocktail hours & breakout gatherings',
        'Refined, private atmosphere',
        'Full-service catering & AV support',
      ]}
      stats={{
        capacity: 'Elevated receptions | Overlooks the Grand Mezzanine',
        sqft: 'Mezzanine-level event space',
      }}
      enquireHref="/contact"
    />
  );
}
