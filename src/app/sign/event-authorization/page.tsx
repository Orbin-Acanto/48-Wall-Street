'use client';

/**
 * FiDi Hospitality event credit card authorization.
 *
 * Purpose built for the Santa and private dinner bookings. Deliberately
 * separate from the 48 Wall Street form at /sign/credit-card-auth, which is
 * untouched: different entity, different address, and an itemised event charge
 * pulled live from the booking API.
 *
 * Reached from the confirmation email as
 * /sign/event-authorization?ref=WS-SANTA-XXXXXX. Signing reports back to the
 * booking API, which flips the booking from held to confirmed.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import {
  type BookingStatus,
  fetchBookingStatus,
  formatSlotDate,
  formatSlotTime,
  isBookingConfigured,
  reportAuthorizationSigned,
} from '@/lib/booking';
import SignaturePad from '@/components/SignaturePad';

const COMPANY = {
  name: 'FiDi Hospitality',
  legal: 'FiDi Hospitality LLC',
  address: '400 Broadhollow Rd Suite 3, Farmingdale, NY 11735',
  phone: '1.877.885.0705',
  phoneHref: '+18778850705',
  email: 'info@fidihospitality.com',
};

const EXPERIENCE_NAMES: Record<string, string> = {
  santa: 'Santa Lands on Wall Street',
  hamilton: 'The Alexander Hamilton Private Dinner',
};

const VENUE = '48 Wall Street, Lobby 1, New York, NY 10005';

/** Clauses protecting the venue. Shown in full before signing. */
const TERMS: { title: string; body: string }[] = [
  {
    title: 'Authorization to charge',
    body: `I authorize ${COMPANY.legal} to charge the credit card identified below for the total amount shown in the event summary, together with any additional amounts properly owed under this authorization. I confirm I am the authorized holder of this card and that the billing details given are accurate.`,
  },
  {
    title: 'Deposit and final payment',
    body: `The total shown is authorized upon signature. ${COMPANY.legal} may charge the card at any time from the date of signature through thirty days after the event date for amounts owed under this authorization.`,
  },
  {
    title: 'Client cancellation',
    body: 'Cancellations made 48 hours or more before the scheduled start time receive a full refund of amounts charged. Cancellations made inside 48 hours of the start time are non refundable, and the full amount remains payable.',
  },
  {
    title: 'Venue cancellation',
    body: `${COMPANY.legal} may cancel this booking up to 24 hours before the scheduled start time for operational, staffing or safety reasons. In that event the client receives a full refund of all amounts charged, and this is the client's sole remedy.`,
  },
  {
    title: 'Holding period',
    body: 'The reserved time is held for 24 hours from the time of booking. If this authorization is not completed within that period, the reservation is released automatically and no amount is charged.',
  },
  {
    title: 'Guest count and changes',
    body: 'Final guest numbers must be confirmed at least 48 hours before the start time. Charges are based on the confirmed count or the number of guests attending, whichever is greater. Date and time changes are subject to availability and must be requested at least 48 hours in advance.',
  },
  {
    title: 'Additional charges',
    body: 'The card may be charged for additional food and beverage ordered on site, extended time beyond the reserved period, and any fees or taxes arising from those additions, each itemised and notified to the client.',
  },
  {
    title: 'Conduct and damages',
    body: 'The client is responsible for the conduct of every member of their party and for the cost of repairing or replacing any damage to the venue, its fixtures or its property caused by the client or their guests.',
  },
  {
    title: 'Chargebacks',
    body: `The client agrees not to initiate a chargeback for amounts properly owed under this authorization, and to raise any billing dispute directly with ${COMPANY.legal} at ${COMPANY.email} in the first instance.`,
  },
  {
    title: 'Indemnity and liability',
    body: `The client agrees to indemnify and hold harmless ${COMPANY.legal}, its officers, employees and agents against claims, damages and costs arising from the client's event, except to the extent caused by the gross negligence or wilful misconduct of ${COMPANY.legal}. Liability is in all cases limited to the total amount charged under this authorization.`,
  },
  {
    title: 'Force majeure',
    body: 'Neither party is liable for failure to perform due to causes beyond reasonable control, including severe weather, utility failure, labour action, public health restriction or government order. In such an event the client receives a full refund of amounts charged.',
  },
  {
    title: 'Governing law',
    body: 'This authorization is governed by the laws of the State of New York, and the parties submit to the exclusive jurisdiction of the courts of New York County.',
  },
];

