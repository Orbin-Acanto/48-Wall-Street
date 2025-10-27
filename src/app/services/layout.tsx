import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Services | 48 Wall Street NYC - Catering, Production & Rentals',
  description:
    'Complete event services at 48 Wall Street in Manhattan. Professional catering, full-scale production, and premium event rentals for corporate events, weddings, and celebrations in the Financial District.',
  keywords:
    'event services NYC, catering services Manhattan, event production Financial District, event rentals NYC, wedding catering Manhattan, corporate event services, full-service venue NYC, event planning services',
  openGraph: {
    title: 'Event Services - 48 Wall Street NYC',
    description:
      'Comprehensive event services including catering, production, and rentals for your Manhattan celebration.',
    url: 'https://www.48wallnyc.com/services/production',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/services-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Event Services at 48 Wall Street NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Services - 48 Wall Street NYC',
    description:
      'Professional catering, production & rental services for your Manhattan event.',
    images: ['/images/services-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/services/production',
  },
};

export default function ServicesLayout({
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
            serviceType: 'Event Services',
            provider: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              url: 'https://www.48wallnyc.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'New York',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Event Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Event Production Services',
                    description:
                      'Full-scale event production including AV, lighting, staging, and technical support',
                    url: 'https://www.48wallnyc.com/services/production',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Catering Services',
                    description:
                      'Professional catering with customizable menus for all event types',
                    url: 'https://www.48wallnyc.com/services/catering',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Event Rental Services',
                    description:
                      'Furniture, props, decor, and interactive items for events',
                    url: 'https://www.48wallnyc.com/services/rentals',
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
                name: 'Services',
                item: 'https://www.48wallnyc.com/services/production',
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
            '@type': 'ItemList',
            name: 'Event Services Navigation',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Production',
                url: 'https://www.48wallnyc.com/services/production',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Catering',
                url: 'https://www.48wallnyc.com/services/catering',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Rentals',
                url: 'https://www.48wallnyc.com/services/rentals',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
