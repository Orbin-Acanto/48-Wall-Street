import SpaceDetails from '@/components/SpaceDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Banking Hall | Historic Event Venue NYC | 48 Wall Street',
  description:
    'The Banking Hall at 48 Wall Street features original 1920s architecture with soaring ceilings and grand design elements, offering a prestigious setting for large-scale events in the Financial District.',
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
        url: '/venue/4.JPG',
        width: 1200,
        height: 630,
        alt: 'Banking Hall at 48 Wall Street — historic event venue NYC',
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
    images: ['/venue/4.JPG'],
  },
};

export default function BankingHallPage() {
  return (
    <SpaceDetails
      levelLabel="04"
      title="Banking"
      subtitle="Hall"
      description="The Banking Hall at 48 Wall Street preserves the grandeur of the original 1920s financial institution that once occupied this landmark building. With soaring ceilings, stately columns, and restored period details, the Banking Hall provides a prestigious backdrop for large-scale corporate events, galas, and celebrations. This space captures the architectural significance of Wall Street's golden age while offering modern amenities and flexible configurations for today's events."
      images={[
        '/venue/7.jpg',
        '/venue/4.JPG',
        '/venue/5.jpg',
        '/venue/11.jpg',
        '/venue/3.jpg',
        '/venue/6.jpg',
      ]}
      videoUrl="https://player.vimeo.com/video/192677114?h=ec582da06e"
      floorPlanImage="/floor_planner/plan/banking-hall.svg"
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
        capacity: 'Contact for details',
        sqft: 'Contact for details',
      }}
      enquireHref="/contact"
    />
  );
}
