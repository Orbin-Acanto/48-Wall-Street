import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Historic NYC Event Venue | About 48 Wall Street | Lower Manhattan Event Space',
  description:
    "Discover 48 Wall Street, a historic downtown venue in the Financial District. Built in 1927 as the Bank of New York, this unique event space blends Alexander Hamilton’s legacy with modern elegance.",
  keywords:
    '48 Wall Street history, Bank of New York building, 1927 historic venue, Alexander Hamilton, Financial District landmark, Grand Mezzanine NYC, historic bank venue, National Register Historic Places, 1920s architecture Manhattan, Palladian windows, marble staircase venue, event venue team NYC, 48 Wall Street testimonials, Lower Manhattan historic building',
  openGraph: {
    title: 'About 48 Wall Street | Historic 1927 Bank Building Event Venue NYC',
    description:
      "Explore the history of 48 Wall Street - Manhattan's iconic 1927 Bank of New York building. Meet our expert event team, hear from happy clients, and discover why our historic Financial District venue is perfect for your next event.",
    url: 'https://www.48wallnyc.com/about',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/shared/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street historic Bank of New York building exterior in Manhattan Financial District',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About 48 Wall Street | Historic NYC Event Venue',
    description:
      'Historic 1927 Bank of New York building in Financial District. Meet our team and discover why clients love our landmark venue.',
    images: ['/shared/og/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/about',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function AboutLayout({
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
            '@type': 'AboutPage',
            mainEntity: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
              alternateName: '48 Wall Street Events',
              description:
                "Historic 1927 Bank of New York & Trust Company building in Manhattan's Financial District. Features Grand Mezzanine Banking Hall with 30-foot ceilings, original 1920s architecture, Palladian windows, and grand marble staircase. Added to National Register of Historic Places in 2003.",
              foundingDate: '1927',
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
              telephone: '212.971.5353',
              email: 'info@48WallNYC.com',
              url: 'https://www.48wallnyc.com',
              maximumAttendeeCapacity: 500,
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Grand Mezzanine Banking Hall',
                  value: '30-foot ceilings with original 1920s architecture',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Seating Capacity',
                  value: '350 seated dinner guests',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Reception Capacity',
                  value: '500 cocktail reception guests',
                },
              ],
              smokingAllowed: false,
              publicAccess: true,
              isAccessibleForFree: false,
              additionalProperty: [
                {
                  '@type': 'PropertyValue',
                  name: 'Historic Designation',
                  value: 'National Register of Historic Places (2003)',
                },
                {
                  '@type': 'PropertyValue',
                  name: 'Original Building',
                  value: 'Bank of New York & Trust Company Building',
                },
                {
                  '@type': 'PropertyValue',
                  name: 'Cornerstone Date',
                  value:
                    'January 12, 1928 - 171st birthday of Alexander Hamilton',
                },
              ],
              sameAs: [
                'https://www.instagram.com/48wallst/',
                'https://www.facebook.com/48wallst/',
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
                name: 'About',
                item: 'https://www.48wallnyc.com/about',
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
            '@type': 'SiteNavigationElement',
            name: 'About Us Navigation',
            hasPart: [
              {
                '@type': 'WebPage',
                name: 'Our Company',
                url: 'https://www.48wallnyc.com/about',
              },
              {
                '@type': 'WebPage',
                name: 'Event Videos',
                url: 'https://www.48wallnyc.com/about/event-video',
              },
              {
                '@type': 'WebPage',
                name: 'Floor Plans',
                url: 'https://www.48wallnyc.com/about/floor-plans',
              },
              {
                '@type': 'WebPage',
                name: 'Digital Brochure',
                url: 'https://www.48wallnyc.com/about/digital-brochure',
              },
              {
                '@type': 'WebPage',
                name: 'Rules & Regulations',
                url: 'https://www.48wallnyc.com/about/rules-regulations',
              },
              {
                '@type': 'WebPage',
                name: 'Virtual Tour',
                url: 'https://www.48wallnyc.com/about/virtual-tour',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
