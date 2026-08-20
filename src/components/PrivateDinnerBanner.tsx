'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';

interface PrivateDinnerBannerProps {
  /**
   * Content-panel background. The image half is unaffected.
   * Alternate against the neighbouring section.
   */
  background?: 'dark' | 'white' | 'whitesmoke';
}

const AVAILABLE_DAYS = ['Monday', 'Tuesday', 'Saturday'];

/**
 * Private Dinner Experience banner for The Alexander Hamilton Office.
 *
 * Full-bleed split: the image occupies exactly half the viewport width on
 * large screens, the copy panel the other half. Stacks to a single column
 * below the lg breakpoint.
 */
export default function PrivateDinnerBanner({
  background = 'dark',
}: PrivateDinnerBannerProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const isDark = background === 'dark';
  const panelBg = isDark
    ? 'bg-dark-black'
    : background === 'white'
      ? 'bg-white'
      : 'bg-whitesmoke';

  const headingColor = isDark ? 'text-white' : 'text-gray-900';
  const bodyColor = isDark ? 'text-gray-300' : 'text-gray-600';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-500';
  const ruleColor = isDark ? 'border-primary/25' : 'border-primary/40';

  return (
    <section
      className="w-full overflow-hidden"
      aria-labelledby="private-dinner-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image, exactly half the width on lg+ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative h-80 w-full sm:h-[28rem] lg:h-auto lg:min-h-[40rem]"
        >
          <Image
            src="/spaces/hamilton-room/hamilton-small.jpg"
            alt="Private dinner setting in The Alexander Hamilton Office at 48 Wall Street, Financial District NYC"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle vignette so the seam against the panel reads intentionally */}
          <div
            className={`pointer-events-none absolute inset-0 ${
              isDark
                ? 'from-dark-black/60 lg:to-dark-black/45 bg-gradient-to-t via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent'
                : 'bg-gradient-to-t from-black/25 via-transparent to-transparent lg:bg-none'
            }`}
          />
        </motion.div>

        {/* Copy, exactly half the width on lg+ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className={`${panelBg} flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 lg:py-20 xl:px-24`}
        >
          <div className="mx-auto w-full max-w-xl">
            <p className="font-secondary text-primary mb-5 text-[11px] font-semibold tracking-[0.3em] uppercase">
              The Alexander Hamilton Experience
            </p>

            <h2
              id="private-dinner-heading"
              className={`font-primary mb-6 text-[2rem] leading-tight md:text-[2.75rem] ${headingColor}`}
            >
              A Private Dinner Experience
            </h2>

            <p
              className={`font-secondary mb-8 text-sm leading-relaxed md:text-base md:leading-loose ${bodyColor}`}
            >
              Reserve an intimate evening in one of New York&apos;s most
              distinguished private rooms. Set beneath soaring ceilings, gilded
              columns, and a stately fireplace overlooking Wall Street, this
              exclusive dining experience welcomes up to eight guests for an
              evening where history and hospitality meet.
            </p>

            {/* Capacity and availability */}
            <div className={`mb-9 border-t border-b py-7 ${ruleColor}`}>
              <div className="mb-6 flex items-baseline gap-3">
                <span className="font-primary text-primary text-4xl leading-none">
                  8
                </span>
                <span
                  className={`font-secondary text-xs tracking-[0.2em] uppercase ${mutedColor}`}
                >
                  Guests Maximum
                </span>
              </div>

              <p
                className={`font-secondary mb-3 text-[11px] tracking-[0.24em] uppercase ${mutedColor}`}
              >
                Available
              </p>
              <div className="flex flex-wrap gap-2.5">
                {AVAILABLE_DAYS.map((day) => (
                  <span
                    key={day}
                    className="font-secondary border-primary/40 text-primary border px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-block cursor-pointer px-10 py-4 text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Reserve Now
            </button>
          </div>
        </motion.div>
      </div>

      <BookingModal
        experience="hamilton"
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
