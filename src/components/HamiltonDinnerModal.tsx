'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ShareThemeButton from './ShareThemeButton';

interface HamiltonDinnerModalProps {
  open: boolean;
  onClose: () => void;
  /** Opens the booking flow, so the story leads straight into a reservation. */
  onReserve?: () => void;
}

/** What the evening includes. */
const INCLUDES = [
  {
    number: '01',
    name: 'The Room, Exclusively',
    body: 'The Alexander Hamilton Office is yours alone for the full two hour seating. It is never shared.',
  },
  {
    number: '02',
    name: 'A Single Table',
    body: 'One table for four to eight guests, set with linen, crystal and candlelight beneath the fireplace.',
  },
  {
    number: '03',
    name: 'A Bespoke Menu',
    body: 'Your menu is planned with our culinary team once the date is confirmed, course by course.',
  },
  {
    number: '04',
    name: 'Dedicated Service',
    body: 'A server attends your table alone for the evening, so the room stays quiet and unhurried.',
  },
];

/** The shape of the evening. */
const JOURNEY = [
  {
    number: '01',
    name: 'Arrive',
    body: 'Guests are met in the lobby of a 1927 landmark and walked up to the private room.',
  },
  {
    number: '02',
    name: 'Aperitif',
    body: 'Cocktails and canapes by the fireplace, with Wall Street framed in the windows below.',
  },
  {
    number: '03',
    name: 'Dine',
    body: 'A menu built around your table, served at your pace across the full two hours.',
  },
  {
    number: '04',
    name: 'Linger',
    body: 'Coffee, digestifs and conversation, with no other party waiting on the room.',
  },
];

/** Who the room suits. */
const PERFECT_FOR = [
  'Executive and board dinners',
  'Client entertaining',
  'Milestone celebrations',
  'Deal closings and toasts',
  'Family occasions',
  'Intimate private dining',
];

const PAGES = [
  'Cover',
  'The Invitation',
  'The Room',
  'What Is Included',
  'Your Evening',
  'Perfect For',
  'Reserve',
];

const TOTAL = PAGES.length;

/** Candle glow pooling at the edges of the room. */
function Candlelight() {
  const lamps = useMemo(
    () => [
      { id: 0, left: '12%', top: '20%', size: 250, delay: 0 },
      { id: 1, left: '80%', top: '16%', size: 300, delay: 1.3 },
      { id: 2, left: '50%', top: '76%', size: 270, delay: 0.7 },
    ],
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {lamps.map((l) => (
        <motion.span
          key={l.id}
          animate={{ opacity: [0.26, 0.46, 0.26], scale: [1, 1.06, 1] }}
          transition={{
            duration: 6.5,
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
              'radial-gradient(circle, rgba(210,179,113,0.26), transparent 68%)',
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        />
      ))}
    </div>
  );
}

/** Slow motes of light, like dust in candlelight. */
function Motes() {
  const motes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: (i * 47.3) % 100,
        size: 1.5 + ((i * 3) % 3),
        delay: (i * 0.83) % 12,
        duration: 16 + ((i * 5) % 10),
        drift: ((i % 5) - 2) * 18,
        opacity: i % 3 === 0 ? 0.6 : 0.3,
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
          initial={{ y: '106%', x: 0, opacity: 0 }}
          animate={{
            y: '-6%',
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
          className="absolute rounded-full bg-[#d2b371] shadow-[0_0_6px_2px_rgba(210,179,113,0.4)]"
        />
      ))}
    </div>
  );
}

