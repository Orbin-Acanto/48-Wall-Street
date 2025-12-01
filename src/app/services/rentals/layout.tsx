import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Rentals NYC | Furniture, Decor & Props on Wall Street',
  description:
    'Transform your event with premium rentals at 48 Wall Street. From custom staging and chic lounge furniture to catering equipment, we provide full production support for your Financial District event.',
  keywords:
    'event rentals NYC, furniture rental Manhattan, event decor rentals, prop rentals NYC, staging rentals Manhattan, catering equipment rentals, event furniture NYC, party rentals Manhattan, wedding rentals NYC, corporate event rentals, lounge furniture rental, specialty prop rentals, event equipment NYC, table and chair rentals, linen rentals NYC, MMEink rentals, 48 Wall Street rentals, luxury furniture rentals Manhattan, event prop rental NYC',
  openGraph: {
    title:
      'Event Rental Services NYC | Furniture & Decor Rentals | 48 Wall Street',
    description:
      "26+ years providing exclusive event rentals. Thousands of unique furniture, decor, staging & catering items. Transform your Manhattan event with MMEink's luxurious rental inventory.",
    url: 'https://www.48wallnyc.com/services/rentals',
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
    title: 'Event Rental Services NYC | 48 Wall Street',
    description:
      '26+ years exclusive event rentals. Thousands of furniture, decor & prop items. Transform your Manhattan event.',
    images: ['/images/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/services/rentals',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function RentalServicesLayout({
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
            serviceType: 'Event Rental Services',
            name: 'Event Rental Services by MMEink',
            description:
              'Industry-leading event rental services for 26+ years providing thousands of exclusive furniture, decor, staging, and catering rental items. Transform any event with our extensive inventory of luxurious furniture, unique props, linens, tables, chairs, and specialty items. We outfit entire events to suit any style from vibrant and fun to sleek, chic, or simple elegant.',
            provider: {
              '@type': 'Organization',
              name: 'MMEink',
              description:
                'Event industry leader in exclusive furniture and prop rentals for 26+ years',
              url: 'https://www.48wallnyc.com',
              telephone: '212.971.5353',
              email: 'info@48WallNYC.com',
              foundingDate: '1998',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street, Lobby 1',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
            },
            areaServed: {
              '@type': 'City',
              name: 'New York City',
            },
            audience: {
              '@type': 'Audience',
              audienceType:
                'Event Planners, Corporate Clients, Wedding Couples, Party Hosts',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Complete Event Rental Solutions',
                description:
                  'Comprehensive rental inventory for furniture, decor, staging, and catering equipment',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Event Rental Catalog',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Decor Rentals',
                    description:
                      'Thousands of unique props, decorative items, centerpieces, lighting decor, and themed elements',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Furniture Rentals',
                    description:
                      'Luxurious lounge furniture, tables, chairs, bars, and specialty seating',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Staging Rentals',
                    description:
                      'Platforms, stages, risers, backdrops, and presentation equipment',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Catering Rentals',
                    description:
                      'Linens, china, glassware, flatware, serving equipment, and buffet displays',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Specialty Props',
                    description:
                      'Unique themed props for transforming venues into wonderlands or specific locations',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Linen Rentals',
                    description:
                      'Tablecloths, napkins, chair covers, and specialty linens in various colors and styles',
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
                item: 'https://www.48wallnyc.com/services',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Rentals',
                item: 'https://www.48wallnyc.com/services/rentals',
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
            '@type': 'Store',
            name: 'MMEink Event Rentals',
            description:
              'Event rental company with thousands of exclusive furniture, decor, staging, and catering rental items',
            url: 'https://www.48wallnyc.com/services/rentals',
            telephone: '212.971.5353',
            email: 'info@48WallNYC.com',
            priceRange: '$$',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Event Rental Inventory',
              description: 'Thousands of unique rental items for events',
              itemListElement: [
                {
                  '@type': 'OfferCatalog',
                  name: 'Furniture Rentals',
                  description:
                    'Lounge furniture, tables, chairs, bars, and seating',
                },
                {
                  '@type': 'OfferCatalog',
                  name: 'Decor Rentals',
                  description: 'Props, centerpieces, lighting, themed decor',
                },
                {
                  '@type': 'OfferCatalog',
                  name: 'Staging Rentals',
                  description: 'Stages, platforms, risers, backdrops',
                },
                {
                  '@type': 'OfferCatalog',
                  name: 'Catering Rentals',
                  description: 'Linens, china, glassware, serving equipment',
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
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What types of event rentals does MMEink provide?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'MMEink provides comprehensive event rental services including furniture rentals (lounge furniture, tables, chairs, bars), decor rentals (props, centerpieces, themed items), staging rentals (platforms, stages, backdrops), and catering rentals (linens, china, glassware, flatware, serving equipment). We have thousands of unique items to outfit your entire event.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long has MMEink been providing event rentals?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'MMEink has been the event industry leader for 26+ years, providing exclusive furniture and prop rentals throughout NYC. Our extensive experience ensures we understand diverse client styles and can transform any event space.',
                },
              },
              {
                '@type': 'Question',
                name: 'What styles of furniture and decor are available?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'MMEink accommodates all event styles including vibrant and fun, sleek and chic, simple but elegant, modern minimalistic, classic luxury, themed environments, and custom combinations. We outfit your entire event to suit your personal style and vision, whether you want to create a wonderland, tropical location, or any other aesthetic.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many rental items does MMEink have in inventory?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'MMEink has THOUSANDS of unique props, furniture pieces, decor items, and rental equipment in our inventory. Our extensive collection allows us to transform any event space and accommodate various themes, sizes, and styles.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can MMEink provide rentals for events outside 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, MMEink provides event rental services for events at 48 Wall Street and throughout the NYC area. We deliver and set up our rental items at any location to bring your event vision to life.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is included in catering rentals?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our catering rentals include linens (tablecloths, napkins, overlays), china and dinnerware, glassware (various styles), flatware, serving platters and equipment, buffet displays, specialty serving pieces, and all necessary tabletop items to complete your dining presentation.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I browse the rental inventory and place an order?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Contact MMEink at 1.877.885.0705 or email info@48WallNYC.com to discuss your event needs. Our rental specialists will show you our extensive inventory, provide recommendations based on your style and budget, create a custom proposal, and coordinate all delivery and setup details.',
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
            '@type': 'WebPage',
            name: 'Event Rental Services',
            description:
              'Exclusive furniture, decor, staging, and catering rentals by MMEink with 26+ years of industry leadership',
            url: 'https://www.48wallnyc.com/services/rentals',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'Service',
              name: 'Event Rental Services',
            },
            specialty: [
              'Furniture Rentals',
              'Decor Rentals',
              'Prop Rentals',
              'Staging Rentals',
              'Catering Equipment Rentals',
              'Event Rentals',
              'Party Rentals',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MMEink Event Rentals',
            description:
              'Event industry leader for 26+ years providing exclusive furniture and prop rentals with thousands of unique items',
            url: 'https://www.48wallnyc.com/services/rentals',
            telephone: '212.971.5353',
            email: 'info@48WallNYC.com',
            foundingDate: '1998',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            knowsAbout: [
              'Event Rentals',
              'Furniture Rentals',
              'Event Decor',
              'Staging',
              'Event Design',
              'Event Production',
            ],
            slogan:
              'Transforming events with thousands of exclusive furniture and props - anything is possible',
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
              'Comprehensive rental categories available from MMEink',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Decor Rentals',
                description:
                  'Thousands of unique props and decorative items to transform any space',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Furniture Rentals',
                description:
                  'Luxurious lounge furniture, tables, chairs, and specialty seating',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Staging Rentals',
                description:
                  'Platforms, stages, risers, and presentation equipment',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Catering Rentals',
                description:
                  'Linens, china, glassware, flatware, and serving equipment',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
