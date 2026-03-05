import SpaceDetails from '@/components/SpaceDetails';

export const metadata = {
  title: 'Grand Mezzanine Banking Hall | 48 Wall Street',
  description:
    'An architectural masterpiece of the Jazz Age — soaring ceilings, marble columns, and grand proportions. The premier event space in Lower Manhattan.',
};

export default function GrandMezzaninePage() {
  return (
    <SpaceDetails
      levelLabel="01"
      title="Grand Mezzanine"
      subtitle="Banking Hall"
      description="When entering the 48 Wall Street, you are greeted by a grand marble staircase. Let your eyes gravitate upward toward the impeccably crafted ceiling and oversized chandeliers. This is 48 Wall Street’s Grand Mezzanine Banking Hall. This space has retained much of its original 1920’s architectural detail; from the 30-foot ceilings to its beautiful Palladian windows. The Banking Hall can host and accommodate a variety of events, which include seated dinners for 325 guests or a cocktail reception for 500 guests. The space can also be divided to your liking to create a more intimate setting for smaller events and meetings."
      images={[
        '/venue/4.JPG',
        '/venue/8.jpg',
        '/venue/7.jpg',
        '/venue/3.jpg',
        '/venue/5.jpg',
        '/venue/6.jpg',
      ]}
      lightboxImages={[
        '/venue/hq/4.JPG',
        '/venue/hq/8.jpg',
        '/venue/hq/7.jpg',
        '/venue/hq/3.jpg',
        '/venue/hq/5.jpg',
        '/venue/hq/6.jpg',
      ]}
      videoUrl="https://player.vimeo.com/video/192677114?h=ec582da06e"
      floorPlanImage="/floor_planner/plan/ground.svg"
      features={[
        'Grand dual marble staircase',
        'Oversized Crystal chandeliers',
        'Former Bank of New York',
        '30-foot soaring Ceilings',
        'Beautiful Palladian Windows',
        'Original 1920s architecture',
        '500 Guests Capacity',
        'Ceiling Height: 30 ft',
      ]}
      stats={{
        capacity: '350 seated | 500 cocktail reception',
        sqft: '9,000 sq ft',
      }}
      enquireHref="/contact"
    />
  );
}
