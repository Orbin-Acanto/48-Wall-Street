import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Holiday Event Venue on Wall Street | Corporate Holiday Party Space NYC',
  description:
    'Celebrate the season at 48 Wall Street. The premier holiday event venue in Lower Manhattan offering historic charm for corporate parties and seasonal galas.',
  keywords:
    'holiday party venue NYC, corporate holiday party Manhattan, company holiday event venue, Christmas party venue NYC, holiday gala venue, end of year party venue NYC, corporate holiday celebration, holiday party space Manhattan, Financial District holiday venue, office holiday party NYC, seasonal event venue, holiday networking event, company Christmas party venue, holiday party with catering NYC, Manhattan holiday venue',
  openGraph: {
    title: 'Holiday Party Venue NYC | Corporate Celebrations | 48 Wall Street',
    description:
      'Celebrate the holidays at 48 Wall Street. Historic Manhattan venue perfect for corporate holiday parties with festive atmosphere, elegant 1920s architecture, full catering, and capacity for 50-500 guests.',
    url: 'https://www.48wallnyc.com/events/holiday-events',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/gallery/holiday/gallery-01.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street corporate holiday party venue NYC — festive gala in the historic Financial District banking hall',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holiday Party Venue NYC | 48 Wall Street',
    description:
      'Premier Manhattan venue for corporate holiday parties. Historic elegance, festive atmosphere, full catering, 50-500 capacity.',
    images: ['/gallery/holiday/gallery-01.jpg'],
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
      {children}
    </>
  );
}
