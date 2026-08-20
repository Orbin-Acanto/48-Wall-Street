'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Full-bleed "discover The Vault Level" banner.
 *
 * Used on pages that should drive traffic into the Concourse Vault Level page.
 * Dark cinematic treatment consistent with ParallaxSection and the homepage
 * holiday banner.
 */
export default function VaultDiscoverBanner() {
  return (
    <section
      className="relative isolate w-full overflow-hidden"
      aria-labelledby="vault-banner-heading"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/spaces/concourse-level/hero-01.jpg"
          alt="The Concourse Vault Level at 48 Wall Street, historic below-grade event space in the Financial District NYC"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="from-dark-black/95 via-dark-black/80 to-dark-black/55 absolute inset-0 bg-gradient-to-r" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 75% 50%, rgba(210,179,113,0.18), transparent 60%)',
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
          <div className="mb-6 flex items-center gap-4">
            <span className="bg-primary h-px w-12" />
            <p className="font-secondary text-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
              Beneath the Banking Hall
            </p>
          </div>

          <h2
            id="vault-banner-heading"
            className="font-primary mb-6 text-[2.4rem] leading-[1.12] text-white md:text-[3.4rem]"
          >
            Discover
            <br />
            The Vault Level
          </h2>

          <p className="font-secondary mb-10 max-w-xl text-sm leading-relaxed text-gray-200 md:text-base md:leading-loose">
            Below the Grand Mezzanine lies the original vault level of a 1927
            landmark bank. Three thousand square feet of flexible space, six
            breakout rooms, and a setting no other venue in New York can offer.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/spaces/concourse-level">
              <span className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-block w-full px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto">
                Explore The Vault Level
              </span>
            </Link>
            <Link href="/contact">
              <span className="font-secondary inline-block w-full border border-white/50 px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/10 sm:w-auto">
                Book a Tour
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
