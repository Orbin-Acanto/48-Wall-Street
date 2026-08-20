'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Holiday promo banner.
 *
 * Slides in from the left edge on every page (the position previously held by
 * the social media sidebar, which is commented out in the root layout).
 * Dismissal is remembered for the browser session so it does not re-appear on
 * every navigation.
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
    const t = window.setTimeout(() => setOpen(true), REVEAL_DELAY_MS);
    return () => window.clearTimeout(t);
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
          initial={{ x: '-110%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-110%', opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          aria-label="Holiday events at 48 Wall Street"
          className="bg-dark-black ring-primary/30 fixed top-1/2 left-0 z-50 w-[min(400px,calc(100vw-2rem))] -translate-y-1/2 overflow-hidden shadow-2xl ring-1 shadow-black/50"
        >
          {/* Dismiss */}
          <button
            onClick={dismiss}
            aria-label="Close holiday announcement"
            className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/70 hover:ring-white/60"
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

          {/* Image */}
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src="/gallery/holiday/holiday-01.jpg"
              alt="Holiday celebration at 48 Wall Street, historic Financial District venue NYC"
              fill
              className="object-cover object-center"
              sizes="400px"
              priority={false}
            />
            <div className="from-dark-black via-dark-black/30 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
            <p className="font-secondary absolute bottom-3 left-5 text-[11px] font-semibold tracking-[0.28em] text-white uppercase">
              Now Booking Holiday 2026
            </p>
          </div>

          {/* Gold divider */}
          <div className="via-primary h-px w-full bg-gradient-to-r from-transparent to-transparent" />

          {/* Copy */}
          <div className="px-7 pt-7 pb-8 text-center">
            <p className="font-secondary text-primary mb-4 text-[11px] font-semibold tracking-[0.28em] uppercase">
              Make History This Holiday Season
            </p>
            <h2 className="font-primary mb-4 text-[1.7rem] leading-tight text-white">
              Celebrate at One of New York&apos;s Most Iconic Addresses
            </h2>
            <p className="font-secondary mb-7 text-sm leading-relaxed text-gray-300">
              Host your year-end celebration at 48 Wall Street, where landmark
              architecture, contemporary luxury, and exceptional hospitality
              come together.
            </p>

            <Link
              href="/events/holiday-events"
              onClick={dismiss}
              className="font-secondary bg-primary hover:bg-primary/90 text-dark-black block w-full px-6 py-4 text-xs font-semibold tracking-[0.18em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Secure Your Celebration Today
            </Link>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
