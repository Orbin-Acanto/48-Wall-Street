'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { isPromoSlotClaimed, onPromoSlotChange } from '@/utils/promoSlot';

/**
 * Holiday promo banner.
 *
 * Slides in from the right edge on every page as a full-width panel seated
 * below the fixed navbar. Dismissal is remembered for the browser session so
 * it does not re-appear on every navigation.
 */

const STORAGE_KEY = '48wall-holiday-banner-dismissed';
const REVEAL_DELAY_MS = 2200;

export default function HolidayPromoBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      // Private mode / storage disabled: fall through and still show it.
    }

    let timer: number | undefined;

    // Both panels occupy the same right-hand slot, so only one may show.
    // Holiday-related pages mount the more specific speakeasy panel, which
    // wins for the whole page -- including after the user dismisses it.
    const evaluate = () => {
      if (isPromoSlotClaimed()) {
        window.clearTimeout(timer);
        setOpen(false);
        return;
      }
      timer = window.setTimeout(() => setOpen(true), REVEAL_DELAY_MS);
    };

    // Defer one frame so a sibling speakeasy panel has mounted and claimed.
    const raf = window.requestAnimationFrame(evaluate);
    const unsubscribe = onPromoSlotChange(evaluate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Non-fatal: the banner simply shows again next navigation.
    }
  };

  // Close on Escape while the banner is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="holiday-banner"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-label="Holiday events at 48 Wall Street"
          style={{
            top: 'var(--navbar-height)',
            height: 'calc(100dvh - var(--navbar-height))',
          }}
          className="bg-dark-black border-primary/40 fixed right-0 z-30 flex w-full flex-col overflow-hidden border-l-2 shadow-2xl shadow-black/50 sm:w-[70vw] md:w-[55vw] lg:w-[40vw]"
        >
          {/* Dismiss */}
          <button
            onClick={dismiss}
            aria-label="Close holiday announcement"
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
            <div className="relative h-64 w-full shrink-0 overflow-hidden sm:h-52">
              <Image
                src="/gallery/holiday/holiday-01.jpg"
                alt="Holiday celebration at 48 Wall Street, historic Financial District venue NYC"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 40vw"
                priority={false}
              />
              <div className="from-dark-black via-dark-black/40 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />

              {/* Season badge */}
              <div className="border-primary/50 bg-dark-black/70 absolute top-5 left-6 border px-3 py-1.5 backdrop-blur-sm">
                <p className="font-secondary text-primary text-[10px] font-semibold tracking-[0.24em] uppercase">
                  Now Booking &middot; Holiday 2026
                </p>
              </div>
            </div>

            {/* Copy */}
            <div className="flex flex-1 flex-col px-7 pt-7 pb-8 sm:px-9">
              <p className="font-secondary text-primary mb-3 text-[10px] font-semibold tracking-[0.3em] uppercase">
                Make History This Holiday Season
              </p>

              <h2 className="font-primary text-[1.75rem] leading-[1.15] text-white sm:text-[2rem]">
                Celebrate at One of New York&apos;s Most Iconic Addresses
              </h2>

              <span className="bg-primary/70 mt-5 mb-5 block h-px w-14" />

              <p className="font-secondary mb-6 text-[13.5px] leading-relaxed text-gray-300">
                Host your year-end celebration inside a 1927 landmark.
                Thirty-foot ceilings, original marble, and crystal chandeliers
                set a tone no ballroom can replicate, with full-service catering
                and a dedicated event team from first walkthrough to last dance.
              </p>

              {/* Stats */}
              <div className="border-primary/25 grid grid-cols-3 border-t border-b">
                {[
                  { value: '50 to 500', label: 'Guests' },
                  { value: "30'", label: 'Ceilings' },
                  { value: '1927', label: 'Landmark' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`py-4 text-center ${
                      i > 0 ? 'border-primary/25 border-l' : ''
                    }`}
                  >
                    <span className="font-primary text-primary block text-xl leading-none sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="font-secondary mt-1.5 block text-[9.5px] tracking-[0.18em] text-gray-500 uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* What's included */}
              <ul className="mt-6 mb-7 space-y-2.5">
                {[
                  'Full-service holiday catering & bar',
                  'Custom decor, lighting & theming',
                  'DJ, live music & entertainment',
                  'Dedicated event planning team',
                ].map((item) => (
                  <li
                    key={item}
                    className="font-secondary flex items-start gap-3 text-[12.5px] leading-snug text-gray-300"
                  >
                    <span className="bg-primary mt-[7px] h-1 w-1 shrink-0 rotate-45" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="mt-auto pt-2">
                <Link
                  href="/contact?inquiry=holiday-celebration"
                  onClick={dismiss}
                  className="font-secondary bg-primary hover:bg-primary/90 text-dark-black block w-full px-6 py-4 text-center text-[11px] font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Secure Your Celebration
                </Link>

                <p className="font-secondary mt-4 text-center text-[10px] tracking-[0.14em] text-gray-500 uppercase">
                  November &amp; December dates booking quickly
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
