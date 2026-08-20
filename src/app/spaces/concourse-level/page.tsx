import SpaceDetails from '@/components/SpaceDetails';
import HolidayThemes from '@/components/HolidayThemes';
import VaultDiscoverBanner from '@/components/VaultDiscoverBanner';
import { vaultBrochure } from '@/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'The Concourse Vault Level | Breakout Rooms and Meeting Space NYC | 48 Wall Street',
  description:
    'The Concourse Level at 48 Wall Street offers 3,000 sq ft of flexible meeting and event space with 6 breakout rooms. Ideal for conferences, workshops, and pre-function receptions in the Financial District.',
  alternates: {
    canonical: 'https://www.48wallnyc.com/spaces/concourse-level',
  },
  openGraph: {
    title:
      'Concourse Level | Meeting Space & Breakout Rooms NYC | 48 Wall Street',
    description:
      '3,000 sq ft flexible event space with 6 breakout rooms. 14-foot ceilings, 200 guests, conference and workshop configurations. Financial District, NYC.',
    url: 'https://www.48wallnyc.com/spaces/concourse-level',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/spaces/concourse-level/hero-01.jpg',
        width: 1200,
        height: 630,
        alt: 'Concourse Level at 48 Wall Street: flexible breakout rooms and meeting space NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concourse Level | 48 Wall Street NYC',
    description:
      '3,000 sq ft with 6 breakout rooms. Perfect for conferences, workshops, and seminars in the Financial District.',
    images: ['/spaces/concourse-level/hero-01.jpg'],
  },
};

export default function ConcourseLevelPage() {
  return (
    <>
      <SpaceDetails
        levelLabel="02"
        title={'The CONCOURSE\nVAULT LEVEL'}
        subtitle=""
        description="The Concourse Level sits directly below the Grand Mezzanine Banking Hall and gives 48 Wall Street a versatility that most single-floor venues cannot match. At 3,000 square feet with 14-foot ceilings, it accommodates up to 200 guests for a seated event or reception and divides into six separate breakout rooms for concurrent sessions and workshops. For full-day conferences, the Concourse handles parallel programming while the Grand Mezzanine serves the main stage. For weddings and galas, it works as a pre-function cocktail space or a private dining room. The two levels connect via the grand marble staircase, creating a natural and elegant flow for guests moving between them."
        heroImages={[
          '/spaces/concourse-level/featured.png',
          '/spaces/concourse-level/hero-01.jpg',
          '/spaces/concourse-level/hero-02.jpg',
          '/spaces/concourse-level/hero-03.jpg',
        ]}
        images={[
          '/spaces/concourse-level/featured.png',
          '/spaces/concourse-level/gallery-02.png',
          '/spaces/concourse-level/gallery-03.jpg',
          '/spaces/concourse-level/gallery-04.png',
          '/spaces/concourse-level/gallery-05.jpg',
          '/spaces/concourse-level/gallery-06.jpg',
        ]}
        videoUrl="https://player.vimeo.com/video/192678532?h=c1ec68adce"
        brochure={vaultBrochure}
        floorPlanImage="/floor-plans/concourse-vault.svg"
        features={[
          'Divisible into 6 breakout rooms',
          'Flexible meeting configurations',
          'Theater and classroom setups',
          '200 Guests Capacity',
          'Professional AV capabilities',
          'Intimate event space option',
          'Perfect for workshops and sessions',
          'Ceiling Height: 14 ft',
        ]}
        stats={{
          capacity: '150 seated | 200 cocktail reception',
          sqft: '3000 sq ft',
        }}
        enquireHref="/contact"
        // Rendered directly after the brochure flipbook. Whitesmoke alternates
        // against the white Floor Plans section that follows it.
        afterBrochure={<HolidayThemes background="whitesmoke" />}
      />
      <VaultDiscoverBanner />
    </>
  );
}
