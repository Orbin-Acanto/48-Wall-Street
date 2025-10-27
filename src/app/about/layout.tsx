import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | 48 Wall Street NYC - Historic Venue Since 1928',
  description:
    "Discover the history of 48 Wall Street, Manhattan's premier historic event venue. Explore our story, meet our team, view floor plans, virtual tours, and learn about our 1920s landmark venue in the Financial District.",
  keywords:
    'about 48 Wall Street, historic venue NYC history, Bank of New York building, Alexander Hamilton venue, Financial District landmark, 1928 historic building, Manhattan event venue team, venue floor plans NYC',
  openGraph: {
    title: 'About 48 Wall Street NYC - Historic Event Venue',
    description:
      "Learn about Manhattan's iconic 1928 landmark venue. Explore our history, team, virtual tours, and floor plans.",
    url: 'https://www.48wallnyc.com/about',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/about-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Historic 48 Wall Street Building Manhattan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - 48 Wall Street NYC',
    description:
      "Discover the story behind Manhattan's most distinguished historic event venue since 1928.",
    images: ['/images/about-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/about',
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
              description:
                'Historic 1928 landmark event venue, former Bank of New York building with original architectural details',
              foundingDate: '1928',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.7074,
                longitude: -74.0089,
              },
              url: 'https://www.48wallnyc.com',
              historicalData: {
                '@type': 'HistoricalData',
                description:
                  "Former Bank of New York building, cornerstone laid January 12, 1928 on Alexander Hamilton's 171st birthday",
              },
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
