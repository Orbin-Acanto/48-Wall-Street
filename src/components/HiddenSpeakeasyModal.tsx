'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HiddenSpeakeasyModalProps {
  open: boolean;
  onClose: () => void;
}

/** The five signatures of the experience. */
const SIGNATURES = [
  {
    number: '01',
    name: 'Craft Cocktails',
    body: 'Classic inspiration, premium spirits and polished bar service.',
  },
  {
    number: '02',
    name: 'Barrel Highboys',
    body: 'Distinctive gathering points that invite guests to mix and mingle.',
  },
  {
    number: '03',
    name: 'Luxurious Lounges',
    body: 'Plush seating creates intimate moments throughout the evening.',
  },
  {
    number: '04',
    name: 'Dance Floor & Entertainment',
    body: 'A natural transition from cocktails into a lively celebration.',
  },
  {
    number: '05',
    name: 'Historic Vault Access',
    body: 'A memorable sense of place found only beneath 48 Wall Street.',
  },
];

/** The guest journey through the night. */
const JOURNEY = [
  {
    number: '01',
    name: 'Arrive',
    body: 'Guests descend from the city into a hidden world beneath Wall Street.',
  },
  {
    number: '02',
    name: 'Discover',
    body: 'Candlelight, lounge seating and rich architectural detail set the mood.',
  },
  {
    number: '03',
    name: 'Connect',
    body: 'Craft cocktails and flexible gathering spaces encourage conversation.',
  },
  {
    number: '04',
    name: 'Celebrate',
    body: 'Music, entertainment and the dance floor carry the night forward.',
  },
];

/** What the room is built for. */
const OCCASIONS = [
  'Corporate holiday celebrations',
  'Client appreciation events',
  'Cocktail receptions',
  'Company after parties',
  'Milestone celebrations',
  'Product and brand events',
  'Networking experiences',
  'Private social gatherings',
];

/** Hospitality across the evening. */
const HOSPITALITY = [
  {
    name: 'Welcome',
    body: 'Signature cocktails and attentive arrival service establish the mood from the first moment.',
  },
  {
    name: 'Gather',
    body: 'Passed hors d\u2019oeuvres, lounge service and social stations keep the evening relaxed and connected.',
  },
  {
    name: 'Celebrate',
    body: 'Entertainment, music and late night touches transform the speakeasy into an unforgettable party.',
  },
];

/** The three qualities of the room. */
const QUALITIES = [
  {
    name: 'Historic',
    body: 'The character of The Vault creates a setting guests cannot experience anywhere else.',
  },
  {
    name: 'Immersive',
    body: 'Rich wood, candlelight and layered decor turn the room into a fully realized after hours world.',
  },
  {
    name: 'Exclusive',
    body: 'A distinctive private event destination designed to feel discovered, not simply entered.',
  },
];

const PAGES = [
  'Cover',
  'A Hidden World',
  'Atmosphere',
  'The Signatures',
  'The Evening',
  'Occasions',
  'Hospitality',
  'Inquire',
];

const TOTAL = PAGES.length;

/** Slow drifting embers, the warm counterpart to falling snow. */
function Embers() {
  const motes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: (i * 41.3) % 100,
        size: 1.5 + ((i * 3) % 3),
        delay: (i * 0.71) % 11,
        duration: 13 + ((i * 5) % 11),
        drift: ((i % 5) - 2) * 20,
        opacity: i % 3 === 0 ? 0.7 : 0.35,
      })),
    []
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {motes.map((m) => (
        <motion.span
          key={m.id}
          initial={{ y: '108%', x: 0, opacity: 0 }}
          animate={{
            y: '-8%',
            x: [0, m.drift, -m.drift * 0.5, 0],
            opacity: [0, m.opacity, m.opacity, 0],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: `${m.left}%`, width: m.size, height: m.size }}
          className="absolute rounded-full bg-amber-300 shadow-[0_0_6px_2px_rgba(217,159,74,0.45)]"
        />
      ))}
    </div>
  );
}

