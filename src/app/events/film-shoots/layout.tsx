import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Film Shoot Location NYC | Historic Venue & Holding Space Lower Manhattan',
  description:
    'Secure 48 Wall Street for your next production. A historic NYC venue in Lower Manhattan offering grand architecture for film shoots, ample holding space, and entertainment events.',
  keywords:
    'NYC film location, Manhattan filming location, historic film set NYC, TV production venue, film shoot location Manhattan, Financial District filming, commercial shoot location NYC, photo shoot venue Manhattan, period film location, bank building film set, 1920s architecture filming, Wall Street film location, production venue NYC, movie location Manhattan, TV series location, historic building filming NYC',
  openGraph: {
    title:
      'NYC Film Location | Historic Production Venue | 48 Wall Street Manhattan',
    description:
      'Film in a stunning 1927 historic building. 48 Wall Street offers original 1920s architecture, grand marble staircase, 30-foot ceilings, and production support for films, TV shows, and commercials.',
    url: 'https://www.48wallnyc.com/events/film-shoots',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/gallery/gallery-01.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street historic 1927 bank building interior NYC — grand architecture for film and TV production',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYC Film Location | 48 Wall Street',
    description:
      'Historic 1927 Manhattan location for film, TV & commercial productions. Original architecture, grand spaces, production support.',
    images: ['/gallery/gallery-01.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/film-shoots',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function FilmShootsLayout({
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
            serviceType: 'Film Production Location',
            name: 'Film & TV Production at 48 Wall Street',
            description:
              'Historic 1927 Bank of New York building available for film shoots, TV productions, commercials, and photo shoots. Features stunning original 1920s architecture including grand marble staircase, 30-foot ceilings with chandeliers, Palladian windows, and spacious interiors perfect for period pieces and contemporary productions. Full production support, cast & crew holding areas, and flexible filming hours available.',
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
                'Film Production Companies, TV Studios, Commercial Producers, Photographers',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Film & TV Production Services',
                description:
                  'Complete filming location services including location rental, production support, cast/crew holding, and technical accommodations',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Production Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Feature Film Shoots',
                    description:
                      'Full-scale film production location with historic architecture',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'TV Series Production',
                    description:
                      'Episodic filming location for television series',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Commercial Shoots',
                    description:
                      'Professional location for commercial and advertisement filming',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Photo Shoots',
                    description:
                      'Stunning backdrop for fashion, editorial, and commercial photography',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Cast & Crew Holding',
                    description:
                      'Comfortable holding areas for cast, crew, and equipment',
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
                name: 'Film & TV Shoots',
                item: 'https://www.48wallnyc.com/events/film-shoots',
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
            name: '48 Wall Street Film Location',
            description:
              'Historic 1927 Bank of New York building in Manhattan Financial District available for film and television production with original 1920s architecture',
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
            amenityFeature: [
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Historic 1920s Architecture',
                value:
                  'Original Bank of New York building with period architectural details',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Marble Staircase',
                value:
                  'Dramatic dual marble staircase ideal for cinematic shots',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: '30-Foot Ceilings',
                value:
                  'Soaring ceilings with oversized chandeliers for dramatic filming',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Palladian Windows',
                value: 'Beautiful natural light from original tall windows',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Spacious Interiors',
                value: 'Multiple large filming spaces across three floors',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Production Support',
                value: 'On-site support staff for production coordination',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Cast & Crew Holding',
                value:
                  'Multiple rooms available for cast, crew, and equipment holding',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Flexible Hours',
                value:
                  'Available for day and night shoots with flexible scheduling',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Financial District Location',
                value: 'Prime downtown Manhattan location near Wall Street',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Period Authentic',
                value:
                  'Perfect for period pieces set in 1920s-1940s or modern financial dramas',
              },
            ],
            publicAccess: false,
            smokingAllowed: false,
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Building Type',
                value: 'Historic Bank Building',
              },
              {
                '@type': 'PropertyValue',
                name: 'Year Built',
                value: '1927',
              },
              {
                '@type': 'PropertyValue',
                name: 'Historic Designation',
                value: 'National Register of Historic Places (2003)',
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
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What makes 48 Wall Street a good filming location?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street is a historic 1927 Bank of New York building with stunning original architecture including a grand marble staircase, 30-foot ceilings with chandeliers, Palladian windows, and authentic period details. The location is perfect for financial dramas, period pieces, and contemporary productions requiring elegant, sophisticated backdrops.',
                },
              },
              {
                '@type': 'Question',
                name: 'What types of productions can film at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street accommodates feature films, television series, commercials, music videos, photo shoots, and documentary productions. Our versatile historic spaces work for period pieces, financial dramas, fashion shoots, and contemporary productions of all sizes.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there holding areas for cast and crew?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street offers multiple spacious areas that can serve as cast holding, crew base camp, wardrobe, hair/makeup stations, and equipment storage. Our Concourse Level and Banking Hall provide flexible spaces adjacent to main filming areas.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the filming hours at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street offers flexible filming hours to accommodate production schedules including day shoots, night shoots, and extended hours. We work with production teams to coordinate timing that meets their needs. Contact us at 1.877.885.0705 to discuss your production schedule.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does 48 Wall Street provide production support?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street provides on-site support staff to assist with production coordination, building access, technical needs, and logistics. We work closely with location managers and production teams to ensure smooth, efficient filming.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I book 48 Wall Street for a film or TV shoot?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "To book 48 Wall Street for filming, contact us at 1.877.885.0705 or email info@48WallNYC.com. We'll arrange a location scout, discuss your production needs, provide rate information, and coordinate all details with your location manager and production team.",
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
            name: 'Film & TV Production Location',
            description:
              'Historic Manhattan filming location for movies, TV shows, commercials, and photo shoots with 1920s architecture and production support',
            url: 'https://www.48wallnyc.com/events/film-shoots',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'Place',
              name: '48 Wall Street Film Location',
            },
            specialty: [
              'Film Production Location',
              'TV Series Filming',
              'Commercial Shoots',
              'Photo Shoots',
              'Period Film Location',
              'Financial Drama Setting',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
