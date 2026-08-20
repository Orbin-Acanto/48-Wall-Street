'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { claimPromoSlot } from '@/utils/promoSlot';

/**
 * Hidden Holiday Speakeasy side banner.
 *
 * Slides in from the right edge on holiday-related pages as a full-width
 * panel seated below the fixed navbar.
 *
 * Dismissal is tracked under its own storage key, deliberately separate from
 * the HolidayPromoBanner key: closing the homepage banner must NOT close this
 * one. It stays until the user dismisses it here.
 *
 * Dismissal is remembered for the browser session under this panel's own key,
 * so closing it never affects any other banner.
 */

const STORAGE_KEY = '48wall-speakeasy-banner-dismissed';
const REVEAL_DELAY_MS = 3400;

/** Featured experiences, from the speakeasy announcement. */
const FEATURES = [
  'Custom Wooden Speakeasy Bar',
  'Premium Craft Cocktails & Holiday Spirits',
  'Authentic Barrel Highboy Cocktail Tables',
  'Black & White Dance Floor',
  'Elegant Black Wingback Lounge Seating',
  'Vintage-Inspired Speakeasy Décor',
  'Professional DJ & Live Entertainment',
  'Luxury Lounge Areas',
  'Private Cocktail Experience',
  'Exclusive Access to a Hidden Wall Street Venue',
];

/** Who the space is built for. */
const AUDIENCES = [
  'Corporate Holiday Parties',
  'Executive Receptions',
  'Client Appreciation Events',
  'End-of-Year Celebrations',
  'Private Buyouts',
  'Luxury Brand Events',
  'Financial Industry Gatherings',
  'Networking Events',
];

