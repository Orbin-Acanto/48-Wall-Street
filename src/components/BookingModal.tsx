'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type Availability,
  type PriceTier,
  type Experience,
  type Slot,
  BookingApiError,
  createBooking,
  fetchAvailability,
  formatShortDate,
  formatSlotDate,
  formatSlotTime,
  isBookingConfigured,
} from '@/lib/booking';

/** Per experience presentation and copy. */
interface ExperienceTheme {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  detailHeading: string;
  details: { name: string; body: string }[];
  includes: string[];
  knowBefore: string[];
  /** Santa asks how many children are in the party; Hamilton does not. */
  asksChildren: boolean;
  /** Hamilton takes the whole room, so slots read as seatings. */
  slotNoun: string;
}

const THEMES: Record<Experience, ExperienceTheme> = {
  santa: {
    eyebrow: 'A 48 Wall Street Holiday Tradition',
    title: 'Santa Lands on Wall Street',
    intro:
      'Bring your family to meet Santa beneath the landmark architecture of the Grand Mezzanine Banking Hall, then take home a professionally lit portrait on the grand marble staircase.',
    image: '/gallery/holiday/holiday-02.jpg',
    imageAlt:
      'Festive holiday setting in the Grand Mezzanine Banking Hall at 48 Wall Street, NYC',
    detailHeading: 'Your Visit',
    details: [
      {
        name: 'Meet and Greet',
        body: 'An unhurried twenty minute visit with Santa in a warm, beautifully dressed setting.',
      },
      {
        name: 'Keepsake Portrait',
        body: 'A professionally lit holiday photograph on the grand marble staircase, delivered digitally.',
      },
      {
        name: 'Festive Setting',
        body: 'Towering trees, garland wrapped balustrades and thousands of lights throughout the hall.',
      },
    ],
    includes: [
      'Twenty minute visit with Santa',
      'Professional keepsake photograph',
      'Hot cocoa and holiday treats',
      'A small gift for every child',
    ],
    knowBefore: [
      'Please arrive ten minutes before your time.',
      'Each visit holds up to six guests.',
      'Strollers can be left with our coat check.',
    ],
    asksChildren: true,
    slotNoun: 'time',
  },
  hamilton: {
    eyebrow: 'The Alexander Hamilton Experience',
    title: 'A Private Dinner Experience',
    intro:
      'Reserve an intimate evening in one of New York\u2019s most distinguished private rooms, set beneath soaring ceilings, gilded columns and a stately fireplace overlooking Wall Street.',
    image: '/gallery/holiday/themes/hamilton-01.jpg',
    imageAlt:
      'Private dinner setting in The Alexander Hamilton Office at 48 Wall Street, Financial District NYC',
    detailHeading: 'The Evening',
    details: [
      {
        name: 'The Room',
        body: 'The Alexander Hamilton Office is yours alone for the full two hour seating.',
      },
      {
        name: 'The Table',
        body: 'A single table for six to eight guests, set with linen, crystal and candlelight.',
      },
      {
        name: 'The Menu',
        body: 'A tailored menu planned with our culinary team once your date is confirmed.',
      },
    ],
    includes: [
      'Exclusive use of the private room',
      'Two hour seating',
      'Bespoke menu planning',
      'Dedicated service throughout',
    ],
    knowBefore: [
      'Seatings are two hours, beginning at 4pm, 6pm or 8pm.',
      'The room takes six to eight guests.',
      'Our team will contact you to plan the menu.',
    ],
    asksChildren: false,
    slotNoun: 'seating',
  },
};

/** Shown before confirming, and repeated in the confirmation email. */
const BOOKING_TERMS = [
  {
    title: 'Holding your slot',
    body: 'Your place is held for 24 hours while you complete the credit card authorization we email you. It is released automatically if that is not completed.',
  },
  {
    title: 'Cancelling',
    body: 'Cancel 48 hours or more before your start time for a full refund. Cancellations inside 48 hours are non refundable.',
  },
  {
    title: 'If we cancel',
    body: 'We may cancel up to 24 hours before for operational or safety reasons. If we do, you receive a full refund.',
  },
  {
    title: 'Changes',
    body: 'Date, time and guest count changes are subject to availability and must be requested at least 48 hours before.',
  },
  {
    title: 'Your guests',
    body: 'You are responsible for the conduct of your party and for any damage to the venue during your visit.',
  },
];

