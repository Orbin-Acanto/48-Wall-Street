import { CartProvider } from '@/contexts/CartContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Event Rentals | 48 Wall Street NYC - Furniture, Props, Decor & Interactive Items',
  description:
    "Rent event furniture, theme props, interactive items, and custom decor for your celebration at 48 Wall Street. Complete event rental solutions for corporate events, weddings, and parties in Manhattan's Financial District.",
  keywords:
    'event furniture rental NYC, theme props Manhattan, event decor rental, interactive event items, custom decor Financial District, party furniture rental NYC, event rental services Manhattan, wedding furniture rental, corporate event rentals NYC',
  openGraph: {
    title: 'Event Rentals - 48 Wall Street NYC',
    description:
      'Browse event furniture, props, decor, and interactive rentals. Complete your celebration with our curated rental collection.',
    url: 'https://www.48wallnyc.com/rentals',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/rentals-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Event Furniture and Decor Rentals at 48 Wall Street NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Rentals - 48 Wall Street NYC',
    description:
      'Furniture, props, decor & interactive items for your Manhattan event.',
    images: ['/images/rentals-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/rentals',
  },
};

export default function RentalsLayout({
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
            '@type': 'Store',
            name: '48 Wall Street Event Rentals',
            description:
              'Event furniture, theme props, interactive items, and custom decor rental services',
            url: 'https://www.48wallnyc.com/rentals',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            priceRange: '$$',
            areaServed: {
              '@type': 'City',
              name: 'New York',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Event Rental Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Event Furniture Rentals',
                    description:
                      'Tables, chairs, lounge furniture, and seating arrangements',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Theme Props',
                    description:
                      'Decorative props for themed events and celebrations',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Interactive Items',
                    description:
                      'Games, photo booths, and interactive event elements',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Custom Decor',
                    description:
                      'Personalized decorations and event styling elements',
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
                name: 'Event Rentals',
                item: 'https://www.48wallnyc.com/rentals',
              },
            ],
          }),
        }}
      />
      <CartProvider>{children}</CartProvider>
    </>
  );
}
