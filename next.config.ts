import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  async headers() {
    return [
      {
        // Apply security and performance headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Long-lived cache for images in public/
        source: '/:path*.(jpg|jpeg|png|webp|avif|gif|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Long-lived cache for videos and fonts in public/
        source: '/:path*.(mp4|webm|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JS/CSS chunks produced by Next.js (they are content-hashed)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Preconnect hint for Google services — helps font and analytics load faster
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value:
              '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin',
          },
        ],
      },
    ];
  },

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
      // Fixed: was redirecting to / — now points to the actual space pages
      {
        source: '/grand-mezzanine.html',
        destination: '/spaces/grand-mezzanine',
        permanent: true,
      },
      {
        source: '/concourse.html',
        destination: '/spaces/concourse-level',
        permanent: true,
      },
      {
        source: '/48wall-brochure.html',
        destination: '/about/digital-brochure',
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
      // Fixed: conferences.html was going to /events/corporate — now goes to /events/conferences
      {
        source: '/conferences.html',
        destination: '/events/conferences',
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
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/conferences-meetings-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/fashion-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/wedding-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/mitzvah-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/holiday-gallery.html',
        destination: '/gallery',
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
        destination: '/spaces/grand-mezzanine',
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
      // missing pages that were previously live but not redirected
      { source: '/index.html', destination: '/', permanent: true },
      {
        source: '/event-gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/pdf/Grand-Mezzanine-Floor-Dimensions.pdf',
        destination: '/spaces/grand-mezzanine',
        permanent: true,
      },
      {
        source: '/MeetingEventRulesRegulations.pdf',
        destination: '/about/rules-regulations',
        permanent: true,
      },
      {
        source: '/pdf/48wall-rules-and-regulations.pdf',
        destination: '/about/rules-regulations',
        permanent: true,
      },
      {
        source: '/pdf/48-C1-Floorplan.pdf',
        destination: '/spaces/concourse-level',
        permanent: true,
      },
      {
        source: '/48wall-holiday-packages.html',
        destination: '/flipbook/48-wall-street-holiday',
        permanent: true,
      },
      {
        source: '/events-social.html',
        destination: '/events/weddings',
        permanent: true,
      },
      {
        source: '/alexander-hamilton-room.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/private-events.html',
        destination: '/events/weddings',
        permanent: true,
      },
      { source: '/events', destination: '/events/corporate', permanent: true },
      {
        source: '/services',
        destination: '/services/production',
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
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 100],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compress: true,

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      'framer-motion',
    ],
  },
};

export default nextConfig;