export default function SpeakeasyPromoBanner() {
  const [open, setOpen] = useState(false);

  // Claim the promo slot for as long as this component is mounted, so the
  // site-wide HolidayPromoBanner stays suppressed on this page. The claim is
  // deliberately tied to mount/unmount rather than to `open`: dismissing this
  // panel must not cause the holiday banner to appear in its place.
  useEffect(() => claimPromoSlot(), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      // Private mode / storage disabled: fall through and still show it.
    }
    const t = window.setTimeout(() => setOpen(true), REVEAL_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Non-fatal: the banner simply shows again next navigation.
    }
  }, []);

  // Close on Escape while the banner is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="speakeasy-banner"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-label="Hidden Holiday Speakeasy at 48 Wall Street"
          style={{
            top: 'var(--navbar-height)',
            height: 'calc(100dvh - var(--navbar-height))',
          }}
          className="bg-dark-black border-primary/40 fixed right-0 z-30 flex w-full flex-col overflow-hidden border-l-2 shadow-2xl shadow-black/50 sm:w-[70vw] md:w-[55vw] lg:w-[40vw]"
        >
          {/* Dismiss */}
          <button
            onClick={dismiss}
            aria-label="Close speakeasy announcement"
            className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/80 hover:ring-white/60"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="flex w-full flex-1 flex-col overflow-y-auto">
            {/* Image */}
            <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-52">
              <Image
                src="/gallery/holiday/holiday-04.jpg"
                alt="Prohibition-inspired hidden holiday speakeasy at 48 Wall Street, Financial District NYC"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 40vw"
                priority={false}
              />
              <div className="from-dark-black via-dark-black/40 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
              {/* Availability badge */}
              <div className="border-primary/50 bg-dark-black/70 absolute top-5 left-6 border px-3 py-1.5 backdrop-blur-sm">
                <p className="font-secondary text-primary text-[10px] font-semibold tracking-[0.24em] uppercase">
                  Available November 1, 2026
                </p>
              </div>
            </div>

            {/* Copy */}
            <div className="flex flex-1 flex-col px-7 pt-7 pb-8 sm:px-9">
              <p className="font-secondary text-primary mb-3 text-[10px] font-semibold tracking-[0.3em] uppercase">
                The Celebration Doesn&apos;t End Here
              </p>

              <h2 className="font-primary text-[1.7rem] leading-[1.15] text-white sm:text-[1.95rem]">
                Wall Street&apos;s Hidden Holiday Speakeasy
              </h2>

              <span className="bg-primary/70 mt-5 mb-5 block h-px w-14" />

              <p className="font-secondary mb-4 text-[13.5px] leading-relaxed text-gray-300">
                Hidden beneath one of New York City&apos;s most iconic landmark
                buildings, our newest holiday destination transforms an intimate
                space into a sophisticated Prohibition-inspired speakeasy
                designed exclusively for corporate holiday celebrations, client
                appreciation events, and private receptions.
              </p>

              <p className="font-secondary mb-7 text-[13.5px] leading-relaxed text-gray-300">
                After your dinner, awards presentation, or cocktail reception,
                invite your guests to continue the celebration with an
                unforgettable after-party experience unlike anything else in
                Lower Manhattan.
              </p>

              {/* A New Holiday Experience */}
              <h3 className="font-primary mb-2.5 text-[1.15rem] leading-snug text-white">
                A New Holiday Experience
              </h3>
              <p className="font-secondary border-primary/25 mb-7 border-l-2 pl-4 text-[13px] leading-relaxed text-gray-400">
                Inspired by the glamour of the 1920s, our Hidden Holiday
                Speakeasy blends historic architecture with contemporary luxury,
                creating an immersive environment where guests can relax,
                network, and celebrate long into the evening.
              </p>

              {/* Featured experiences */}
              <p className="font-secondary text-primary mb-3 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                Featured Experiences
              </p>
              <ul className="border-primary/25 mb-7 grid grid-cols-1 gap-y-2.5 border-t border-b py-4">
                {FEATURES.map((item) => (
                  <li
                    key={item}
                    className="font-secondary flex items-start gap-2.5 text-[12px] leading-snug text-gray-300"
                  >
                    <span className="bg-primary mt-[6px] h-1 w-1 shrink-0 rotate-45" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Why guests love it */}
              <h3 className="font-primary mb-2.5 text-[1.15rem] leading-snug text-white">
                Why Your Guests Will Love It
              </h3>
              <p className="font-secondary mb-4 text-[13px] leading-relaxed text-gray-400">
                More than just an event space, the Hidden Holiday Speakeasy
                creates a second destination within your celebration, a surprise
                experience that encourages guests to stay longer, socialize, and
                enjoy the evening in a completely different atmosphere.
              </p>
              <p className="font-secondary mb-7 text-[13px] leading-relaxed text-gray-400">
                Whether entertaining executives, clients, or employees, the
                experience delivers a memorable finale that guests will be
                talking about long after the event ends.
              </p>

              {/* Perfect for */}
              <p className="font-secondary text-primary mb-3 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                Perfect For
              </p>
              <div className="mb-7 flex flex-wrap gap-2">
                {AUDIENCES.map((item) => (
                  <span
                    key={item}
                    className="font-secondary border-primary/35 border px-3 py-1.5 text-[10px] tracking-[0.1em] text-gray-300 uppercase"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Availability */}
              <div className="border-primary/30 bg-primary/5 mb-7 border p-5">
                <p className="font-secondary text-primary mb-1.5 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                  Available Beginning
                </p>
                <p className="font-primary mb-3 text-[1.35rem] leading-none text-white">
                  November 1, 2026
                </p>
                <p className="font-secondary text-[12.5px] leading-relaxed text-gray-400">
                  Reservations are now being accepted for the 2026 holiday
                  season. As availability is limited, we encourage clients to
                  reserve their preferred date early.
                </p>
              </div>

              <p className="font-secondary text-primary mb-6 text-[11px] tracking-[0.16em] uppercase">
                Don&apos;t end the night, elevate it
              </p>

              {/* Actions */}
              <div>
                <Link
                  href="/contact?inquiry=holiday-speakeasy"
                  onClick={dismiss}
                  className="font-secondary bg-primary hover:bg-primary/90 text-dark-black block w-full px-6 py-4 text-center text-[11px] font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Inquire to Secure Your Experience
                </Link>

                <Link
                  href="/spaces/concourse-level"
                  onClick={dismiss}
                  className="font-secondary mt-3 block w-full border border-white/25 px-6 py-3.5 text-center text-[11px] font-semibold tracking-[0.18em] text-white uppercase transition-all duration-300 hover:border-white/60 hover:bg-white/5"
                >
                  Book a Private Tour
                </Link>

                <p className="font-secondary mt-5 text-center text-[11.5px] leading-relaxed text-gray-500">
                  Where history, luxury, and celebration come together.
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
