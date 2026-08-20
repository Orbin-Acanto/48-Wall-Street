'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import WinterWonderlandModal from './WinterWonderlandModal';
import HiddenSpeakeasyModal from './HiddenSpeakeasyModal';

interface HolidayThemesProps {
  /** Section background. Alternate against the neighbouring section. */
  background?: 'white' | 'whitesmoke';
}

/**
 * Two-up holiday theme showcase for The Vault Level.
 *
 * NOTE: theme names, descriptions, and images below are PLACEHOLDERS pending
 * final creative. Swap the `name`, `tagline`, `description`, `image`, and
 * `imageAlt` values; the layout needs no changes.
 */
const THEMES = [
  {
    id: 'winter-wonderland',
    name: 'Winter Wonderland',
    tagline: 'A Private World Beneath Wall Street',
    description:
      'Luminous snowflakes, glowing winter trees, ambient candlelight and elegantly appointed lounge settings transform The Vault into an intimate seasonal escape.',
    image: '/gallery/holiday/themes/winter-wonderland.jpg',
    imageAlt:
      'Winter Wonderland installation in The Vault at 48 Wall Street: illuminated winter trees, suspended snowflakes and candlelit lounge seating',
    hasDetail: true,
  },
  {
    id: 'hidden-speakeasy',
    name: 'Hidden Holiday Speakeasy',
    tagline: 'An Exclusive After Hours Experience',
    description:
      'Dark wood, candlelit tables and plush lounge seating turn The Vault into a private speakeasy inspired by the glamour and mystery of another era.',
    image: '/gallery/holiday/themes/speakeasy-01.jpg',
    imageAlt:
      'The Hidden Holiday Speakeasy beneath 48 Wall Street: dark wood bar, candlelight and barrel highboy tables',
    hasDetail: true,
  },
];

export default function HolidayThemes({
  background = 'white',
}: HolidayThemesProps) {
  const bg = background === 'white' ? 'bg-white' : 'bg-whitesmoke';
  const [openTheme, setOpenTheme] = useState<string | null>(null);

  return (
    <section
      className={`${bg} py-16 md:py-24`}
      aria-labelledby="holiday-themes-heading"
    >
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="bg-primary h-px w-10" />
            <p className="font-secondary text-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
              Holiday Experiences
            </p>
            <span className="bg-primary h-px w-10" />
          </div>

          <h2
            id="holiday-themes-heading"
            className="heading-hero mb-6 text-[2.4rem] md:text-[3.2rem]"
          >
            Celebrate the Holidays in Historic Style
          </h2>

          <p className="text-lead text-gray-600">
            Choose from two distinctive holiday environments, each designed to
            transform The Vault Level into a setting your guests will remember
            long after the season ends.
          </p>
        </motion.div>

        {/* Theme cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {THEMES.map((theme, i) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <CardShell
                hasDetail={theme.hasDetail}
                onOpen={() => setOpenTheme(theme.id)}
              >
                <article className="bg-dark-black ring-primary/15 hover:ring-primary/45 flex h-full flex-col overflow-hidden shadow-xl ring-1 shadow-black/15 transition-all duration-500 hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative h-72 w-full overflow-hidden md:h-80">
                    <Image
                      src={theme.image}
                      alt={theme.imageAlt}
                      fill
                      className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="from-dark-black pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                  </div>

                  {/* Copy */}
                  <div className="flex flex-1 flex-col px-8 pt-8 pb-9">
                    <p className="font-secondary text-primary mb-3 text-[10px] font-semibold tracking-[0.28em] uppercase">
                      {theme.tagline}
                    </p>

                    <h3 className="font-primary mb-4 text-[1.8rem] leading-tight text-white">
                      {theme.name}
                    </h3>

                    <p className="font-secondary mb-7 flex-1 text-sm leading-relaxed text-gray-300">
                      {theme.description}
                    </p>

                    <span className="font-secondary text-primary inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase">
                      {theme.hasDetail ? 'View the Experience' : 'Learn More'}
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </article>
              </CardShell>
            </motion.div>
          ))}
        </div>
      </div>

      <WinterWonderlandModal
        open={openTheme === 'winter-wonderland'}
        onClose={() => setOpenTheme(null)}
      />

      <HiddenSpeakeasyModal
        open={openTheme === 'hidden-speakeasy'}
        onClose={() => setOpenTheme(null)}
      />
    </section>
  );
}

/**
 * Wraps a theme card in a button when it has a detail modal, or a contact link
 * when it does not, so both variants share identical card markup.
 */
function CardShell({
  hasDetail,
  onOpen,
  children,
}: {
  hasDetail?: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}) {
  if (hasDetail) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="group block h-full w-full cursor-pointer text-left"
      >
        {children}
      </button>
    );
  }

  return (
    <Link href="/contact?inquiry=holiday-theme" className="group block h-full">
      {children}
    </Link>
  );
}
