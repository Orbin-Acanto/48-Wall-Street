import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Fashion Show Venues in NYC | Where Style Meets Glamour',
  description:
    'Showcase your collection at 48 Wall Street, a premier NYC fashion show event space. Our historic Lower Manhattan venue offers the perfect dramatic backdrop for New York Fashion Week run of shows.',
  keywords:
    'fashion show venue NYC, runway venue Manhattan, fashion event space NYC, designer showcase venue, fashion week venue NYC, runway event space, Manhattan fashion show location, Financial District fashion venue, fashion presentation space, trunk show venue NYC, brand launch venue, fashion industry events NYC, designer runway NYC, fashion show space Manhattan, New York fashion venue, historic fashion venue',
  openGraph: {
    title: 'Fashion Show Venue NYC | Runway Events Manhattan | 48 Wall Street',
    description:
      'Showcase your fashion collection at 48 Wall Street. Historic Manhattan venue with grand marble staircase runway, 30-foot ceilings, professional lighting, and dramatic 1920s architecture. Perfect for fashion shows and designer events.',
    url: 'https://www.48wallnyc.com/events/fashion-shows',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/gallery/fashion/fashion-01.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street fashion show venue NYC — runway event on the grand marble staircase in the Financial District',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashion Show Venue NYC | 48 Wall Street',
    description:
      'Premier Manhattan fashion show venue. Grand marble staircase runway, 30-foot ceilings, professional lighting & historic architecture.',
    images: ['/gallery/fashion/fashion-01.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/fashion-shows',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function FashionShowsLayout({
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
            serviceType: 'Fashion Show Venue',
            name: 'Fashion Shows at 48 Wall Street',
            description:
              "Premier fashion show and runway event venue in Manhattan's Financial District. Features dramatic grand marble staircase ideal for runway presentations, 30-foot ceilings, professional lighting and AV systems, backstage areas, and stunning 1920s architecture. Perfect for designer showcases, fashion week events, trunk shows, and brand launches with capacity for 200-500 guests.",
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
              audienceType:
                'Fashion Designers, Fashion Brands, Fashion Industry Professionals',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Fashion Show Event Services',
                description:
                  'Complete fashion show services including venue rental, runway setup, professional lighting and AV, backstage coordination, and event production',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Fashion Event Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Runway Fashion Shows',
                    description:
                      'Full runway setup with grand marble staircase and professional staging',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Designer Showcases',
                    description:
                      'Intimate designer presentations and collection reveals',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Fashion Week Events',
                    description:
                      'Official and unofficial New York Fashion Week venue',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Trunk Shows',
                    description:
                      'Elegant space for exclusive trunk show presentations',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Brand Launches',
                    description:
                      'Dramatic venue for fashion brand launch events',
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
                name: 'Fashion Shows',
                item: 'https://www.48wallnyc.com/events/fashion-shows',
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
            name: '48 Wall Street Fashion Show Venue',
            description:
              'Historic Manhattan venue specializing in fashion shows and runway events with dramatic grand marble staircase, 30-foot ceilings, and professional production capabilities',
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
                name: 'Grand Marble Staircase',
                value:
                  'Dramatic dual marble staircase perfect for runway presentations',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: '30-Foot Ceilings',
                value:
                  'Soaring ceilings with oversized chandeliers for dramatic effect',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Professional Lighting',
                value: 'Premium lighting systems for runway and photography',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'AV Production',
                value:
                  'State-of-the-art sound systems and multimedia capabilities',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Backstage Areas',
                value:
                  'Multiple spaces for dressing rooms, hair/makeup, and model preparation',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Historic Architecture',
                value:
                  'Original 1920s Palladian windows and architectural details',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Flexible Seating',
                value:
                  'Runway seating configurations for press, buyers, and VIP guests',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Financial District Location',
                value:
                  'Prime Manhattan location accessible for fashion industry professionals',
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
                name: 'What makes 48 Wall Street ideal for fashion shows?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street features a dramatic grand marble staircase that serves as a perfect runway, 30-foot ceilings with stunning chandeliers, Palladian windows for natural light, and original 1920s architecture that provides a sophisticated backdrop. Our professional lighting and AV systems are designed for fashion presentations and photography.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many guests can attend a fashion show at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street can accommodate fashion shows for 200-500 guests depending on the runway configuration and seating layout. We can arrange traditional runway seating, standing room presentations, or intimate showcase formats.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there backstage and dressing room facilities available?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street offers multiple areas that can be configured as backstage spaces, dressing rooms, hair and makeup stations, and model preparation areas. Our Banking Hall and Concourse Level provide flexible backstage options adjacent to the main presentation space.',
                },
              },
              {
                '@type': 'Question',
                name: 'What lighting and AV equipment is available for fashion shows?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street provides professional lighting systems designed for runway shows and fashion photography, state-of-the-art sound systems, multimedia projection capabilities, and technical support. Our in-house event services team ensures seamless production for your fashion event.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can 48 Wall Street host New York Fashion Week events?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street has hosted Fashion Week events and is an ideal venue for official and unofficial NYFW presentations. Our historic architecture, professional production capabilities, and prime Financial District location make us a sought-after fashion show venue. Contact us at 1.877.885.0705 to discuss your Fashion Week needs.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is catering available for fashion show events?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street offers full-service catering through our exclusive vendors for fashion show receptions, after-parties, and VIP gatherings. We can provide cocktail receptions, seated dinners, or custom catering for press and industry events.',
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
            name: 'Fashion Shows & Runway Events',
            description:
              'Premier Manhattan fashion show venue with grand marble staircase runway, professional lighting, and historic 1920s architecture',
            url: 'https://www.48wallnyc.com/events/fashion-shows',
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
              'Fashion Shows',
              'Runway Events',
              'Designer Showcases',
              'Fashion Week Events',
              'Trunk Shows',
              'Brand Launches',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
