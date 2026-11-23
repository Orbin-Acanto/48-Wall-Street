import SpaceDetails from '@/components/SpaceDetails';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Banking Hall | Historic Event Venue NYC',
  description:
    'The Banking Hall at 48 Wall Street has original 1920s architecture and soaring ceilings, a grand setting for large events in the Financial District.',
  alternates: {
    canonical: 'https://www.48wallnyc.com/spaces/banking-hall',
  },
  openGraph: {
    title: 'Banking Hall | Historic Event Venue NYC | 48 Wall Street',
    description:
      'Original 1920s architecture with soaring ceilings and grand design elements. A prestigious setting for large-scale events in the Financial District.',
    url: 'https://www.48wallnyc.com/spaces/banking-hall',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/spaces/banking-hall/hero-01.jpg',
        width: 1200,
        height: 630,
        alt: 'Banking Hall at 48 Wall Street: historic event venue NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banking Hall | 48 Wall Street NYC',
    description:
      'Original 1920s architecture with soaring ceilings. Prestigious large-scale event venue in the Financial District, NYC.',
    images: ['/spaces/banking-hall/hero-01.jpg'],
  },
};

export default function BankingHallPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: 'Banking Hall', path: '/spaces/banking-hall' }]}
      />
      <SpaceDetails
        levelLabel="04"
        title={'Banking\nHall'}
        subtitle=""
        description="The Banking Hall at 48 Wall Street preserves the grandeur of the original 1920s financial institution that once occupied this landmark building. With soaring ceilings, stately columns, and restored period details, the Banking Hall provides a prestigious backdrop for large-scale corporate events, galas, and celebrations. This space captures the architectural significance of Wall Street's golden age while offering modern amenities and flexible configurations for today's events."
        heroImages={[
          '/spaces/banking-hall/hero-01.jpg',
          '/spaces/banking-hall/hero-02.jpg',
          '/spaces/banking-hall/hero-03.jpg',
        ]}
        images={[
          '/gallery/fashion/fashion-01.jpg',
          '/spaces/banking-hall/gallery-02.jpg',
          '/spaces/banking-hall/gallery-03.jpg',
          '/spaces/banking-hall/gallery-04.jpg',
          '/spaces/banking-hall/hero-01.jpg',
        ]}
        videoUrl="https://player.vimeo.com/video/192677114?h=ec582da06e"
        floorPlanImage="/floor-plans/banking-hall.svg"
        features={[
          'Original 1920s architecture',
          'Soaring ceilings',
          'Stately period columns',
          'Restored historic details',
          'Flexible event configurations',
          'Modern AV amenities',
          'Large-scale event capacity',
          'Prestigious Wall Street setting',
        ]}
        stats={{
          capacity: 'Large-scale events | Flexible seated & reception layouts',
          sqft: 'Grand historic event floor',
        }}
        enquireHref="/contact"
      />
    </>
  );
}
