'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface OffsiteCateringBannerProps {
  /** Section background. Alternate against the neighbouring section. */
  background?: 'white' | 'whitesmoke';
}

const SERVICES = [
  {
    name: 'Breakfast',
    body: 'Coffee service, pastries, fruit, hot breakfast, and polished morning meeting packages.',
  },
  {
    name: 'Lunch',
    body: 'Boxed lunches, executive buffets, composed platters, and working-session menus.',
  },
  {
    name: 'Cocktail Receptions',
    body: "Passed hors d'oeuvres, chef stations, bar service, and elegant small bites.",
  },
  {
    name: 'Happy Hours',
    body: 'After-work drinks, shareable plates, and effortless hospitality for your team.',
  },
  {
    name: 'Corporate Meetings',
    body: 'Full-day food and beverage service planned around your agenda.',
  },
  {
    name: 'Custom Events',
    body: 'Celebrations, launches, and special gatherings with menus designed for the moment.',
  },
];

/**
 * Off-site catering feature banner.
 *
 * Promotes catering delivered to the client's own location, as distinct from
 * in-venue catering. Copy adapted from the off-site catering microsite.
 */
export default function OffsiteCateringBanner({
  background = 'whitesmoke',
}: OffsiteCateringBannerProps) {
  const bg = background === 'white' ? 'bg-white' : 'bg-whitesmoke';

  return (
    <section
      className={`${bg} py-16 md:py-24`}
      aria-labelledby="offsite-catering-heading"
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
              Off-Site Catering
            </p>
            <span className="bg-primary h-px w-10" />
          </div>

          <h2
            id="offsite-catering-heading"
            className="heading-hero mb-6 text-[2.4rem] md:text-[3.2rem]"
          >
            Exceptional Catering. Wherever You Gather.
          </h2>

          <p className="text-lead text-gray-600">
            Your location. Our hospitality. We bring thoughtful menus, polished
            service, and dependable execution to your office, boardroom, or
            venue, coordinating menu, delivery, presentation, and service so
            your experience feels seamless from start to finish.
          </p>
        </motion.div>

        {/* Feature panel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-dark-black ring-primary/20 overflow-hidden shadow-2xl ring-1 shadow-black/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Image */}
            <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:col-span-2 lg:h-auto lg:min-h-[560px]">
              <Image
                src="/services/catering/gallery-25.jpg"
                alt="Off-site catering presentation by 48 Wall Street, corporate catering in Manhattan NYC"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="from-dark-black/70 lg:to-dark-black/70 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent" />

              <div className="absolute right-6 bottom-7 left-7 lg:hidden">
                <p className="font-primary text-xl text-white">
                  One Team. Every Detail.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="px-8 py-12 sm:px-12 lg:col-span-3 lg:px-14 lg:py-16">
              <p className="font-secondary text-primary mb-8 text-[11px] font-semibold tracking-[0.3em] uppercase">
                One Team &bull; Every Detail
              </p>

              <div className="mb-10 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
                {SERVICES.map((service) => (
                  <div key={service.name}>
                    <h3 className="font-secondary mb-2 flex items-center gap-2.5 text-sm font-semibold tracking-wide text-white uppercase">
                      <span className="bg-primary h-1 w-1 shrink-0 rounded-full" />
                      {service.name}
                    </h3>
                    <p className="font-secondary text-sm leading-relaxed text-gray-400">
                      {service.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-primary/25 border-t pt-9">
                <p className="font-secondary mb-7 text-sm leading-relaxed text-gray-300">
                  Share your date, location, guest count, and vision. We&apos;ll
                  create a catering plan tailored to your occasion.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link href="/contact?inquiry=offsite-catering">
                    <span className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-block w-full px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto">
                      Request a Proposal
                    </span>
                  </Link>
                  <a href="tel:2127851350">
                    <span className="font-secondary inline-block w-full border border-white/40 px-9 py-4 text-center text-xs font-semibold tracking-[0.18em] text-white uppercase transition-all duration-300 hover:border-white hover:bg-white/10 sm:w-auto">
                      212.785.1350
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
