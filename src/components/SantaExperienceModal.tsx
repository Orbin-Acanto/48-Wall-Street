'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ShareThemeButton from './ShareThemeButton';

interface SantaExperienceModalProps {
  open: boolean;
  onClose: () => void;
  /** Opens the booking flow, so the story can lead straight into a reservation. */
  onReserve?: () => void;
}

/** What the visit includes. */
const INCLUDES = [
  {
    number: '01',
    name: 'Time With Santa',
    body: 'A personal meet-and-greet in a beautifully appointed setting, with room for every wish list.',
  },
  {
    number: '02',
    name: 'Reserved Appointment',
    body: 'A holiday appointment held in your name, so the room is ready when you arrive.',
  },
  {
    number: '03',
    name: 'Family Portrait',
    body: 'One professionally selected family portrait on the grand marble staircase.',
  },
  {
    number: '04',
    name: 'Framed Keepsake',
    body: 'One framed 5 x 7 print to carry home with you.',
  },
];

/** The shape of a visit, start to finish. */
const JOURNEY = [
  {
    number: '01',
    name: 'Arrive',
    body: 'Step in from Wall Street to a lobby dressed for the season, with garland, lights and towering trees.',
  },
  {
    number: '02',
    name: 'Settle In',
    body: 'The children take in the room while your party is welcomed for your reserved appointment.',
  },
  {
    number: '03',
    name: 'Meet Santa',
    body: 'An unhurried meet-and-greet to share wish lists and talk about the year.',
  },
  {
    number: '04',
    name: 'Take It Home',
    body: 'A family portrait on the marble staircase and a framed 5 x 7 print to carry out with you.',
  },
];

/** Who the morning suits. */
const PERFECT_FOR = [
  'Family holiday traditions',
  'Holiday portraits',
  'Grandparents visiting the city',
  'Neighborhood residents',
  'Corporate tenants and their families',
  'A magical day downtown',
];

const PAGES = [
  'Cover',
  'The Invitation',
  'The Setting',
  'What Is Included',
  'Your Visit',
  'Perfect For',
  'Reserve',
];

const TOTAL = PAGES.length;