type Step = 'details' | 'slot' | 'form' | 'done';

const STEP_LABELS: Record<Exclude<Step, 'done'>, string> = {
  details: 'The Experience',
  slot: 'Choose a Time',
  form: 'Your Details',
};

/**
 * Scarcity wording for a bookable slot.
 *
 * We deliberately never print the exact remaining count or the capacity —
 * exposing "2 of 6 left" tells guests how large the room is and how empty it
 * is. The thresholds are proportional so they read sensibly whether a slot
 * seats four or forty.
 */
function availabilityLabel(slot: Slot): string {
  const { remaining, capacity } = slot;

  if (remaining <= 0) return 'Fully booked';
  if (capacity <= 1) return 'Available';

  // Down to the final seat or two, or under a quarter of the room.
  if (remaining <= 2 || remaining / capacity <= 0.25) {
    return 'Last few remaining';
  }

  // Past the halfway mark.
  if (remaining / capacity <= 0.5) return 'Filling up';

  return 'Available';
}

interface BookingModalProps {
  experience: Experience;
  open: boolean;
  onClose: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export default function BookingModal({
  experience,
  open,
  onClose,
}: BookingModalProps) {
  const theme = THEMES[experience];
  const formId = useId();

  const [step, setStep] = useState<Step>('details');
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);

  const [partySize, setPartySize] = useState(2);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [children, setChildren] = useState(0);
  const [requests, setRequests] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const handleClose = useCallback(() => onClose(), [onClose]);

  // Reset everything each time the modal opens.
  useEffect(() => {
    if (!open) return;
    setStep('details');
    setSlot(null);
    setActiveDate(null);
    setSubmitError(null);
    setReference(null);
    setSubmitting(false);
  }, [open]);

  // Escape closes; body scroll locks while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, handleClose]);

