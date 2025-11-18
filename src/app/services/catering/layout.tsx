import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    "Catering Services NYC | Tardi's Catering at 48 Wall Street | Manhattan Event Catering",
  description:
    "Tardi's Catering delivers first-class dining experiences for Manhattan events. 30+ years of culinary excellence serving corporate events, weddings, galas, and private celebrations. Specializing in seated dinners, cocktail receptions, buffets, lunch, and breakfast catering with fresh ingredients and creative presentation. Full-service catering for any size event at 48 Wall Street and throughout NYC. View our digital menu and bring your culinary vision to life.",
  keywords:
    "catering services NYC, Manhattan catering, event catering NYC, corporate catering Manhattan, wedding catering NYC, Tardi's Catering, 48 Wall Street catering, seated dinner catering, cocktail catering NYC, buffet catering, breakfast catering NYC, lunch catering Manhattan, kosher catering NYC, event food service, gala catering, party catering NYC, Financial District catering, full-service catering NYC, creative catering Manhattan",
  openGraph: {
    title:
      "Catering Services NYC | Tardi's Catering | 48 Wall Street Manhattan",
    description:
      "30+ years of culinary excellence. Tardi's Catering provides first-class dining for corporate events, weddings & galas. Seated dinners, cocktails, buffets, and more with fresh ingredients and creative presentation.",
    url: 'https://www.48wallnyc.com/services/catering',
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
    title: "Catering Services NYC | Tardi's Catering",
    description:
      '30+ years culinary excellence. First-class dining for Manhattan events. Seated dinners, cocktails, buffets, breakfast & lunch.',
    images: ['/images/twitter-home.jpg'],
    site: '@48wallst',
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/services/catering',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function CateringServicesLayout({
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
            '@type': 'FoodEstablishment',
            name: "Tardi's Catering",
            description:
              'Creative food studio delivering first-class dining experiences for corporate and private events with over 30 years of experience. Specializing in seated dinners, cocktail receptions, buffets, breakfast, and lunch catering with fresh ingredients and creative presentation.',
            url: 'https://www.48wallnyc.com/services/catering',
            telephone: '+1-877-885-0705',
            email: 'info@48WallNYC.com',
            priceRange: '$$$',
            servesCuisine: [
              'American',
              'International',
              'Contemporary',
              'Mediterranean',
              'Asian Fusion',
            ],
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
            hasMenu: {
              '@type': 'Menu',
              name: "Tardi's Catering Menu",
              description:
                'Comprehensive catering menu featuring seated dinners, cocktail receptions, buffets, breakfast, and lunch options',
              hasMenuSection: [
                {
                  '@type': 'MenuSection',
                  name: 'Seated Dinner',
                  description:
                    'Formal plated dinner service with multiple course options',
                },
                {
                  '@type': 'MenuSection',
                  name: 'Cocktail Events',
                  description:
                    "Passed hors d'oeuvres, small plates, and cocktail reception service",
                },
                {
                  '@type': 'MenuSection',
                  name: 'Lunch Catering',
                  description:
                    'Business lunch options including buffets and boxed lunches',
                },
                {
                  '@type': 'MenuSection',
                  name: 'Breakfast Catering',
                  description:
                    'Morning catering with continental and hot breakfast options',
                },
                {
                  '@type': 'MenuSection',
                  name: 'Specialty Stations',
                  description:
                    'Globally inspired food stations with interactive experiences',
                },
              ],
            },
            makesOffer: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Corporate Event Catering',
                  description:
                    'Professional catering for business meetings, conferences, and corporate events',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Wedding Catering',
                  description:
                    'Full-service wedding catering with customizable menus',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Private Event Catering',
                  description:
                    'Catering for Bar/Bat Mitzvahs, birthday parties, and celebrations',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Gala Catering',
                  description:
                    'Elegant catering for charity galas and benefits',
                },
              },
            ],
            areaServed: [
              {
                '@type': 'City',
                name: 'New York City',
              },
              {
                '@type': 'State',
                name: 'New York',
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
            serviceType: 'Catering Services',
            name: "Tardi's Catering Services",
            description:
              'Full-service event catering providing seated dinners, cocktail receptions, buffets, breakfast, and lunch with over 30 years of culinary excellence',
            provider: {
              '@type': 'Organization',
              name: "Tardi's Catering",
              description:
                'Creative food studio specializing in first-class dining experiences',
              url: 'https://www.48wallnyc.com/services/catering',
              telephone: '+1-877-885-0705',
              email: 'info@48WallNYC.com',
              foundingDate: '1994',
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
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceRange: '$$$',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Catering Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Seated Dinner Service',
                    description:
                      'Formal plated dinner service with multi-course options and professional waitstaff',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Cocktail Event Catering',
                    description:
                      "Passed hors d'oeuvres, small plates, and stationed appetizers for cocktail receptions",
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Buffet Catering',
                    description:
                      'Buffet-style service with multiple stations and cuisine options',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Breakfast Catering',
                    description:
                      'Morning catering including continental breakfast, hot breakfast, and brunch options',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Lunch Catering',
                    description:
                      'Business lunch catering with buffet, boxed lunch, and plated options',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Specialty Food Stations',
                    description:
                      'Globally inspired interactive food stations with live cooking and creative presentations',
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
                name: 'Catering',
                item: 'https://www.48wallnyc.com/services/catering',
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
                name: "What catering services does Tardi's Catering provide?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Tardi's Catering provides comprehensive event catering including seated dinner service, cocktail receptions with passed hors d'oeuvres, buffet-style dining, breakfast catering, lunch catering, and globally inspired specialty food stations. We accommodate any size event with customizable menus using fresh ingredients.",
                },
              },
              {
                '@type': 'Question',
                name: "How long has Tardi's Catering been in business?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Tardi's Catering has over 30 years of experience delivering first-class dining experiences for corporate and private events throughout NYC. Our culinary team brings decades of expertise in hospitality and food and beverage services.",
                },
              },
              {
                '@type': 'Question',
                name: "What types of events does Tardi's Catering serve?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Tardi's Catering serves all types of events including corporate meetings and conferences, weddings, Bar/Bat Mitzvahs, charity galas, holiday parties, private celebrations, fashion shows, and social gatherings. We cater events at 48 Wall Street and throughout the NYC area.",
                },
              },
              {
                '@type': 'Question',
                name: "Can Tardi's Catering accommodate dietary restrictions?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes, Tardi's Catering can accommodate all dietary restrictions and preferences including vegetarian, vegan, gluten-free, kosher, halal, and allergen-specific requirements. Our culinary team works with you to create customized menus that meet all dietary needs while maintaining exceptional taste and presentation.",
                },
              },
              {
                '@type': 'Question',
                name: "What makes Tardi's Catering different from other caterers?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Tardi's Catering is a creative food studio that goes beyond just satisfying appetites. We design exciting food experiences using the freshest ingredients accompanied by fun props and décor accents. Our culinary team specializes in bringing creative visions to life with innovative presentations and globally inspired cuisine.",
                },
              },
              {
                '@type': 'Question',
                name: "Does Tardi's Catering provide service staff?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes, Tardi's Catering provides full-service catering including professional waitstaff, bartenders, chefs for interactive stations, and event service coordinators. We deliver complete hospitality services to ensure seamless food and beverage service for your event.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I view the catering menu before booking?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, we provide a digital flip book menu showcasing our comprehensive catering options including appetizers, entrees, desserts, and beverage selections. You can also schedule a tasting consultation to sample our cuisine. Contact us at 1.877.885.0705 to view the menu and discuss your event needs.',
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
            name: 'Catering Services',
            description:
              "Full-service event catering by Tardi's Catering with 30+ years of culinary excellence in NYC",
            url: 'https://www.48wallnyc.com/services/catering',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'Service',
              name: 'Event Catering Services',
            },
            specialty: [
              'Seated Dinner Catering',
              'Cocktail Event Catering',
              'Buffet Catering',
              'Breakfast Catering',
              'Lunch Catering',
              'Corporate Catering',
              'Wedding Catering',
              'Event Food Service',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: "Tardi's Catering Food Preparation",
            description:
              "Behind-the-scenes look at Tardi's Catering culinary team preparing exceptional cuisine for events",
            thumbnailUrl:
              'https://www.48wallnyc.com/images/catering-video-thumb.jpg',
            uploadDate: '2024-01-01',
            contentUrl: 'https://www.48wallnyc.com/services/catering',
            embedUrl: 'https://www.48wallnyc.com/services/catering#video',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: "Tardi's Catering",
            description:
              'Creative food studio with over 30 years of experience delivering first-class dining for NYC events',
            url: 'https://www.48wallnyc.com/services/catering',
            telephone: '+1-877-885-0705',
            email: 'info@48WallNYC.com',
            foundingDate: '1994',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            knowsAbout: [
              'Event Catering',
              'Corporate Catering',
              'Wedding Catering',
              'Culinary Arts',
              'Food Presentation',
              'Hospitality Services',
            ],
            slogan:
              'Bringing your creative culinary visions to life with fresh ingredients and innovative presentations',
          }),
        }}
      />
      {children}
    </>
  );
}
