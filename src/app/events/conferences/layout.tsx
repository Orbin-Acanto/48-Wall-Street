import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Corporate Event Venue NYC | Meetings & Conferences | 48 Wall Street Financial District',
  description:
    "Premier corporate event venue in Manhattan's Financial District. Host meetings, conferences, product launches, and company events at 48 Wall Street's historic 1927 venue. State-of-the-art AV, flexible layouts for 50-500 guests, breakout rooms, and full-service catering. Grand Mezzanine with 30-foot ceilings perfect for impactful business events. Request a quote today.",
  keywords:
    'corporate event venue NYC, Manhattan conference space, Financial District meeting venue, corporate meeting space NYC, business event venue Manhattan, product launch venue NYC, company event space, corporate holiday party venue, business conference NYC, Wall Street meeting space, executive event venue, corporate gathering space NYC, team building venue Manhattan, sales kickoff venue, board meeting space NYC, company town hall venue',
  openGraph: {
    title:
      'Corporate Event Venue NYC | Meetings & Conferences | 48 Wall Street',
    description:
      'Host impactful corporate events at 48 Wall Street. Historic Financial District venue with state-of-the-art AV, flexible layouts for 50-500 guests, and professional atmosphere perfect for meetings, conferences, and product launches.',
    url: 'https://www.48wallnyc.com/events/corporate',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Historic Event Venue Manhattan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Event Venue NYC | 48 Wall Street',
    description:
      'Premier Financial District venue for corporate meetings, conferences & events. State-of-the-art AV, flexible layouts, 50-500 capacity.',
    images: ['/images/twitter-home.jpg'],
    site: '@48wallst',
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/corporate',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function CorporateEventsLayout({
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
            serviceType: 'Corporate Event Venue',
            name: 'Corporate Events at 48 Wall Street',
            description:
              "Premier corporate event venue in Manhattan's Financial District offering meeting spaces, conference facilities, and event services for business gatherings of 50-500 attendees. Features state-of-the-art audiovisual capabilities, flexible seating arrangements, breakout rooms, and full-service catering.",
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
              telephone: '1.877.885.0705',
              email: 'info@48WallNYC.com',
              url: 'https://www.48wallnyc.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'New York City',
            },
            audience: {
              '@type': 'BusinessAudience',
              audienceType: 'Corporate',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Corporate Event Services',
                description:
                  'Comprehensive corporate event services including venue rental, catering, AV equipment, and event planning',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Corporate Event Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Corporate Meetings',
                    description:
                      'Professional meeting spaces with AV equipment and flexible seating',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Conferences & Summits',
                    description:
                      'Large-scale conference facilities with breakout rooms and theater seating',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Product Launches',
                    description:
                      'Stunning venue for product launches with premium lighting and AV',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Corporate Holiday Parties',
                    description:
                      'Elegant space for company celebrations and holiday events',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Team Building Events',
                    description:
                      'Flexible spaces for team building and employee engagement activities',
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
                name: 'Corporate Events',
                item: 'https://www.48wallnyc.com/events/corporate',
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
            name: '48 Wall Street Corporate Event Venue',
            description:
              'Historic Financial District venue specializing in corporate events, meetings, and conferences with modern amenities and professional atmosphere',
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
                name: 'State-of-the-Art AV Equipment',
                value:
                  'Professional audiovisual capabilities including projectors, screens, sound systems, and lighting',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Flexible Seating Arrangements',
                value:
                  'Theater, classroom, boardroom, banquet, and cocktail configurations',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Breakout Rooms',
                value:
                  'Multiple breakout spaces on Concourse Level divisible into 6 smaller rooms',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'High-Speed WiFi',
                value: 'Enterprise-grade wireless internet throughout venue',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Full-Service Catering',
                value:
                  'Professional catering for breakfast meetings, lunch, dinner, and cocktail receptions',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Event Planning Services',
                value: 'Dedicated event coordinators for seamless execution',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Mezzanine',
                value:
                  '30-foot ceilings with original 1920s architecture for impactful presentations',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Financial District Location',
                value:
                  'Prime Manhattan location easily accessible for corporate clients',
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
                name: 'What types of corporate events can 48 Wall Street accommodate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street accommodates all types of corporate events including board meetings, conferences, product launches, company town halls, sales kickoffs, team building events, corporate holiday parties, networking events, and executive dinners. Our flexible spaces can be configured for groups of 50 to 500 attendees.',
                },
              },
              {
                '@type': 'Question',
                name: 'What AV equipment is available for corporate meetings?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street offers state-of-the-art audiovisual equipment including professional projectors, large screens, sound systems, wireless microphones, stage lighting, presentation technology, and high-speed WiFi throughout the venue. Our technical team provides full support for seamless presentations.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does 48 Wall Street have breakout rooms for conferences?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, our Concourse Level can be divided into 6 smaller breakout rooms, perfect for workshops, team sessions, and concurrent meetings during conferences. The Grand Mezzanine and Banking Hall can also be configured for various breakout needs.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is catering included for corporate events?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street offers full-service catering through our exclusive vendors. We can provide breakfast meetings, working lunches, formal dinners, and cocktail receptions with customizable menus to suit your corporate event needs and dietary requirements.',
                },
              },
              {
                '@type': 'Question',
                name: 'How far in advance should we book for a corporate event?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We recommend booking corporate events 3-6 months in advance, especially for popular dates and peak business seasons. However, we can often accommodate shorter timelines depending on availability. Contact us at 1.877.885.0705 to check availability.',
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
            name: 'Corporate Events',
            description:
              'Professional corporate event venue in Manhattan Financial District for meetings, conferences, and business gatherings',
            url: 'https://www.48wallnyc.com/events/corporate',
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
              'Corporate Meetings',
              'Business Conferences',
              'Product Launches',
              'Company Events',
              'Executive Gatherings',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
