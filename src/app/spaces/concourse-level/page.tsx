import SpaceDetails from '@/components/SpaceDetails';

export const metadata = {
  title: 'Concourse Level | Breakout Rooms and Meeting Space NYC | 48 Wall Street',
  description:
    'The Concourse Level at 48 Wall Street offers 3,000 sq ft of flexible meeting and event space with 6 breakout rooms. Ideal for conferences, workshops, and pre-function receptions in the Financial District.',
};

export default function ConcourseLevelPage() {
  return (
    <SpaceDetails
      levelLabel="02"
      title="Concourse"
      subtitle="Level"
      description="The Concourse Level sits directly below the Grand Mezzanine Banking Hall and gives 48 Wall Street a versatility that most single-floor venues cannot match. At 3,000 square feet with 14-foot ceilings, it accommodates up to 200 guests for a seated event or reception and divides into six separate breakout rooms for concurrent sessions and workshops. For full-day conferences, the Concourse handles parallel programming while the Grand Mezzanine serves the main stage. For weddings and galas, it works as a pre-function cocktail space or a private dining room. The two levels connect via the grand marble staircase, creating a natural and elegant flow for guests moving between them."
      images={[
        '/venue/2.jpg',
        '/venue/11.jpg',
        '/venue/12.jpg',
        '/venue/10.jpg',
        '/venue/13.jpg',
        '/venue/14.jpg',
      ]}
      lightboxImages={[
        '/venue/2.jpg',
        '/venue/11.jpg',
        '/venue/12.jpg',
        '/venue/10.jpg',
        '/venue/13.jpg',
        '/venue/14.jpg',
      ]}
      videoUrl="https://player.vimeo.com/video/192678532?h=c1ec68adce"
      floorPlanImage="/floor_planner/plan/concourse.svg"
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
    />
  );
}
