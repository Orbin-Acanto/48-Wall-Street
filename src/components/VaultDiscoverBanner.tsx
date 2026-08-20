'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/** Headline specs, mirrored from the Concourse Level page. */
const SPECS = [
  { value: '3,000', label: 'Square Feet' },
  { value: '200', label: 'Guests' },
  { value: '6', label: 'Breakout Rooms' },
  { value: "14'", label: 'Ceilings' },
];

/** What the space actually does, so the section informs rather than teases. */
const USES = [
  {
    title: 'Conferences & Workshops',
    body: 'Divides into six breakout rooms for concurrent sessions while the Grand Mezzanine runs the main stage.',
  },
  {
    title: 'Receptions & Pre-Function',
    body: 'Opens as a single room for cocktails before a seated dinner one floor above, connected by the grand marble staircase.',
  },
  {
    title: 'Private Dining & Galas',
    body: 'A below-grade setting inside a 1927 landmark bank vault that no other venue in New York can offer.',
  },
];

/**
 * "Discover The Vault Level" informational section driving traffic to the
 * Concourse page.
 *
 * Deliberately image-free: this sits between two dark full-bleed sections on
 * the homepage (ParallaxSection above, JourneyTimelineScroll below), so a
 * light, type-led block gives the page a break and carries the specs that
 * the surrounding cinematic sections cannot.
 */
export default function VaultDiscoverBanner() {
  return (
    <section className="w-full bg-white" aria-labelledby="vault-banner-heading">
      <div className="container mx-auto px-6 py-14 md:py-20 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="bg-primary h-px w-12" />
            <p className="font-secondary text-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
              Beneath the Banking Hall
            </p>
            <span className="bg-primary h-px w-12" />
          </div>

          <h2
            id="vault-banner-heading"
            className="font-primary mb-6 text-[2rem] leading-tight text-gray-900 md:text-[2.75rem]"
          >
            Discover The Vault Level
          </h2>

          <p className="font-secondary text-sm leading-relaxed text-gray-600 md:text-base md:leading-loose">
            Below the Grand Mezzanine lies the original vault level of a 1927
            landmark bank. Three thousand square feet that opens as one room or
            divides into six, directly connected to the Banking Hall above.
          </p>
        </motion.div>

        {/* Specs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="border-primary/30 mx-auto mt-10 grid max-w-4xl grid-cols-2 border-t border-b lg:grid-cols-4"
        >
          {SPECS.map((spec, i) => (
            <div
              key={spec.label}
              className={`border-primary/30 px-6 py-6 text-center ${
                i < 2 ? 'border-b lg:border-b-0' : ''
              } ${i % 2 === 1 ? 'border-l' : ''} ${
                i === 2 ? 'lg:border-l' : ''
              }`}
            >
              <span className="font-primary text-primary block text-3xl leading-none md:text-4xl">
                {spec.value}
              </span>
              <span className="font-secondary mt-2 block text-[11px] tracking-[0.2em] text-gray-500 uppercase">
                {spec.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Uses */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-10">
          {USES.map((use, i) => (
            <motion.div
              key={use.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <span className="bg-primary mb-4 block h-px w-10" />
              <h3 className="font-secondary mb-3 text-lg text-gray-900 md:text-xl">
                {use.title}
              </h3>
              <p className="font-secondary text-sm leading-relaxed text-gray-600">
                {use.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/spaces/concourse-level">
            <span className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-block w-full px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto">
              Explore The Vault Level
            </span>
          </Link>
          <Link href="/contact">
            <span className="font-secondary inline-block w-full border border-gray-900/30 px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] text-gray-900 uppercase transition-all duration-300 hover:border-gray-900 hover:bg-gray-900/5 sm:w-auto">
              Book a Tour
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
