import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Event Videos & Reels | 48 Wall Street NYC - Corporate, Wedding & Social Events',
  description:
    'Watch event videos and reels from 48 Wall Street NYC. Explore our historic Financial District venue hosting corporate events, weddings, Bar/Bat Mitzvahs, non-profit galas, and social celebrations. See our Grand Mezzanine, 30-foot ceilings, and stunning 1920s architecture in action.',
  keywords:
    '48 Wall Street videos, NYC event venue videos, corporate event videos, wedding venue videos NYC, event reels Manhattan, Bar Mitzvah videos, non-profit gala videos, Financial District venue videos, Grand Mezzanine videos, historic venue events NYC, Manhattan event space videos, 48 Wall Street portfolio',
  openGraph: {
    title: 'Event Videos & Reels | 48 Wall Street NYC Historic Venue',
    description:
      "Watch stunning event videos from 48 Wall Street - Manhattan's premier historic venue. See corporate events, weddings, and celebrations in our iconic 1927 building.",
    url: 'https://www.48wallnyc.com/about/event-video',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street event videos showcasing corporate events, weddings and celebrations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Videos | 48 Wall Street NYC',
    description:
      "Watch event videos from Manhattan's premier historic venue. Corporate events, weddings & celebrations in our stunning 1927 landmark.",
    images: ['/images/twitter-home.jpg'],
    site: '@48wallst',
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/about/event-video',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function EventVideoLayout({
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
            '@type': 'VideoGallery',
            name: '48 Wall Street Event Videos & Reels',
            description:
              'Collection of event videos showcasing corporate events, weddings, Bar/Bat Mitzvahs, non-profit galas, and social celebrations at 48 Wall Street NYC',
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
              telephone: '1.877.885.0705',
              email: 'info@48WallNYC.com',
              url: 'https://www.48wallnyc.com',
            },
            about: [
              {
                '@type': 'Thing',
                name: 'Corporate Events',
                description:
                  'Corporate meetings, conferences, product launches, and company celebrations',
              },
              {
                '@type': 'Thing',
                name: 'Social Events',
                description:
                  'Private celebrations, milestone events, and social gatherings',
              },
              {
                '@type': 'Thing',
                name: 'Weddings',
                description:
                  'Wedding ceremonies and receptions in historic Manhattan venue',
              },
              {
                '@type': 'Thing',
                name: 'Non-Profit Events',
                description:
                  'Charity galas, fundraisers, and non-profit events',
              },
              {
                '@type': 'Thing',
                name: 'Bar & Bat Mitzvahs',
                description:
                  'Bar Mitzvah and Bat Mitzvah celebrations in Financial District',
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
                name: 'About',
                item: 'https://www.48wallnyc.com/about',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Event Videos',
                item: 'https://www.48wallnyc.com/about/event-video',
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
            name: 'Event Videos & Reels',
            description:
              'Video gallery showcasing events at 48 Wall Street including corporate events, weddings, Bar/Bat Mitzvahs, and non-profit galas',
            url: 'https://www.48wallnyc.com/about/event-video',
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
            },
            mainEntity: {
              '@type': 'ItemList',
              name: 'Event Video Categories',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Corporate Event Videos',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Social Event Videos',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Wedding Videos',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Non-Profit Event Videos',
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Bar & Bat Mitzvah Videos',
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