interface CardForm {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  company: string;
}

const EMPTY_CARD: CardForm = {
  cardholderName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  company: '',
};

export default function EventAuthorizationPage() {
  const [reference, setReference] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [card, setCard] = useState<CardForm>(EMPTY_CARD);
  const [typedName, setTypedName] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  // The booking API does not return the guest's email, so we collect it here
  // in order to send the countersigned PDF to the cardholder.
  const [clientEmail, setClientEmail] = useState('');
  const viewTime = useRef(new Date().toISOString());
  const [agreed, setAgreed] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [signedAt, setSignedAt] = useState<string | null>(null);

  // Reference arrives from the confirmation email.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const value = params.get('ref');
    setReference(value ? value.trim().toUpperCase() : null);

    // The confirmation email can pass the guest's address so they never have
    // to retype it. The booking status endpoint does not return one.
    const emailParam = params.get('email');
    if (emailParam) setClientEmail(emailParam.trim());
  }, []);

  useEffect(() => {
    if (reference === null) {
      setLoading(false);
      return;
    }
    if (!isBookingConfigured()) {
      setLoadError('Booking service is not reachable right now.');
      setLoading(false);
      return;
    }

    let active = true;
    fetchBookingStatus(reference)
      .then((data) => {
        if (!active) return;
        if (!data) {
          setLoadError('We could not find a booking with that reference.');
        } else {
          setBooking(data);
          setCard((c) => ({
            ...c,
            cardholderName: `${data.first_name} ${data.last_name}`,
          }));
          setTypedName(`${data.first_name} ${data.last_name}`);
        }
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [reference]);

  const set = useCallback(
    (key: keyof CardForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setCard((c) => ({ ...c, [key]: e.target.value })),
    []
  );

  // Amex is 15 digits grouped 4-6-5 with a 4-digit CID; every other brand we
  // take is 16 as four groups of four with a 3-digit CVV.
  const isAmex = /^3[47]/.test(card.cardNumber.replace(/\D/g, ''));
  const cardDigitLimit = isAmex ? 15 : 16;
  const cvvLength = isAmex ? 4 : 3;

  /** Digits only, grouped to match the detected brand. */
  const setCardNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, '');
      const amex = /^3[47]/.test(raw);
      const capped = raw.substring(0, amex ? 15 : 16);
      const grouped = amex
        ? [capped.slice(0, 4), capped.slice(4, 10), capped.slice(10, 15)]
            .filter(Boolean)
            .join(' ')
        : (capped.match(/.{1,4}/g)?.join(' ') ?? capped);
      setCard((c) => ({ ...c, cardNumber: grouped }));
    },
    []
  );

  /** Digits only, with the slash inserted after the month. */
  const setExpiry = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const d = raw.replace(/\D/g, '').substring(0, 4);
    setCard((c) => {
      const deleting = raw.length < c.expiry.length;
      const next =
        d.length > 2 || (d.length === 2 && !deleting)
          ? `${d.slice(0, 2)}/${d.slice(2)}`
          : d;
      return { ...c, expiry: next };
    });
  }, []);

  const setCvv = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCard((c) => ({
        ...c,
        cvv: e.target.value.replace(/\D/g, '').substring(0, 4),
      })),
    []
  );

  /** ZIP: digits with an optional +4, e.g. 11735 or 11735-1234. */
  const setZip = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, '').substring(0, 9);
    setCard((c) => ({
      ...c,
      billingZip: d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d,
    }));
  }, []);

  /** State: letters only, upper-cased, two-letter code. */
  const setState = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCard((c) => ({
        ...c,
        billingState: e.target.value
          .replace(/[^a-zA-Z]/g, '')
          .toUpperCase()
          .substring(0, 2),
      })),
    []
  );

  const digits = card.cardNumber.replace(/\D/g, '');

  /** Luhn checksum — catches transposed or invented card numbers. */
  const passesLuhn = (value: string) => {
    let sum = 0;
    let double = false;
    for (let i = value.length - 1; i >= 0; i -= 1) {
      let d = Number(value[i]);
      if (double) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      double = !double;
    }
    return sum % 10 === 0;
  };

  const cardValid = digits.length === cardDigitLimit && passesLuhn(digits);

  /** Expiry must be a real month, and valid through its final day. */
  const expiryValid = (() => {
    const m = /^(\d{2})\/(\d{2})$/.exec(card.expiry.trim());
    if (!m) return false;
    const month = Number(m[1]);
    if (month < 1 || month > 12) return false;
    return new Date(2000 + Number(m[2]), month, 1) > new Date();
  })();

  const cvvValid = card.cvv.trim().length === cvvLength;
  const zipValid = /^\d{5}(-\d{4})?$/.test(card.billingZip.trim());
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim());
  const stateValid = /^[A-Z]{2}$/.test(card.billingState.trim());

  const complete =
    card.cardholderName.trim().length > 1 &&
    cardValid &&
    expiryValid &&
    cvvValid &&
    card.billingAddress.trim().length > 4 &&
    card.billingCity.trim() !== '' &&
    stateValid &&
    zipValid &&
    typedName.trim() !== '' &&
    signature !== null &&
    emailValid &&
    agreed;

  const handleSubmit = async () => {
    if (!complete || !booking) {
      setShowErrors(true);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const ok = await reportAuthorizationSigned(
      booking.reference,
      typedName.trim()
    );

    if (ok) {
      const signedDate = new Date().toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
      });

      // Recording the authorization only writes a row in the booking API — it
      // does not build the signed PDF or email anyone. Hand the same data to
      // the document pipeline so the cardholder and the events team both get a
      // copy. A failure here must not lose an authorization we already
      // recorded, so it only surfaces as a console warning.
      try {
        const response = await fetch('/api/sign/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: card.cardholderName.trim(),
            clientEmail: clientEmail.trim(),
            documentType: 'credit_card_auth',
            viewTime: viewTime.current,
            signTime: new Date().toISOString(),
            location: 'Signed online',
            ipAddress: 'Not recorded',
            initials: {},
            signature,
            signedDate,
            typedName: typedName.trim(),
            deadline: '',
            docId: booking.reference,
            formData: {
              cardType: '',
              creditCardNumber: card.cardNumber,
              expirationDate: card.expiry,
              cvvCode: card.cvv,
              cardholderName: card.cardholderName.trim(),
              billingAddress: [
                card.billingAddress,
                card.billingCity,
                `${card.billingState} ${card.billingZip}`.trim(),
              ]
                .filter(Boolean)
                .join(', '),
              cellPhone: '',
              eventDate: booking.slot_date,
              typeOfEvent:
                EXPERIENCE_NAMES[booking.experience] ?? booking.experience,
              eventLocation: '48 Wall Street, New York, NY',
              authorizedAmount: booking.total ?? '',
              bookingReference: booking.reference,
              experienceName:
                EXPERIENCE_NAMES[booking.experience] ?? booking.experience,
              slotTime: booking.start_time
                ? formatSlotTime(booking.start_time)
                : '',
              partySize: booking.party_size ?? '',
            },
          }),
        });
        if (!response.ok) {
          console.error('Authorization PDF/email failed:', response.status);
        }
      } catch (err) {
        console.error('Authorization PDF/email request failed:', err);
      }

      setSignedAt(signedDate);
      setSubmitted(true);
    } else {
      setSubmitError(
        'We could not record your authorization. Please try again, or contact ' +
          COMPANY.email +
          ' for help.'
      );
    }
    setSubmitting(false);
  };

  // ------------------------------------------------------------ states

  if (loading) {
    return (
      <Shell>
        <div className="flex items-center gap-3 py-16">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
          <span className="text-sm text-gray-600">Loading your booking</span>
        </div>
      </Shell>
    );
  }

  if (!reference || loadError || !booking) {
    return (
      <Shell>
        <div className="py-12 text-center">
          <h1 className="mb-3 text-xl font-semibold text-gray-900">
            Authorization link not valid
          </h1>
          <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-gray-600">
            {loadError ??
              'This page needs the link from your booking confirmation email.'}
          </p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-sm font-medium text-gray-900 underline underline-offset-4"
          >
            Contact {COMPANY.email}
          </a>
        </div>
      </Shell>
    );
  }

  if (submitted) {
    return (
      <Shell>
        <div className="py-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mb-3 text-2xl font-semibold text-gray-900">
            Authorization Submitted Successfully
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-600">
            Thank you, {booking.first_name}. Your booking is now confirmed and a
            copy of this authorization has been sent to your email.
          </p>

          {/* Certificate of signature, unchanged in substance */}
          <div className="mx-auto max-w-md rounded-lg bg-gray-50 p-5 text-left text-sm text-gray-600">
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
              Certificate of Signature
            </p>
            <dl className="space-y-1.5">
              <Row label="Reference" value={booking.reference} />
              <Row label="Signed by" value={typedName} />
              <Row label="Signed on" value={signedAt ?? ''} />
              <Row label="Authorized total" value={booking.total ?? ''} />
            </dl>
          </div>
        </div>
      </Shell>
    );
  }

  const experienceName =
    EXPERIENCE_NAMES[booking.experience] ?? booking.experience;

  // ------------------------------------------------------------- form

  return (
    <Shell>
      {/* Event summary */}
      <Section title="Event Details">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          <Field label="Experience" value={experienceName} />
          <Field label="Booking reference" value={booking.reference} />
          <Field label="Date" value={formatSlotDate(booking.slot_date)} />
          <Field
            label="Time"
            value={`${formatSlotTime(booking.start_time)} to ${formatSlotTime(booking.end_time)}`}
          />
          <Field
            label="Guests"
            value={`${booking.party_size} ${booking.party_size === 1 ? 'guest' : 'guests'}`}
          />
          <Field label="Venue" value={VENUE} />
          <Field
            label="Client"
            value={`${booking.first_name} ${booking.last_name}`}
          />
        </dl>
      </Section>

      {/* Charges */}
      <Section title="Charge Summary">
        <table className="w-full text-sm">
          <tbody>
            <Charge
              label={`${booking.rate ?? ''} per guest x ${booking.party_size}`}
              value={booking.subtotal ?? ''}
            />
            <Charge
              label="Administrative fee (24%)"
              value={booking.admin_fee ?? ''}
            />
            <Charge
              label="NY sales tax (8.875%)"
              value={booking.sales_tax ?? ''}
            />
            <tr>
              <td className="pt-4 text-base font-semibold text-gray-900">
                Total authorized
              </td>
              <td className="pt-4 text-right text-base font-semibold text-gray-900">
                {booking.total ?? ''}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-5 text-xs leading-relaxed text-gray-500">
          The administrative fee is a mandatory venue charge and is not a
          gratuity. New York sales tax is applied to the subtotal and the
          administrative fee combined.
        </p>
      </Section>

      {/* Card details */}
      <Section title="Credit Card Details">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Cardholder name"
            value={card.cardholderName}
            onChange={set('cardholderName')}
            invalid={showErrors && card.cardholderName.trim().length <= 1}
            error={
              showErrors && card.cardholderName.trim().length <= 1
                ? "Enter the cardholder's full name"
                : undefined
            }
            autoComplete="cc-name"
          />
          <Input
            label="Company (optional)"
            value={card.company}
            onChange={set('company')}
            autoComplete="organization"
          />
          <div className="sm:col-span-2">
            <Input
              label="Card number"
              value={card.cardNumber}
              onChange={setCardNumber}
              invalid={showErrors && !cardValid}
              error={
                showErrors && !cardValid
                  ? digits.length !== cardDigitLimit
                    ? `Card number must be ${cardDigitLimit} digits`
                    : 'Check the card number — it looks incorrect'
                  : undefined
              }
              inputMode="numeric"
              autoComplete="cc-number"
              maxLength={isAmex ? 17 : 19}
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <Input
            label="Expiry (MM / YY)"
            value={card.expiry}
            onChange={setExpiry}
            invalid={showErrors && !expiryValid}
            error={
              showErrors && !expiryValid
                ? 'Enter a valid, unexpired date (MM/YY)'
                : undefined
            }
            inputMode="numeric"
            autoComplete="cc-exp"
            maxLength={5}
            placeholder="MM/YY"
          />
          <Input
            label="Security code"
            value={card.cvv}
            onChange={setCvv}
            invalid={showErrors && !cvvValid}
            error={
              showErrors && !cvvValid
                ? `${cvvLength}-digit security code`
                : undefined
            }
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={cvvLength}
            placeholder={cvvLength === 4 ? '1234' : '123'}
          />
        </div>
      </Section>

      {/* Billing address */}
      <Section title="Billing Address">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <Input
              label="Street address"
              value={card.billingAddress}
              onChange={set('billingAddress')}
              invalid={showErrors && card.billingAddress.trim().length <= 4}
              error={
                showErrors && card.billingAddress.trim().length <= 4
                  ? 'Enter the billing street address'
                  : undefined
              }
              autoComplete="address-line1"
            />
          </div>
          <div className="sm:col-span-3">
            <Input
              label="City"
              value={card.billingCity}
              onChange={set('billingCity')}
              invalid={showErrors && !card.billingCity.trim()}
              error={
                showErrors && !card.billingCity.trim()
                  ? 'Enter the city'
                  : undefined
              }
              autoComplete="address-level2"
            />
          </div>
          <div className="sm:col-span-1">
            <Input
              label="State"
              value={card.billingState}
              onChange={setState}
              invalid={showErrors && !stateValid}
              error={showErrors && !stateValid ? 'Two-letter state' : undefined}
              autoComplete="address-level1"
              maxLength={2}
              placeholder="NY"
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="ZIP code"
              value={card.billingZip}
              onChange={setZip}
              invalid={showErrors && !zipValid}
              error={
                showErrors && !zipValid ? 'Enter a 5-digit ZIP' : undefined
              }
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={10}
              placeholder="11735"
            />
          </div>
        </div>
      </Section>

      {/* Terms */}
      <Section title="Terms of Authorization">
        <ol className="space-y-6">
          {TERMS.map((term, i) => (
            <li key={term.title} className="flex gap-4">
              <span className="w-6 shrink-0 pt-0.5 text-xs font-semibold text-gray-400 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mb-1.5 text-sm font-semibold text-gray-900">
                  {term.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {term.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Signature */}
      <Section title="Signature">
        <label className="mb-5 flex items-start gap-3">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300"
          />
          <span className="text-sm leading-relaxed text-gray-700">
            I have read and agree to the terms above, and I authorize{' '}
            {COMPANY.legal} to charge{' '}
            <strong>{booking.total ?? 'the total shown'}</strong> to the card
            provided.
          </span>
        </label>

        <div className="max-w-md">
          <Input
            label="Email for your copy"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            invalid={showErrors && !emailValid}
            error={
              showErrors && !emailValid
                ? 'Enter a valid email address'
                : undefined
            }
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="mt-5 max-w-md">
          <Input
            label="Type your full legal name to sign"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            invalid={showErrors && !typedName.trim()}
            error={
              showErrors && !typedName.trim()
                ? 'Type your full legal name'
                : undefined
            }
            autoComplete="name"
          />
        </div>

        {/* Drawn signature — reproduced on the authorization PDF. */}
        <div className="mt-6">
          <p className="mb-2 text-xs tracking-[0.1em] text-gray-500 uppercase">
            Cardholder signature
          </p>
          <div
            className={`inline-block rounded border bg-white p-1 ${
              showErrors && !signature ? 'border-red-400' : 'border-gray-300'
            }`}
          >
            <SignaturePad onSignatureChange={setSignature} />
          </div>
          {showErrors && !signature ? (
            <p className="mt-1 text-xs font-medium text-red-600">
              Please sign in the box above
            </p>
          ) : (
            <p className="mt-1 text-xs text-gray-500">
              Draw your signature with a mouse, trackpad or finger.
            </p>
          )}
        </div>

        {showErrors && !complete && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Please complete every required field, sign in the box above, and
            accept the terms before signing.
          </p>
        )}

        {submitError && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 w-full rounded bg-gray-900 px-8 py-4 text-xs font-semibold tracking-[0.15em] text-white uppercase transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {submitting ? 'Submitting' : 'Sign and Authorize'}
        </button>

        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Typing your name and signing above constitute an electronic signature
          with the same legal effect as a handwritten signature.
        </p>
      </Section>
    </Shell>
  );
}

/* ------------------------------------------------------------ layout */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 min-h-screen bg-gray-50 md:mt-10">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Letterhead */}
          <div className="border-b border-gray-200 px-6 py-8 text-center sm:px-10 sm:py-10">
            <Image
              src="/shared/logo/fidi-hospitality.png"
              alt={COMPANY.name}
              width={160}
              height={64}
              className="mx-auto mb-6 h-auto w-[160px] object-contain"
              priority
            />
            <h1 className="text-xl font-bold tracking-wide text-gray-900 sm:text-2xl">
              CREDIT CARD AUTHORIZATION
            </h1>
            <p className="mt-4 text-xs leading-relaxed text-gray-500 sm:text-sm">
              {COMPANY.address}
              <br />
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="hover:text-gray-800"
              >
                {COMPANY.phone}
              </a>
              <span className="mx-2 text-gray-300">|</span>
              <a
                href={`mailto:${COMPANY.email}`}
                className="hover:text-gray-800"
              >
                {COMPANY.email}
              </a>
            </p>
          </div>

          <div className="px-6 sm:px-10">{children}</div>

          <div className="border-t border-gray-200 px-6 py-6 text-center sm:px-10">
            <p className="text-xs leading-relaxed text-gray-400">
              {COMPANY.legal} &middot; {COMPANY.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-gray-100 py-8 last:border-b-0 sm:py-10">
      <h2 className="mb-6 text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 text-xs tracking-[0.1em] text-gray-500 uppercase">
        {label}
      </dt>
      <dd className="text-sm font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-right font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function Charge({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-3 text-gray-600">{label}</td>
      <td className="py-3 text-right text-gray-900 tabular-nums">{value}</td>
    </tr>
  );
}

function Input({
  label,
  value,
  onChange,
  invalid = false,
  error,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  /** Shown beneath the field so the guest knows what to correct. */
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  // Tie the label to the input so screen readers and autofill can pair them.
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs tracking-[0.1em] text-gray-500 uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={invalid || undefined}
        className={`w-full rounded border px-4 py-3 text-sm text-gray-900 transition-colors outline-none focus:border-gray-900 ${
          invalid ? 'border-red-400 bg-red-50' : 'border-gray-300'
        }`}
        {...rest}
      />
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
