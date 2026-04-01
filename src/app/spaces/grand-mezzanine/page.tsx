import SpaceDetails from '@/components/SpaceDetails';

export const metadata = {
  title: 'Grand Mezzanine Banking Hall | Historic Event Space NYC | 48 Wall Street',
  description:
    'The Grand Mezzanine Banking Hall at 48 Wall Street offers 9,000 sq ft of original 1927 architecture with 30-foot ceilings, a grand marble staircase, and crystal chandeliers. Up to 500 guests in the Financial District.',
};

export default function GrandMezzaninePage() {
  return (
    <SpaceDetails
      levelLabel="01"
      title="Grand Mezzanine"
      subtitle="Banking Hall"
      description="The Grand Mezzanine Banking Hall is the heart of 48 Wall Street. At 9,000 square feet with 30-foot soaring ceilings, it makes an immediate impression that sets the tone for every event held here. Original 1920s architectural details have been preserved throughout, including the oversized crystal chandeliers, beautiful Palladian windows, and the grand dual marble staircase that greets guests at the entrance. The Banking Hall accommodates seated dinners for up to 350 guests and cocktail receptions for up to 500. For smaller gatherings, the floor plan divides comfortably to create a more intimate environment without losing the grandeur of the space. Whether you are hosting a corporate conference, a wedding reception, a charity gala, or a fashion show, this is a venue that gives your event genuine presence from the moment guests walk through the door."
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
