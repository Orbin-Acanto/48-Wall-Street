import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Wedding Space Wall Street | Historic NYC Wedding Venue Lower Manhattan',
  description:
    'Celebrate your love at 48 Wall Street. A stunning historic downtown venue and premier wedding space on Wall Street, offering timeless elegance for ceremonies and receptions.',
  keywords:
    'wedding venue NYC, Manhattan wedding venue, historic wedding venue NYC, Financial District wedding, elegant wedding space Manhattan, grand wedding venue NYC, wedding venue with history, Lower Manhattan wedding, Wall Street wedding venue, wedding venue with marble staircase, 1920s wedding venue, wedding reception venue NYC, Manhattan wedding ceremony, wedding venue with catering NYC, unique wedding venue Manhattan, rent venue for wedding NYC, ballrooms for weddings NYC, wedding banquet hall Manhattan',
  openGraph: {
    title:
      'Historic Wedding Venue NYC | Wall Street Wedding Space Lower Manhattan | 48 Wall Street',
    description:
      'Celebrate your love at 48 Wall Street. A stunning historic downtown venue and premier wedding space on Wall Street, offering timeless elegance for ceremonies and receptions for 50-500 guests.',
    url: 'https://www.48wallnyc.com/events/weddings',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/gallery/wedding/21.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street historic wedding venue NYC — grand marble staircase and 30-foot ceilings in the Financial District',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Historic Wedding Venue NYC | 48 Wall Street Financial District',
    description:
      'Elegant Manhattan wedding venue. Grand marble staircase, 30-foot ceilings, historic 1920s architecture, full planning & catering for 50-500 guests.',
    images: ['/gallery/wedding/21.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/weddings',
  },
};

export default function EventsLayout({
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
            '@type': 'EventVenue',
            name: '48 Wall Street',
            description:
              'Historic event venue hosting corporate events, weddings, Bar and Bat Mitzvahs, conferences, fashion shows, film shoots, holiday parties, and nonprofit galas',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            telephone: '212.971.5353',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 40.7074,
              longitude: -74.0089,
            },
            url: 'https://www.48wallnyc.com',
            eventType: [
              'Corporate Event',
              'Wedding',
              'Bar Mitzvah',
              'Bat Mitzvah',
              'Conference',
              'Fashion Show',
              'Film Production',
              'Holiday Party',
              'Nonprofit Gala',
              'Social Event',
            ],
            maximumAttendeeCapacity: 500,
            amenityFeature: [
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Mezzanine Banking Hall',
                value: '9000 square feet',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Concourse Level',
                value: '3500 square feet with breakout rooms',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Historic Architecture',
                value: '1920s original details, 30-foot ceilings',
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
                name: 'Weddings',
                item: 'https://www.48wallnyc.com/events/weddings',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
