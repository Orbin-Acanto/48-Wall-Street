import type { Metadata } from 'next';
// import SpeakeasyPromoBanner from '@/components/SpeakeasyPromoBanner';

export const metadata: Metadata = {
  // A root layout template appends "| 48 Wall Street NYC", so keep this short
  // enough that the combined title survives Google's ~60 character truncation.
  title: 'Santa Visits, Private Dinners & Holiday Speakeasy',
  description:
    'Book Sit Down With Santa from $35 per person, a private dinner from $500 per person, or the Hidden Holiday Speakeasy at 48 Wall Street. Reserve a time online in the landmark 1927 Financial District venue.',
  keywords:
    'sit down with santa NYC, santa photos NYC, visit santa Financial District, santa experience Manhattan, book santa NYC, holiday speakeasy NYC, private speakeasy event NYC, winter wonderland event space NYC, private dinner Wall Street, intimate private dining NYC, holiday party venue NYC, corporate holiday party Manhattan, company holiday event venue, Christmas party venue NYC, holiday gala venue, end of year party venue NYC, corporate holiday celebration, holiday party space Manhattan, Financial District holiday venue, office holiday party NYC, seasonal event venue, holiday networking event, company Christmas party venue, holiday party with catering NYC, Manhattan holiday venue, holiday party venue rental NYC, corporate christmas party venue Manhattan, holiday party venues near me, company holiday party space NYC, winter party venue NYC, holiday party venue 500 guests NYC, December event venue NYC, festive event space Manhattan',
  openGraph: {
    title:
      'Holiday Events at 48 Wall Street | Santa, Private Dinners, Speakeasy',
    description:
      'Book a 20 minute visit with Santa from $35 per person, an exclusive private dinner from $500 per person, or the Hidden Holiday Speakeasy in the 1927 bank vault. Reserve your time online.',
    url: 'https://www.48wallnyc.com/events/holiday-events',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/gallery/holiday/holiday-01.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street corporate holiday party venue NYC: festive gala in the historic Financial District banking hall',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holiday Events at 48 Wall Street NYC',
    description:
      'Sit Down With Santa from $35 per person, private dinners from $500 per person, and the Hidden Holiday Speakeasy. Book online at the landmark 1927 venue.',
    images: ['/gallery/holiday/holiday-01.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/holiday-events',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function HolidayEventsLayout({
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
            serviceType: 'Holiday Party Venue',
            name: 'Holiday Events at 48 Wall Street',
            description:
              "Premier corporate holiday party and seasonal event venue in Manhattan's Financial District. Features stunning 1927 historic architecture with 30-foot ceilings, grand marble staircase, festive decor options, full-service catering, and professional event planning. Perfect for company holiday celebrations, seasonal galas, end-of-year parties, and corporate networking events for 50-500 guests.",
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
              audienceType: 'Corporate',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Holiday Event Services',
                description:
                  'Complete holiday party services including venue rental, festive decor, catering, entertainment coordination, and event planning',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Holiday Event Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Corporate Holiday Parties',
                    description:
                      'Company holiday celebrations with festive atmosphere and professional service',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Holiday Galas',
                    description:
                      'Elegant seasonal galas with formal dining and entertainment',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'End-of-Year Celebrations',
                    description:
                      'Year-end company parties and employee appreciation events',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Holiday Networking Events',
                    description:
                      'Seasonal networking and business development events',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Festive Decor & Theming',
                    description:
                      'Custom holiday decorations and seasonal theming',
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
                name: 'Holiday Events',
                item: 'https://www.48wallnyc.com/events/holiday-events',
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
            name: '48 Wall Street Holiday Party Venue',
            description:
              'Historic Manhattan venue specializing in corporate holiday parties and seasonal celebrations with elegant atmosphere and festive capabilities',
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
                name: 'Grand Mezzanine',
                value:
                  '30-foot ceilings with chandeliers perfect for festive holiday atmosphere',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Festive Decor Options',
                value: 'Customizable holiday decorations and seasonal theming',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Full-Service Catering',
                value: 'Holiday menus, cocktail receptions, and formal dinners',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Marble Staircase',
                value: 'Stunning entrance for holiday photo opportunities',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Entertainment Space',
                value:
                  'DJ, live music, and entertainment coordination available',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Bar Services',
                value: 'Full bar service with holiday cocktails and beverages',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Professional AV',
                value: 'Sound system for music, speeches, and presentations',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Financial District Location',
                value:
                  'Convenient Manhattan location for corporate holiday events',
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
                name: 'How much does it cost to visit Santa at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sit Down With Santa costs $35 per person, plus a 24% administrative fee and 8.875% New York sales tax. A family of four pays $189.01 in total. Each visit lasts 20 minutes and includes time with Santa, a professionally lit keepsake portrait on the grand marble staircase, hot cocoa and holiday treats, and a gift for every child. Visits run on Saturdays and Sundays from October 15 to December 23, 2026, between 10am and 4pm.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I book a private dinner at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Alexander Hamilton Private Dinner can be reserved online at 48wallnyc.com. It costs $500 per person, plus a 24% administrative fee and 8.875% New York sales tax, so a party of six pays $4,050.15 in total. The room seats 4 to 8 guests and is never shared. Two hour seatings begin at 4pm, 6pm or 8pm on Mondays, Tuesdays and Saturdays from September 23 to December 30, 2026.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the Hidden Holiday Speakeasy at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Hidden Holiday Speakeasy is a Prohibition inspired private event space in The Vault, the original 1927 bank vault level beneath the Banking Hall. It features a custom wooden bar, premium craft cocktails, authentic barrel highboy tables, plush lounge seating, a black and white dance floor and professional entertainment. It holds up to 200 guests and is available from November 1, 2026 for corporate holiday celebrations, client appreciation events and private receptions.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the cancellation policy for holiday bookings at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cancel 48 hours or more before your start time for a full refund. Cancellations inside 48 hours are non refundable. 48 Wall Street may cancel up to 24 hours before for operational or safety reasons, in which case you receive a full refund. Your reservation is held for 24 hours while the credit card authorization is completed; if it is not completed in that time the slot is released automatically and nothing is charged.',
                },
              },
              {
                '@type': 'Question',
                name: 'What types of holiday events can 48 Wall Street accommodate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "48 Wall Street accommodates all types of holiday events including corporate holiday parties, company Christmas celebrations, seasonal galas, end-of-year parties, holiday networking events, Hanukkah celebrations, New Year's Eve events, and winter social gatherings for 50-500 guests.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can 48 Wall Street provide festive holiday decorations?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street offers customizable holiday decorations and seasonal theming. Our venue already features stunning architecture with chandeliers and elegant details, and we can add festive decor including holiday lighting, seasonal arrangements, themed centerpieces, and custom decorations to match your celebration style.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is holiday catering available at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street provides full-service holiday catering through our exclusive vendors. We offer seasonal menus, holiday-themed dishes, cocktail receptions, formal dinners, buffet options, dessert bars, and full bar service with festive cocktails. Menus can be customized for dietary restrictions and preferences.',
                },
              },
              {
                '@type': 'Question',
                name: 'When should we book for a corporate holiday party?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Holiday party dates book quickly, especially November and December. We recommend booking your corporate holiday event 6-12 months in advance to secure your preferred date. Popular dates for holiday parties include early to mid-December weekdays and weekends. Contact us at 1.877.885.0705 to check availability.',
                },
              },
              {
                '@type': 'Question',
                name: 'What entertainment options are available for holiday parties?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street can coordinate various holiday entertainment including DJ services with holiday music, live bands, photo booths with holiday props, corporate entertainment, networking activities, and holiday-themed games. Our event team works with trusted entertainment vendors to create the perfect festive atmosphere.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many guests can attend a holiday party at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street can accommodate holiday parties for 50 to 500 guests. We offer flexible configurations including cocktail receptions, seated dinners, buffet-style service, and mixed layouts with dining and mingling areas. Our Grand Mezzanine and Concourse Level provide versatile spaces for events of all sizes.',
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
            name: 'Holiday Events & Parties',
            description:
              'Premier Manhattan venue for corporate holiday parties and seasonal celebrations with festive atmosphere and elegant historic setting',
            url: 'https://www.48wallnyc.com/events/holiday-events',
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
              'Corporate Holiday Parties',
              'Holiday Galas',
              'End-of-Year Celebrations',
              'Seasonal Corporate Events',
              'Holiday Networking Events',
              'Company Christmas Parties',
            ],
          }),
        }}
      />
      {/* Temporarily disabled: only the homepage promo banner should show.
          Re-enable by uncommenting this and its import above.
      <SpeakeasyPromoBanner />
      */}
      {/*
        Bookable holiday experiences. Event + Offer schema is what makes these
        eligible for Google event rich results and gives answer engines the
        concrete price, date and capacity facts they need to cite us.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Bookable Holiday Experiences at 48 Wall Street',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@type': 'Event',
                  name: 'Sit Down With Santa at 48 Wall Street',
                  description:
                    'A 20 minute private visit with Santa in the holiday decorated Grand Mezzanine Banking Hall, including a professionally lit keepsake portrait on the grand marble staircase, hot cocoa and treats, and a gift for every child.',
                  eventStatus: 'https://schema.org/EventScheduled',
                  eventAttendanceMode:
                    'https://schema.org/OfflineEventAttendanceMode',
                  startDate: '2026-10-15T10:00:00-04:00',
                  endDate: '2026-12-23T16:00:00-05:00',
                  maximumAttendeeCapacity: 8,
                  image: [
                    'https://www.48wallnyc.com/gallery/holiday/themes/santa-01.jpg',
                  ],
                  location: {
                    '@type': 'Place',
                    name: '48 Wall Street',
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
                  },
                  organizer: {
                    '@type': 'Organization',
                    name: '48 Wall Street',
                    url: 'https://www.48wallnyc.com',
                  },
                  offers: {
                    '@type': 'Offer',
                    price: '35.00',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    validFrom: '2026-09-01T00:00:00-04:00',
                    url: 'https://www.48wallnyc.com/events/holiday-events',
                    description:
                      '$35 per person, plus a 24% administrative fee and 8.875% New York sales tax.',
                  },
                  audience: {
                    '@type': 'Audience',
                    audienceType: 'Families with children',
                  },
                },
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@type': 'Event',
                  name: 'The Alexander Hamilton Private Dinner',
                  description:
                    'Exclusive use of The Alexander Hamilton Office for a two hour private dinner seating overlooking Wall Street, with a bespoke menu planned with the culinary team and dedicated service throughout.',
                  eventStatus: 'https://schema.org/EventScheduled',
                  eventAttendanceMode:
                    'https://schema.org/OfflineEventAttendanceMode',
                  startDate: '2026-09-23T16:00:00-04:00',
                  endDate: '2026-12-30T22:00:00-05:00',
                  maximumAttendeeCapacity: 8,
                  image: [
                    'https://www.48wallnyc.com/spaces/hamilton-room/gallery-02.jpg',
                  ],
                  location: {
                    '@type': 'Place',
                    name: 'The Alexander Hamilton Office at 48 Wall Street',
                    address: {
                      '@type': 'PostalAddress',
                      streetAddress: '48 Wall Street, Lobby 1',
                      addressLocality: 'New York',
                      addressRegion: 'NY',
                      postalCode: '10005',
                      addressCountry: 'US',
                    },
                  },
                  organizer: {
                    '@type': 'Organization',
                    name: '48 Wall Street',
                    url: 'https://www.48wallnyc.com',
                  },
                  offers: {
                    '@type': 'Offer',
                    price: '500.00',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    validFrom: '2026-09-01T00:00:00-04:00',
                    url: 'https://www.48wallnyc.com/spaces/hamilton-room',
                    eligibleQuantity: {
                      '@type': 'QuantitativeValue',
                      minValue: 4,
                      maxValue: 8,
                      unitText: 'guests',
                    },
                    description:
                      '$500 per person, plus a 24% administrative fee and 8.875% New York sales tax. The room seats 4 to 8 guests and is never shared.',
                  },
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@type': 'Event',
                  name: 'Hidden Holiday Speakeasy at The Vault',
                  description:
                    'A Prohibition inspired private speakeasy in the original 1927 bank vault beneath the Banking Hall, with a custom wooden bar, craft cocktails, barrel highboy tables, a black and white dance floor and live entertainment.',
                  eventStatus: 'https://schema.org/EventScheduled',
                  eventAttendanceMode:
                    'https://schema.org/OfflineEventAttendanceMode',
                  startDate: '2026-11-01T18:00:00-04:00',
                  endDate: '2026-12-31T23:00:00-05:00',
                  maximumAttendeeCapacity: 200,
                  image: [
                    'https://www.48wallnyc.com/gallery/holiday/themes/speakeasy-01.jpg',
                  ],
                  location: {
                    '@type': 'Place',
                    name: 'The Vault at 48 Wall Street',
                    address: {
                      '@type': 'PostalAddress',
                      streetAddress: '48 Wall Street, Lobby 1',
                      addressLocality: 'New York',
                      addressRegion: 'NY',
                      postalCode: '10005',
                      addressCountry: 'US',
                    },
                  },
                  organizer: {
                    '@type': 'Organization',
                    name: '48 Wall Street',
                    url: 'https://www.48wallnyc.com',
                  },
                  offers: {
                    '@type': 'Offer',
                    availability: 'https://schema.org/InStock',
                    priceCurrency: 'USD',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      priceCurrency: 'USD',
                      minPrice: 5000,
                    },
                    url: 'https://www.48wallnyc.com/spaces/concourse-level',
                    description:
                      'Private event pricing on request. Contact info@48wallnyc.com.',
                  },
                },
              },
              {
                '@type': 'ListItem',
                position: 4,
                item: {
                  '@type': 'Event',
                  name: 'Winter Wonderland at The Vault',
                  description:
                    'The Vault transformed into an immersive winter installation with luminous snowflakes, illuminated winter trees, ambient candlelight and layered blue lighting, for up to 200 guests.',
                  eventStatus: 'https://schema.org/EventScheduled',
                  eventAttendanceMode:
                    'https://schema.org/OfflineEventAttendanceMode',
                  startDate: '2026-11-01T17:00:00-04:00',
                  endDate: '2026-12-31T23:00:00-05:00',
                  maximumAttendeeCapacity: 200,
                  image: [
                    'https://www.48wallnyc.com/gallery/holiday/themes/winter-wonderland.jpg',
                  ],
                  location: {
                    '@type': 'Place',
                    name: 'The Vault at 48 Wall Street',
                    address: {
                      '@type': 'PostalAddress',
                      streetAddress: '48 Wall Street, Lobby 1',
                      addressLocality: 'New York',
                      addressRegion: 'NY',
                      postalCode: '10005',
                      addressCountry: 'US',
                    },
                  },
                  organizer: {
                    '@type': 'Organization',
                    name: '48 Wall Street',
                    url: 'https://www.48wallnyc.com',
                  },
                  offers: {
                    '@type': 'Offer',
                    availability: 'https://schema.org/InStock',
                    priceCurrency: 'USD',
                    url: 'https://www.48wallnyc.com/spaces/concourse-level',
                    description:
                      'Private event pricing on request. Contact info@48wallnyc.com.',
                  },
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
