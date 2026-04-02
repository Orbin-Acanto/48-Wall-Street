import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Non-Profit Event Venue Lower Manhattan | Fundraising Gala Space NYC',
  description:
    'Host impactful charity galas and fundraisers at 48 Wall Street. A historic downtown venue in the Financial District perfect for non-profit events that inspire generosity.',
  keywords:
    'non-profit event venue NYC, fundraising gala venue Manhattan, charity event venue Financial District, nonprofit gala space NYC, fundraiser venue Lower Manhattan, charity gala venue Wall Street, nonprofit event space Manhattan, benefit gala venue NYC, foundation fundraiser venue NYC, advocacy event space NYC, non-profit banquet hall NYC, charity auction venue Manhattan, nonprofit dinner gala NYC, philanthropic event venue, cause-based event space Financial District',
  openGraph: {
    title:
      'Non-Profit Event Venue Lower Manhattan | Fundraising Gala Space NYC | 48 Wall Street',
    description:
      'Host impactful charity galas and fundraisers at 48 Wall Street. Historic 1927 Financial District venue with grand architecture for 50-500 guests. Inspire generosity in an unforgettable setting.',
    url: 'https://www.48wallnyc.com/events/non-profit',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/gallery/corporate/ (21).jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street gala event setup — ideal non-profit fundraising venue in the Financial District NYC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Non-Profit Event Venue NYC | 48 Wall Street Financial District',
    description:
      'Historic Manhattan venue for charity galas, fundraisers & nonprofit events. Grand architecture, full catering, 50-500 guests.',
    images: ['/gallery/corporate/ (21).jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/events/non-profit',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function NonProfitLayout({
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
            serviceType: 'Non-Profit Event Venue',
            name: 'Non-Profit & Charity Events at 48 Wall Street',
            description:
              "Premier historic non-profit event venue in Manhattan's Financial District. 48 Wall Street's 1927 Bank of New York building offers a grand and inspiring setting for charity galas, fundraisers, benefit dinners, and nonprofit celebrations accommodating 50-350 seated guests or 500 reception guests.",
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
              telephone: '212.971.5353',
              email: 'info@48WallNYC.com',
              url: 'https://www.48wallnyc.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'New York City',
            },
            audience: {
              '@type': 'Audience',
              audienceType: 'Non-profit organizations and charities',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Non-Profit Event Services',
                description:
                  'Complete event services for non-profits including venue rental, gala coordination, full-service catering, AV production, fundraising setup, and event planning',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Non-Profit Event Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Charity Galas',
                    description:
                      'Elegant gala dinners with grand ballroom setting to inspire donor generosity',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Fundraising Events',
                    description:
                      'Full-service fundraising event coordination with auction and donation management support',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Benefit Dinners',
                    description:
                      'Formal seated benefit dinners with customizable menus and full bar service',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Award Ceremonies',
                    description:
                      'Staging, AV, and production support for nonprofit recognition and award events',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Nonprofit Cocktail Receptions',
                    description:
                      'Cocktail-style networking receptions for up to 500 guests',
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
                name: 'Events',
                item: 'https://www.48wallnyc.com/events',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Non-Profit Events',
                item: 'https://www.48wallnyc.com/events/non-profit',
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
            name: '48 Wall Street Non-Profit Event Venue',
            description:
              'Historic 1927 Manhattan venue ideal for charity galas, fundraisers, and nonprofit events in the Financial District',
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
                name: 'Grand Mezzanine Banking Hall',
                value:
                  '9,000 sq ft grand hall with 30-foot ceilings ideal for gala dinners',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Grand Marble Staircase',
                value:
                  'Dramatic staircase for award presentations and donor recognition moments',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Fundraising Capacity',
                value:
                  '350 guests for seated gala, 500 guests for cocktail reception',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Historic Architecture',
                value:
                  'National Register of Historic Places building — 1920s grandeur that elevates your cause',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'AV & Production',
                value:
                  'Full AV, staging, and lighting for auction, speeches, and live entertainment',
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Full-Service Catering',
                value:
                  'Customizable gala menus from cocktail reception to formal seated dinner',
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
                name: 'Can non-profit organizations host fundraising galas at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, 48 Wall Street is an ideal venue for non-profit galas, charity fundraisers, and benefit events. Our historic Grand Mezzanine accommodates 350 guests for seated dinners and up to 500 for cocktail receptions, providing a grand setting that inspires generosity and reflects the importance of your cause.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does 48 Wall Street support live auction setups for fundraising events?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Our full AV and production team through MMEink can set up staging, microphones, screens, and lighting specifically designed to support live auction formats, video presentations, and keynote speeches for fundraising events.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many guests can attend a nonprofit gala at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street accommodates 50 to 350 guests for seated gala dinners and up to 500 guests for cocktail-style fundraising receptions. Our spaces can be configured to suit a range of event sizes and formats.',
                },
              },
              {
                '@type': 'Question',
                name: 'What catering options are available for charity events?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Through our partner Tardi's Catering, we offer fully customizable menus for non-profit events — from elegant passed hors d'oeuvres and cocktail receptions to formal multi-course gala dinners with full bar service. We accommodate all dietary requirements.",
                },
              },
              {
                '@type': 'Question',
                name: 'Does 48 Wall Street offer special pricing for non-profit organizations?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We work closely with non-profit organizations to find pricing structures that fit your budget and mission. Contact us at info@48WallNYC.com or call 212.971.5353 to discuss your event and our available options for charitable organizations.',
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
            name: 'Non-Profit Events',
            description:
              'Historic Financial District venue for charity galas, fundraisers, benefit dinners, and nonprofit events in NYC',
            url: 'https://www.48wallnyc.com/events/non-profit',
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
              'Charity Galas',
              'Fundraising Events',
              'Benefit Dinners',
              'Award Ceremonies',
              'Non-Profit Receptions',
              'Foundation Events',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
