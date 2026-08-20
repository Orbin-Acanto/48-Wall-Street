'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SantaSectionProps {
  /** Section background. Alternate against the neighbouring section. */
  background?: 'white' | 'whitesmoke';
}

const HIGHLIGHTS = [
  {
    title: 'Meet & Greet',
    body: 'Guests of all ages meet Santa in a warm, unhurried setting beneath the landmark architecture of the Banking Hall.',
  },
  {
    title: 'Keepsake Photo',
    body: 'A professionally lit holiday portrait on the grand marble staircase, captured and delivered as a lasting memento.',
  },
  {
    title: 'Festive Setting',
    body: 'Towering trees, garland-wrapped balustrades, and thousands of lights transform the venue into a holiday landmark.',
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
            Santa Lands on Wall Street
          </h2>

          <p className="text-lead text-gray-600">
            Santa makes his Financial District arrival at 48 Wall Street. Bring
            the family for a meet and greet beneath the grand marble staircase,
            and take home a holiday photo set against one of New York&apos;s
            most iconic landmark interiors.
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
              src="/gallery/holiday/holiday-03.jpg"
              alt="Festive holiday setting with decorated tree and garland at 48 Wall Street, Financial District NYC"
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/contact?inquiry=santa-experience">
                  <span className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-block w-full px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto">
                    Reserve Your Visit
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="font-secondary border-dark-black/30 hover:border-dark-black inline-block w-full border px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] text-gray-900 uppercase transition-all duration-300 hover:bg-gray-900/5 sm:w-auto">
                    Request Details
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
