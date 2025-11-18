import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Event Production Services NYC | Audio Visual, Lighting & Staging | 48 Wall Street',
  description:
    "Full-service event production at 48 Wall Street NYC. MMEink provides turn-key event solutions including audio visual equipment, professional lighting, staging, custom fabrication, design, decor, and entertainment coordination. Self-contained event production agency in Manhattan offering seamless orchestration for corporate events, weddings, galas, and celebrations. Contact NYC's premier event production company today.",
  keywords:
    'event production NYC, event production services Manhattan, audio visual services NYC, event lighting NYC, staging services Manhattan, custom fabrication events, event AV equipment, professional event lighting, event production company NYC, turn-key event production, full-service event production, event decor services, event rental services NYC, entertainment coordination, MMEink production, 48 Wall Street production services, Manhattan event production',
  openGraph: {
    title:
      'Event Production Services NYC | Turn-Key Solutions | 48 Wall Street',
    description:
      'Complete event production services including audio visual, lighting, staging, custom fabrication, and entertainment. MMEink delivers seamless turn-key event solutions for Manhattan events.',
    url: 'https://www.48wallnyc.com/services/production',
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
    title: 'Event Production Services NYC | 48 Wall Street',
    description:
      'Turn-key event production: AV, lighting, staging, custom fabrication & entertainment. Full-service solutions for Manhattan events.',
    images: ['/images/twitter-home.jpg'],
    site: '@48wallst',
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/services/production',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function ProductionServicesLayout({
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
            serviceType: 'Event Production Services',
            name: 'Event Production Services by MMEink at 48 Wall Street',
            description:
              'Full-service event production company delivering turn-key event solutions including audio visual equipment, professional lighting design, staging, custom fabrication, decor, event rentals, and entertainment coordination. MMEink provides seamless orchestration of all production needs for corporate events, weddings, galas, and celebrations in NYC.',
            provider: {
              '@type': 'Organization',
              name: 'MMEink',
              description:
                'Premier NYC event production company providing comprehensive event services',
              url: 'https://www.48wallnyc.com',
              telephone: '1.877.885.0705',
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
            areaServed: {
              '@type': 'City',
              name: 'New York City',
            },
            audience: {
              '@type': 'Audience',
              audienceType:
                'Event Planners, Corporate Clients, Wedding Couples, Event Organizers',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
              itemOffered: {
                '@type': 'Service',
                name: 'Turn-Key Event Production',
                description:
                  'Complete event production services from design to execution',
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Event Production Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Audio Visual Services',
                    description:
                      'Professional AV equipment including sound systems, microphones, projectors, screens, and technical support',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Lighting Design',
                    description:
                      'Professional event lighting including ambient lighting, uplighting, pin spotting, and custom lighting design',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Staging Services',
                    description:
                      'Custom stage design, construction, and setup for performances, presentations, and runway shows',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Custom Fabrication',
                    description:
                      'Custom-built event elements, props, signage, and installations',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Event Design',
                    description:
                      'Comprehensive event design including decor, floral, and aesthetic coordination',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Entertainment Coordination',
                    description:
                      'Entertainment booking and coordination including DJs, live music, performers, and specialty acts',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Event Rentals',
                    description:
                      'Furniture, decor, equipment, and specialty rental items for events',
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
                name: 'Event Production',
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
            '@type': 'ProfessionalService',
            name: 'MMEink Event Production Services',
            description:
              'Self-contained event production agency providing turn-key solutions for events in NYC',
            url: 'https://www.48wallnyc.com/services/production',
            telephone: '1.877.885.0705',
            email: 'info@48WallNYC.com',
            priceRange: '$$$',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            areaServed: {
              '@type': 'State',
              name: 'New York',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Production Services',
              itemListElement: [
                {
                  '@type': 'OfferCatalog',
                  name: 'Audio Visual',
                  description:
                    'Professional AV equipment and technical support',
                },
                {
                  '@type': 'OfferCatalog',
                  name: 'Lighting',
                  description: 'Custom lighting design and installation',
                },
                {
                  '@type': 'OfferCatalog',
                  name: 'Staging',
                  description: 'Stage design, construction, and setup',
                },
                {
                  '@type': 'OfferCatalog',
                  name: 'Custom Fabrication',
                  description: 'Custom-built event elements and installations',
                },
                {
                  '@type': 'OfferCatalog',
                  name: 'Design',
                  description:
                    'Event design, decor, and aesthetic coordination',
                },
                {
                  '@type': 'OfferCatalog',
                  name: 'Entertainment',
                  description: 'Entertainment booking and coordination',
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
                name: 'What event production services does 48 Wall Street provide?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '48 Wall Street, through our exclusive partner MMEink, provides comprehensive event production services including audio visual equipment and technical support, professional lighting design, custom staging, event design and decor, custom fabrication, entertainment coordination, and event rentals. We deliver turn-key event solutions for all types of events.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is included in audio visual services?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our audio visual services include professional sound systems, wireless and wired microphones, projectors and screens, presentation technology, video displays, multimedia equipment, recording capabilities, and on-site technical support to ensure seamless AV execution for your event.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you provide custom lighting for events?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, MMEink provides comprehensive lighting services including ambient lighting design, uplighting, pin spotting, gobo projections, architectural lighting, color washes, and custom lighting designs tailored to your event theme and atmosphere. Our lighting designers work with you to create the perfect mood.',
                },
              },
              {
                '@type': 'Question',
                name: 'What staging services are available?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We provide complete staging services including custom stage design and construction, runway stages for fashion shows, presentation stages with backdrops, elevated platforms, stage skirting, stairs and ramps, and professional setup and breakdown. Our stages accommodate performances, speeches, and runway events.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does custom fabrication include?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Custom fabrication services include designing and building unique event elements such as custom signage, branded installations, specialty props, architectural elements, photo backdrops, entrance pieces, and any custom-built items needed to bring your event vision to life.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is entertainment coordination included in production services?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, MMEink coordinates all entertainment needs including DJ services, live bands and musicians, specialty performers, dancers, photo booth services, interactive entertainment, and novelty acts. We work with trusted entertainment vendors and manage all logistics and technical requirements.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes MMEink a turn-key event production solution?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'MMEink is a self-contained event production agency that handles all aspects of event production internally. With one phone call, we coordinate audio visual, lighting, staging, design, decor, entertainment, and rentals. Our attention to detail and seamless orchestration means you work with one team for all production needs, ensuring consistency and excellence throughout your event.',
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
            name: 'Event Production Services',
            description:
              'Comprehensive event production services including AV, lighting, staging, custom fabrication, design, and entertainment by MMEink',
            url: 'https://www.48wallnyc.com/services/production',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'Service',
              name: 'Turn-Key Event Production',
            },
            specialty: [
              'Audio Visual Services',
              'Event Lighting',
              'Staging',
              'Custom Fabrication',
              'Event Design',
              'Entertainment Coordination',
              'Event Production',
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
            name: 'MMEink',
            description:
              'Premier NYC event production company providing turn-key event solutions',
            url: 'https://www.48wallnyc.com/services/production',
            telephone: '1.877.885.0705',
            email: 'info@48WallNYC.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            knowsAbout: [
              'Event Production',
              'Audio Visual Services',
              'Event Lighting Design',
              'Staging Services',
              'Custom Fabrication',
              'Event Design',
              'Entertainment Coordination',
            ],
            slogan:
              'Number one resource for turn-key event production services in NYC',
          }),
        }}
      />
      {children}
    </>
  );
}