/** Soft snow drifting through the lobby scene. */
function Snowfall() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => {
        const front = i % 3 === 0;
        return {
          id: i,
          left: (i * 33.7) % 100,
          size: front ? 2.5 + ((i * 5) % 4) : 1.2 + ((i * 3) % 3),
          delay: (i * 0.53) % 12,
          duration: front ? 10 + ((i * 3) % 7) : 15 + ((i * 5) % 9),
          drift: ((i % 7) - 3) * 24,
          opacity: front ? 0.7 : 0.35,
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

/** Warm lamplight pooling at the edges. */
function Lamplight() {
  const lamps = useMemo(
    () => [
      { id: 0, left: '10%', top: '18%', size: 260, delay: 0 },
      { id: 1, left: '82%', top: '14%', size: 300, delay: 1.2 },
      { id: 2, left: '48%', top: '78%', size: 280, delay: 0.6 },
    ],
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {lamps.map((l) => (
        <motion.span
          key={l.id}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.06, 1] }}
          transition={{
            duration: 6,
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
              'radial-gradient(circle, rgba(196,62,58,0.26), transparent 68%)',
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        />
      ))}
    </div>
  );
}

/** Star ornament, used as a section mark. */
function Star({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      <path d="M12 2.5l2.6 6.3 6.8.5-5.2 4.4 1.6 6.6L12 16.8l-5.8 3.5 1.6-6.6L2.6 9.3l6.8-.5z" />
    </motion.svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-secondary flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] text-amber-200/90 uppercase">
      <Star className="h-3.5 w-3.5 shrink-0 text-amber-300/80" />
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
      className="mt-5 mb-7 block h-px w-20 origin-left bg-gradient-to-r from-amber-300/90 via-amber-100/45 to-transparent"
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
 * Sit Down With Santa detail modal.
 *
 * Same paged flipbook as the Winter Wonderland and Speakeasy modals, in a warm
 * red and gold palette. Copy is drawn from the Sit Down With Santa campaign
 * positioning: a personal holiday moment in an extraordinary setting.
 */
export default function SantaExperienceModal({
  open,
  onClose,
  onReserve,
}: SantaExperienceModalProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hasNavigated, setHasNavigated] = useState(false);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const goTo = useCallback(
    (nextPage: number) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, nextPage));
      setDirection(clamped >= page ? 1 : -1);
      setPage(clamped);
      setHasNavigated(true);
    },
    [page]
  );

  const next = useCallback(() => goTo(page + 1), [goTo, page]);
  const prev = useCallback(() => goTo(page - 1), [goTo, page]);

  useEffect(() => {
    if (open) {
      setPage(0);
      setDirection(1);
      setHasNavigated(false);
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

  const isCover = page === 0;
  const isLast = page === TOTAL - 1;
  const nudge = !hasNavigated && !isLast;

  const reserve = () => {
    handleClose();
    onReserve?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="santa-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#0a0605]/92 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 flex h-full w-full max-w-6xl flex-col overflow-hidden bg-[#15100e] shadow-2xl ring-1 shadow-black/80 ring-amber-200/20 sm:h-[88vh] sm:rounded-sm"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  'radial-gradient(120% 80% at 14% 0%, rgba(150,40,38,0.32), transparent 58%), radial-gradient(90% 70% at 100% 100%, rgba(212,168,90,0.16), transparent 62%)',
              }}
            />
            <Lamplight />
            <Snowfall />

            {/* Share and close, in one row so they never overlap. */}
            <div className="absolute top-5 right-5 z-40 flex items-center gap-2.5">
              <ShareThemeButton
                themeId="sit-down-with-santa"
                className="border-amber-200/25 bg-[#0d0806]/70 text-amber-100 hover:border-amber-200/60 hover:bg-[#0d0806]/90 hover:text-white"
              />
              <button
                onClick={handleClose}
                aria-label="Close Sit Down With Santa details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-amber-200/25 backdrop-blur-md transition-all duration-300 hover:bg-black/75 hover:ring-amber-200/60"
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
            </div>

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
                            src="/gallery/holiday/themes/santa-01.jpg"
                            alt="Santa welcoming a family in the holiday decorated lobby of 48 Wall Street, New York"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#15100e] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#15100e]" />
                      </div>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="flex flex-col justify-center px-8 py-12 sm:px-14 lg:py-0"
                      >
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[10px] font-semibold tracking-[0.34em] text-amber-200/90 uppercase"
                        >
                          48 Wall Street &middot; Holiday
                        </motion.p>

                        <motion.h2
                          variants={fadeUp}
                          id="santa-modal-title"
                          className="font-primary text-[2.4rem] leading-[1.02] text-white sm:text-[3.4rem]"
                        >
                          Sit Down
                          <br />
                          <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-red-400/80 bg-clip-text text-transparent">
                            With Santa
                          </span>
                        </motion.h2>

                        <motion.span
                          variants={fadeUp}
                          className="mt-7 mb-6 block h-px w-24 bg-gradient-to-r from-amber-300/90 to-transparent"
                        />

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary max-w-sm text-[14px] leading-[1.9] text-amber-50/70"
                        >
                          A magical holiday moment beneath Wall Street.
                        </motion.p>

                        <motion.button
                          variants={fadeUp}
                          onClick={next}
                          className="font-secondary mt-10 inline-flex w-fit items-center gap-4 border border-amber-200/40 px-8 py-4 text-[11px] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-amber-200/80 hover:bg-amber-200/10"
                        >
                          See the Experience
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

                  {/* 1. The Invitation */}
                  {page === 1 && (
                    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>The Invitation</Eyebrow>
                      <Rule />
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.p
                          variants={fadeUp}
                          className="font-primary mb-8 text-[1.5rem] leading-[1.45] text-white sm:text-[1.9rem]"
                        >
                          Turn a visit with Santa into a landmark holiday
                          tradition.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[14.5px] leading-[1.9] text-amber-50/70"
                        >
                          This holiday season, step inside 48 Wall Street for a
                          beautifully appointed visit with Santa. Gather the
                          family, share a wish list and capture a memory in one
                          of Lower Manhattan&rsquo;s most distinctive settings.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary text-[14.5px] leading-[1.9] text-amber-50/70"
                        >
                          It is a personal holiday moment in an extraordinary
                          setting, and it is only here for a few weeks each
                          year.
                        </motion.p>
                      </motion.div>
                    </div>
                  )}

                  {/* 2. The Setting */}
                  {page === 2 && (
                    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="order-2 flex flex-col justify-center px-8 py-12 sm:px-14 lg:order-1 lg:py-0"
                      >
                        <Eyebrow>The Setting</Eyebrow>
                        <Rule />
                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-6 text-[1.7rem] leading-[1.25] text-white sm:text-[2.1rem]"
                        >
                          A landmark lobby,
                          <br />
                          dressed for the season.
                        </motion.h3>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-6 text-[14.5px] leading-[1.9] text-amber-50/70"
                        >
                          Towering trees, garland wrapped balustrades and
                          thousands of lights transform the Grand Mezzanine
                          Banking Hall into a holiday landmark, beneath thirty
                          foot ceilings and original 1920s detail.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-primary mb-7 text-[1.15rem] leading-snug text-amber-200/90"
                        >
                          Magical, polished, warm and distinctly New York.
                        </motion.p>
                        <motion.div
                          variants={fadeUp}
                          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-b border-amber-200/25 py-5"
                        >
                          {['Historic', 'Festive', 'Unforgettable'].map((w) => (
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
                            src="/gallery/holiday/themes/santa-02.jpg"
                            alt="The holiday decorated Grand Mezzanine Banking Hall at 48 Wall Street"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#15100e] via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#15100e]" />
                      </div>
                    </div>
                  )}

                  {/* 3. What Is Included */}
                  {page === 3 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>What Is Included</Eyebrow>
                      <Rule />
                      <p className="font-secondary mb-8 text-[14.5px] leading-relaxed text-amber-50/60">
                        Every visit includes the same care, whether you come as
                        two or as eight.
                      </p>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                      >
                        {INCLUDES.map((item) => (
                          <motion.div
                            key={item.number}
                            variants={fadeUp}
                            className="group relative overflow-hidden border border-amber-200/15 bg-white/[0.025] p-6 backdrop-blur-sm transition-all duration-500 hover:border-amber-200/45 hover:bg-white/[0.05]"
                          >
                            <span
                              aria-hidden
                              className="pointer-events-none absolute -top-14 -right-14 h-28 w-28 rounded-full bg-amber-300/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                            />
                            <Star className="pointer-events-none absolute top-4 right-4 h-7 w-7 text-amber-200/12 transition-colors duration-500 group-hover:text-amber-200/30" />
                            <span className="font-secondary relative block text-[10px] tracking-[0.24em] text-amber-400/70">
                              {item.number}
                            </span>
                            <h3 className="font-primary relative mt-2.5 mb-2.5 text-[1.2rem] text-white">
                              {item.name}
                            </h3>
                            <p className="font-secondary relative text-[12.5px] leading-relaxed text-amber-50/60">
                              {item.body}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {/* 4. Your Visit */}
                  {page === 4 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>Your Visit</Eyebrow>
                      <Rule />

                      <motion.div
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                        className="relative mb-9 h-36 w-full overflow-hidden sm:h-44"
                      >
                        <Image
                          src="/gallery/holiday/themes/santa-03.jpg"
                          alt="A family sharing their wish list with Santa at 48 Wall Street"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 896px) 100vw, 896px"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#15100e]/85 via-transparent to-transparent" />
                      </motion.div>

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
                            className="border-l border-amber-200/30 pl-6"
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
                    </div>
                  )}

                  {/* 5. Perfect For */}
                  {page === 5 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>Perfect For</Eyebrow>
                      <Rule />
                      <p className="font-secondary mb-8 text-[14.5px] leading-relaxed text-amber-50/60">
                        Families, neighborhood residents, corporate tenants and
                        their guests.
                      </p>

                      <motion.ul
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="grid grid-cols-1 gap-x-10 sm:grid-cols-2"
                      >
                        {PERFECT_FOR.map((item) => (
                          <motion.li
                            key={item}
                            variants={fadeUp}
                            className="font-secondary flex items-center gap-4 border-b border-amber-200/12 py-4 text-[14px] text-amber-50/80"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-400/80" />
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        className="font-primary mt-9 text-[1.1rem] leading-snug text-amber-200/90"
                      >
                        Reservations are limited, and the season is short.
                      </motion.p>
                    </div>
                  )}

                  {/* 6. Reserve */}
                  {page === 6 && (
                    <div className="mx-auto flex h-full max-w-2xl flex-col justify-center px-8 py-14 text-center sm:px-14">
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                      >
                        <motion.div variants={fadeUp}>
                          <Star className="mx-auto mb-7 h-10 w-10 text-amber-300/70" />
                        </motion.div>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[10px] font-semibold tracking-[0.32em] text-amber-200/90 uppercase"
                        >
                          Bring Your Wish List
                        </motion.p>

                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-7 text-[2.2rem] leading-[1.08] sm:text-[2.9rem]"
                        >
                          <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-red-400/80 bg-clip-text text-transparent">
                            Reserve Your Visit
                          </span>
                        </motion.h3>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mx-auto mb-10 max-w-md text-[14.5px] leading-[1.9] text-amber-50/70"
                        >
                          Choose your time, bring the children and their wish
                          lists, and enjoy a memorable moment with Santa in the
                          grand lobby of 48 Wall Street.
                        </motion.p>

                        <motion.div variants={fadeUp}>
                          <button
                            type="button"
                            onClick={reserve}
                            className="font-secondary mx-auto block w-full max-w-sm cursor-pointer bg-amber-300 px-8 py-4 text-center text-[11px] font-semibold tracking-[0.2em] text-[#15100e] uppercase shadow-xl transition-all duration-300 hover:bg-amber-200"
                          >
                            Reserve Your Visit
                          </button>
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

            {/* Large side arrows: desktop only, floating over the spread. */}
            <button
              onClick={prev}
              disabled={isCover}
              aria-hidden
              tabIndex={-1}
              className="absolute top-1/2 left-4 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-amber-200/25 bg-[#0d0806]/70 text-amber-100 backdrop-blur-md transition-all duration-300 hover:border-amber-200/70 hover:bg-[#0d0806]/90 hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:flex"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <motion.button
              onClick={next}
              aria-hidden
              tabIndex={-1}
              animate={nudge ? { x: [0, 5, 0] } : { x: 0 }}
              transition={{
                duration: 1.6,
                repeat: nudge ? Infinity : 0,
                ease: 'easeInOut',
              }}
              className={`absolute top-1/2 right-4 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300 lg:flex ${
                nudge
                  ? 'border-amber-200/70 bg-white text-[#15100e] shadow-lg'
                  : 'border-amber-200/25 bg-[#0d0806]/70 text-amber-100 hover:border-amber-200/70 hover:bg-[#0d0806]/90 hover:text-white'
              } ${isLast ? 'pointer-events-none opacity-0' : ''}`}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>

            {/* Footer navigation */}
            <div className="relative z-20 flex shrink-0 items-center justify-between gap-2 border-t border-amber-200/15 bg-[#0d0806]/90 px-3 py-3 backdrop-blur-md sm:gap-4 sm:px-8 sm:py-4">
              <button
                onClick={prev}
                disabled={isCover}
                aria-label="Previous page"
                className="font-secondary flex shrink-0 items-center gap-2 rounded-full border border-amber-200/30 px-4 py-2.5 text-[10px] font-semibold tracking-[0.18em] text-amber-100 uppercase transition-all duration-300 hover:border-amber-200/70 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:px-5"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                <span>Back</span>
              </button>

              <div className="flex min-w-0 flex-col items-center gap-2">
                <div className="hidden items-center gap-1.5 min-[420px]:flex sm:gap-2">
                  {PAGES.map((label, i) => (
                    <button
                      key={label}
                      onClick={() => goTo(i)}
                      aria-label={`Go to ${label}`}
                      aria-current={i === page}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === page
                          ? 'w-6 bg-amber-300 sm:w-7'
                          : 'w-1.5 bg-amber-200/30 hover:bg-amber-200/60'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-secondary text-[9px] tracking-[0.24em] whitespace-nowrap text-amber-100/50 uppercase">
                  {page + 1} / {TOTAL}
                </span>
              </div>

              {isLast ? (
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="font-secondary flex shrink-0 items-center gap-2 rounded-full border border-amber-200/30 px-4 py-2.5 text-[10px] font-semibold tracking-[0.18em] text-amber-100 uppercase transition-all duration-300 hover:border-amber-200/70 hover:bg-white/10 hover:text-white sm:px-5"
                >
                  <span>Close</span>
                </button>
              ) : (
                <motion.button
                  onClick={next}
                  aria-label={`Next page: ${PAGES[page + 1]}`}
                  animate={
                    nudge
                      ? {
                          boxShadow: [
                            '0 0 0 0 rgba(252,211,77,0)',
                            '0 0 0 8px rgba(252,211,77,0.20)',
                            '0 0 0 0 rgba(252,211,77,0)',
                          ],
                        }
                      : { boxShadow: '0 0 0 0 rgba(252,211,77,0)' }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: nudge ? Infinity : 0,
                    ease: 'easeOut',
                  }}
                  className="font-secondary flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[10px] font-semibold tracking-[0.18em] text-[#15100e] uppercase shadow-lg transition-colors duration-300 hover:bg-amber-100 sm:px-6"
                >
                  <span>Next</span>
                  <motion.svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={nudge ? { x: [0, 4, 0] } : { x: 0 }}
                    transition={{
                      duration: 1.4,
                      repeat: nudge ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </motion.svg>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
