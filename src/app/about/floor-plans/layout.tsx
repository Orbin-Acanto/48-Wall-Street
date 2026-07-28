import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Floor Plans | 48 Wall Street NYC - Grand Mezzanine & Concourse Level Layouts',
  description:
    "View detailed floor plans of 48 Wall Street NYC event venue. Explore our Grand Mezzanine with 30-foot ceilings (350 seated, 500 reception) and Concourse Level layouts. See venue amenities, capacity information, and room configurations for corporate events, weddings, and celebrations in Manhattan's Financial District.",
  keywords:
    '48 Wall Street floor plans, NYC venue floor plans, Grand Mezzanine layout, Concourse Level floor plan, event venue layouts NYC, Manhattan venue capacity, Financial District venue floor plans, venue amenities NYC, event space configurations, 48 Wall Street seating capacity, venue layout Manhattan',
  openGraph: {
    title: 'Floor Plans & Amenities | 48 Wall Street NYC Historic Event Venue',
    description:
      'Explore 48 Wall Street floor plans featuring Grand Mezzanine and Concourse Level layouts. View venue amenities, capacity details, and space configurations for your Manhattan event.',
    url: 'https://www.48wallnyc.com/about/floor-plans',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/shared/og/og-home.jpg',
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
    title: 'Floor Plans | 48 Wall Street NYC',
    description:
      'View Grand Mezzanine and Concourse Level floor plans. Explore venue amenities and capacity information for your NYC event.',
    images: ['/shared/og/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/about/floor-plans',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function FloorPlansLayout({
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
            '@type': 'WebPage',
            name: 'Floor Plans & Venue Amenities',
            description:
              'Detailed floor plans and venue amenities for 48 Wall Street including Grand Mezzanine and Concourse Level layouts',
            url: 'https://www.48wallnyc.com/about/floor-plans',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
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
              maximumAttendeeCapacity: 500,
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
                name: 'About',
                item: 'https://www.48wallnyc.com/about',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Floor Plans',
                item: 'https://www.48wallnyc.com/about/floor-plans',
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
            '@type': 'Place',
            name: '48 Wall Street Event Venue',
            description:
              'Historic Manhattan event venue with two main levels: Grand Mezzanine and Concourse Level',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            containsPlace: [
              {
                '@type': 'Place',
                name: 'Grand Mezzanine',
                description:
                  'Main event space with 30-foot ceilings, Palladian windows, and original 1920s architecture',
                maximumAttendeeCapacity: 500,
                amenityFeature: [
                  {
                    '@type': 'LocationFeatureSpecification',
                    name: 'Ceiling Height',
                    value: '30 feet',
                  },
                  {
                    '@type': 'LocationFeatureSpecification',
                    name: 'Seated Capacity',
                    value: '350 guests',
                  },
                  {
                    '@type': 'LocationFeatureSpecification',
                    name: 'Reception Capacity',
                    value: '500 guests',
                  },
                  {
                    '@type': 'LocationFeatureSpecification',
                    name: 'Architectural Features',
                    value:
                      'Palladian windows, grand marble staircase, chandeliers',
                  },
                ],
              },
              {
                '@type': 'Place',
                name: 'Concourse Level',
                description:
                  'Lower level event space ideal for breakout sessions, meetings, and additional event space',
                maximumAttendeeCapacity: 200,
                amenityFeature: [
                  {
                    '@type': 'LocationFeatureSpecification',
                    name: 'Configuration',
                    value: 'Divisible into 6 smaller breakout rooms',
                  },
                  {
                    '@type': 'LocationFeatureSpecification',
                    name: 'Ideal For',
                    value: 'Meetings, breakout sessions, classes, conferences',
                  },
                ],
              },
            ],
            amenityFeature: [
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Audio Visual Equipment',
                value: 'State-of-the-art AV capabilities',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Catering',
                value: 'Full-service catering available',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Event Planning',
                value: 'Professional event planning services',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Historic Architecture',
                value: 'Original 1920s architectural details preserved',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
