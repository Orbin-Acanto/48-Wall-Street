'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface WinterWonderlandModalProps {
  open: boolean;
  onClose: () => void;
}

const PILLARS = [
  {
    number: '01',
    name: 'Luminous',
    body: 'Suspended snowflakes and cascading lights',
  },
  {
    number: '02',
    name: 'Frosted',
    body: 'Winter trees and illuminated branches',
  },
  {
    number: '03',
    name: 'Reflective',
    body: 'Silver, crystal, glass and mirrored accents',
  },
  {
    number: '04',
    name: 'Intimate',
    body: 'White lounges, candlelight and layered blue illumination',
  },
];

const MOMENTS = [
  {
    number: '01',
    name: 'Arrival',
    body: 'A dramatic winter entrance welcomes guests into the experience.',
  },
  {
    number: '02',
    name: 'Cocktails',
    body: 'Candlelit lounges and bars invite conversation and connection.',
  },
  {
    number: '03',
    name: 'Dining',
    body: 'Flexible layouts support seated dinners, chef stations or elegant buffets.',
  },
  {
    number: '04',
    name: 'Celebration',
    body: 'Lighting, music and open gathering areas set the stage for dancing.',
  },
];

const OCCASIONS = [
  'Corporate holiday galas',
  'Client appreciation events',
  'Cocktail receptions',
  'Company celebrations',
  'Awards dinners',
  'Private parties',
  'Product launches',
  'New Year gatherings',
];

const HOSPITALITY = [
  {
    name: 'Thoughtful Menus',
    body: 'Seasonal culinary experiences designed for the guest journey.',
  },
  {
    name: 'Polished Service',
    body: 'Attentive hospitality and seamless execution from arrival through departure.',
  },
];

/** Page titles, used by the footer rail and the progress counter. */
const PAGES = [
  'Cover',
  'A Season Transformed',
  'Winter, Reimagined',
  'The Vault Setting',
  'Designed for Celebration',
  'An Extraordinary Setting',
  'Hospitality',
  'Reserve',
];

const TOTAL = PAGES.length;

/**
 * Drifting snow. Two layers at different depths so the fall reads as three
 * dimensional: small blurred flakes behind, larger crisper ones in front.
 */
function Snowfall() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 54 }, (_, i) => {
        const front = i % 3 === 0;
        return {
          id: i,
          left: (i * 31.7) % 100,
          size: front ? 2.5 + ((i * 5) % 4) : 1.2 + ((i * 3) % 3),
          delay: (i * 0.47) % 12,
          duration: front ? 9 + ((i * 3) % 7) : 14 + ((i * 5) % 10),
          drift: ((i % 7) - 3) * 26,
          opacity: front ? 0.75 : 0.4,
          blur: front ? 0 : 1,
        };
      }),
    []
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {flakes.map((f) => (
        <motion.span
          key={f.id}
          initial={{ y: '-8%', x: 0, opacity: 0 }}
          animate={{
            y: '108%',
            x: [0, f.drift, -f.drift * 0.6, 0],
            opacity: [0, f.opacity, f.opacity, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            filter: f.blur ? `blur(${f.blur}px)` : undefined,
          }}
          className="absolute rounded-full bg-white"
        />
      ))}
    </div>
  );
}

/** A single illuminated winter tree, built from stacked tiers of light. */
function WinterTree({
  className = '',
  delay = 0,
  scale = 1,
}: {
  className?: string;
  delay?: number;
  scale?: number;
}) {
  // Gradient ids must be unique per instance, otherwise every tree paints with
  // whichever definition rendered last.
  const gradientId = useId();

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 100 150"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ transform: `scale(${scale})` }}
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(186,230,253,0.85)" />
          <stop offset="100%" stopColor="rgba(56,120,200,0.15)" />
        </linearGradient>
      </defs>

      {/* Tiers */}
      {[
        { y: 34, w: 26 },
        { y: 62, w: 36 },
        { y: 92, w: 46 },
      ].map((tier, i) => (
        <motion.path
          key={tier.y}
          d={`M50 ${tier.y - 30} L${50 + tier.w} ${tier.y} L${50 - tier.w} ${tier.y} Z`}
          fill={`url(#${gradientId})`}
          stroke="rgba(186,230,253,0.55)"
          strokeWidth="0.8"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + i * 0.4,
          }}
        />
      ))}

      {/* Trunk */}
      <rect x="46" y="92" width="8" height="22" fill="rgba(120,170,230,0.35)" />

      {/* Star */}
      <motion.circle
        cx="50"
        cy="2"
        r="3"
        fill="rgba(255,255,255,0.95)"
        animate={{ opacity: [0.5, 1, 0.5], r: [2.5, 3.6, 2.5] }}
        transition={{ duration: 2.6, repeat: Infinity, delay }}
      />
    </motion.svg>
  );
}

