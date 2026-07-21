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
        url: '/spaces/upper-mezzanine/hero-01.jpg',
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
    images: ['/spaces/upper-mezzanine/hero-01.jpg'],
  },
};

export default function UpperMezzaninePage() {
  return (
    <SpaceDetails
      levelLabel="02"
      title="Upper Mezzanine"
      subtitle="Where Timeless Architecture Meets Modern Luxury"
      description={
        <>
          <p className="font-primary text-primary text-lg italic md:text-xl">
            Elevated Sophistication
          </p>
          <p>
            Perched above the iconic Grand Banking Hall, the Upper Mezzanine
            offers an exclusive vantage point overlooking one of New York
            City&apos;s most celebrated landmark interiors. Bathed in natural
            light from soaring arched windows and framed by historic marble
            columns, this elegant gallery seamlessly blends Beaux-Arts grandeur
            with contemporary hospitality.
          </p>
          <p>
            Thoughtfully positioned within the venue, the Upper Mezzanine serves
            as a graceful connection between the magnificent Grand Banking Hall
            below and the Historic Hamilton Office, creating a natural flow for
            guests to experience three of 48 Wall Street&apos;s most
            distinguished event spaces. Whether hosting an elegant cocktail
            reception, welcoming VIP guests, or transitioning between
            celebrations, the Upper Mezzanine enhances every moment with
            sophistication and architectural beauty.
          </p>
          <p className="font-primary text-primary text-lg italic md:text-xl">
            A Grand Connection
          </p>
          <p>
            More than an overlook, the Upper Mezzanine is the architectural
            bridge that unites the venue&apos;s most iconic spaces. Guests can
            effortlessly move from the grandeur of the Grand Banking Hall to the
            intimate elegance of the Historic Hamilton Office, creating a
            seamless experience for multi-room events, executive gatherings,
            weddings, galas, and luxury brand activations.
          </p>
          <p>
            Its elevated position provides panoramic views of the Banking Hall
            while offering direct access to the Historic Hamilton Office,
            allowing hosts to create dynamic event experiences that flow
            naturally from one extraordinary setting to the next.
          </p>
        </>
      }
      heroImages={[
        '/spaces/upper-mezzanine/hero-01.jpg',
        '/spaces/upper-mezzanine/hero-02.jpg',
        '/spaces/upper-mezzanine/hero-03.jpg',
      ]}
      images={[
        '/spaces/upper-mezzanine/gallery-01.jpg',
        '/spaces/upper-mezzanine/gallery-02.jpg',
        '/spaces/upper-mezzanine/gallery-03.jpg',
        '/spaces/upper-mezzanine/gallery-04.jpg',
        '/spaces/upper-mezzanine/gallery-05.jpg',
        '/spaces/upper-mezzanine/gallery-06.jpg',
      ]}
      floorPlanImage="/floor-plans/upper-mezzanine.svg"
      features={[
        'Luxury cocktail receptions',
        'VIP & executive lounges',
        'Wedding cocktail hours',
        'Fashion Week events',
        'Corporate networking',
        'Private dining receptions',
        'Nonprofit galas',
        'Brand activations',
        'Multi-room event experiences',
      ]}
      stats={{
        capacity: 'Elevated receptions | Overlooks the Grand Mezzanine',
        sqft: 'Mezzanine-level event space',
      }}
      enquireHref="/contact"
    />
  );
}
