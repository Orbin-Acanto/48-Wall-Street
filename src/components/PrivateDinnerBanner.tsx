'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PrivateDinnerBannerProps {
  /** Section background. Alternate against the neighbouring section. */
  background?: 'white' | 'whitesmoke';
}

const AVAILABLE_DAYS = ['Monday', 'Tuesday', 'Saturday'];

/**
 * Private Dinner Experience banner for The Alexander Hamilton Office.
 *
 * Split layout: image on the left, reservation detail on the right, with the
 * available days rendered as discrete cards so the limited availability reads
 * as an exclusive offering rather than a restriction.
 */
export default function PrivateDinnerBanner({
  background = 'whitesmoke',
}: PrivateDinnerBannerProps) {
  const bg = background === 'white' ? 'bg-white' : 'bg-whitesmoke';

  return (
    <section
      className={`${bg} py-16 md:py-24`}
      aria-labelledby="private-dinner-heading"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-dark-black ring-primary/20 relative overflow-hidden shadow-2xl ring-1 shadow-black/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-auto lg:min-h-[520px]">
              <Image
                src="/spaces/hamilton-room/gallery-02.jpg"
                alt="Private dinner setting in The Alexander Hamilton Office at 48 Wall Street, Financial District NYC"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Soften the seam between image and copy panel */}
              <div className="from-dark-black/70 lg:to-dark-black/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent" />
            </div>

            {/* Copy */}
            <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
              <p className="font-secondary text-primary mb-5 text-[11px] font-semibold tracking-[0.3em] uppercase">
                The Alexander Hamilton Experience
              </p>

              <h2
                id="private-dinner-heading"
                className="font-primary mb-6 text-[2rem] leading-tight text-white md:text-[2.6rem]"
              >
                A Private Dinner Experience
              </h2>

              <p className="font-secondary mb-8 text-sm leading-relaxed text-gray-300 md:text-base">
                Reserve an intimate evening in one of New York&apos;s most
                distinguished private rooms. Set beneath soaring ceilings,
                gilded columns, and a stately fireplace overlooking Wall Street,
                this exclusive dining experience welcomes up to eight guests for
                an evening where history and hospitality meet.
              </p>

              {/* Capacity + availability */}
              <div className="border-primary/25 mb-8 border-t border-b py-7">
                <div className="mb-6 flex items-baseline gap-3">
                  <span className="font-primary text-primary text-4xl leading-none">
                    8
                  </span>
                  <span className="font-secondary text-xs tracking-[0.2em] text-gray-400 uppercase">
                    Guests Maximum
                  </span>
                </div>

                <p className="font-secondary mb-3 text-[11px] tracking-[0.24em] text-gray-400 uppercase">
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

              <Link href="/contact?inquiry=hamilton-private-dinner">
                <span className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-block px-10 py-4 text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl">
                  Reserve Now
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
