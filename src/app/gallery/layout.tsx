import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Event Gallery NYC | 48 Wall Street Photos | Manhattan Venue Portfolio',
  description:
    "View our event gallery showcasing stunning corporate events, weddings, fashion shows, Bar/Bat Mitzvahs, and holiday parties at 48 Wall Street NYC. Explore photos of our historic 1927 venue featuring the Grand Mezzanine, grand marble staircase, and past events in Manhattan's Financial District. Get inspired for your next event with our portfolio of successful celebrations.",
  keywords:
    'event gallery NYC, 48 Wall Street photos, venue gallery Manhattan, corporate event photos, wedding venue gallery, fashion show photos NYC, Bar Mitzvah gallery, holiday party photos, event venue portfolio, Manhattan venue photos, Financial District event gallery, 48 Wall Street portfolio, event inspiration NYC, venue photos Manhattan, event space gallery',
  openGraph: {
    title:
      'Event Gallery | 48 Wall Street NYC Photos | Manhattan Venue Portfolio',
    description:
      'Explore stunning photos of corporate events, weddings, fashion shows, Bar/Bat Mitzvahs, and holiday parties at 48 Wall Street. Get inspired by our historic Manhattan venue.',
    url: 'https://www.48wallnyc.com/gallery',
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
    title: 'Event Gallery | 48 Wall Street NYC',
    description:
      "Stunning photos of corporate events, weddings, fashion shows, Bar/Bat Mitzvahs & holiday parties at Manhattan's premier historic venue.",
    images: ['/images/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/gallery',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function GalleryLayout({
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
            '@type': 'ImageGallery',
            name: '48 Wall Street Event Gallery',
            description:
              'Photo gallery showcasing corporate events, weddings, fashion shows, Bar/Bat Mitzvahs, and holiday parties at 48 Wall Street NYC historic venue',
            url: 'https://www.48wallnyc.com/gallery',
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
            about: [
              {
                '@type': 'Thing',
                name: 'Corporate Events',
                description:
                  'Photos of corporate meetings, conferences, product launches, and business events',
              },
              {
                '@type': 'Thing',
                name: 'Weddings',
                description:
                  'Wedding ceremony and reception photos showcasing historic venue',
              },
              {
                '@type': 'Thing',
                name: 'Fashion Shows',
                description:
                  'Fashion runway events and designer showcases on grand marble staircase',
              },
              {
                '@type': 'Thing',
                name: 'Bar & Bat Mitzvahs',
                description:
                  'Bar and Bat Mitzvah celebration photos with custom themes and decor',
              },
              {
                '@type': 'Thing',
                name: 'Holiday Events',
                description:
                  'Corporate holiday parties and seasonal celebration photos',
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
                name: 'Gallery',
                item: 'https://www.48wallnyc.com/gallery',
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
            '@type': 'CollectionPage',
            name: 'Event Photo Gallery',
            description:
              'Comprehensive photo gallery organized by event type showcasing the versatility and elegance of 48 Wall Street venue',
            url: 'https://www.48wallnyc.com/gallery',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
            },
            hasPart: [
              {
                '@type': 'ImageGallery',
                name: 'Corporate Events Gallery',
                description:
                  'Photos of corporate meetings, conferences, and business events at 48 Wall Street',
              },
              {
                '@type': 'ImageGallery',
                name: 'Weddings Gallery',
                description:
                  'Wedding ceremony and reception photos showcasing elegant celebrations',
              },
              {
                '@type': 'ImageGallery',
                name: 'Fashion Shows Gallery',
                description: 'Fashion runway events and designer presentations',
              },
              {
                '@type': 'ImageGallery',
                name: 'Bar & Bat Mitzvahs Gallery',
                description:
                  'Bar and Bat Mitzvah celebration photos with creative themes',
              },
              {
                '@type': 'ImageGallery',
                name: 'Holiday Events Gallery',
                description:
                  'Corporate holiday parties and seasonal celebrations',
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
            name: 'Event Gallery',
            description:
              'Photo gallery showcasing diverse events at 48 Wall Street including corporate, weddings, fashion, Bar/Bat Mitzvahs, and holiday celebrations',
            url: 'https://www.48wallnyc.com/gallery',
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
            },
            mainEntity: {
              '@type': 'ItemList',
              name: 'Event Gallery Categories',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Corporate Events',
                  description:
                    'Business meetings, conferences, and corporate celebrations',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Weddings',
                  description: 'Wedding ceremonies and receptions',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Fashion Shows',
                  description: 'Runway events and designer showcases',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Bar & Bat Mitzvahs',
                  description: 'Coming of age celebrations',
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Holiday Events',
                  description: 'Seasonal parties and holiday celebrations',
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
                name: 'What types of events are shown in the gallery?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our gallery showcases five main event categories: corporate events (meetings, conferences, product launches), weddings (ceremonies and receptions), fashion shows (runway events on our grand marble staircase), Bar and Bat Mitzvahs (celebration photos with various themes), and holiday events (corporate holiday parties and seasonal celebrations).',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I see photos of the venue setup for different event styles?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, our gallery includes photos showing various venue configurations and styles including formal seated dinners, cocktail receptions, theater-style seating for conferences, runway setups for fashion shows, themed decor for Bar/Bat Mitzvahs, and festive arrangements for holiday parties.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are these photos from real events at 48 Wall Street?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, all photos in our gallery are from actual events hosted at 48 Wall Street, showcasing our historic Grand Mezzanine, grand marble staircase, Banking Hall, and Concourse Level with various event productions and decorations.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I use the gallery for event planning inspiration?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! Our gallery is designed to inspire your event planning. Browse photos by event type to see decor styles, lighting options, seating arrangements, and overall atmospheres. Our event planning team can help recreate any looks you love or customize designs for your specific vision.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can I request high-resolution photos for my planning?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Contact our team at 1.877.885.0705 or email info@48WallNYC.com to request high-resolution photos, additional venue images not shown in the online gallery, or specific event setup examples relevant to your planning needs.',
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
            '@type': 'Place',
            name: '48 Wall Street Event Venue',
            description:
              'Historic venue showcased through diverse event photography',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '48 Wall Street, Lobby 1',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10005',
              addressCountry: 'US',
            },
            photo: [
              {
                '@type': 'ImageObject',
                name: 'Corporate Events at 48 Wall Street',
                description:
                  'Professional corporate event setups in Grand Mezzanine',
              },
              {
                '@type': 'ImageObject',
                name: 'Weddings at 48 Wall Street',
                description:
                  'Elegant wedding ceremonies and receptions with historic architecture',
              },
              {
                '@type': 'ImageObject',
                name: 'Fashion Shows at 48 Wall Street',
                description: 'Runway events on grand marble staircase',
              },
              {
                '@type': 'ImageObject',
                name: 'Bar & Bat Mitzvahs at 48 Wall Street',
                description:
                  'Creative celebrations with custom themes and decor',
              },
              {
                '@type': 'ImageObject',
                name: 'Holiday Events at 48 Wall Street',
                description:
                  'Festive corporate parties and seasonal celebrations',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
