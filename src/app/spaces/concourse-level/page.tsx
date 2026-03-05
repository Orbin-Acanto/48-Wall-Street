import SpaceDetails from '@/components/SpaceDetails';

export const metadata = {
  title: 'Concourse Level | 48 Wall Street',
  description:
    'A refined lower-level retreat offering intimate elegance for cocktail receptions, private dinners, and exclusive gatherings at 48 Wall Street.',
};

export default function ConcourseLevelPage() {
  return (
    <SpaceDetails
      levelLabel="02"
      title="Concourse"
      subtitle="Level"
      description="Situated on the lower level, the concourse is designed to hold meetings, breakouts, classes, and events. The space can hold up to 200 guests and can be divided into six smaller rooms for breakout sessions. This level can also be used to host cocktail hours for clients utilizing the Grand Mezzanine for their reception."
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
