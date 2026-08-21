'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';
import SantaExperienceModal from './SantaExperienceModal';

interface SantaSectionProps {
  /** Section background. Alternate against the neighbouring section. */
  background?: 'white' | 'whitesmoke';
}

const HIGHLIGHTS = [
  {
    title: 'Time With Santa',
    body: 'An unhurried visit in a beautifully appointed setting, with room for every wish list and no sense of being rushed along.',
  },
  {
    title: 'Keepsake Portrait',
    body: 'A professionally lit holiday photograph on the grand marble staircase, captured and delivered as a lasting memento.',
  },
  {
    title: 'A Landmark Setting',
    body: 'Towering trees, garland wrapped balustrades and thousands of lights beneath thirty foot ceilings and original 1920s detail.',
  },
];

/**
 * "Santa Lands on Wall Street" feature for the holiday events page.
 *
 * Editorial split layout: a tall festive image paired with a copy column and
 * three numbered highlights, keeping the gold-on-dark accent language used
 * across the site's feature sections.
 */
export default function SantaSection({
  background = 'whitesmoke',
}: SantaSectionProps) {
  const bg = background === 'white' ? 'bg-white' : 'bg-whitesmoke';
  const [bookingOpen, setBookingOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section className={`${bg} py-16 md:py-24`} aria-labelledby="santa-heading">
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
              A 48 Wall Street Holiday Tradition
            </p>
            <span className="bg-primary h-px w-10" />
          </div>

          <h2
            id="santa-heading"
            className="heading-hero mb-6 text-[2.4rem] md:text-[3.2rem]"
          >
            Sit Down With Santa
          </h2>

          <p className="text-lead text-gray-600">
            Turn a visit with Santa into a landmark holiday tradition. Step
            inside 48 Wall Street for a beautifully appointed visit, gather the
            family, share a wish list and capture a memory in one of Lower
            Manhattan&apos;s most distinctive settings.
          </p>
        </motion.div>

        {/* Split feature */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative min-h-[420px] overflow-hidden shadow-2xl shadow-black/20 lg:min-h-[560px]"
          >
            <Image
              src="/gallery/holiday/themes/santa-01.jpg"
              alt="Santa welcoming a family in the holiday decorated lobby of 48 Wall Street, New York"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="from-dark-black/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

            <div className="absolute right-6 bottom-7 left-7">
              <p className="font-secondary mb-1 text-[10px] font-semibold tracking-[0.28em] text-white/80 uppercase">
                Photo Experience
              </p>
              <p className="font-primary text-xl text-white">
                Portraits on the Grand Staircase
              </p>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {HIGHLIGHTS.map((item, i) => (
                <div key={item.title} className="flex gap-5">
                  <span className="font-primary text-primary/50 shrink-0 text-3xl leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-secondary mb-2 text-base font-semibold tracking-wide text-gray-900 uppercase">
                      {item.title}
                    </h3>
                    <p className="font-secondary text-sm leading-relaxed text-gray-600">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="border-primary/30 mt-10 border-t pt-9">
              {/* Pricing */}
              <div className="mb-7">
                <p className="font-primary text-dark-black text-[2rem] leading-none">
                  $125
                  <span className="font-secondary ml-2 align-middle text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                    Per person &middot; plus applicable tax
                  </span>
                </p>
                <p className="font-secondary mt-2.5 text-sm leading-relaxed text-gray-600">
                  The Alexander Hamilton Santa Experience upgrade is
                  &plus;$59.99 per child, held in the Official Alexander
                  Hamilton Offices. Subject to availability and must be selected
                  when booking.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-block w-full cursor-pointer px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto"
                >
                  Reserve Your Visit
                </button>
                <button
                  type="button"
                  onClick={() => setStoryOpen(true)}
                  className="font-secondary border-dark-black/30 hover:border-dark-black inline-block w-full cursor-pointer border px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] text-gray-900 uppercase transition-all duration-300 hover:bg-gray-900/5 sm:w-auto"
                >
                  View the Experience
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <SantaExperienceModal
        open={storyOpen}
        onClose={() => setStoryOpen(false)}
        onReserve={() => setBookingOpen(true)}
      />

      <BookingModal
        experience="santa"
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
