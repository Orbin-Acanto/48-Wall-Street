import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Virtual Tour | 48 Wall Street NYC - 3D Interactive Venue Tour Manhattan',
  description:
    "Take a 3D virtual tour of 48 Wall Street NYC event venue. Explore our historic Grand Mezzanine with 30-foot ceilings and Concourse Level in immersive 3D. Walk through Manhattan's premier Financial District venue featuring original 1920s architecture, Palladian windows, and grand marble staircase from anywhere.",
  keywords:
    '48 Wall Street virtual tour, 3D venue tour NYC, virtual venue walkthrough, Manhattan venue 3D tour, interactive venue tour, Grand Mezzanine virtual tour, 360 venue tour NYC, Financial District venue tour, virtual event space tour, 3D venue viewing, NYC venue virtual reality, online venue tour',
  openGraph: {
    title: '3D Virtual Tour | 48 Wall Street NYC Historic Event Venue',
    description:
      'Experience 48 Wall Street in immersive 3D. Virtually tour our Grand Mezzanine and Concourse Level with 30-foot ceilings and historic 1920s architecture.',
    url: 'https://www.48wallnyc.com/about/virtual-tour',
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
    title: '3D Virtual Tour | 48 Wall Street NYC',
    description:
      'Take an immersive 3D tour of our historic Manhattan venue. Explore Grand Mezzanine and Concourse Level virtually.',
    images: ['/images/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/about/virtual-tour',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function VirtualTourLayout({
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
            name: '3D Virtual Tour',
            description:
              'Interactive 3D virtual tour of 48 Wall Street event venue featuring Grand Mezzanine and Concourse Level',
            url: 'https://www.48wallnyc.com/about/virtual-tour',
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
              telephone: '+1-877-885-0705',
              email: 'info@48WallNYC.com',
            },
            mainEntity: {
              '@type': 'VirtualLocation',
              name: '48 Wall Street 3D Virtual Tour',
              description:
                'Immersive 3D virtual tour showcasing Grand Mezzanine and Concourse Level',
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
                name: 'Virtual Tour',
                item: 'https://www.48wallnyc.com/about/virtual-tour',
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
            '@type': 'TouristAttraction',
            name: '48 Wall Street Virtual Tour Experience',
            description:
              '3D interactive virtual tour of historic 1927 event venue in Manhattan Financial District',
            url: 'https://www.48wallnyc.com/about/virtual-tour',
            touristType: [
              'Event Planners',
              'Corporate Clients',
              'Wedding Couples',
              'Private Event Hosts',
            ],
            isAccessibleForFree: true,
            publicAccess: true,
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
              'Experience our venue in immersive 3D with virtual tours of both floors',
            hasMap: {
              '@type': 'Map',
              mapType: '3D Virtual Tour',
              description:
                'Interactive 3D walkthrough of Grand Mezzanine and Concourse Level',
            },
            containsPlace: [
              {
                '@type': 'Place',
                name: 'Grand Mezzanine - Virtual Tour',
                description:
                  ' 3D virtual tour of main event space with 30-foot ceilings and 1920s architecture',
                maximumAttendeeCapacity: 500,
              },
              {
                '@type': 'Place',
                name: 'Concourse Level - Virtual Tour',
                description:
                  '3D virtual tour of lower level event space and breakout rooms',
                maximumAttendeeCapacity: 200,
              },
            ],
            amenityFeature: [
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Virtual Tour Access',
                value: '3D interactive walkthrough available online',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Viewing Experience',
                value: 'Immersive 360-degree virtual exploration',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
