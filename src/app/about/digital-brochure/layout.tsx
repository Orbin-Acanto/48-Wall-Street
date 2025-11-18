import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Digital Brochure | 48 Wall Street NYC - Venue Information & Event Guide',
  description:
    'Download the 48 Wall Street digital brochure. Explore our historic 1927 Financial District venue, view event spaces, catering options, floor plans, and detailed information about hosting corporate events, weddings, and celebrations in Manhattan. Complete venue guide with photos and pricing information.',
  keywords:
    '48 Wall Street brochure, NYC venue brochure, event venue PDF, Manhattan venue information, Financial District venue guide, 48 Wall Street PDF, venue brochure download, event space information NYC, catering brochure, venue floor plans PDF, corporate event venue brochure',
  openGraph: {
    title: 'Digital Brochure | 48 Wall Street NYC Historic Venue Information',
    description:
      "Download our comprehensive venue brochure. Explore 48 Wall Street's historic spaces, catering options, and event capabilities in Manhattan's Financial District.",
    url: 'https://www.48wallnyc.com/about/digital-brochure',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street digital brochure - venue information and event guide',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Brochure | 48 Wall Street NYC',
    description:
      'Download our venue brochure with complete event space information, catering options, and historic venue details.',
    images: ['/images/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/about/digital-brochure',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function DigitalBrochureLayout({
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
            '@type': 'DigitalDocument',
            name: '48 Wall Street NYC Digital Brochure',
            description:
              "Comprehensive venue brochure featuring historic venue information, event spaces, catering options, floor plans, and detailed information about 48 Wall Street event venue in Manhattan's Financial District",
            about: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
              description:
                "Historic 1927 Bank of New York building in Manhattan's Financial District",
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
              url: 'https://www.48wallnyc.com',
            },
            publisher: {
              '@type': 'Organization',
              name: '48 Wall Street Events',
              url: 'https://www.48wallnyc.com',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-877-885-0705',
                contactType: 'Sales',
                email: 'info@48WallNYC.com',
                availableLanguage: 'English',
              },
            },
            keywords:
              'event venue brochure, Manhattan venue information, historic venue NYC, corporate events, weddings, catering services, Financial District venue',
            inLanguage: 'en-US',
            fileFormat: 'application/pdf',
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
                name: 'Digital Brochure',
                item: 'https://www.48wallnyc.com/about/digital-brochure',
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
            name: 'Digital Brochure',
            description:
              'Download the 48 Wall Street digital brochure with complete venue information, event spaces, catering options, and historic details',
            url: 'https://www.48wallnyc.com/about/digital-brochure',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
            },
            mainEntity: {
              '@type': 'DigitalDocument',
              name: '48 Wall Street Venue Brochure',
              encodingFormat: 'application/pdf',
              description:
                'Complete venue information including history, event spaces, Grand Mezzanine details, catering services, floor plans, and event photography',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Brochure Contents',
            description:
              'Information included in 48 Wall Street digital brochure',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Venue History',
                description:
                  '1927 Bank of New York building history and National Register of Historic Places designation',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Event Spaces',
                description:
                  'Grand Mezzanine, Banking Hall, and Concourse Level details',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Catering Services',
                description:
                  'Full-service catering options and menu information',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Event Types',
                description:
                  'Corporate events, weddings, Bar/Bat Mitzvahs, and private celebrations',
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Floor Plans',
                description: 'Detailed venue layouts and capacity information',
              },
              {
                '@type': 'ListItem',
                position: 6,
                name: 'Event Photography',
                description: 'Photos of past events and venue features',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
