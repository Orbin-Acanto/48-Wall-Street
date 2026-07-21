import type { Metadata } from 'next';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import ContactUs from '@/components/ContactUs';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you are looking for could not be found. Return to 48 Wall Street or reach out to our team.',
  robots: {
    index: false,
    follow: false,
  },
};

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About the Venue' },
  { href: '/spaces/banking-hall', label: 'Our Spaces' },
  { href: '/events/weddings', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-dark-black relative overflow-hidden px-6 pt-40 pb-24 text-center md:pt-48 md:pb-32">
        {/* Subtle decorative frame */}
        <div
          aria-hidden
          className="border-primary/20 pointer-events-none absolute inset-6 rounded-sm border md:inset-10"
        />

        <div className="relative mx-auto max-w-3xl">
          <p className="font-primary text-primary mb-2 text-[7rem] leading-none font-light tracking-widest md:text-[10rem]">
            404
          </p>

          <div className="bg-primary mx-auto mb-8 h-0.5 w-16" />

          <h1 className="font-secondary mb-6 text-2xl font-light tracking-[0.15em] text-white uppercase md:text-3xl">
            This Page Has Been Misplaced
          </h1>

          <p className="font-secondary mx-auto mb-10 max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
            The page you are looking for may have been moved, renamed, or is no
            longer available. Let us guide you back to where the story of 48 Wall
            Street continues.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/">
              <CustomButton>Return Home</CustomButton>
            </Link>
            <Link href="/contact">
              <CustomButton variant="secondary" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
                Contact Our Team
              </CustomButton>
            </Link>
          </div>

          {/* Quick links */}
          <nav
            aria-label="Helpful links"
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-secondary text-xs tracking-[0.2em] text-gray-400 uppercase transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Contact form */}
      <section className="bg-white px-6 pt-16 text-center md:px-12 md:pt-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
            We&apos;re Here to Help
          </p>
          <h2 className="heading-hero mb-4">Reach Out to Us</h2>
          <p className="text-lead">
            Looking for something specific or planning an event? Send us a note
            and our team will get back to you shortly.
          </p>
        </div>
      </section>

      <ContactUs />
    </main>
  );
}
