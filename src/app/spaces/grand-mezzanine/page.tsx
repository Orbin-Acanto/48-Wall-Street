import SpaceDetailPage from '@/components/Spacedetailpage';

export const metadata = {
  title: 'Grand Mezzanine Banking Hall | 48 Wall Street',
  description:
    'An architectural masterpiece of the Jazz Age — soaring ceilings, marble columns, and grand proportions. The premier event space in Lower Manhattan.',
};

export default function GrandMezzaninePage() {
  return (
    <SpaceDetailPage
      levelLabel="01"
      title="Grand Mezzanine"
      subtitle="Banking Hall"
      description="An architectural masterpiece of the Jazz Age — soaring ceilings, marble columns, and grand proportions that command attention. Originally the main banking floor of the Bank of New York, this landmarked space has been meticulously restored while infused with modern technical infrastructure. The perfect canvas for galas, weddings, fashion shows, and landmark corporate events that demand a setting as impressive as the occasion itself."
      images={[
        'https://placehold.co/1600x900/1a1a1a/444444?text=Grand+Mezzanine+Hero',
        'https://placehold.co/1200x675/1c1c1c/555555?text=Banking+Hall+Wide',
        'https://placehold.co/800x800/222222/555555?text=Marble+Columns',
        'https://placehold.co/800x800/1e1e1e/444444?text=Crystal+Chandeliers',
        'https://placehold.co/800x800/1a1a1a/444444?text=Palladian+Windows',
      ]}
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      floorPlanImage="https://placehold.co/1200x700/f5f5f5/999999?text=Grand+Mezzanine+Floor+Plan"
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
