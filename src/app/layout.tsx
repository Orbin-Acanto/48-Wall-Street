import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SocialMediaSidebar from '@/components/SocialMediaSidebar';
import ChatbotWidget from '@/components/ChatBotWidget';
import Footer from '@/components/Footer';
import ContactUsSlider from '@/components/ContactUsSlider';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.48wallnyc.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      '48 Wall Street NYC | Historic Event Venue in Manhattan Financial District',
    template: '%s | 48 Wall Street NYC',
  },
  description:
    "Discover 48 Wall Street - a historic 1927 Bank of New York building turned premier NYC event venue. Host corporate events, weddings, Bar/Bat Mitzvahs & celebrations in our stunning Grand Mezzanine with 30-foot ceilings, original architecture & full-service catering. Located in Manhattan's Financial District. Book your tour today.",
  keywords:
    '48 Wall Street, NYC event venue, Manhattan event space, Financial District venue, historic venue NYC, corporate event space Manhattan, wedding venue NYC, Bar Mitzvah venue, Bat Mitzvah venue, Grand Mezzanine, Wall Street events, Lower Manhattan venue, historic bank building venue, event venue with catering, Financial District wedding, corporate meeting space NYC, Bank of New York building, 1920s architecture venue, Manhattan private events, New York event venue',
  authors: [{ name: '48 Wall Street Events' }],
  creator: '48 Wall Street Events',
  publisher: '48 Wall Street Events',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: '48 Wall Street NYC',
    title: '48 Wall Street NYC | Historic Event Venue in Financial District',
    description:
      "Premier historic event venue in Manhattan's Financial District. Host corporate events, weddings & celebrations in our stunning 1927 landmark building featuring 30-foot ceilings, grand marble staircase, and original 1920s architecture. Full-service catering available.",
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Grand Mezzanine - Historic NYC Event Venue with 30-foot ceilings',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '48 Wall Street NYC | Historic Event Venue',
    description:
      "Historic 1927 venue in Manhattan's Financial District. Perfect for corporate events, weddings & celebrations with full-service catering.",
    images: ['/images/twitter-home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'ola-WXXq-bJgIEbRdGZMr4cGuKqcyF65J94yOY0ybQ8',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
    'business:contact_data:street_address': '48 Wall Street, Lobby 1',
    'business:contact_data:locality': 'New York',
    'business:contact_data:region': 'NY',
    'business:contact_data:postal_code': '10005',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:email': 'info@48WallNYC.com',
    'business:contact_data:phone_number': '212.971.5353',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EventVenue',
              '@id': `${siteUrl}/#eventvenue`,
              name: '48 Wall Street',
              alternateName: '48 Wall Street Events',
              description:
                "Historic 1927 Bank of New York & Trust Company building in Manhattan's Financial District. Features Grand Mezzanine Banking Hall with 30-foot ceilings, original 1920s architecture, Palladian windows, and grand marble staircase. Added to National Register of Historic Places in 2003.",
              url: siteUrl,
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/images/logo.png`,
                width: 600,
                height: 200,
              },
              image: [
                `${siteUrl}/images/og-home.jpg`,
                `${siteUrl}/images/grand-mezzanine.jpg`,
                `${siteUrl}/images/venue-exterior.jpg`,
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
              telephone: '212.971.5353',
              email: 'info@48WallNYC.com',
              priceRange: '$$$',
              maximumAttendeeCapacity: 500,
              smokingAllowed: false,
              publicAccess: true,
              isAccessibleForFree: false,
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '09:00',
                  closes: '23:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday', 'Sunday'],
                  opens: '10:00',
                  closes: '23:00',
                },
              ],
              sameAs: [
                'https://www.facebook.com/48wallst/',
                'https://www.instagram.com/48wallst/',
              ],
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Grand Mezzanine Banking Hall',
                  value: '30-foot ceilings with original 1920s architecture',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Seating Capacity',
                  value: '350 seated dinner guests',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Reception Capacity',
                  value: '500 cocktail reception guests',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Audio Visual Equipment',
                  value: 'State-of-the-art AV capabilities',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Full-Service Catering',
                  value: 'Professional catering services available',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Event Planning',
                  value: 'Expert event planning team',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Breakout Rooms',
                  value: 'Multiple breakout spaces on Concourse Level',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Historic Architecture',
                  value: 'Original 1920s architectural details preserved',
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '150',
                bestRating: '5',
                worstRating: '1',
              },
              hasMap:
                'https://maps.google.com/?q=48+Wall+Street+New+York+NY+10005',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${siteUrl}/#organization`,
              name: '48 Wall Street Events',
              legalName: '48 Wall Street Events LLC',
              url: siteUrl,
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/images/logo.png`,
              },
              foundingDate: '2010',
              description:
                "Premier historic event venue in New York City's Financial District, specializing in corporate events, weddings, and private celebrations.",
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '212.971.5353',
                contactType: 'Sales',
                email: 'info@48WallNYC.com',
                availableLanguage: ['English'],
                areaServed: 'US',
                contactOption: 'TollFree',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street, Lobby 1',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              sameAs: [
                'https://www.instagram.com/48wallst/',
                'https://www.facebook.com/48wallst/',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `${siteUrl}/#localbusiness`,
              name: '48 Wall Street',
              image: `${siteUrl}/images/venue-exterior.jpg`,
              url: siteUrl,
              telephone: '212.971.5353',
              priceRange: '$$$',
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
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ],
                  opens: '09:00',
                  closes: '23:00',
                },
              ],
              sameAs: [
                'https://www.instagram.com/48wallst/',
                'https://www.facebook.com/48wallst/',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              url: siteUrl,
              name: '48 Wall Street NYC',
              description:
                "Historic 1927 event venue in Manhattan's Financial District",
              publisher: {
                '@id': `${siteUrl}/#organization`,
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
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
                  name: 'What is the capacity of 48 Wall Street?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '48 Wall Street can accommodate 350 guests for seated dinners and up to 500 guests for cocktail-style receptions. The venue features flexible spaces that can be configured for various event sizes.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What types of events can be held at 48 Wall Street?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '48 Wall Street hosts a wide variety of events including corporate meetings, conferences, product launches, weddings, Bar/Bat Mitzvahs, fashion shows, film productions, holiday parties, and private celebrations.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Where is 48 Wall Street located?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "48 Wall Street is located in the heart of Manhattan's Financial District at 48 Wall Street, Lobby 1, New York, NY 10005. The venue is easily accessible by subway and is near major Wall Street landmarks.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What makes 48 Wall Street unique?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '48 Wall Street is a historic 1927 former Bank of New York building featuring original architecture, 30-foot ceilings, Palladian windows, a grand marble staircase, and stunning chandeliers. The venue maintains much of its 1920s architectural detail and was added to the National Register of Historic Places in 2003.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does 48 Wall Street provide catering and event services?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, 48 Wall Street offers comprehensive event services through exclusive vendors including full-service catering, audiovisual equipment, event planning, decor, floral design, and event rentals.',
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
              name: '48 Wall Street',
              description:
                'Historic 1927 Bank of New York & Trust Company building at the corner of Wall and William Streets in Lower Manhattan',
              hasMap:
                'https://maps.google.com/?q=48+Wall+Street+New+York+NY+10005',
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
              containedInPlace: {
                '@type': 'City',
                name: 'New York',
              },
              additionalProperty: [
                {
                  '@type': 'PropertyValue',
                  name: 'Historic Designation',
                  value: 'National Register of Historic Places (2003)',
                },
                {
                  '@type': 'PropertyValue',
                  name: 'Original Building',
                  value: 'Bank of New York & Trust Company Building',
                },
                {
                  '@type': 'PropertyValue',
                  name: 'Year Built',
                  value: '1927',
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-80XQBNM6K4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-80XQBNM6K4');
            gtag('config', 'AW-11296477299');
          `}
        </Script>
        <Navbar />
        <SocialMediaSidebar />
        <ChatbotWidget />
        <ContactUsSlider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