/** Candle glow pulsing softly at the edges of the room. */
function Candlelight() {
  const lamps = useMemo(
    () => [
      { id: 0, left: '8%', top: '22%', size: 240, delay: 0 },
      { id: 1, left: '78%', top: '12%', size: 300, delay: 1.4 },
      { id: 2, left: '52%', top: '74%', size: 260, delay: 0.7 },
    ],
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {lamps.map((l) => (
        <motion.span
          key={l.id}
          animate={{ opacity: [0.28, 0.5, 0.28], scale: [1, 1.07, 1] }}
          transition={{
            duration: 5.5,
            delay: l.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: l.left,
            top: l.top,
            width: l.size,
            height: l.size,
            background:
              'radial-gradient(circle, rgba(217,159,74,0.30), transparent 68%)',
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        />
      ))}
    </div>
  );
}

/** Art deco diamond, used as a section ornament. */
function Diamond({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      animate={{ rotate: [0, 180, 360] }}
      transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      <path d="M12 2 L20 12 L12 22 L4 12 Z" />
      <path d="M12 7 L17 12 L12 17 L7 12 Z" />
    </motion.svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-secondary flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] text-amber-300/90 uppercase">
      <Diamond className="h-3.5 w-3.5 shrink-0 text-amber-400/70" />
      {children}
    </p>
  );
}

function Rule() {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
      className="mt-5 mb-7 block h-px w-20 origin-left bg-gradient-to-r from-amber-400/90 via-amber-200/45 to-transparent"
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
 * Hidden Holiday Speakeasy detail modal for The Vault Level.
 *
 * Paged flipbook in the same shape as WinterWonderlandModal, but dressed in
 * the warm amber and candlelight of the speakeasy rather than icy blue, so the
 * two themes read as siblings without looking identical.
 *
 * Content comes from the Hidden Holiday Speakeasy overview deck.
 */
export default function HiddenSpeakeasyModal({
  open,
  onClose,
}: HiddenSpeakeasyModalProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const goTo = useCallback(
    (nextPage: number) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, nextPage));
      setDirection(clamped >= page ? 1 : -1);
      setPage(clamped);
    },
    [page]
  );

  const next = useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = useCallback(() => goTo(page - 1), [goTo, page]);

  useEffect(() => {
    if (open) {
      setPage(0);
      setDirection(1);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, handleClose, next, prev]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="speakeasy-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#0b0705]/92 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 flex h-full w-full max-w-6xl flex-col overflow-hidden bg-[#14100c] shadow-2xl ring-1 shadow-black/80 ring-amber-200/20 sm:h-[88vh] sm:rounded-sm"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  'radial-gradient(120% 80% at 12% 0%, rgba(146,84,32,0.30), transparent 58%), radial-gradient(90% 70% at 100% 100%, rgba(217,159,74,0.16), transparent 62%)',
              }}
            />
            <Candlelight />
            <Embers />

            <button
              onClick={handleClose}
              aria-label="Close Hidden Holiday Speakeasy details"
              className="absolute top-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-amber-200/25 backdrop-blur-md transition-all duration-300 hover:bg-black/75 hover:ring-amber-200/60"
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
                            src="/gallery/holiday/themes/speakeasy-01.jpg"
                            alt="The Hidden Holiday Speakeasy beneath 48 Wall Street: dark wood bar, candlelight and barrel highboy tables"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14100c] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#14100c]" />
                      </div>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="flex flex-col justify-center px-8 py-12 sm:px-14 lg:py-0"
                      >
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[10px] font-semibold tracking-[0.34em] text-amber-300/90 uppercase"
                        >
                          48 Wall Street &middot; The Vault
                        </motion.p>

                        <motion.h2
                          variants={fadeUp}
                          id="speakeasy-title"
                          className="font-primary text-[2.4rem] leading-[1.02] text-white sm:text-[3.4rem]"
                        >
                          Hidden Holiday
                          <br />
                          <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500/80 bg-clip-text text-transparent">
                            Speakeasy
                          </span>
                        </motion.h2>

                        <motion.span
                          variants={fadeUp}
                          className="mt-7 mb-6 block h-px w-24 bg-gradient-to-r from-amber-400/90 to-transparent"
                        />

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary max-w-sm text-[14px] leading-[1.9] text-amber-50/70"
                        >
                          An exclusive after hours experience beneath Wall
                          Street.
                        </motion.p>

                        <motion.button
                          variants={fadeUp}
                          onClick={next}
                          className="font-secondary mt-10 inline-flex w-fit items-center gap-4 border border-amber-300/40 px-8 py-4 text-[11px] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-amber-300/80 hover:bg-amber-300/10"
                        >
                          Step Inside
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

                  {/* 1. A Hidden World */}
                  {page === 1 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>A Hidden World Beneath the City</Eyebrow>
                      <Rule />
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.p
                          variants={fadeUp}
                          className="font-primary mb-7 text-[1.5rem] leading-[1.4] text-white sm:text-[1.9rem]"
                        >
                          Behind Wall Street, the unexpected begins.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-9 text-[14.5px] leading-[1.9] text-amber-50/70"
                        >
                          Step beyond the energy of Lower Manhattan and into a
                          private speakeasy inspired by the glamour, mystery and
                          spirited hospitality of another era.
                        </motion.p>

                        <motion.div
                          variants={stagger}
                          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
                        >
                          {QUALITIES.map((q) => (
                            <motion.div
                              key={q.name}
                              variants={fadeUp}
                              className="border-t border-amber-300/30 pt-5"
                            >
                              <h3 className="font-secondary mb-2.5 text-[11px] font-semibold tracking-[0.24em] text-amber-200 uppercase">
                                {q.name}
                              </h3>
                              <p className="font-secondary text-[13px] leading-relaxed text-amber-50/60">
                                {q.body}
                              </p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>
                  )}

                  {/* 2. Atmosphere */}
                  {page === 2 && (
                    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="order-2 flex flex-col justify-center px-8 py-12 sm:px-14 lg:order-1 lg:py-0"
                      >
                        <Eyebrow>Atmosphere With a Sense of Discovery</Eyebrow>
                        <Rule />
                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-6 text-[1.7rem] leading-[1.25] text-white sm:text-[2.1rem]"
                        >
                          Where history, culture
                          <br />
                          and celebration meet.
                        </motion.h3>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-6 text-[14.5px] leading-[1.9] text-amber-50/70"
                        >
                          Dark wood, sculptural details, candlelit tables and
                          plush lounge seating create an environment that feels
                          intimate, cinematic and effortlessly glamorous.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-primary mb-7 text-[1.15rem] leading-snug text-amber-200/90"
                        >
                          Designed for conversation. Ready for celebration.
                        </motion.p>
                        <motion.div
                          variants={fadeUp}
                          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-b border-amber-300/25 py-5"
                        >
                          {['Private', 'Polished', 'Unforgettable'].map((w) => (
                            <span
                              key={w}
                              className="font-secondary text-[11px] tracking-[0.26em] text-amber-100/80 uppercase"
                            >
                              {w}
                            </span>
                          ))}
                        </motion.div>
                      </motion.div>

                      <div className="relative order-1 min-h-[15rem] overflow-hidden lg:order-2 lg:min-h-0">
                        <motion.div
                          initial={{ scale: 1.12 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
                          className="absolute inset-0"
                        >
                          <Image
                            src="/gallery/holiday/themes/speakeasy-02.jpg"
                            alt="Candlelit lounge seating and rich architectural detail inside the Hidden Holiday Speakeasy at 48 Wall Street"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#14100c] via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#14100c]" />
                      </div>
                    </div>
                  )}

                  {/* 3. The Signatures */}
                  {page === 3 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>The Signatures of the Experience</Eyebrow>
                      <Rule />
                      <p className="font-secondary mb-8 text-[14.5px] leading-relaxed text-amber-50/60">
                        Every detail deepens the story.
                      </p>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                      >
                        {SIGNATURES.map((sig) => (
                          <motion.div
                            key={sig.number}
                            variants={fadeUp}
                            className="group relative overflow-hidden border border-amber-200/15 bg-white/[0.025] p-6 backdrop-blur-sm transition-all duration-500 hover:border-amber-300/45 hover:bg-white/[0.05]"
                          >
                            <span
                              aria-hidden
                              className="pointer-events-none absolute -top-14 -right-14 h-28 w-28 rounded-full bg-amber-300/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                            />
                            <Diamond className="pointer-events-none absolute top-4 right-4 h-7 w-7 text-amber-200/12 transition-colors duration-500 group-hover:text-amber-200/30" />
                            <span className="font-secondary relative block text-[10px] tracking-[0.24em] text-amber-400/70">
                              {sig.number}
                            </span>
                            <h3 className="font-primary relative mt-2.5 mb-2.5 text-[1.2rem] text-white">
                              {sig.name}
                            </h3>
                            <p className="font-secondary relative text-[12.5px] leading-relaxed text-amber-50/60">
                              {sig.body}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {/* 4. The Evening */}
                  {page === 4 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>An Evening Designed to Unfold</Eyebrow>
                      <Rule />
                      <p className="font-secondary mb-9 text-[14.5px] leading-relaxed text-amber-50/60">
                        The guest journey moves naturally from discovery to
                        celebration.
                      </p>

                      <motion.ol
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                      >
                        {JOURNEY.map((j) => (
                          <motion.li
                            key={j.number}
                            variants={fadeUp}
                            className="border-l border-amber-300/30 pl-6"
                          >
                            <span className="font-primary text-[1.6rem] leading-none text-amber-400/70">
                              {j.number}
                            </span>
                            <h4 className="font-secondary mt-3 mb-2.5 text-[12px] font-semibold tracking-[0.22em] text-white uppercase">
                              {j.name}
                            </h4>
                            <p className="font-secondary text-[13.5px] leading-relaxed text-amber-50/60">
                              {j.body}
                            </p>
                          </motion.li>
                        ))}
                      </motion.ol>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                        className="font-primary mt-9 text-[1.1rem] leading-snug text-amber-200/90"
                      >
                        A seamless experience, from the first reveal to the
                        final toast.
                      </motion.p>
                    </div>
                  )}

                  {/* 5. Occasions */}
                  {page === 5 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>Made for Memorable Occasions</Eyebrow>
                      <Rule />
                      <p className="font-secondary mb-8 text-[14.5px] leading-relaxed text-amber-50/60">
                        A distinctive setting for celebrations that deserve
                        more.
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
                            className="font-secondary flex items-center gap-4 border-b border-amber-200/12 py-4 text-[14px] text-amber-50/80"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-400/80" />
                            {occasion}
                          </motion.li>
                        ))}
                      </motion.ul>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        className="font-primary mt-9 text-[1.1rem] leading-snug text-amber-200/90"
                      >
                        Flexible enough to be tailored. Distinctive enough to be
                        remembered.
                      </motion.p>
                    </div>
                  )}

                  {/* 6. Hospitality */}
                  {page === 6 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>Hospitality Sets the Rhythm</Eyebrow>
                      <Rule />
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-9 text-[1.7rem] leading-[1.25] text-white sm:text-[2.1rem]"
                        >
                          More than a room,
                          <br />a complete experience.
                        </motion.h3>

                        <motion.div variants={stagger} className="space-y-6">
                          {HOSPITALITY.map((h) => (
                            <motion.div
                              key={h.name}
                              variants={fadeUp}
                              className="border-l-2 border-amber-300/30 pl-6"
                            >
                              <h4 className="font-secondary mb-2 text-[11px] font-semibold tracking-[0.24em] text-amber-200 uppercase">
                                {h.name}
                              </h4>
                              <p className="font-secondary text-[13.5px] leading-relaxed text-amber-50/65">
                                {h.body}
                              </p>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.p
                          variants={fadeUp}
                          className="font-primary mt-9 text-[1.1rem] leading-snug text-amber-200/90"
                        >
                          Every element can be tailored to the occasion.
                        </motion.p>
                      </motion.div>
                    </div>
                  )}

                  {/* 7. Inquire */}
                  {page === 7 && (
                    <div className="mx-auto flex h-full max-w-2xl flex-col justify-center px-8 py-14 text-center sm:px-14">
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.div variants={fadeUp}>
                          <Diamond className="mx-auto mb-7 h-10 w-10 text-amber-300/70" />
                        </motion.div>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[10px] font-semibold tracking-[0.32em] text-amber-300/90 uppercase"
                        >
                          The Celebration Doesn&rsquo;t End Here
                        </motion.p>

                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-7 text-[2.2rem] leading-[1.08] sm:text-[2.9rem]"
                        >
                          <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500/80 bg-clip-text text-transparent">
                            Discover the Hidden
                            <br />
                            Holiday Speakeasy
                          </span>
                        </motion.h3>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mx-auto mb-10 max-w-md text-[14.5px] leading-[1.9] text-amber-50/70"
                        >
                          Create a private event filled with atmosphere,
                          hospitality and the unmistakable spirit of Wall Street
                          after dark.
                        </motion.p>

                        <motion.div variants={fadeUp}>
                          <Link
                            href="/contact?inquiry=hidden-speakeasy"
                            onClick={handleClose}
                            className="font-secondary mx-auto block w-full max-w-sm bg-amber-300 px-8 py-4 text-center text-[11px] font-semibold tracking-[0.2em] text-[#14100c] uppercase shadow-xl transition-all duration-300 hover:bg-amber-200"
                          >
                            Inquire Today
                          </Link>
                        </motion.div>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mt-8 text-[11px] tracking-[0.16em] text-amber-100/50 uppercase"
                        >
                          48 Wall Street &middot; New York, NY
                        </motion.p>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer navigation */}
            <div className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-t border-amber-200/15 bg-[#0d0a07]/85 px-5 py-3.5 backdrop-blur-md sm:px-8">
              <button
                onClick={prev}
                disabled={page === 0}
                aria-label="Previous page"
                className="font-secondary flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.2em] text-amber-100/80 uppercase transition-all duration-300 hover:text-white disabled:pointer-events-none disabled:opacity-25"
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

              <div className="flex items-center gap-2">
                {PAGES.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${label}`}
                    aria-current={i === page}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === page
                        ? 'w-7 bg-amber-300'
                        : 'w-1.5 bg-amber-200/30 hover:bg-amber-200/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={page === TOTAL - 1}
                aria-label="Next page"
                className="font-secondary flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.2em] text-amber-100/80 uppercase transition-all duration-300 hover:text-white disabled:pointer-events-none disabled:opacity-25"
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
