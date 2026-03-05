import SpaceDetailPage from '@/components/Spacedetailpage';

export const metadata = {
  title: 'Concourse Level | 48 Wall Street',
  description:
    'A refined lower-level retreat offering intimate elegance for cocktail receptions, private dinners, and exclusive gatherings at 48 Wall Street.',
};

export default function ConcourseLevelPage() {
  return (
    <SpaceDetailPage
      levelLabel="02"
      title="Concourse"
      subtitle="Level"
      description="A refined lower-level retreat offering intimate elegance beneath the grandeur above. The Concourse Level delivers distinctive character through its vaulted ceilings, original architectural details, and versatile flow that adapts seamlessly to cocktail receptions, private dinners, product launches, and exclusive gatherings. A space that feels both historic and contemporary — with all the modern amenities you expect from 48 Wall Street."
      images={[
        'https://placehold.co/1600x900/111111/333333?text=Concourse+Level+Hero',
        'https://placehold.co/1200x675/131313/444444?text=Concourse+Wide',
        'https://placehold.co/800x800/161616/444444?text=Bar+Area',
        'https://placehold.co/800x800/111111/333333?text=Dining+Setup',
        'https://placehold.co/800x800/141414/444444?text=Lounge+Area',
      ]}
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      floorPlanImage="https://placehold.co/1200x700/f5f5f5/999999?text=Concourse+Level+Floor+Plan"
      features={[
        'Vaulted architectural ceilings',
        'Private bar and lounge areas',
        'Intimate dining configurations',
        'Original 1920s stonework',
        'Dedicated catering prep area',
        'AV & lighting infrastructure',
        'Private entrance access',
        'Ceiling Height: 18 ft',
      ]}
      stats={{
        capacity: '150 seated | 250 cocktail reception',
        sqft: '4,500 sq ft',
      }}
      enquireHref="/contact"
    />
  );
}
