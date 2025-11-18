import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Wedding Venue NYC | Historic Manhattan Wedding Space | 48 Wall Street Financial District',
  description:
    'Say "I do" at 48 Wall Street - Manhattan\'s premier historic wedding venue in the Financial District. Our stunning 1927 Bank of New York building features a Grand Mezzanine with 30-foot ceilings, grand marble staircase, and original 1920s architecture. Perfect for elegant weddings with 50-350 seated guests or 500 reception. Full-service wedding planning, catering, and customizable decor. Create unforgettable memories in NYC\'s most romantic historic venue. Schedule your venue tour today.',
  keywords:
    'wedding venue NYC, Manhattan wedding venue, historic wedding venue NYC, Financial District wedding, elegant wedding space Manhattan, grand wedding venue NYC, wedding venue with history, Lower Manhattan wedding, Wall Street wedding venue, wedding venue with marble staircase, 1920s wedding venue, wedding reception venue NYC, Manhattan wedding ceremony, wedding venue with catering NYC, unique wedding venue Manhattan',
  openGraph: {
    title:
      'Historic Wedding Venue NYC | Elegant Manhattan Weddings | 48 Wall Street',
    description:
      'Create your dream wedding at 48 Wall Street. Historic 1927 Manhattan venue with grand marble staircase, 30-foot ceilings, original architecture, full wedding planning, and catering for 50-350 guests.',
    url: 'https://www.48wallnyc.com/events/weddings',
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
    title: 'Historic Wedding Venue NYC | 48 Wall Street',
    description:
      'Elegant Manhattan wedding venue. Grand marble staircase, 30-foot ceilings, historic 1920s architecture, full planning & catering.',
    images: ['/images/twitter-home.jpg'],
    site: '@48wallst',
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/weddings',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function WeddingsLayout({
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
            serviceType: 'Wedding Venue',
            name: 'Weddings at 48 Wall Street',
            description:
              "Premier historic wedding venue in Manhattan's Financial District featuring elegant 1927 Bank of New York building with Grand Mezzanine, 30-foot ceilings, grand marble staircase, and original 1920s architecture. Full-service wedding planning, customizable decor, professional catering, and expert coordination for ceremonies and receptions accommodating 50-350 seated guests or 500 reception guests.",
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
              telephone: '+1-877-885-0705',
              email: 'info@48WallNYC.com',
              url: 'https://www.48wallnyc.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'New York City',
            },
            audience: {
              '@type': 'Audience',
              audienceType: 'Couples planning weddings',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Wedding Event Services',
                description:
                  'Complete wedding services including venue rental, ceremony space, reception coordination, full-service catering, event planning, and customizable decor',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Wedding Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Wedding Ceremonies',
                    description:
                      'Beautiful ceremony space with grand marble staircase backdrop',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Wedding Receptions',
                    description:
                      'Elegant reception space with full dining and dancing',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Full Wedding Planning',
                    description:
                      'Expert wedding planners with 26+ years experience',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Wedding Catering',
                    description:
                      'Customizable wedding menus from cocktails to formal dinners',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Decor & Design',
                    description:
                      'Customizable decor from classic elegance to modern luxury',
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
                name: 'Weddings',
                item: 'https://www.48wallnyc.com/events/weddings',
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
            '@type': 'EventVenue',
            name: '48 Wall Street Wedding Venue',
            description:
              'Historic 1927 Manhattan wedding venue with grand marble staircase, 30-foot ceilings, and elegant 1920s architecture in Financial District',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 40.707421,
              longitude: -74.009224,
            },
            maximumAttendeeCapacity: 500,
            amenityFeature: [
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Marble Staircase',
                value:
                  'Stunning dual marble staircase perfect for grand entrances and photos',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Mezzanine',
                value:
                  '30-foot ceilings with oversized chandeliers creating romantic ambiance',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Wedding Capacity',
                value:
                  '350 guests for seated dinner, 500 guests for cocktail reception',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Historic Architecture',
                value:
                  'Original 1920s Palladian windows and architectural details',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Ceremony & Reception Space',
                value:
                  'Flexible layouts for ceremony and reception in same venue',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Full Wedding Planning',
                value:
                  'Experienced wedding planners with 26+ years in the industry',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Customizable Decor',
                value:
                  'Extensive inventory for classic elegance or modern luxury styling',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Full-Service Catering',
                value:
                  'Customizable wedding menus with cocktail hour and formal dinner options',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Professional AV',
                value:
                  'Sound system for ceremony, DJ, speeches, and entertainment',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Bridal Suite',
                value: 'Private preparation areas for wedding party',
              },
            ],
            publicAccess: true,
            smokingAllowed: false,
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
                name: 'How many guests can 48 Wall Street accommodate for a wedding?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street can accommodate weddings for 50 to 350 guests for seated dinners and up to 500 guests for cocktail-style receptions. Our Grand Mezzanine and flexible spaces allow for various wedding sizes and configurations including ceremony and reception in the same venue.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can we have both ceremony and reception at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street is perfect for both ceremony and reception. Our grand marble staircase provides a stunning ceremony backdrop, and the Grand Mezzanine transforms beautifully for your reception. Our event team coordinates seamless transitions between ceremony and reception setups.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does 48 Wall Street provide wedding planning services?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street partners with MMEink, our exclusive wedding planning team with 26+ years in the wedding industry. They provide full-service wedding planning including timeline coordination, vendor management, design consultation, and day-of coordination to ensure your wedding is flawless.',
                },
              },
              {
                '@type': 'Question',
                name: 'What catering options are available for weddings?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "48 Wall Street offers full-service wedding catering through our exclusive vendors. We provide customizable menus including cocktail hour with passed hors d'oeuvres, formal plated dinners, buffet options, dessert bars, and full bar service. Menus accommodate all dietary restrictions and preferences.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can we customize the decor for our wedding?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! 48 Wall Street offers extensive decor customization from classic elegant weddings to modern minimalistic luxury styles. Our inventory includes thousands of options for centerpieces, linens, lighting, florals, and decorative elements. Our design team works with you to create your perfect wedding aesthetic.',
                },
              },
              {
                '@type': 'Question',
                name: 'How far in advance should we book for a wedding?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We recommend booking your wedding at 48 Wall Street 12-18 months in advance, especially for popular dates like spring and fall weekends. This ensures you secure your preferred date and allows ample time for detailed planning. Contact us at 1.877.885.0705 to schedule a venue tour and check availability.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes 48 Wall Street unique as a wedding venue?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street offers a unique combination of historic 1920s architecture with modern amenities. Our grand marble staircase, 30-foot ceilings with chandeliers, Palladian windows, and original Bank of New York details create a romantic, sophisticated backdrop. The venue is listed on the National Register of Historic Places, providing timeless elegance for your wedding photography and memories.',
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
            name: 'Weddings',
            description:
              'Elegant historic wedding venue in Manhattan with grand marble staircase, full-service planning, and romantic 1920s architecture',
            url: 'https://www.48wallnyc.com/events/weddings',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
            },
            specialty: [
              'Wedding Ceremonies',
              'Wedding Receptions',
              'Historic Wedding Venue',
              'Elegant Weddings',
              'Manhattan Weddings',
              'Full-Service Wedding Planning',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
