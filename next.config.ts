import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      { source: '/about-48wall.html', destination: '/about', permanent: true },
      {
        source: '/event-video.html',
        destination: '/about/event-video',
        permanent: true,
      },
      {
        source: '/virtual-tour-request.html',
        destination: '/about/virtual-tour',
        permanent: true,
      },
      {
        source: '/events-floorplans.html',
        destination: '/about/floor-plans',
        permanent: true,
      },
      { source: '/grand-mezzanine.html', destination: '/', permanent: true },
      { source: '/concourse.html', destination: '/', permanent: true },
      {
        source: '/48wall-brochure.html',
        destination: '/digital-brochure',
        permanent: true,
      },
      {
        source: '/rules-regulations.html',
        destination: '/about/rules-regulations',
        permanent: true,
      },

      { source: '/events.html', destination: '/', permanent: true },
      {
        source: '/events-corporate.html',
        destination: '/events/corporate',
        permanent: true,
      },
      {
        source: '/conferences.html',
        destination: '/events/corporate',
        permanent: true,
      },
      {
        source: '/events-fashion-shows.html',
        destination: '/events/fashion-shows',
        permanent: true,
      },
      {
        source: '/events-film-shoots.html',
        destination: '/events/film-shoots',
        permanent: true,
      },
      {
        source: '/events-non-profit.html',
        destination: '/events/non-profit',
        permanent: true,
      },
      {
        source: '/weddings.html',
        destination: '/events/weddings',
        permanent: true,
      },
      {
        source: '/bar-bat-mitzvahs.html',
        destination: '/events/bar-bat-mitzvahs',
        permanent: true,
      },
      {
        source: '/holiday-events.html',
        destination: '/events/holiday-events',
        permanent: true,
      },

      {
        source: '/services.html',
        destination: '/services/production',
        permanent: true,
      },
      {
        source: '/services-production.html',
        destination: '/services/production',
        permanent: true,
      },
      {
        source: '/services-catering.html',
        destination: '/services/catering',
        permanent: true,
      },
      {
        source: '/services-rentals.html',
        destination: '/services/rentals',
        permanent: true,
      },

      { source: '/our-vendors.html', destination: '/', permanent: true },

      {
        source: '/photo-galleries.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/corporate-gallery.html',
        destination: '/gallery?tab=corporate',
        permanent: true,
      },
      {
        source: '/conferences-meetings-gallery.html',
        destination: '/gallery?tab=corporate',
        permanent: true,
      },
      {
        source: '/fashion-gallery.html',
        destination: '/gallery?tab=fashion',
        permanent: true,
      },
      {
        source: '/wedding-gallery.html',
        destination: '/gallery?tab=wedding',
        permanent: true,
      },
      {
        source: '/mitzvah-gallery.html',
        destination: '/gallery?tab=bar',
        permanent: true,
      },
      {
        source: '/holiday-gallery.html',
        destination: '/gallery?tab=holiday',
        permanent: true,
      },

      {
        source: '/our-location.html',
        destination: '/location',
        permanent: true,
      },
      { source: '/contact-us.html', destination: '/contact', permanent: true },
      { source: '/thankyou.html', destination: '/thank-you', permanent: true },
      {
        source: '/events-private.html',
        destination: '/events/weddings',
        permanent: true,
      },
      {
        source: '/executive-chef.html',
        destination: '/services/catering',
        permanent: true,
      },
      {
        source: '/about-the-museum.html',
        destination: '/about',
        permanent: true,
      },
      { source: '/moaf-concourse.html', destination: '/', permanent: true },
      {
        source: '/moaf-grand-mezzanine.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/museum-corporate-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/museum-event-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/museum-mitvah-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/museum-wedding-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    qualities: [75, 100],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
