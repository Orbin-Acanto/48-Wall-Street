import SpaceDetails from '@/components/SpaceDetails';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'The Alexander Hamilton Office | Private Executive Salon NYC | 48 Wall Street',
  description:
    "The Alexander Hamilton Office at 48 Wall Street is a private executive salon inspired by America's financial legacy, ideal for executive meetings, VIP receptions, board discussions, and private dining in the Financial District.",
  alternates: {
    canonical: 'https://www.48wallnyc.com/spaces/hamilton-room',
  },
  openGraph: {
    title:
      'The Alexander Hamilton Office | Private Executive Salon NYC | 48 Wall Street',
    description:
      "A private executive salon inspired by America's financial legacy. Ideal for executive meetings, VIP receptions, board discussions, and private dining in the Financial District.",
    url: 'https://www.48wallnyc.com/spaces/hamilton-room',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/spaces/hamilton-room/hero-01.jpg',
        width: 1200,
        height: 630,
        alt: 'The Alexander Hamilton Office at 48 Wall Street — private executive salon NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Alexander Hamilton Office | 48 Wall Street NYC',
    description:
      'A private executive salon inspired by America’s financial legacy. Executive meetings, VIP receptions, and private dining. Financial District, NYC.',
    images: ['/spaces/hamilton-room/hero-01.jpg'],
  },
};

export default function HamiltonRoomPage() {
  return (
    <SpaceDetails
      levelLabel="03"
      title={'The Alexander Hamilton\nOffice'}
      subtitle=""
      description={
        <>
          <p className="font-primary text-primary text-lg italic md:text-xl">
            A Private Executive Salon Inspired by America&apos;s Financial
            Legacy
          </p>
          <p>
            Step into one of 48 Wall Street&apos;s most distinguished private
            spaces, The Alexander Hamilton Office. Named in honor of
            America&apos;s first Secretary of the Treasury and the visionary who
            laid the foundation for the nation&apos;s financial system, this
            refined executive salon embodies the elegance, prestige, and
            timeless character of Lower Manhattan&apos;s historic Financial
            District.
          </p>
          <p>
            Rich in architectural detail, the room showcases soaring ceilings,
            handcrafted millwork, ornate gilded columns, period-inspired
            furnishings, a stately fireplace, and expansive windows that
            overlook the heart of Wall Street. Every element has been
            thoughtfully preserved to create an atmosphere that reflects the
            sophistication of New York&apos;s Gilded Age while providing a
            distinguished setting for today&apos;s executive gatherings.
          </p>
          <p>
            Designed for privacy and meaningful conversation, The Alexander
            Hamilton Office is ideal for executive meetings, VIP receptions,
            board discussions, private dining, media interviews, speaker green
            rooms, and exclusive client engagements. Its intimate scale and
            historic ambiance offer an unparalleled backdrop where business,
            history, and hospitality converge.
          </p>
          <p>
            Located within one of New York City&apos;s most iconic landmark
            buildings, this remarkable space pays tribute to the enduring legacy
            of Alexander Hamilton and the birthplace of American finance,
            offering guests the rare opportunity to experience history while
            creating moments that shape the future.
          </p>
        </>
      }
      heroImages={[
        '/spaces/hamilton-room/hero-02.jpg',
        '/spaces/hamilton-room/hero-01.jpg',
        '/spaces/hamilton-room/hero-03.jpg',
      ]}
      images={[
        '/spaces/hamilton-room/gallery-01.jpg',
        '/spaces/hamilton-room/gallery-02.jpg',
        '/spaces/hamilton-room/gallery-03.jpg',
        '/spaces/hamilton-room/gallery-04.jpg',
        '/spaces/hamilton-room/gallery-05.jpg',
        '/spaces/hamilton-room/gallery-06.jpg',
      ]}
      thenNow={[
        {
          then: '/spaces/hamilton-room/hero-01.jpg',
          now: '/spaces/hamilton-room/gallery-01.jpg',
          thenAlt:
            'The Bank of New York banking hall mezzanine and marble balustrade, circa mid-1900s',
          nowAlt:
            'The same mezzanine and marble balustrade today during an evening reception',
        },
        // {
        //   then: '/spaces/hamilton/gallery-01.jpg',
        //   now: '/spaces/hamilton-room/gallery-02.jpg',
        //   thenAlt:
        //     'The Bank of New York banking floor with bankers at their desks, mid-1900s',
        //   nowAlt:
        //     'The historic banking hall today, set for an elegant gala dinner',
        // },
      ]}
      videoUrl="https://player.vimeo.com/video/192677114?h=ec582da06e"
      floorPlanImage="/floor-plans/hamilton-office.svg"
      features={[
        'Soaring ceilings & handcrafted millwork',
        'Ornate gilded columns',
        'Stately fireplace',
        'Windows overlooking Wall Street',
        'Executive meetings & board discussions',
        'VIP receptions & private dining',
        'Media interviews & speaker green room',
        'Exclusive client engagements',
      ]}
      stats={{
        capacity: 'Intimate gatherings | Executive meetings & private dining',
        sqft: 'Private executive suite',
      }}
      enquireHref="/contact"
    />
  );
}
