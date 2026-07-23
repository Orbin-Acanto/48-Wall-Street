import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bar & Bat Mitzvah Venue NYC | Unique Event Space Wall Street',
  description:
    'Celebrate this milestone at 48 Wall Street. A premier historic downtown venue offering a unique event space in Lower Manhattan for unforgettable Bar and Bat Mitzvahs.',
  keywords:
    'Bar Mitzvah venue NYC, Bat Mitzvah venue Manhattan, Bar Mitzvah venue Financial District, Bat Mitzvah venue New York, Jewish celebration venue NYC, Bar Mitzvah party venue, Bat Mitzvah party space, Manhattan Bar Mitzvah venue, NYC Bat Mitzvah location, historic Bar Mitzvah venue, elegant Bat Mitzvah space, Bar Mitzvah venue with catering, customizable Bar Mitzvah venue, Lower Manhattan Bar Mitzvah, Wall Street Bar Mitzvah venue',
  openGraph: {
    title:
      'Bar & Bat Mitzvah Venue NYC | Manhattan Celebration | 48 Wall Street',
    description:
      'Create unforgettable Bar/Bat Mitzvah memories at 48 Wall Street. Historic Manhattan venue with customizable themes, full-service catering, and stunning 1920s architecture. Capacity 50-500 guests.',
    url: 'https://www.48wallnyc.com/events/bar-bat-mitzvahs',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/gallery/bar/bar-01.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Bar and Bat Mitzvah venue NYC — grand historic setting in the Financial District',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bar & Bat Mitzvah Venue NYC | 48 Wall Street',
    description:
      "Celebrate your Bar/Bat Mitzvah in Manhattan's premier historic venue. Customizable themes, full catering, 50-500 guests.",
    images: ['/gallery/bar/bar-01.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/bar-bat-mitzvahs',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function BarBatMitzvahsLayout({
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
            serviceType: 'Bar & Bat Mitzvah Venue',
            name: 'Bar & Bat Mitzvah Events at 48 Wall Street',
            description:
              'Premier Bar and Bat Mitzvah venue in Manhattan offering customizable event spaces, extensive decor options, full-service catering, entertainment coordination, and professional event planning for celebrations of 50-500 guests. Our historic 1920s venue provides a unique and memorable setting for this important milestone.',
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
              '@type': 'Audience',
              audienceType: 'Families celebrating Bar/Bat Mitzvahs',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Bar & Bat Mitzvah Event Services',
                description:
                  'Complete Bar/Bat Mitzvah event services including venue, catering, decor, entertainment coordination, and event planning',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Bar & Bat Mitzvah Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Customizable Themes',
                    description:
                      'Extensive inventory of props and decor for any theme - colorful, modern, classic, or traditional',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Full-Service Catering',
                    description:
                      'Kosher and non-kosher catering options with customizable menus',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Entertainment Coordination',
                    description:
                      'DJ services, photo booths, dancers, and novelty entertainment',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Event Planning',
                    description:
                      'Expert event planners to coordinate every detail of your celebration',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Youth-Friendly Space',
                    description:
                      'Plenty of space for 13-year-olds to enjoy with friends and family',
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
                name: 'Bar & Bat Mitzvahs',
                item: 'https://www.48wallnyc.com/events/bar-bat-mitzvahs',
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
            name: '48 Wall Street Bar & Bat Mitzvah Venue',
            description:
              'Elegant historic venue in Manhattan Financial District specializing in Bar and Bat Mitzvah celebrations with customizable themes and full-service event planning',
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
                name: 'Customizable Decor',
                value:
                  'Extensive inventory with thousands of props for personalized themes',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Youth-Friendly Space',
                value:
                  'Ample space for teenagers to celebrate with friends and family',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Mezzanine',
                value:
                  '30-foot ceilings and dramatic architecture for memorable photos',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Entertainment Options',
                value:
                  'DJ services, photo booths, karaoke, and novelty entertainment available',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Catering Services',
                value: 'Kosher and non-kosher catering options available',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Expert Event Planning',
                value:
                  'Dedicated event planners with Bar/Bat Mitzvah experience',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Flexible Layouts',
                value:
                  'Ceremony space, dining area, and dance floor configurations',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Historic Elegance',
                value:
                  'Original 1920s architecture provides sophisticated backdrop',
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
                name: 'How many guests can 48 Wall Street accommodate for a Bar or Bat Mitzvah?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street can accommodate Bar and Bat Mitzvah celebrations for 50 to 500 guests. The venue offers flexible configurations including intimate gatherings and large celebrations with room for ceremonies, dining, and dancing.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can we customize the decor and theme for our Bar/Bat Mitzvah?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! 48 Wall Street has an extensive inventory with thousands of props and decor options. Whether you want a colorful, modern theme or a classic, elegant celebration, our event planners will help bring your vision to life with customizable decor, lighting, and centerpieces.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does 48 Wall Street offer kosher catering for Bar/Bat Mitzvahs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street works with exclusive catering partners who can provide both kosher and non-kosher catering options. We can customize menus to accommodate dietary restrictions and preferences for your Bar or Bat Mitzvah celebration.',
                },
              },
              {
                '@type': 'Question',
                name: 'What entertainment options are available for Bar/Bat Mitzvahs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street can coordinate various entertainment options including DJ services, live music, photo booths, karaoke, dancers, and novelty entertainment perfect for teenagers. Our event team works with trusted entertainment vendors to create a fun celebration.',
                },
              },
              {
                '@type': 'Question',
                name: 'How far in advance should we book for a Bar or Bat Mitzvah?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We recommend booking your Bar or Bat Mitzvah 12-18 months in advance, especially for popular dates like spring and fall weekends. This ensures you have your preferred date and gives ample time for planning. Contact us at 1.877.885.0705 to check availability.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does the venue provide event planning services?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street provides experienced event planners who specialize in Bar and Bat Mitzvahs. They will help you with every detail from theme selection and decor to catering coordination and timeline planning, ensuring your celebration is stress-free and memorable.',
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
            name: 'Bar & Bat Mitzvah Events',
            description:
              'Premier Bar and Bat Mitzvah venue in Manhattan with customizable themes, full-service planning, and historic elegance',
            url: 'https://www.48wallnyc.com/events/bar-bat-mitzvahs',
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
              'Bar Mitzvahs',
              'Bat Mitzvahs',
              'Jewish Celebrations',
              'Coming of Age Celebrations',
              'Youth Parties',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
