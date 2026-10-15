'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Great_Vibes } from 'next/font/google';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  FileText,
  Loader2,
  PenLine,
  ShieldCheck,
} from 'lucide-react';
import SignaturePad from '@/components/SignaturePad';
import CreditCardAuthForm from '@/components/CreditCardAuthForm';
import AVProductionForm from '@/components/AVProductionForm';
import {
  PacketDocument,
  initialPlacements,
  initialsFromName,
  normalizePacketTypes,
  packetDocument,
} from '@/lib/documents/catalog';
import {
  Section,
  clientGuidelinesContent,
  documentIntro,
} from '@/lib/client-guidelines-content';
import {
  rulesRegulationsContent,
  rulesRegulationsDocumentIntro,
} from '@/lib/rules-regulations-content';
import { formatLongDate } from '@/lib/email-templates';

const script = Great_Vibes({ weight: '400', subsets: ['latin'] });

interface PacketData {
  name: string;
  email: string;
  docs: string[];
  deadline?: string;
  eventDate?: string;
  docId?: string;
  byName?: string;
}

interface FormState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  missing: string[];
}

const REVIEW_CONTENT: Record<string, { intro: string; sections: Section[] }> = {
  client_guidelines: {
    intro: documentIntro,
    sections: clientGuidelinesContent,
  },
  rules_regulations: {
    intro: rulesRegulationsDocumentIntro,
    sections: rulesRegulationsContent,
  },
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Render a typed name in the script face as a transparent PNG. */
async function typedSignatureImage(name: string): Promise<string> {
  const family = script.style.fontFamily;
  await document.fonts.load(`72px ${family}`);
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 200;
  const ctx = canvas.getContext('2d')!;
  let size = 84;
  ctx.font = `${size}px ${family}`;
  while (ctx.measureText(name).width > 460 && size > 28) {
    size -= 4;
    ctx.font = `${size}px ${family}`;
  }
  ctx.fillStyle = '#111111';
  ctx.textAlign = 'center';
  ctx.fillText(name, 250, 130);
  return canvas.toDataURL('image/png');
}

/* ------------------------------------------------------------------ */

function StatusScreen({
  tone,
  title,
  message,
}: {
  tone: 'success' | 'error';
  title: string;
  message: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f4ef] px-4 pt-28 pb-16">
      <div className="w-full max-w-md border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div
          className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${
            tone === 'success' ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          {tone === 'success' ? (
            <Check className="h-7 w-7 text-green-600" />
          ) : (
            <AlertCircle className="h-7 w-7 text-red-600" />
          )}
        </div>
        <h1 className="mb-2 text-2xl text-gray-900">{title}</h1>
        <p className="text-gray-600">{message}</p>
        <p className="mt-6 text-sm text-gray-500">
          Questions? Call our Event Services team at{' '}
          <a href="tel:2129715353" className="text-primary underline">
            212.971.5353
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function ReviewDocument({ doc }: { doc: PacketDocument }) {
  const content = REVIEW_CONTENT[doc.type];
  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
        {content.intro}
      </p>
      <div className="space-y-4">
        {content.sections.map((section, index) => (
          <section
            key={section.id}
            className="border border-gray-200 bg-white p-5 md:p-7"
          >
            <h3 className="mb-3 flex items-start gap-3 text-lg text-gray-900">
              <span className="bg-primary/10 text-primary flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                {index + 1}
              </span>
              <span className="pt-0.5">{section.title}</span>
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-gray-700 md:pl-10 md:text-[15px]">
              {section.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {section.requiresInitials && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 md:pl-10">
                <span className="text-xs text-gray-500">Initials</span>
                <span className="border-primary/50 text-primary border border-dashed px-2.5 py-1 text-xs">
                  Applied when you sign
                </span>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SignStep({
  packet,
  docs,
  forms,
  token,
  viewTime,
  location,
  onEdit,
  onBack,
  onSigned,
  onAlreadySigned,
}: {
  packet: PacketData;
  docs: PacketDocument[];
  forms: Record<string, FormState>;
  token: string;
  viewTime: string;
  location: { label: string; ip: string } | null;
  onEdit: (index: number) => void;
  onBack: () => void;
  onSigned: (result: { signedDate: string; reference: string }) => void;
  onAlreadySigned: (message: string) => void;
}) {
  const [typedName, setTypedName] = useState(packet.name);
  const [initials, setInitials] = useState(initialsFromName(packet.name));
  const [initialsEdited, setInitialsEdited] = useState(false);
  const [mode, setMode] = useState<'type' | 'draw'>('type');
  const [drawn, setDrawn] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [cardholder, setCardholder] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasCard = docs.some((d) => d.type === 'credit_card_auth');
  const placementCount = docs.reduce(
    (sum, d) => sum + initialPlacements(d.type).length,
    0
  );

  const nameValid = typedName.trim().length >= 2;
  const initialsValid = /^[A-Za-z]{1,4}$/.test(initials.trim());
  const signatureValid = mode === 'type' ? nameValid : !!drawn;
  const ready =
    nameValid &&
    initialsValid &&
    signatureValid &&
    consent &&
    (!hasCard || cardholder);

  const handleNameChange = (value: string) => {
    setTypedName(value);
    if (!initialsEdited) setInitials(initialsFromName(value));
  };

  const handleSubmit = async () => {
    if (!ready) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const signature =
        mode === 'type' ? await typedSignatureImage(typedName.trim()) : drawn;

      const response = await fetch('/api/sign/packet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          typedName: typedName.trim(),
          initials: initials.trim().toUpperCase(),
          signature,
          viewTime,
          location: location?.label ?? 'Unknown',
          ipAddress: location?.ip ?? 'Unknown',
          formData: Object.fromEntries(
            Object.entries(forms).map(([type, state]) => [type, state.data])
          ),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (response.status === 409) {
        onAlreadySigned(body.message);
        return;
      }
      if (!response.ok) {
        throw new Error(
          body.error || 'Something went wrong. Please try again in a moment.'
        );
      }
      onSigned(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setSubmitting(false);
    }
  };

  const fieldError = (show: boolean, message: string) =>
    showErrors && show ? (
      <p className="mt-1.5 text-xs font-medium text-red-600">{message}</p>
    ) : null;

  return (
    <div className="space-y-6">
      {/* Checklist */}
      <div className="border border-gray-200 bg-white p-5 md:p-7">
        <h3 className="mb-4 text-xs tracking-[0.2em] text-gray-500 uppercase">
          You&apos;re signing
        </h3>
        <ul className="divide-y divide-gray-100">
          {docs.map((doc, index) => (
            <li
              key={doc.type}
              className="flex items-center justify-between gap-3 py-3"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Check className="h-3.5 w-3.5 text-green-600" />
                </span>
                <span className="text-gray-900">{doc.label}</span>
              </span>
              <button
                type="button"
                onClick={() => onEdit(index)}
                className="text-primary flex-shrink-0 text-sm underline-offset-2 hover:underline"
              >
                Review
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-start gap-2 bg-[#faf7f0] p-3 text-sm text-gray-700">
          <PenLine className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
          {placementCount > 0
            ? `Your initials will be placed in all ${placementCount} required spots and your signature on ${docs.length === 1 ? 'the document' : `all ${docs.length} documents`} automatically.`
            : `Your signature will be placed on ${docs.length === 1 ? 'the document' : `all ${docs.length} documents`} automatically.`}
        </p>
      </div>

      {/* Adopt */}
      <div className="border-primary/40 border-2 bg-white p-5 md:p-7">
        <h3 className="mb-1 text-xl text-gray-900">
          Adopt your initials &amp; signature
        </h3>
        <p className="mb-6 text-sm text-gray-500">You only do this once.</p>

        <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
          <div>
            <label
              htmlFor="typedName"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Full legal name
            </label>
            <input
              id="typedName"
              type="text"
              autoComplete="name"
              value={typedName}
              onChange={(e) => handleNameChange(e.target.value)}
              className={`focus:border-primary focus:ring-primary/30 w-full border px-3 py-3 text-base text-gray-900 focus:ring-2 focus:outline-none ${
                showErrors && !nameValid
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300'
              }`}
            />
            {fieldError(!nameValid, 'Type your full legal name.')}
          </div>
          <div>
            <label
              htmlFor="initials"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Initials
            </label>
            <input
              id="initials"
              type="text"
              maxLength={4}
              autoCapitalize="characters"
              value={initials}
              onChange={(e) => {
                setInitialsEdited(true);
                setInitials(e.target.value.replace(/[^a-z]/gi, ''));
              }}
              className={`focus:border-primary focus:ring-primary/30 w-full border px-3 py-3 text-center text-base tracking-widest text-gray-900 uppercase focus:ring-2 focus:outline-none ${
                showErrors && !initialsValid
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300'
              }`}
            />
            {fieldError(!initialsValid, '1–4 letters.')}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-gray-700">Signature</span>
            <div
              role="tablist"
              className="flex border border-gray-300 text-sm"
              aria-label="Signature style"
            >
              {(['type', 'draw'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={mode === option}
                  onClick={() => setMode(option)}
                  className={`px-4 py-1.5 ${
                    mode === option
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option === 'type' ? 'Type' : 'Draw'}
                </button>
              ))}
            </div>
          </div>

          {mode === 'type' ? (
            <div className="flex min-h-[9rem] items-center justify-center border-2 border-dashed border-gray-300 bg-white px-4">
              <span
                className={`${script.className} text-center text-5xl break-all text-gray-900 sm:text-6xl`}
              >
                {typedName.trim() || 'Your name'}
              </span>
            </div>
          ) : (
            <div className={showErrors && !drawn ? 'ring-2 ring-red-300' : ''}>
              <SignaturePad
                onSignatureChange={setDrawn}
                width={500}
                height={200}
              />
            </div>
          )}
          {fieldError(!signatureValid, 'Add your signature.')}

          <div className="mt-4 flex items-center gap-4 border border-gray-100 bg-gray-50 px-4 py-3">
            <span className="text-xs tracking-widest text-gray-500 uppercase">
              Initials preview
            </span>
            <span className={`${script.className} text-3xl text-gray-900`}>
              {initials.toUpperCase() || '—'}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <label
            className={`flex cursor-pointer items-start gap-3 p-3 text-sm text-gray-700 ${
              showErrors && !consent ? 'border border-red-300 bg-red-50' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="accent-primary mt-0.5 h-5 w-5 flex-shrink-0"
            />
            <span>
              I have reviewed{' '}
              {docs.length === 1
                ? 'this document'
                : `all ${docs.length} documents`}{' '}
              and agree to {docs.length === 1 ? 'its' : 'their'} terms. I agree
              to sign electronically and that my initials and signature above
              will be applied wherever required, with the same effect as signing
              by hand.
            </span>
          </label>
          {hasCard && (
            <label
              className={`flex cursor-pointer items-start gap-3 p-3 text-sm text-gray-700 ${
                showErrors && !cardholder
                  ? 'border border-red-300 bg-red-50'
                  : ''
              }`}
            >
              <input
                type="checkbox"
                checked={cardholder}
                onChange={(e) => setCardholder(e.target.checked)}
                className="accent-primary mt-0.5 h-5 w-5 flex-shrink-0"
              />
              <span>
                I confirm I am the cardholder for the card provided, and I
                understand the credit card authorization is valid for two years
                from the date of signing.
              </span>
            </label>
          )}
        </div>

        {error && (
          <p
            role="alert"
            className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing…
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Sign{' '}
                {docs.length === 1
                  ? 'document'
                  : `all ${docs.length} documents`}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function PacketSigning() {
  const token = useSearchParams().get('token') ?? '';

  const [packet, setPacket] = useState<PacketData | null>(null);
  const [status, setStatus] = useState<{
    tone: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);
  const [step, setStep] = useState(0);
  const [forms, setForms] = useState<Record<string, FormState>>({});
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [viewTime] = useState(() => new Date().toISOString());
  const [location, setLocation] = useState<{
    label: string;
    ip: string;
  } | null>(null);
  const [signed, setSigned] = useState<{
    signedDate: string;
    reference: string;
  } | null>(null);

  useEffect(() => {
    const verify = async () => {
      const [payload, signature] = token.split('.');
      if (!payload || !signature) {
        setStatus({
          tone: 'error',
          title: 'Invalid link',
          message:
            'This signing link is incomplete. Please use the button in your email.',
        });
        return;
      }
      try {
        const response = await fetch('/api/documents/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload, signature }),
        });
        const body = await response.json().catch(() => ({}));
        if (response.status === 409) {
          setStatus({
            tone: 'success',
            title: 'Already signed',
            message:
              'These documents have already been signed and submitted. Thank you!',
          });
          return;
        }
        if (response.status === 410) {
          setStatus({
            tone: 'error',
            title: 'Link expired',
            message:
              'The deadline for this signing link has passed. Please contact us and we will send you a new one.',
          });
          return;
        }
        if (!response.ok || !Array.isArray(body.data?.docs)) {
          throw new Error();
        }
        setPacket(body.data);
      } catch {
        setStatus({
          tone: 'error',
          title: 'Invalid link',
          message:
            'We could not open this signing link. Please contact the sender for a new one.',
        });
      }
    };
    verify();
  }, [token]);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((d) =>
        setLocation({
          label:
            [d.city, d.region, d.country_name].filter(Boolean).join(', ') ||
            'Unknown',
          ip: d.ip || 'Unknown',
        })
      )
      .catch(() => setLocation({ label: 'Unknown', ip: 'Unknown' }));
  }, []);

  const docs = useMemo(
    () =>
      normalizePacketTypes(packet?.docs).map((type) => packetDocument(type)!),
    [packet]
  );

  // One stable change handler per form so the embedded forms don't loop.
  const formHandlers = useMemo(
    () =>
      Object.fromEntries(
        docs.map((doc) => [
          doc.type,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data: Record<string, any>, missing: string[]) =>
            setForms((prev) => ({ ...prev, [doc.type]: { data, missing } })),
        ])
      ),
    [docs]
  );

  // Warn before leaving mid-way; typed form details live only in memory.
  useEffect(() => {
    if (!packet || signed || step === 0) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [packet, signed, step]);

  const goTo = (next: number) => {
    setStep(next);
    scrollToTop();
  };

  if (status) return <StatusScreen {...status} />;

  if (!packet) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f4ef]">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto mb-3 h-8 w-8 animate-spin" />
          <p className="text-gray-600">Opening your documents…</p>
        </div>
      </div>
    );
  }

  const firstName = packet.name.split(' ')[0] || packet.name;
  const deadline = formatLongDate(packet.deadline);
  const signStep = docs.length + 1;
  const totalMinutes = docs.reduce((sum, d) => sum + d.minutes, 0);

  if (signed) {
    return (
      <div className="min-h-screen bg-[#f6f4ef] px-4 pt-28 pb-16">
        <div className="mx-auto max-w-xl border border-gray-200 bg-white text-center shadow-sm">
          <div className="bg-[#0a0a0a] px-6 py-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d2b371]">
              <Check className="h-8 w-8 text-[#d2b371]" />
            </div>
            <h1 className="text-3xl text-white">Thank you, {firstName}</h1>
            <p className="mt-2 text-sm tracking-widest text-white/60 uppercase">
              All documents signed
            </p>
          </div>
          <div className="p-6 md:p-8">
            <ul className="mb-6 space-y-2 text-left">
              {docs.map((doc) => (
                <li
                  key={doc.type}
                  className="flex items-center gap-3 text-gray-800"
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-green-600" />
                  {doc.label}
                </li>
              ))}
            </ul>
            <p className="text-gray-600">
              A signed copy has been emailed to{' '}
              <strong className="text-gray-900">{packet.email}</strong>. Our
              Event Services team will be in touch with next steps.
            </p>
            <div className="mt-6 bg-gray-50 p-4 text-sm text-gray-500">
              <p>Signed {signed.signedDate}</p>
              {signed.reference && <p>Reference {signed.reference}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#f6f4ef] pb-16 ${step > 0 ? 'pt-22' : ''}`}
    >
      {/* Progress */}
      {step > 0 && (
        <div className="sticky top-22 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="truncate text-gray-900">
                {step === signStep ? 'Sign & finish' : docs[step - 1].label}
              </span>
              <span className="flex-shrink-0 text-gray-500">
                Step {step} of {signStep}
              </span>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: signStep }, (_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < step ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Welcome */}
      {step === 0 && (
        <div>
          <div className="relative overflow-hidden bg-[#0a0a0a] pt-22">
            <div
              className="absolute inset-0 bg-cover bg-top opacity-40"
              style={{
                backgroundImage: "url('/about/digital-brochure-hero.jpg')",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-3xl px-4 py-14 text-center md:py-20">
              <Image
                src="/shared/logo/48-wall-logo-white.png"
                alt="48 Wall Street Events"
                width={180}
                height={84}
                className="mx-auto"
                priority
              />
              <div className="bg-primary mx-auto my-6 h-px w-14" />
              <h1 className="text-3xl text-white md:text-5xl">
                Welcome, {firstName}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                {packet.byName ? `${packet.byName} and our` : 'Our'} Event
                Services team prepared{' '}
                {docs.length === 1
                  ? 'one document'
                  : `${docs.length} documents`}{' '}
                for your event at 48 Wall Street.
              </p>
            </div>
          </div>

          <div className="mx-auto -mt-8 max-w-3xl px-4">
            <div className="relative border border-gray-200 bg-white p-5 shadow-lg md:p-8">
              <div className="mb-6 grid gap-4 text-center sm:grid-cols-3">
                {[
                  ['1', 'Review', 'Read each document at your own pace.'],
                  [
                    '2',
                    'Complete',
                    docs.some((d) => d.kind === 'form')
                      ? 'Fill in the few details we need.'
                      : 'Confirm you have read everything.',
                  ],
                  [
                    '3',
                    'Sign once',
                    'Your initials and signature go everywhere for you.',
                  ],
                ].map(([n, title, text]) => (
                  <div key={n} className="px-2">
                    <div className="text-primary mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-current text-sm">
                      {n}
                    </div>
                    <p className="text-gray-900">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <ul className="divide-y divide-gray-100 border-y border-gray-100">
                {docs.map((doc, i) => (
                  <li key={doc.type} className="flex items-start gap-4 py-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm text-[#d2b371]">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-900">{doc.label}</p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {doc.description}
                      </p>
                    </div>
                    <span className="flex flex-shrink-0 items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3.5 w-3.5" />~{doc.minutes} min
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
                <span>About {totalMinutes} minutes in total</span>
                {deadline && (
                  <span>
                    Please complete by{' '}
                    <strong className="text-gray-800">{deadline}</strong>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => goTo(1)}
                className="bg-primary mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-4 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90"
              >
                Begin review <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Secure, private link for{' '}
                {packet.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Documents — all stay mounted so form entries survive Back/Next. */}
      {docs.map((doc, index) => {
        const form = forms[doc.type];
        const missing = doc.kind === 'form' ? (form?.missing ?? []) : [];
        const blocked = !!formErrors[doc.type] && missing.length > 0;

        const next = () => {
          if (missing.length > 0) {
            setFormErrors((prev) => ({ ...prev, [doc.type]: true }));
            scrollToTop();
            return;
          }
          goTo(index + 2);
        };

        return (
          <div
            key={doc.type}
            hidden={step !== index + 1}
            className="mx-auto max-w-4xl px-4 pt-8"
          >
            <div className="mb-6 flex items-start gap-3">
              <FileText className="text-primary mt-1 h-6 w-6 flex-shrink-0" />
              <div>
                <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">
                  Document {index + 1} of {docs.length}
                </p>
                <h2 className="text-2xl text-gray-900 md:text-3xl">
                  {doc.label}
                </h2>
              </div>
            </div>

            {blocked && (
              <div
                role="alert"
                className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <p className="mb-1 font-semibold">
                  A few details still need attention:
                </p>
                <ul className="list-inside list-disc space-y-0.5">
                  {missing.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {doc.type === 'credit_card_auth' && (
              <p className="mb-6 flex items-start gap-2 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                Only the cardholder may complete and sign this form. Card
                details are sent securely and never included in email.
              </p>
            )}

            {doc.kind === 'review' ? (
              <ReviewDocument doc={doc} />
            ) : doc.type === 'credit_card_auth' ? (
              <CreditCardAuthForm
                embedded={{
                  clientName: packet.name,
                  clientEmail: packet.email,
                  eventDate: packet.eventDate,
                  showErrors: !!formErrors[doc.type],
                  onChange: formHandlers[doc.type],
                }}
              />
            ) : (
              <AVProductionForm
                embedded={{
                  clientName: packet.name,
                  clientEmail: packet.email,
                  eventDate: packet.eventDate,
                  showErrors: !!formErrors[doc.type],
                  onChange: formHandlers[doc.type],
                }}
              />
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => goTo(index)}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center justify-center gap-2 bg-gray-900 px-6 py-3.5 text-sm tracking-wide text-white hover:bg-black"
              >
                {doc.kind === 'review'
                  ? "I've reviewed this"
                  : 'Save & continue'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}

      {/* Sign once */}
      {step === signStep && (
        <div className="mx-auto max-w-3xl px-4 pt-8">
          <div className="mb-6">
            <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">
              Final step
            </p>
            <h2 className="text-2xl text-gray-900 md:text-3xl">
              Sign &amp; finish
            </h2>
          </div>
          <SignStep
            packet={packet}
            docs={docs}
            forms={forms}
            token={token}
            viewTime={viewTime}
            location={location}
            onEdit={(index) => goTo(index + 1)}
            onBack={() => goTo(docs.length)}
            onSigned={(result) => {
              setSigned(result);
              scrollToTop();
            }}
            onAlreadySigned={(message) =>
              setStatus({
                tone: 'success',
                title: 'Already signed',
                message: message || 'These documents have already been signed.',
              })
            }
          />
        </div>
      )}
    </div>
  );
}
