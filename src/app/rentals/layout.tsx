import { CartProvider } from '@/contexts/CartContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Browse Event Rentals NYC | Furniture & Decor Catalog | 48 Wall Street Rental Inventory',
  description:
    "Browse MMEink's complete event rental catalog. View thousands of furniture, decor, props, staging, and catering rental items available for NYC events. Add items to cart and request a custom proposal for your Manhattan event. Explore lounge furniture, tables, chairs, linens, props, and specialty items. Get instant quotes for event rentals at 48 Wall Street and throughout NYC.",
  keywords:
    'browse event rentals NYC, rental catalog Manhattan, event furniture catalog, rental inventory NYC, event decor catalog, prop rental browse, furniture rental catalog, event equipment browse, rental quote NYC, event rental cart, Manhattan rental items, 48 Wall Street rentals, MMEink catalog, party rental inventory, wedding rental catalog NYC, corporate event rentals browse',
  openGraph: {
    title: 'Browse Event Rentals | Interactive Catalog | 48 Wall Street NYC',
    description:
      'Explore thousands of event rental items. Browse furniture, decor, props & equipment. Add to cart and request custom proposals for your Manhattan event.',
    url: 'https://www.48wallnyc.com/rentals',
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
    title: 'Browse Event Rentals | 48 Wall Street NYC',
    description:
      'Explore thousands of rental items. Browse, add to cart, request proposals for your Manhattan event.',
    images: ['/images/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/rentals',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function RentalsCatalogLayout({
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
            '@type': 'CollectionPage',
            name: 'Event Rental Catalog',
            description:
              'Browse and select from thousands of event rental items including furniture, decor, props, staging, and catering equipment for NYC events',
            url: 'https://www.48wallnyc.com/rentals',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'ItemList',
              name: 'Event Rental Inventory',
              description:
                'Comprehensive catalog of event rental items available for Manhattan events',
            },
            provider: {
              '@type': 'Organization',
              name: 'MMEink',
              telephone: '212.971.5353',
              email: 'info@48WallNYC.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street, Lobby 1',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
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
                name: 'Rental Catalog',
                item: 'https://www.48wallnyc.com/rentals',
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
            name: 'Event Rental Catalog',
            description:
              'Interactive catalog to browse, select, and request proposals for event rental items',
            url: 'https://www.48wallnyc.com/rentals',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            potentialAction: [
              {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://www.48wallnyc.com/rentals?search={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
              {
                '@type': 'OrderAction',
                name: 'Request Rental Proposal',
                description:
                  'Add items to cart and submit for custom rental proposal',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.48wallnyc.com/rentals/cart',
                },
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
            name: 'Event Rental Categories',
            description:
              'Categories of rental items available for browsing and selection',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@type': 'OfferCatalog',
                  name: 'Furniture Rentals',
                  description:
                    'Lounge furniture, sofas, chairs, tables, bars, and seating options',
                },
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@type': 'OfferCatalog',
                  name: 'Decor & Props',
                  description:
                    'Decorative items, centerpieces, props, and themed elements',
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@type': 'OfferCatalog',
                  name: 'Tables & Chairs',
                  description:
                    'Dining tables, cocktail tables, banquet chairs, and specialty seating',
                },
              },
              {
                '@type': 'ListItem',
                position: 4,
                item: {
                  '@type': 'OfferCatalog',
                  name: 'Linens',
                  description:
                    'Tablecloths, napkins, runners, overlays, and specialty linens',
                },
              },
              {
                '@type': 'ListItem',
                position: 5,
                item: {
                  '@type': 'OfferCatalog',
                  name: 'Staging',
                  description:
                    'Stages, platforms, risers, backdrops, and presentation equipment',
                },
              },
              {
                '@type': 'ListItem',
                position: 6,
                item: {
                  '@type': 'OfferCatalog',
                  name: 'Catering Equipment',
                  description:
                    'China, glassware, flatware, serving pieces, and buffet displays',
                },
              },
              {
                '@type': 'ListItem',
                position: 7,
                item: {
                  '@type': 'OfferCatalog',
                  name: 'Specialty Items',
                  description:
                    'Unique props, themed items, and custom rental pieces',
                },
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
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do I browse and select rental items?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Browse our complete rental catalog by category including furniture, decor, props, staging, and catering equipment. Click on items to view details, pricing, and availability. Add desired items to your cart and submit a proposal request to receive a custom quote for your event.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I add multiple items to my cart?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can add as many rental items as needed to your cart. Browse through our thousands of available items, select quantities, and build a complete rental package for your event. Once complete, submit your cart to receive a custom proposal.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the proposal request process work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'After adding items to your cart, submit a proposal request with your event details including date, location, and any special requirements. Our rental team will review your selections, confirm availability, and provide a comprehensive quote with pricing, delivery, setup, and pickup details.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are rental prices shown in the catalog?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Rental prices may be displayed for individual items in the catalog. Final pricing in your custom proposal will include quantities, event duration, delivery fees, setup costs, and any package discounts. Contact us at 1.877.885.0705 for immediate pricing information.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I see availability for specific event dates?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'When submitting your proposal request, include your event date and we will confirm availability of all selected items. Our rental inventory is extensive, but popular items during peak season should be reserved early.',
                },
              },
              {
                '@type': 'Question',
                name: 'What areas do you deliver rentals to?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'MMEink delivers event rentals throughout NYC and the surrounding areas. Delivery, setup, and pickup services are available for events at 48 Wall Street and external locations. Delivery fees vary based on location and order size.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I request custom items not shown in the catalog?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, if you need specific items not shown in our online catalog, contact our rental team at 1.877.885.0705. With thousands of items in our inventory and custom fabrication capabilities, we can likely accommodate special requests or source specialty items for your event.',
                },
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
            '@type': 'Service',
            serviceType: 'Event Rental Service',
            name: 'Online Rental Catalog & Proposal System',
            description:
              'Interactive online catalog for browsing, selecting, and requesting proposals for event rental items',
            provider: {
              '@type': 'Organization',
              name: 'MMEink',
              telephone: '212.971.5353',
              email: 'info@48WallNYC.com',
              url: 'https://www.48wallnyc.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'New York City',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$',
              description:
                'Browse thousands of rental items and request custom proposals',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Event Rental Catalog & Cart System',
            description:
              'Interactive web application for browsing rental inventory, adding items to cart, and submitting proposal requests',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Browse rental inventory by category',
              'Search rental items',
              'View item details and pricing',
              'Add items to cart',
              'Specify quantities',
              'Submit proposal requests',
              'Receive custom quotes',
            ],
            provider: {
              '@type': 'Organization',
              name: 'MMEink',
              url: 'https://www.48wallnyc.com',
            },
          }),
        }}
      />
      <CartProvider>{children}</CartProvider>
    </>
  );
}