  // Load availability when the guest reaches the slot picker.
  useEffect(() => {
    if (!open || step !== 'slot' || availability) return;

    const controller = new AbortController();
    setLoading(true);
    setLoadError(null);

    fetchAvailability(experience, controller.signal)
      .then((data) => {
        setAvailability(data);
        const firstOpen =
          data.days.find((d) => d.total_remaining > 0) ?? data.days[0];
        setActiveDate(firstOpen?.slot_date ?? null);
        setPartySize(data.party_min > 1 ? data.party_min : 2);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setLoadError(
          err instanceof BookingApiError
            ? err.message
            : 'We could not load available times. Please try again.'
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [open, step, experience, availability]);

  const partyMin = availability?.party_min ?? 1;
  const partyMax = availability?.party_max ?? 8;

  // The price for the currently chosen party size, quoted by the API so the
  // modal, the email and the authorization form can never disagree.
  const tier: PriceTier | null = useMemo(() => {
    if (!availability) return null;
    return (
      availability.pricing.tiers.find((t) => t.party_size === partySize) ?? null
    );
  }, [availability, partySize]);

  const activeDay = useMemo(
    () => availability?.days.find((d) => d.slot_date === activeDate) ?? null,
    [availability, activeDate]
  );

  const canSubmit =
    slot !== null &&
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    email.trim() !== '' &&
    phone.trim() !== '' &&
    partySize >= partyMin &&
    partySize <= partyMax &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot || !canSubmit) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const result = await createBooking({
        slot_id: slot.id,
        party_size: partySize,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim() || null,
        children_count: theme.asksChildren ? children : null,
        special_requests: requests.trim() || null,
      });
      setReference(result.reference);
      setStep('done');
    } catch (err) {
      const message =
        err instanceof BookingApiError
          ? err.message
          : 'We could not complete your booking. Please try again.';
      setSubmitError(message);

      // The slot went while they were typing: send them back to pick another.
      if (err instanceof BookingApiError && err.status === 409) {
        setAvailability(null);
        setSlot(null);
        setStep('slot');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${formId}-title`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-dark-black ring-primary/25 relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden shadow-2xl ring-1 shadow-black/70 sm:h-[88vh] sm:rounded-sm"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Close booking"
              className="absolute top-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-300 hover:bg-black/80 hover:ring-white/50"
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

            {/* Steps */}
            {step !== 'done' && (
              <div className="border-primary/15 relative z-20 flex shrink-0 items-center gap-2 border-b px-6 py-4 sm:gap-4 sm:px-10">
                {(Object.keys(STEP_LABELS) as Exclude<Step, 'done'>[]).map(
                  (key, i) => {
                    const order: Step[] = ['details', 'slot', 'form'];
                    const currentIndex = order.indexOf(step);
                    const isDone = i < currentIndex;
                    const isCurrent = key === step;
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-2 sm:gap-4"
                      >
                        {i > 0 && (
                          <span
                            className={`h-px w-4 transition-colors duration-500 sm:w-10 ${
                              isDone || isCurrent
                                ? 'bg-primary/60'
                                : 'bg-white/15'
                            }`}
                          />
                        )}
                        <span
                          className={`font-secondary text-[9px] tracking-[0.18em] uppercase transition-colors duration-500 sm:text-[10px] ${
                            isCurrent
                              ? 'text-primary'
                              : isDone
                                ? 'text-white/60'
                                : 'text-white/30'
                          }`}
                        >
                          <span className="mr-2 hidden sm:inline">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {STEP_LABELS[key]}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            )}

            <div className="relative z-10 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* ---------------------------------------------- details */}
                {step === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="grid h-full grid-cols-1 lg:grid-cols-2"
                  >
                    <div className="relative min-h-[15rem] overflow-hidden lg:min-h-0">
                      <motion.div
                        initial={{ scale: 1.12 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={theme.image}
                          alt={theme.imageAlt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </motion.div>
                      <div className="from-dark-black pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0a0a0a]" />
                    </div>

                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={stagger}
                      className="flex flex-col justify-center px-7 py-10 sm:px-12"
                    >
                      <motion.p
                        variants={fadeUp}
                        className="font-secondary text-primary mb-4 text-[10px] font-semibold tracking-[0.3em] uppercase"
                      >
                        {theme.eyebrow}
                      </motion.p>

                      <motion.h2
                        variants={fadeUp}
                        id={`${formId}-title`}
                        className="font-primary text-[2rem] leading-[1.1] text-white sm:text-[2.6rem]"
                      >
                        {theme.title}
                      </motion.h2>

                      <motion.span
                        variants={fadeUp}
                        className="bg-primary/70 mt-6 mb-6 block h-px w-16"
                      />

                      <motion.p
                        variants={fadeUp}
                        className="font-secondary mb-8 text-[14px] leading-[1.85] text-gray-300"
                      >
                        {theme.intro}
                      </motion.p>

                      <motion.div variants={fadeUp} className="mb-8 space-y-5">
                        {theme.details.map((d) => (
                          <div
                            key={d.name}
                            className="border-primary/25 border-l-2 pl-5"
                          >
                            <h3 className="font-secondary mb-1.5 text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
                              {d.name}
                            </h3>
                            <p className="font-secondary text-[13px] leading-relaxed text-gray-400">
                              {d.body}
                            </p>
                          </div>
                        ))}
                      </motion.div>

                      <motion.button
                        variants={fadeUp}
                        onClick={() => setStep('slot')}
                        className="font-secondary bg-primary hover:bg-primary/90 text-dark-black inline-flex w-full items-center justify-center gap-3 px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto"
                      >
                        Check Availability
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
                  </motion.div>
                )}

                {/* ------------------------------------------------- slot */}
                {step === 'slot' && (
                  <motion.div
                    key="slot"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="mx-auto max-w-3xl px-7 py-10 sm:px-12"
                  >
                    <p className="font-secondary text-primary mb-3 text-[10px] font-semibold tracking-[0.3em] uppercase">
                      Choose a {theme.slotNoun}
                    </p>
                    <h2 className="font-primary mb-2 text-[1.8rem] leading-tight text-white sm:text-[2.2rem]">
                      Select your date and {theme.slotNoun}
                    </h2>
                    <span className="bg-primary/70 mt-5 mb-8 block h-px w-16" />

                    {!isBookingConfigured() && (
                      <div className="border-primary/30 bg-primary/5 border p-6">
                        <p className="font-secondary text-[13.5px] leading-relaxed text-gray-300">
                          Online booking is not connected yet. Please call us on
                          212.971.5353 or email info@48WallNYC.com and our team
                          will arrange your {theme.slotNoun}.
                        </p>
                      </div>
                    )}

                    {isBookingConfigured() && loading && (
                      <div className="flex items-center gap-3 py-10">
                        <span className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                        <span className="font-secondary text-[13px] text-gray-400">
                          Loading available times
                        </span>
                      </div>
                    )}

                    {isBookingConfigured() && loadError && !loading && (
                      <div className="border-primary/30 bg-primary/5 border p-6">
                        <p className="font-secondary mb-4 text-[13.5px] text-gray-300">
                          {loadError}
                        </p>
                        <button
                          onClick={() => setAvailability(null)}
                          className="font-secondary border-primary/50 hover:bg-primary/10 border px-6 py-3 text-[10px] font-semibold tracking-[0.2em] text-white uppercase transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    )}

                    {availability && !loading && !loadError && (
                      <>
                        {availability.days.length === 0 && (
                          <div className="border-primary/30 bg-primary/5 border p-6">
                            <p className="font-secondary mb-4 text-[13.5px] leading-relaxed text-gray-300">
                              No dates are open for booking just yet. We release
                              availability in stages, so please check back when
                              more dates open.
                            </p>
                            <p className="font-secondary text-[13.5px] leading-relaxed text-gray-400">
                              If you need a date sooner, email{' '}
                              <a
                                href="mailto:info@48wallnyc.com"
                                className="text-primary underline underline-offset-4 transition-opacity hover:opacity-70"
                              >
                                info@48wallnyc.com
                              </a>{' '}
                              about VIP availability and our team will help.
                            </p>
                          </div>
                        )}

                        {availability.days.length > 0 && (
                          <>
                            {/* Dates */}
                            {availability.pricing && (
                              <div className="border-primary/25 mb-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-b py-4">
                                <span className="font-primary text-primary text-[1.5rem] leading-none">
                                  {availability.pricing.rate}
                                </span>
                                <span className="font-secondary text-[11px] tracking-[0.18em] text-gray-400 uppercase">
                                  per guest
                                </span>
                                <span className="font-secondary ml-auto text-[11.5px] text-gray-500">
                                  plus 24% administrative fee and 8.875% NY
                                  sales tax
                                </span>
                              </div>
                            )}

                            <p className="font-secondary text-primary mb-3 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                              Date
                            </p>
                            <p className="font-secondary mb-4 text-[12px] leading-relaxed text-gray-500">
                              These are the dates open right now. More are
                              released as the season approaches, or email{' '}
                              <a
                                href="mailto:info@48wallnyc.com"
                                className="text-primary underline underline-offset-4 transition-opacity hover:opacity-70"
                              >
                                info@48wallnyc.com
                              </a>{' '}
                              about VIP availability.
                            </p>
                            <div className="mb-9 flex flex-wrap gap-2.5">
                              {availability.days.map((day) => {
                                const soldOut = day.total_remaining === 0;
                                const isActive = day.slot_date === activeDate;
                                return (
                                  <button
                                    key={day.slot_date}
                                    disabled={soldOut}
                                    onClick={() => {
                                      setActiveDate(day.slot_date);
                                      setSlot(null);
                                    }}
                                    className={`font-secondary border px-4 py-3 text-[11px] tracking-[0.12em] uppercase transition-all duration-300 ${
                                      isActive
                                        ? 'border-primary bg-primary text-dark-black font-semibold'
                                        : soldOut
                                          ? 'cursor-not-allowed border-white/10 text-white/25 line-through'
                                          : 'border-primary/30 hover:border-primary/70 text-gray-300 hover:bg-white/5'
                                    }`}
                                  >
                                    {formatShortDate(day.slot_date)}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Times */}
                            {activeDay && (
                              <>
                                <p className="font-secondary text-primary mb-3 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                                  {formatSlotDate(activeDay.slot_date)}
                                </p>
                                <div className="mb-9 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                                  {activeDay.slots.map((s) => {
                                    const isActive = slot?.id === s.id;
                                    return (
                                      <button
                                        key={s.id}
                                        disabled={s.is_sold_out}
                                        onClick={() => setSlot(s)}
                                        className={`font-secondary border px-3 py-3.5 text-left transition-all duration-300 ${
                                          isActive
                                            ? 'border-primary bg-primary/15'
                                            : s.is_sold_out
                                              ? 'cursor-not-allowed border-white/10'
                                              : 'border-primary/25 hover:border-primary/70 hover:bg-white/5'
                                        }`}
                                      >
                                        <span
                                          className={`block text-[13px] ${
                                            s.is_sold_out
                                              ? 'text-white/25 line-through'
                                              : 'text-white'
                                          }`}
                                        >
                                          {formatSlotTime(s.start_time)}
                                        </span>
                                        <span
                                          className={`mt-1 block text-[9.5px] tracking-[0.14em] uppercase ${
                                            s.is_sold_out
                                              ? 'text-white/25'
                                              : 'text-primary/80'
                                          }`}
                                        >
                                          {s.is_sold_out
                                            ? 'Fully booked'
                                            : availabilityLabel(s)}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </>
                            )}

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                              <button
                                onClick={() => setStep('details')}
                                className="font-secondary border border-white/25 px-7 py-3.5 text-[10px] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-white/60 hover:bg-white/5"
                              >
                                Back
                              </button>
                              <button
                                disabled={!slot}
                                onClick={() => setStep('form')}
                                className="font-secondary bg-primary hover:bg-primary/90 text-dark-black flex-1 px-7 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                {slot
                                  ? `Continue with ${formatSlotTime(slot.start_time)}`
                                  : `Select a ${theme.slotNoun}`}
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </motion.div>
                )}

                {/* ------------------------------------------------- form */}
                {step === 'form' && slot && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="mx-auto max-w-3xl px-7 py-10 sm:px-12"
                  >
                    <p className="font-secondary text-primary mb-3 text-[10px] font-semibold tracking-[0.3em] uppercase">
                      Your Details
                    </p>
                    <h2 className="font-primary mb-6 text-[1.8rem] leading-tight text-white sm:text-[2.2rem]">
                      Confirm your booking
                    </h2>

                    {/* Summary */}
                    <div className="border-primary/30 bg-primary/5 mb-8 border p-5">
                      <p className="font-secondary text-primary mb-1.5 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                        Selected
                      </p>
                      <p className="font-primary text-[1.15rem] text-white">
                        {formatSlotDate(slot.slot_date)}
                      </p>
                      <p className="font-secondary mt-1 text-[13px] text-gray-400">
                        {formatSlotTime(slot.start_time)} to{' '}
                        {formatSlotTime(slot.end_time)}
                      </p>
                      <button
                        onClick={() => setStep('slot')}
                        className="font-secondary text-primary mt-3 text-[10px] tracking-[0.16em] uppercase underline underline-offset-4 transition-opacity hover:opacity-70"
                      >
                        Change
                      </button>
                    </div>

                    {/* Charge breakdown, updating with the guest count */}
                    {tier && (
                      <div className="border-primary/25 mb-8 border p-5">
                        <p className="font-secondary text-primary mb-4 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                          Your Charges
                        </p>
                        <dl className="space-y-2.5">
                          <ChargeRow
                            label={`${availability?.pricing.rate} per guest x ${partySize}`}
                            value={tier.subtotal}
                          />
                          <ChargeRow
                            label="Administrative fee (24%)"
                            value={tier.admin_fee}
                          />
                          <ChargeRow
                            label="NY sales tax (8.875%)"
                            value={tier.sales_tax}
                          />
                          <div className="border-primary/25 flex items-baseline justify-between border-t pt-3">
                            <dt className="font-secondary text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
                              Total
                            </dt>
                            <dd className="font-primary text-primary text-[1.35rem] leading-none">
                              {tier.total}
                            </dd>
                          </div>
                        </dl>
                        <p className="font-secondary mt-4 text-[11.5px] leading-relaxed text-gray-500">
                          Authorized against your card when you complete the
                          authorization form. Nothing is charged before that.
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field
                          label="First name"
                          id={`${formId}-first`}
                          value={firstName}
                          onChange={setFirstName}
                          required
                        />
                        <Field
                          label="Last name"
                          id={`${formId}-last`}
                          value={lastName}
                          onChange={setLastName}
                          required
                        />
                        <Field
                          label="Email"
                          id={`${formId}-email`}
                          type="email"
                          value={email}
                          onChange={setEmail}
                          required
                        />
                        <Field
                          label="Phone"
                          id={`${formId}-phone`}
                          type="tel"
                          value={phone}
                          onChange={setPhone}
                          required
                        />
                      </div>

                      <Field
                        label="Company (optional)"
                        id={`${formId}-company`}
                        value={company}
                        onChange={setCompany}
                      />

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`${formId}-party`}
                            className="font-secondary mb-2 block text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase"
                          >
                            Number of guests
                          </label>
                          <div className="relative">
                            <select
                              id={`${formId}-party`}
                              value={partySize}
                              onChange={(e) =>
                                setPartySize(Number(e.target.value))
                              }
                              className="font-secondary border-primary/25 focus:border-primary w-full appearance-none border bg-white/[0.03] py-3.5 pr-11 pl-4 text-[14px] text-white transition-colors outline-none"
                            >
                              {Array.from(
                                { length: partyMax - partyMin + 1 },
                                (_, i) => partyMin + i
                              ).map((n) => (
                                <option
                                  key={n}
                                  value={n}
                                  className="bg-dark-black text-white"
                                >
                                  {n} {n === 1 ? 'guest' : 'guests'}
                                </option>
                              ))}
                            </select>
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary/70 pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </div>
                        </div>

                        {theme.asksChildren && (
                          <div>
                            <label
                              htmlFor={`${formId}-children`}
                              className="font-secondary mb-2 block text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase"
                            >
                              How many are children
                            </label>
                            <div className="relative">
                              <select
                                id={`${formId}-children`}
                                value={children}
                                onChange={(e) =>
                                  setChildren(Number(e.target.value))
                                }
                                className="font-secondary border-primary/25 focus:border-primary w-full appearance-none border bg-white/[0.03] py-3.5 pr-11 pl-4 text-[14px] text-white transition-colors outline-none"
                              >
                                {Array.from(
                                  { length: partySize + 1 },
                                  (_, i) => i
                                ).map((n) => (
                                  <option
                                    key={n}
                                    value={n}
                                    className="bg-dark-black text-white"
                                  >
                                    {n}
                                  </option>
                                ))}
                              </select>
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary/70 pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor={`${formId}-requests`}
                          className="font-secondary mb-2 block text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase"
                        >
                          Anything we should know (optional)
                        </label>
                        <textarea
                          id={`${formId}-requests`}
                          value={requests}
                          onChange={(e) => setRequests(e.target.value)}
                          rows={3}
                          maxLength={2000}
                          className="font-secondary border-primary/25 focus:border-primary w-full resize-none border bg-white/[0.03] px-4 py-3.5 text-[14px] text-white transition-colors outline-none"
                          placeholder="Dietary requirements, accessibility needs, a celebration we should know about"
                        />
                      </div>

                      {/* Know before you go */}
                      <div className="border-primary/20 border-t pt-5">
                        <p className="font-secondary text-primary mb-3 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                          Good to know
                        </p>
                        <ul className="space-y-2">
                          {theme.knowBefore.map((line) => (
                            <li
                              key={line}
                              className="font-secondary flex items-start gap-3 text-[12.5px] leading-snug text-gray-400"
                            >
                              <span className="bg-primary mt-[7px] h-1 w-1 shrink-0 rotate-45" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Booking terms */}
                      <div className="border-primary/20 border-t pt-5">
                        <p className="font-secondary text-primary mb-3 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                          Booking Terms
                        </p>
                        <ul className="space-y-2.5">
                          {BOOKING_TERMS.map((term) => (
                            <li
                              key={term.title}
                              className="font-secondary text-[12px] leading-relaxed text-gray-400"
                            >
                              <span className="text-gray-200">
                                {term.title}.
                              </span>{' '}
                              {term.body}
                            </li>
                          ))}
                        </ul>
                        <p className="font-secondary mt-4 text-[11.5px] leading-relaxed text-gray-500">
                          By confirming you agree to these terms.
                        </p>
                      </div>

                      {submitError && (
                        <p className="font-secondary border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] text-red-200">
                          {submitError}
                        </p>
                      )}

                      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                        <button
                          type="button"
                          onClick={() => setStep('slot')}
                          className="font-secondary border border-white/25 px-7 py-3.5 text-[10px] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-white/60 hover:bg-white/5"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!canSubmit}
                          className="font-secondary bg-primary hover:bg-primary/90 text-dark-black flex-1 px-7 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          {submitting ? 'Confirming' : 'Confirm Booking'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ------------------------------------------------- done */}
                {step === 'done' && reference && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="mx-auto flex h-full max-w-xl flex-col justify-center px-7 py-12 text-center sm:px-12"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.15,
                        duration: 0.6,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="border-primary mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border"
                    >
                      <svg
                        className="text-primary h-7 w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </motion.div>

                    <p className="font-secondary text-primary mb-4 text-[10px] font-semibold tracking-[0.3em] uppercase">
                      Your Place Is Held
                    </p>

                    <h2 className="font-primary mb-5 text-[2rem] leading-tight text-white sm:text-[2.5rem]">
                      One more step to secure it
                    </h2>

                    <p className="font-secondary mb-6 text-[14px] leading-[1.85] text-gray-300">
                      We have emailed {email} with a link to the credit card
                      authorization. Complete it within 24 hours and your
                      booking is confirmed.
                    </p>

                    <p className="font-secondary mb-8 text-[12.5px] leading-relaxed text-gray-500">
                      If it is not completed in time, the slot is released for
                      other guests and nothing is charged.
                    </p>

                    <div className="border-primary/30 bg-primary/5 mb-8 border p-6">
                      <p className="font-secondary text-primary mb-2 text-[9.5px] font-semibold tracking-[0.24em] uppercase">
                        Your Reference
                      </p>
                      <p className="font-primary text-[1.6rem] tracking-[0.08em] text-white">
                        {reference}
                      </p>
                      {tier && (
                        <p className="font-secondary border-primary/25 mt-4 border-t pt-4 text-[12.5px] text-gray-400">
                          Total to authorize{' '}
                          <span className="text-primary font-semibold">
                            {tier.total}
                          </span>
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleClose}
                      className="font-secondary bg-primary hover:bg-primary/90 text-dark-black mx-auto block w-full max-w-xs px-8 py-4 text-[11px] font-semibold tracking-[0.2em] uppercase shadow-lg transition-all duration-300"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** One line of the charge breakdown. */
function ChargeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-secondary text-[12.5px] text-gray-400">{label}</dt>
      <dd className="font-secondary text-[13px] text-gray-200 tabular-nums">
        {value}
      </dd>
    </div>
  );
}

/** Labelled text input, styled to match the modal. */
function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-secondary mb-2 block text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="font-secondary border-primary/25 focus:border-primary w-full border bg-white/[0.03] px-4 py-3.5 text-[14px] text-white transition-colors outline-none"
      />
    </div>
  );
}
