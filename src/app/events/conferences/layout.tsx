import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Conference Venue NYC | Meeting Space Financial District | 48 Wall Street',
  description:
    'Host your next conference at 48 Wall Street in the Financial District. Historic 1927 venue with 9,000 sq ft main hall, 6 breakout rooms, full AV production, and catering for 50 to 500 attendees. Request a quote.',
  keywords:
    'conference venue NYC, meeting space Financial District, conference venue rental Manhattan, meeting venues NYC, corporate conference space Wall Street, conference center near me NYC, venue for conference Manhattan, board meeting venue NYC, meeting space rental Financial District, business conference NYC, Wall Street conference venue, summit venue Manhattan, workshop space NYC, seminar venue Financial District, corporate meeting room NYC, conference space NYC, conference venue rental Manhattan, corporate meeting venue NYC, conference venues near me, breakout room venue NYC, summit venue NYC, full day conference venue NYC, conference venue with catering NYC, seminar venue Manhattan, symposium venue NYC, conference venue 350 guests',
  openGraph: {
    title:
      'Conference Venue NYC | Meeting Space Financial District | 48 Wall Street',
    description:
      'Host conferences, meetings, and summits at 48 Wall Street in the Financial District. Historic 1927 venue with 9,000 sq ft, breakout rooms, in-house AV, and catering for 50 to 500 attendees.',
    url: 'https://www.48wallnyc.com/events/conferences',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/gallery/corporate/corporate-04.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street historic conference venue Financial District NYC, 9000 sq ft Banking Hall with 30-foot ceilings',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conference Venue NYC | 48 Wall Street Financial District',
    description:
      'Historic Financial District conference venue. 9,000 sq ft main hall, 6 breakout rooms, in-house AV and catering. 50 to 500 attendees.',
    images: ['/gallery/corporate/corporate-04.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/conferences',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function ConferencesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Conference Venue',
            name: 'Conferences and Meetings at 48 Wall Street',
            description:
              'Premier conference venue in the Financial District of Manhattan. The historic 1927 banking hall at 48 Wall Street offers 9,000 square feet of main conference space with 30-foot ceilings, plus 3,000 square feet of breakout room space on the Concourse Level. Full in-house AV production, professional catering, and event coordination for 50 to 500 attendees.',
            provider: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street, Lobby 1',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              telephone: '212.971.5353',
              email: 'info@48WallNYC.com',
              url: 'https://www.48wallnyc.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'New York City',
            },
            audience: {
              '@type': 'BusinessAudience',
              audienceType: 'Corporate and Professional Organizations',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Conference and Meeting Services',
                description:
                  'Full conference services including venue rental, AV production, breakout rooms, catering, staging, and event coordination',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Conference Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Main Stage Conferences',
                    description:
                      'Full-day or multi-day conferences in the Grand Mezzanine Banking Hall with theater seating for up to 500',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Breakout Sessions',
                    description:
                      'Concourse Level divisible into 6 breakout rooms for workshops and concurrent sessions',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Board Meetings',
                    description:
                      'Executive meeting configurations in a prestigious Financial District setting',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Panel Discussions and Symposiums',
                    description:
                      'Staged panel setups with full AV support and audience seating',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Conference Catering',
                    description:
                      'Full catering for morning sessions, working lunches, and networking receptions',
                  },
                },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.48wallnyc.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Events',
                item: 'https://www.48wallnyc.com/events',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Conferences',
                item: 'https://www.48wallnyc.com/events/conferences',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EventVenue',
            name: '48 Wall Street Conference Venue',
            description:
              'Historic 1927 Financial District conference venue with 9,000 sq ft main hall, breakout rooms, in-house AV production, and full catering',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 40.707421,
              longitude: -74.009224,
            },
            maximumAttendeeCapacity: 500,
            amenityFeature: [
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Mezzanine Banking Hall',
                value:
                  '9,000 sq ft main conference hall with 30-foot ceilings and theater seating for 500',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Concourse Level Breakout Rooms',
                value:
                  '3,000 sq ft divisible into 6 separate breakout rooms for concurrent sessions',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'In-House AV Production',
                value:
                  'MME Worldwide handles all AV, staging, lighting, and streaming needs',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Full Catering Service',
                value:
                  'Breakfast, lunch, dinner, and reception catering for conference attendees',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Historic Architecture',
                value:
                  '1927 National Register building in the Financial District of Manhattan',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Transit Access',
                value:
                  'Steps from Wall Street (2/3), Broad Street (J/Z), and Rector Street (1) subway stations',
              },
            ],
            publicAccess: true,
            smokingAllowed: false,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the capacity for conferences at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Grand Mezzanine Banking Hall accommodates up to 500 guests for a standing or theater-style conference and up to 350 for a seated setup. The Concourse Level adds 3,000 square feet of space that divides into six breakout rooms for smaller groups and concurrent sessions.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does 48 Wall Street have breakout rooms for conferences?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The Concourse Level sits directly below the Grand Mezzanine and can be divided into six separate rooms for breakout sessions, workshops, and smaller working groups. It connects to the main hall via the grand marble staircase, making it easy for attendees to move between the main program and breakout sessions.',
                },
              },
              {
                '@type': 'Question',
                name: 'What AV capabilities are available for conferences?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our in-house production partner MME Worldwide provides full conference AV including sound systems, presentation screens or LED walls, professional lighting, live streaming, recording, and on-site technical support. They work in this building regularly and can execute complex multi-room setups efficiently.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is catering available for full-day conferences?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Our catering partner provides full-day conference dining including morning continental service, working lunches, afternoon refreshments, and evening networking receptions. Menus are customized to your event schedule and can accommodate all dietary requirements.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I get pricing for a conference at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Contact our events team at info@48WallNYC.com or call 212.971.5353 with your event date, expected attendance, and program details. We will put together a proposal tailored to your specific conference needs.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Conferences and Meetings',
            description:
              'Historic conference venue in the Financial District of NYC with 9,000 sq ft main hall, 6 breakout rooms, in-house AV, and full catering',
            url: 'https://www.48wallnyc.com/events/conferences',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
            },
            specialty: [
              'Industry Conferences',
              'Corporate Meetings',
              'Board Meetings',
              'Panel Discussions',
              'Workshops and Breakouts',
              'Annual Summit Events',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
