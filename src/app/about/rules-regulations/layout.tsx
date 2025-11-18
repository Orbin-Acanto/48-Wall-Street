import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Rules & Regulations | 48 Wall Street NYC - Venue Policies & Event Guidelines',
  description:
    'Review venue rules, regulations, and event policies for 48 Wall Street NYC. Learn about event guidelines, insurance requirements, vendor policies, setup procedures, and venue restrictions for hosting corporate events, weddings, and celebrations in our historic Manhattan Financial District venue.',
  keywords:
    '48 Wall Street rules, NYC venue policies, event venue regulations, venue guidelines Manhattan, event policies NYC, venue restrictions, insurance requirements, vendor policies, event setup rules, Financial District venue policies, 48 Wall Street regulations, venue event guidelines',
  openGraph: {
    title: 'Rules & Regulations | 48 Wall Street NYC Event Venue Policies',
    description:
      'Important venue policies and event guidelines for 48 Wall Street. Review rules, regulations, and requirements for planning your Manhattan event.',
    url: 'https://www.48wallnyc.com/about/rules-regulations',
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
    title: 'Rules & Regulations | 48 Wall Street NYC',
    description:
      'Venue policies and event guidelines for planning your event at 48 Wall Street NYC historic venue.',
    images: ['/images/twitter-home.jpg'],
    site: '@48wallst',
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/about/rules-regulations',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function RulesRegulationsLayout({
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
            name: 'Rules & Regulations',
            description:
              'Venue policies, event guidelines, and regulations for hosting events at 48 Wall Street NYC',
            url: 'https://www.48wallnyc.com/about/rules-regulations',
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
                name: 'Rules & Regulations',
                item: 'https://www.48wallnyc.com/about/rules-regulations',
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
            '@type': 'DigitalDocument',
            name: '48 Wall Street Venue Rules & Regulations',
            description:
              'Official venue policies, event guidelines, and regulations for hosting events at 48 Wall Street NYC',
            about: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
              description:
                'Historic event venue in Manhattan Financial District',
            },
            publisher: {
              '@type': 'Organization',
              name: '48 Wall Street Events',
              url: 'https://www.48wallnyc.com',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-877-885-0705',
                contactType: 'Customer Service',
                email: 'info@48WallNYC.com',
                availableLanguage: 'English',
                areaServed: 'US',
              },
            },
            inLanguage: 'en-US',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Venue Policies & Guidelines',
            description:
              'Important policies and guidelines for events at 48 Wall Street',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Event Guidelines',
                description:
                  'General event policies and venue usage guidelines',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Insurance Requirements',
                description: 'Required insurance coverage for events',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Vendor Policies',
                description: 'Approved vendor lists and vendor requirements',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Setup & Breakdown',
                description: 'Event setup and breakdown procedures and timing',
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Venue Restrictions',
                description:
                  'Building restrictions and prohibited items or activities',
              },
              {
                '@type': 'ListItem',
                position: 6,
                name: 'Safety Requirements',
                description: 'Safety protocols and emergency procedures',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
