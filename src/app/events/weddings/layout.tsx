import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unique Historic Wedding Venue | 48 Wall Street NYC',
  description:
    "Host unforgettable events at 48 Wall Street in Manhattan's Financial District. From corporate conferences and weddings to Bar/Bat Mitzvahs, fashion shows, film shoots, holiday parties, and nonprofit galas in our historic 1920s venue.",
  keywords:
    'NYC corporate events, Manhattan wedding venue, Bar Mitzvah venue NYC, Bat Mitzvah Financial District, conference venue Manhattan, fashion show space NYC, film shoot location, holiday party venue, nonprofit gala space, corporate holiday party NYC',
  openGraph: {
    title: 'Events at 48 Wall Street NYC - Historic Venue for Every Occasion',
    description:
      "Versatile historic venue for corporate events, weddings, Bar/Bat Mitzvahs, fashion shows, film productions, and celebrations in Manhattan's Financial District.",
    url: 'https://www.48wallnyc.com/events',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/events-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Diverse Events at 48 Wall Street Historic Venue NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events - 48 Wall Street NYC',
    description:
      "Corporate events, weddings, Bar Mitzvahs, fashion shows & more in Manhattan's premier historic venue.",
    images: ['/images/events-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events',
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
            telephone: '+1-877-885-0705',
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
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
