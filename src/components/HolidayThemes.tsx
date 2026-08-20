'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    // PLACEHOLDER copy
    name: 'Winter Wonderland',
    tagline: 'Silver, Frost & Candlelight',
    description:
      'A cool, luminous palette of silver, crystal, and soft white light. Frosted installations and mirrored details turn the historic vault into a glittering winter retreat.',
    image: '/gallery/holiday/holiday-05.jpg',
    imageAlt:
      'Winter themed holiday decor with lights and seasonal installation at 48 Wall Street, NYC',
  },
  {
    id: 'golden-christmas',
    // PLACEHOLDER copy
    name: 'Golden Christmas',
    tagline: 'Gold, Evergreen & Firelight',
    description:
      'Deep evergreen garland, warm gold accents, and rich firelight tones. A classic, opulent holiday setting that plays directly to the venue&apos;s 1920s architecture.',
    image: '/gallery/holiday/holiday-08.jpg',
    imageAlt:
      'Classic gold and evergreen holiday decor with decorated tree at 48 Wall Street, Financial District NYC',
  },
];

export default function HolidayThemes({
  background = 'white',
}: HolidayThemesProps) {
  const bg = background === 'white' ? 'bg-white' : 'bg-whitesmoke';

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
              <Link
                href="/contact?inquiry=holiday-theme"
                className="group block h-full"
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
                      Learn More
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
