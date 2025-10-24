import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | 48 Wall Street NYC - Book Your Historic Event Venue',
  description:
    "Get in touch with 48 Wall Street to plan your next corporate event, wedding, or celebration in Manhattan's Financial District. Request a tour, check availability, or speak with our event specialists.",
  keywords:
    'contact 48 Wall Street, book event venue NYC, Financial District venue inquiry, Manhattan event space booking, schedule venue tour NYC',
  openGraph: {
    title: 'Contact 48 Wall Street NYC - Plan Your Event Today',
    description:
      "Ready to host your event at Manhattan's premier historic venue? Contact our team for availability, pricing, and tours.",
    url: 'https://www.48wallnyc.com/contact',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/about/contactHero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact 48 Wall Street Historic Event Venue',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - 48 Wall Street NYC',
    description:
      "Get in touch to plan your event at Manhattan's historic Financial District venue.",
    images: ['/about/contactHero.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/contact',
  },
};

export default function ContactLayout({
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
            '@type': 'ContactPage',
            mainEntity: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              telephone: '+1-877-885-0705',
              email: 'info@48WallNYC.com',
              url: 'https://www.48wallnyc.com',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.7074,
                longitude: -74.0089,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                ],
                opens: '09:00',
                closes: '18:00',
              },
            },
          }),
        }}
      />
      {children}
    </>
  );
}