/** Slow twinkling points of light, like distant bulbs. */
function Twinkles() {
  const points = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: (i * 61) % 96,
        top: (i * 37) % 88,
        delay: (i * 0.6) % 5,
        size: 1.5 + ((i * 3) % 3),
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {points.map((pt) => (
        <motion.span
          key={pt.id}
          animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.25, 0.6] }}
          transition={{
            duration: 3.4,
            delay: pt.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${pt.left}%`,
            top: `${pt.top}%`,
            width: pt.size,
            height: pt.size,
          }}
          className="absolute rounded-full bg-sky-100 shadow-[0_0_6px_2px_rgba(186,230,253,0.6)]"
        />
      ))}
    </div>
  );
}

/** Decorative snowflake glyph, used as a section ornament. */
function SnowflakeGlyph({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
      <path d="M12 6.5l-2 2M12 6.5l2 2M12 17.5l-2-2M12 17.5l2-2M6.5 12l2-2M6.5 12l2 2M17.5 12l-2-2M17.5 12l-2 2" />
    </motion.svg>
  );
}

/** A row of hanging ornaments that sway gently. */
function Ornaments({ className = '' }: { className?: string }) {
  const items = useMemo(
    () => [
      { id: 0, x: 12, drop: 34, size: 9, delay: 0 },
      { id: 1, x: 32, drop: 54, size: 7, delay: 0.5 },
      { id: 2, x: 54, drop: 28, size: 11, delay: 1.1 },
      { id: 3, x: 74, drop: 48, size: 8, delay: 0.3 },
      { id: 4, x: 90, drop: 38, size: 6, delay: 0.8 },
    ],
    []
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden ${className}`}
    >
      {items.map((o) => (
        <motion.div
          key={o.id}
          style={{ left: `${o.x}%` }}
          className="absolute top-0 origin-top"
          animate={{ rotate: [-3.5, 3.5, -3.5] }}
          transition={{
            duration: 5 + o.id,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: o.delay,
          }}
        >
          {/* Thread */}
          <span
            style={{ height: o.drop }}
            className="mx-auto block w-px bg-gradient-to-b from-sky-200/50 to-sky-200/20"
          />
          {/* Bauble */}
          <motion.span
            style={{ width: o.size, height: o.size }}
            className="mx-auto block rounded-full bg-gradient-to-br from-white/90 to-sky-300/50 shadow-[0_0_8px_2px_rgba(186,230,253,0.35)]"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: o.delay,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/** Section label in frosted small caps. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-secondary flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] text-sky-200/90 uppercase">
      <SnowflakeGlyph className="h-3.5 w-3.5 shrink-0 text-sky-300/80" />
      {children}
    </p>
  );
}

/** Gold rule replaced with an icy gradient hairline. */
function Rule() {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
      className="mt-5 mb-7 block h-px w-20 origin-left bg-gradient-to-r from-sky-200/90 via-sky-100/50 to-transparent"
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

/**
 * Winter Wonderland detail modal for The Vault Level.
 *
 * Presented as a paged flipbook: one spread at a time, navigated with the
 * arrows, keyboard, or the footer rail, so the deck reads as a designed
 * sequence rather than one long scroll. The palette follows the installation
 * itself, cool blue and silver, rather than the site gold.
 *
 * Content comes from the Winter Wonderland deck. Contact details use the site
 * values rather than the deck values, which point at a different domain.
 */
export default function WinterWonderlandModal({
  open,
  onClose,
}: WinterWonderlandModalProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, next));
      setDirection(clamped >= page ? 1 : -1);
      setPage(clamped);
    },
    [page]
  );

  const next = useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = useCallback(() => goTo(page - 1), [goTo, page]);

  // Reset to the cover each time the story opens.
  useEffect(() => {
    if (open) {
      setPage(0);
      setDirection(1);
    }
  }, [open]);

  // Keyboard: Escape closes, arrows turn pages.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleClose, next, prev]);

  const isCover = page === 0;

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="winter-wonderland-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#040914]/90 backdrop-blur-md"
          />

          {/* Book */}
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 flex h-full w-full max-w-6xl flex-col overflow-hidden bg-[#071122] shadow-2xl ring-1 shadow-black/70 ring-sky-200/20 sm:h-[88vh] sm:rounded-sm"
          >
            {/* Ambient winter light */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  'radial-gradient(120% 80% at 15% 0%, rgba(56,120,200,0.28), transparent 55%), radial-gradient(90% 70% at 100% 100%, rgba(120,170,230,0.18), transparent 60%)',
              }}
            />
            <Twinkles />

            {/* Illuminated treeline along the base of the book */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-56 items-end justify-between px-8 opacity-[0.22] sm:flex"
            >
              <WinterTree className="h-40 w-24" delay={0.2} />
              <WinterTree className="h-28 w-16" delay={0.6} />
              <WinterTree className="h-48 w-28" delay={0.4} />
              <WinterTree className="h-24 w-14" delay={0.9} />
              <WinterTree className="h-36 w-20" delay={0.75} />
            </div>

            <Snowfall />

            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Close Winter Wonderland details"
              className="absolute top-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:ring-white/50"
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

            {/* Pages */}
            <div className="relative z-10 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 44 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -44 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full overflow-y-auto"
                >
                  {/* 0. Cover */}
                  {page === 0 && (
                    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                      <div className="relative min-h-[16rem] overflow-hidden lg:min-h-0">
                        <motion.div
                          initial={{ scale: 1.16 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 2.2,
                            ease: [0.2, 0.8, 0.2, 1],
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src="/gallery/holiday/themes/winter-wonderland.png"
                            alt="Winter Wonderland installation in The Vault at 48 Wall Street: illuminated winter trees, suspended snowflakes and candlelit lounge seating"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071122] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#071122]" />
                      </div>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="relative flex flex-col justify-center px-8 py-12 sm:px-14 lg:py-0"
                      >
                        <Ornaments />

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[10px] font-semibold tracking-[0.34em] text-sky-200/90 uppercase"
                        >
                          48 Wall Street &middot; The Vault
                        </motion.p>

                        <motion.h2
                          variants={fadeUp}
                          id="winter-wonderland-title"
                          className="font-primary text-[2.6rem] leading-[1.02] text-white sm:text-[3.6rem]"
                        >
                          Winter
                          <br />
                          <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300/80 bg-clip-text text-transparent">
                            Wonderland
                          </span>
                        </motion.h2>

                        <motion.span
                          variants={fadeUp}
                          className="mt-7 mb-6 block h-px w-24 bg-gradient-to-r from-sky-200/90 to-transparent"
                        />

                        {/* Feature tree, brighter than the ambient treeline */}
                        <WinterTree
                          className="absolute right-6 bottom-8 hidden h-44 w-28 opacity-60 lg:block"
                          delay={1.4}
                        />

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary max-w-sm text-[14px] leading-[1.9] text-sky-50/70"
                        >
                          A private world beneath Wall Street. An immersive
                          seasonal event experience.
                        </motion.p>

                        <motion.button
                          variants={fadeUp}
                          onClick={next}
                          className="font-secondary mt-10 inline-flex w-fit items-center gap-4 border border-sky-200/40 px-8 py-4 text-[11px] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-sky-200/80 hover:bg-sky-200/10"
                        >
                          Begin the Story
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    </div>
                  )}

                  {/* 1. A Season Transformed */}
                  {page === 1 && (
                    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>A Season Transformed</Eyebrow>
                      <Rule />
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.p
                          variants={fadeUp}
                          className="font-primary mb-8 text-[1.5rem] leading-[1.45] text-white sm:text-[1.85rem]"
                        >
                          Cool blue illumination, shimmering silver details and
                          warm candlelight create a striking balance of winter
                          beauty and modern luxury.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[14.5px] leading-[1.9] text-sky-50/70"
                        >
                          This winter, The Vault at 48 Wall Street is
                          transformed into an enchanting Winter Wonderland,
                          where luminous snowflakes, glowing winter trees,
                          ambient candlelight, and elegantly appointed lounge
                          settings create an atmosphere of timeless
                          sophistication.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary text-[14.5px] leading-[1.9] text-sky-50/70"
                        >
                          From the moment guests arrive, every carefully curated
                          detail transports them away from the energy of Lower
                          Manhattan and into an intimate seasonal escape filled
                          with beauty, warmth, and wonder.
                        </motion.p>
                      </motion.div>
                    </div>
                  )}

                  {/* 2. Winter, Reimagined */}
                  {page === 2 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>Winter, Reimagined</Eyebrow>
                      <Rule />
                      <p className="font-secondary mb-9 text-[14.5px] leading-relaxed text-sky-50/60">
                        The design is luxurious and immersive, never overly
                        themed.
                      </p>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                      >
                        {PILLARS.map((pillar) => (
                          <motion.div
                            key={pillar.number}
                            variants={fadeUp}
                            className="group relative overflow-hidden border border-sky-200/15 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:border-sky-200/40 hover:bg-white/[0.06]"
                          >
                            <span
                              aria-hidden
                              className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-sky-200/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                            />
                            <SnowflakeGlyph className="pointer-events-none absolute top-5 right-5 h-8 w-8 text-sky-200/15 transition-colors duration-500 group-hover:text-sky-200/35" />
                            <span className="font-secondary relative block text-[10px] tracking-[0.24em] text-sky-300/70">
                              {pillar.number}
                            </span>
                            <h3 className="font-primary mt-3 mb-3 text-[1.35rem] text-white">
                              {pillar.name}
                            </h3>
                            <p className="font-secondary text-[13px] leading-relaxed text-sky-50/60">
                              {pillar.body}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {/* 3. The Vault Setting */}
                  {page === 3 && (
                    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>The Vault Setting</Eyebrow>
                      <Rule />
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-7 text-[2rem] leading-[1.2] text-white sm:text-[2.5rem]"
                        >
                          A private world
                          <br />
                          beneath Wall Street
                        </motion.h3>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[14.5px] leading-[1.9] text-sky-50/70"
                        >
                          The Vault offers an unforgettable setting for guests
                          seeking something beyond the expected.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-10 text-[14.5px] leading-[1.9] text-sky-50/70"
                        >
                          Its historic architecture, dramatic columns and
                          expansive layout provide a distinctive canvas for
                          winter celebrations of every scale.
                        </motion.p>

                        <motion.div
                          variants={fadeUp}
                          className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-b border-sky-200/20 py-6"
                        >
                          {['Historic', 'Dramatic', 'Unexpected'].map(
                            (word) => (
                              <span
                                key={word}
                                className="font-secondary text-[12px] tracking-[0.28em] text-sky-100/80 uppercase"
                              >
                                {word}
                              </span>
                            )
                          )}
                        </motion.div>
                      </motion.div>
                    </div>
                  )}

                  {/* 4. Designed for Celebration */}
                  {page === 4 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>Designed for Celebration</Eyebrow>
                      <Rule />

                      <motion.ol
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                      >
                        {MOMENTS.map((moment) => (
                          <motion.li
                            key={moment.number}
                            variants={fadeUp}
                            className="border-l border-sky-200/25 pl-6"
                          >
                            <span className="font-primary text-[1.6rem] leading-none text-sky-300/70">
                              {moment.number}
                            </span>
                            <h4 className="font-secondary mt-3 mb-2.5 text-[12px] font-semibold tracking-[0.22em] text-white uppercase">
                              {moment.name}
                            </h4>
                            <p className="font-secondary text-[13.5px] leading-relaxed text-sky-50/60">
                              {moment.body}
                            </p>
                          </motion.li>
                        ))}
                      </motion.ol>
                    </div>
                  )}

                  {/* 5. An Extraordinary Setting */}
                  {page === 5 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>An Extraordinary Setting</Eyebrow>
                      <Rule />
                      <p className="font-secondary mb-9 text-[14.5px] leading-relaxed text-sky-50/60">
                        Every occasion becomes part of the experience.
                      </p>

                      <motion.ul
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="grid grid-cols-1 gap-x-10 sm:grid-cols-2"
                      >
                        {OCCASIONS.map((occasion) => (
                          <motion.li
                            key={occasion}
                            variants={fadeUp}
                            className="font-secondary flex items-center gap-4 border-b border-sky-200/12 py-4 text-[14px] text-sky-50/80"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-sky-300/80" />
                            {occasion}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  )}

                  {/* 6. Hospitality */}
                  {page === 6 && (
                    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>Hospitality as Memorable as the Setting</Eyebrow>
                      <Rule />
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-7 text-[1.9rem] leading-[1.25] text-white sm:text-[2.3rem]"
                        >
                          A complete experience,
                          <br />
                          tailored to the occasion
                        </motion.h3>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-10 text-[14.5px] leading-[1.9] text-sky-50/70"
                        >
                          From welcome cocktails and passed hors d&rsquo;oeuvres
                          to chef stations, seated dinners and late night
                          treats, every menu can be shaped around the
                          celebration.
                        </motion.p>

                        <motion.div
                          variants={stagger}
                          className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                        >
                          {HOSPITALITY.map((entry) => (
                            <motion.div
                              key={entry.name}
                              variants={fadeUp}
                              className="border-t border-sky-200/30 pt-6"
                            >
                              <h4 className="font-secondary mb-3 text-[11px] font-semibold tracking-[0.24em] text-white uppercase">
                                {entry.name}
                              </h4>
                              <p className="font-secondary text-[13.5px] leading-relaxed text-sky-50/60">
                                {entry.body}
                              </p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>
                  )}

                  {/* 7. Reserve */}
                  {page === 7 && (
                    <div className="mx-auto flex h-full max-w-2xl flex-col justify-center px-8 py-14 text-center sm:px-14">
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.div variants={fadeUp}>
                          <SnowflakeGlyph className="mx-auto mb-6 h-10 w-10 text-sky-200/70" />
                        </motion.div>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[10px] font-semibold tracking-[0.32em] text-sky-200/90 uppercase"
                        >
                          Make the Season
                        </motion.p>

                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-7 text-[2.6rem] leading-[1.05] sm:text-[3.4rem]"
                        >
                          <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300/80 bg-clip-text text-transparent">
                            Extraordinary
                          </span>
                        </motion.h3>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mx-auto mb-10 max-w-md text-[14.5px] leading-[1.9] text-sky-50/70"
                        >
                          Create an unforgettable winter celebration in one of
                          Lower Manhattan&rsquo;s most distinctive event
                          settings.
                        </motion.p>

                        <motion.div variants={fadeUp}>
                          <Link
                            href="/contact?inquiry=winter-wonderland"
                            onClick={handleClose}
                            className="font-secondary mx-auto block w-full max-w-sm bg-white px-8 py-4 text-center text-[11px] font-semibold tracking-[0.2em] text-[#071122] uppercase shadow-xl transition-all duration-300 hover:bg-sky-100"
                          >
                            Reserve The Vault
                          </Link>
                        </motion.div>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mt-8 text-[11px] tracking-[0.16em] text-sky-100/50 uppercase"
                        >
                          <a
                            href="mailto:info@48WallNYC.com"
                            className="transition-colors hover:text-white"
                          >
                            info@48WallNYC.com
                          </a>
                          <span className="mx-3 text-sky-300/40">&middot;</span>
                          <a
                            href="tel:+12129715353"
                            className="transition-colors hover:text-white"
                          >
                            212.971.5353
                          </a>
                        </motion.p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer navigation */}
            <div className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-t border-sky-200/15 bg-[#050d1a]/80 px-5 py-3.5 backdrop-blur-md sm:px-8">
              <button
                onClick={prev}
                disabled={isCover}
                aria-label="Previous page"
                className="font-secondary flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.2em] text-sky-100/80 uppercase transition-all duration-300 hover:text-white disabled:pointer-events-none disabled:opacity-25"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                <span className="hidden sm:inline">Back</span>
              </button>

              {/* Page rail */}
              <div className="flex items-center gap-2">
                {PAGES.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${label}`}
                    aria-current={i === page}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === page
                        ? 'w-7 bg-sky-200'
                        : 'w-1.5 bg-sky-200/30 hover:bg-sky-200/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={page === TOTAL - 1}
                aria-label="Next page"
                className="font-secondary flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.2em] text-sky-100/80 uppercase transition-all duration-300 hover:text-white disabled:pointer-events-none disabled:opacity-25"
              >
                <span className="hidden sm:inline">Next</span>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