/** Laurel mark, a nod to the room's neoclassical detail. */
function Laurel({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      animate={{ rotate: [0, 180, 360] }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18" />
      <path d="M12 7c-3 0-5 2-5 4M12 7c3 0 5 2 5 4" />
      <path d="M12 13c-3 0-5 2-5 4M12 13c3 0 5 2 5 4" />
    </motion.svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-secondary text-primary flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase">
      <Laurel className="text-primary/80 h-3.5 w-3.5 shrink-0" />
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
      className="from-primary/90 via-primary/45 mt-5 mb-7 block h-px w-20 origin-left bg-gradient-to-r to-transparent"
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
 * The Alexander Hamilton Private Dinner detail modal.
 *
 * Same paged flipbook as the other experience modals, in the venue's own gold
 * on black rather than a seasonal palette: this room is not a holiday theme,
 * it runs across the season.
 */
export default function HamiltonDinnerModal({
  open,
  onClose,
  onReserve,
}: HamiltonDinnerModalProps) {
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
          aria-labelledby="hamilton-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-dark-black ring-primary/25 relative z-10 flex h-full w-full max-w-6xl flex-col overflow-hidden shadow-2xl ring-1 shadow-black/80 sm:h-[88vh] sm:rounded-sm"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  'radial-gradient(120% 80% at 14% 0%, rgba(120,92,44,0.30), transparent 58%), radial-gradient(90% 70% at 100% 100%, rgba(210,179,113,0.14), transparent 62%)',
              }}
            />
            <Candlelight />
            <Motes />

            {/* Share and close, in one row so they never overlap. */}
            <div className="absolute top-5 right-5 z-40 flex items-center gap-2.5">
              <ShareThemeButton
                themeId="hamilton-private-dinner"
                className="border-primary/25 bg-dark-black/70 text-primary hover:border-primary/60 hover:bg-dark-black/90 hover:text-white"
              />
              <button
                onClick={handleClose}
                aria-label="Close private dinner details"
                className="ring-primary/25 hover:ring-primary/60 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/50 text-white ring-1 backdrop-blur-md transition-all duration-300 hover:bg-black/75"
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
                            src="/gallery/holiday/themes/hamilton-01.jpg"
                            alt="The Alexander Hamilton Office at 48 Wall Street set for a private dinner, with candlelight and a stately fireplace"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        </motion.div>
                        <div className="from-dark-black lg:to-dark-black pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent" />
                      </div>

                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="flex flex-col justify-center px-8 py-12 sm:px-14 lg:py-0"
                      >
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary text-primary mb-5 text-[10px] font-semibold tracking-[0.34em] uppercase"
                        >
                          48 Wall Street &middot; The Hamilton Office
                        </motion.p>

                        <motion.h2
                          variants={fadeUp}
                          id="hamilton-modal-title"
                          className="font-primary text-[2.4rem] leading-[1.02] text-white sm:text-[3.4rem]"
                        >
                          A Private
                          <br />
                          <span className="from-primary to-primary/70 bg-gradient-to-r via-amber-100 bg-clip-text text-transparent">
                            Dinner
                          </span>
                        </motion.h2>

                        <motion.span
                          variants={fadeUp}
                          className="from-primary/90 mt-7 mb-6 block h-px w-24 bg-gradient-to-r to-transparent"
                        />

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary max-w-sm text-[14px] leading-[1.9] text-gray-300"
                        >
                          An evening for four to eight, in one of New
                          York&rsquo;s most distinguished private rooms.
                        </motion.p>

                        <motion.button
                          variants={fadeUp}
                          onClick={next}
                          className="font-secondary border-primary/40 hover:border-primary/80 hover:bg-primary/10 mt-10 inline-flex w-fit items-center gap-4 border px-8 py-4 text-[11px] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300"
                        >
                          See the Evening
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
                          A room where the conversation is the whole point.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-5 text-[14.5px] leading-[1.9] text-gray-300"
                        >
                          Reserve an intimate evening in The Alexander Hamilton
                          Office, set beneath soaring ceilings, gilded columns
                          and a stately fireplace overlooking Wall Street.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary text-[14.5px] leading-[1.9] text-gray-300"
                        >
                          There is one table and one party each seating. Nobody
                          else is shown in, and nobody is waiting on the room.
                        </motion.p>
                      </motion.div>
                    </div>
                  )}

                  {/* 2. The Room */}
                  {page === 2 && (
                    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="order-2 flex flex-col justify-center px-8 py-12 sm:px-14 lg:order-1 lg:py-0"
                      >
                        <Eyebrow>The Room</Eyebrow>
                        <Rule />
                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-6 text-[1.7rem] leading-[1.25] text-white sm:text-[2.1rem]"
                        >
                          Built in 1927,
                          <br />
                          kept exactly so.
                        </motion.h3>
                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mb-6 text-[14.5px] leading-[1.9] text-gray-300"
                        >
                          Original detail runs through the room: panelled walls,
                          gilded columns and a fireplace that still anchors the
                          space, in a building on the National Register of
                          Historic Places.
                        </motion.p>
                        <motion.p
                          variants={fadeUp}
                          className="font-primary text-primary/90 mb-7 text-[1.15rem] leading-snug"
                        >
                          Quiet, private and unmistakably Wall Street.
                        </motion.p>
                        <motion.div
                          variants={fadeUp}
                          className="border-primary/25 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-b py-5"
                        >
                          {['Historic', 'Private', 'Unhurried'].map((w) => (
                            <span
                              key={w}
                              className="font-secondary text-[11px] tracking-[0.26em] text-gray-300 uppercase"
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
                            src="/gallery/holiday/themes/hamilton-02.jpg"
                            alt="Panelled walls, gilded columns and the fireplace inside The Alexander Hamilton Office at 48 Wall Street"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </motion.div>
                        <div className="from-dark-black lg:to-dark-black pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent" />
                      </div>
                    </div>
                  )}

                  {/* 3. What Is Included */}
                  {page === 3 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>What Is Included</Eyebrow>
                      <Rule />
                      <p className="font-secondary mb-8 text-[14.5px] leading-relaxed text-gray-400">
                        Every seating is the same, whether you come as four or
                        as eight.
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
                            className="group border-primary/15 hover:border-primary/45 relative overflow-hidden border bg-white/[0.025] p-6 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05]"
                          >
                            <span
                              aria-hidden
                              className="bg-primary/10 pointer-events-none absolute -top-14 -right-14 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                            />
                            <Laurel className="text-primary/12 group-hover:text-primary/30 pointer-events-none absolute top-4 right-4 h-7 w-7 transition-colors duration-500" />
                            <span className="font-secondary text-primary/70 relative block text-[10px] tracking-[0.24em]">
                              {item.number}
                            </span>
                            <h3 className="font-primary relative mt-2.5 mb-2.5 text-[1.2rem] text-white">
                              {item.name}
                            </h3>
                            <p className="font-secondary relative text-[12.5px] leading-relaxed text-gray-400">
                              {item.body}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {/* 4. Your Evening */}
                  {page === 4 && (
                    <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-8 py-14 sm:px-14">
                      <Eyebrow>Your Evening</Eyebrow>
                      <Rule />

                      <motion.div
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                        className="relative mb-9 h-36 w-full overflow-hidden sm:h-44"
                      >
                        <Image
                          src="/gallery/holiday/themes/hamilton-03.jpg"
                          alt="A table set for a private dinner in The Alexander Hamilton Office at 48 Wall Street"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 896px) 100vw, 896px"
                        />
                        <div className="from-dark-black/85 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
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
                            className="border-primary/30 border-l pl-6"
                          >
                            <span className="font-primary text-primary/70 text-[1.6rem] leading-none">
                              {j.number}
                            </span>
                            <h4 className="font-secondary mt-3 mb-2.5 text-[12px] font-semibold tracking-[0.22em] text-white uppercase">
                              {j.name}
                            </h4>
                            <p className="font-secondary text-[13.5px] leading-relaxed text-gray-400">
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
                      <p className="font-secondary mb-8 text-[14.5px] leading-relaxed text-gray-400">
                        An evening that suits the occasion without announcing
                        itself.
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
                            className="font-secondary border-primary/12 flex items-center gap-4 border-b py-4 text-[14px] text-gray-300"
                          >
                            <span className="bg-primary/80 h-1.5 w-1.5 shrink-0 rotate-45" />
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        className="font-primary text-primary/90 mt-9 text-[1.1rem] leading-snug"
                      >
                        Three seatings a night, on Mondays, Tuesdays and
                        Saturdays.
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
                          <Laurel className="text-primary/70 mx-auto mb-7 h-10 w-10" />
                        </motion.div>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary text-primary mb-5 text-[10px] font-semibold tracking-[0.32em] uppercase"
                        >
                          Four to Eight Guests
                        </motion.p>

                        <motion.h3
                          variants={fadeUp}
                          className="font-primary mb-7 text-[2.2rem] leading-[1.08] sm:text-[2.9rem]"
                        >
                          <span className="from-primary to-primary/70 bg-gradient-to-r via-amber-100 bg-clip-text text-transparent">
                            Reserve the Room
                          </span>
                        </motion.h3>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mx-auto mb-10 max-w-md text-[14.5px] leading-[1.9] text-gray-300"
                        >
                          Choose your date and seating, and our team will be in
                          touch to plan the menu around your table.
                        </motion.p>

                        <motion.div variants={fadeUp}>
                          <button
                            type="button"
                            onClick={reserve}
                            className="font-secondary bg-primary hover:bg-primary/90 text-dark-black mx-auto block w-full max-w-sm cursor-pointer px-8 py-4 text-center text-[11px] font-semibold tracking-[0.2em] uppercase shadow-xl transition-all duration-300"
                          >
                            Check Availability
                          </button>
                        </motion.div>

                        <motion.p
                          variants={fadeUp}
                          className="font-secondary mt-8 text-[11px] tracking-[0.16em] text-gray-500 uppercase"
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
              className="border-primary/25 bg-dark-black/70 text-primary hover:border-primary/70 hover:bg-dark-black/90 absolute top-1/2 left-4 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:flex"
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
                  ? 'border-primary/70 text-dark-black bg-white shadow-lg'
                  : 'border-primary/25 bg-dark-black/70 text-primary hover:border-primary/70 hover:bg-dark-black/90 hover:text-white'
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
            <div className="border-primary/15 bg-dark-black/90 relative z-20 flex shrink-0 items-center justify-between gap-2 border-t px-3 py-3 backdrop-blur-md sm:gap-4 sm:px-8 sm:py-4">
              <button
                onClick={prev}
                disabled={isCover}
                aria-label="Previous page"
                className="font-secondary border-primary/30 hover:border-primary/70 flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[10px] font-semibold tracking-[0.18em] text-gray-200 uppercase transition-all duration-300 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:px-5"
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
                          ? 'bg-primary w-6 sm:w-7'
                          : 'bg-primary/30 hover:bg-primary/60 w-1.5'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-secondary text-[9px] tracking-[0.24em] whitespace-nowrap text-gray-500 uppercase">
                  {page + 1} / {TOTAL}
                </span>
              </div>

              {isLast ? (
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="font-secondary border-primary/30 hover:border-primary/70 flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[10px] font-semibold tracking-[0.18em] text-gray-200 uppercase transition-all duration-300 hover:bg-white/10 hover:text-white sm:px-5"
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
                            '0 0 0 0 rgba(210,179,113,0)',
                            '0 0 0 8px rgba(210,179,113,0.22)',
                            '0 0 0 0 rgba(210,179,113,0)',
                          ],
                        }
                      : { boxShadow: '0 0 0 0 rgba(210,179,113,0)' }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: nudge ? Infinity : 0,
                    ease: 'easeOut',
                  }}
                  className="font-secondary text-dark-black flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[10px] font-semibold tracking-[0.18em] uppercase shadow-lg transition-colors duration-300 hover:bg-amber-50 sm:px-6"
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
