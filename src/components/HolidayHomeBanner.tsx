'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Homepage holiday feature banner.
 *
 * Full-bleed festive image with an overlaid copy panel, mirroring the
 * cinematic treatment used by ParallaxSection and ImageSection so the holiday
 * push reads as part of the existing design language rather than an add-on.
 */
export default function HolidayHomeBanner() {
  return (
    <section
      className="relative isolate w-full overflow-hidden"
      aria-labelledby="holiday-home-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/gallery/holiday/holiday-02.jpg"
          alt="Holiday celebration in the Grand Mezzanine at 48 Wall Street, Financial District NYC"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="from-dark-black/95 via-dark-black/75 to-dark-black/40 absolute inset-0 bg-gradient-to-r" />
        {/* Warm accent wash echoing the venue's gold palette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 78% 42%, rgba(210,179,113,0.20), transparent 62%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-24 md:py-32 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-4">
            <span className="bg-primary h-px w-12" />
            <p className="font-secondary text-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
              Now Booking Holiday 2026
            </p>
          </div>

          <h2
            id="holiday-home-heading"
            className="font-primary mb-6 text-[2.4rem] leading-[1.12] text-white md:text-[3.4rem]"
          >
            Make History This
            <br />
            Holiday Season
          </h2>

          <p className="font-secondary mb-10 max-w-xl text-sm leading-relaxed text-gray-200 md:text-base md:leading-loose">
            Host your year-end celebration at one of New York&apos;s most iconic
            addresses. Beneath 30-foot ceilings, a grand marble staircase, and
            original 1920s chandeliers, 48 Wall Street brings together landmark
            architecture, contemporary luxury, and exceptional hospitality.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/events/holiday-events">
              <span className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-block w-full px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto">
                Explore Holiday Events
              </span>
            </Link>
            <Link href="/contact">
              <span className="font-secondary inline-block w-full border border-white/50 px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/10 sm:w-auto">
                Check Availability
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
