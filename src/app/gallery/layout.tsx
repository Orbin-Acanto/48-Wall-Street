import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery | 48 Wall Street NYC - Historic Event Venue Images',
  description:
    "Explore stunning photos of 48 Wall Street's Grand Mezzanine Banking Hall, historic 1920s architecture, and past events. View images of our Manhattan Financial District venue's 30-foot ceilings, Palladian windows, and elegant event spaces.",
  keywords:
    'event venue photos NYC, 48 Wall Street gallery, historic venue images Manhattan, Financial District venue photos, wedding venue pictures NYC, corporate event space images, banking hall photos, 1920s architecture NYC',
  openGraph: {
    title: 'Gallery - 48 Wall Street NYC Historic Event Venue',
    description:
      "Browse beautiful photos of Manhattan's premier historic event venue. See our stunning architecture and past celebrations.",
    url: 'https://www.48wallnyc.com/gallery',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/gallery-hero.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Grand Banking Hall Interior',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery - 48 Wall Street NYC',
    description:
      'Stunning photos of our historic Financial District event venue and past celebrations.',
    images: ['/images/gallery-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/gallery',
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
            name: '48 Wall Street Event Venue Photo Gallery',
            description:
              "Photo gallery showcasing the historic architecture and event spaces of 48 Wall Street in Manhattan's Financial District",
            about: {
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
            },
            url: 'https://www.48wallnyc.com/gallery',
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
      {children}
    </>
  );
}
