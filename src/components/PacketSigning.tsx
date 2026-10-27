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
  Send,
  ShieldCheck,
} from 'lucide-react';
import SignaturePad from '@/components/SignaturePad';
import CreditCardAuthForm from '@/components/CreditCardAuthForm';
import AVProductionForm from '@/components/AVProductionForm';
import EventPacketAckForm from '@/components/EventPacketAckForm';
import AchAuthForm from '@/components/AchAuthForm';
import { achSignerConfirm } from '@/lib/ach-auth';
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
import {
  DEFAULT_EVENT_PACKET_URL,
  formatLongDate,
} from '@/lib/email-templates';

const script = Great_Vibes({ weight: '400', subsets: ['latin'] });

interface PacketData {
  name: string;
  email: string;
  docs: string[];
  deadline?: string;
  eventDate?: string;
  docId?: string;
  byName?: string;
  /** Event Packet link and send time, recorded in the acknowledgment. */
  packetUrl?: string;
  iat?: string;
}

interface FormState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  missing: string[];
}

/** The signature and initials the client adopted, reused on every document. */
interface Adopted {
  typedName: string;
  initials: string;
  signature: string;
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

function shortTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
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

function ReviewDocument({
  doc,
  initials,
}: {
  doc: PacketDocument;
  /** Shown in every initials box once this document is signed. */
  initials?: string;
}) {
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
                {initials ? (
                  <span
                    className={`${script.className} border border-green-200 bg-green-50 px-3 text-2xl text-gray-900`}
                  >
                    {initials}
                  </span>
                ) : (
                  <span className="border-primary/50 text-primary border border-dashed px-2.5 py-1 text-xs">
                    Added when you sign below
                  </span>
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Draw (or type) a signature and pick initials. Nothing is sent from here. */
function AdoptSignature({
  defaultName,
  current,
  firstTime,
  onAdopt,
  onCancel,
  actionLabel,
  extraConfirm,
}: {
  defaultName: string;
  current: Adopted | null;
  firstTime: boolean;
  onAdopt: (adopted: Adopted) => void;
  onCancel?: () => void;
  actionLabel: string;
  extraConfirm?: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
  };
}) {
  const [typedName, setTypedName] = useState(current?.typedName ?? defaultName);
  const [initials, setInitials] = useState(
    current?.initials ?? initialsFromName(defaultName)
  );
  const [initialsEdited, setInitialsEdited] = useState(!!current);
  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [drawn, setDrawn] = useState<string | null>(null);
  const [consent, setConsent] = useState(!firstTime);
  const [showErrors, setShowErrors] = useState(false);
  const [busy, setBusy] = useState(false);

  const nameValid = typedName.trim().length >= 2;
  const initialsValid = /^[A-Za-z]{1,4}$/.test(initials.trim());
  const signatureValid = mode === 'type' ? nameValid : !!drawn;
  const ready =
    nameValid &&
    initialsValid &&
    signatureValid &&
    consent &&
    (!extraConfirm || extraConfirm.checked);

  const error = (show: boolean, message: string) =>
    showErrors && show ? (
      <p className="mt-1.5 text-xs font-medium text-red-600">{message}</p>
    ) : null;

  const adopt = async () => {
    if (!ready) {
      setShowErrors(true);
      return;
    }
    setBusy(true);
    const signature =
      mode === 'type' ? await typedSignatureImage(typedName.trim()) : drawn!;
    onAdopt({
      typedName: typedName.trim(),
      initials: initials.trim().toUpperCase(),
      signature,
    });
  };

  return (
    <div>
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
            onChange={(e) => {
              setTypedName(e.target.value);
              if (!initialsEdited)
                setInitials(initialsFromName(e.target.value));
            }}
            className={`focus:border-primary focus:ring-primary/30 w-full border px-3 py-3 text-base text-gray-900 focus:ring-2 focus:outline-none ${
              showErrors && !nameValid
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300'
            }`}
          />
          {error(!nameValid, 'Type your full legal name.')}
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
          {error(!initialsValid, '1–4 letters.')}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-700">
            {mode === 'draw' ? 'Draw your signature' : 'Your signature'}
          </span>
          <div
            role="tablist"
            className="flex border border-gray-300 text-sm"
            aria-label="Signature style"
          >
            {(['draw', 'type'] as const).map((option) => (
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
                {option === 'draw' ? 'Draw' : 'Type'}
              </button>
            ))}
          </div>
        </div>

        {mode === 'draw' ? (
          <div className={showErrors && !drawn ? 'ring-2 ring-red-300' : ''}>
            <SignaturePad
              onSignatureChange={setDrawn}
              width={500}
              height={200}
            />
          </div>
        ) : (
          <div className="flex min-h-[9rem] items-center justify-center border-2 border-dashed border-gray-300 bg-white px-4">
            <span
              className={`${script.className} text-center text-5xl break-all text-gray-900 sm:text-6xl`}
            >
              {typedName.trim() || 'Your name'}
            </span>
          </div>
        )}
        {error(!signatureValid, 'Draw your signature in the box above.')}
      </div>

      <div className="mt-5 space-y-3">
        {firstTime && (
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
              I agree to sign electronically. My initials and signature above
              will be used on the documents I sign here, with the same effect as
              signing by hand.
            </span>
          </label>
        )}
        {extraConfirm && (
          <label
            className={`flex cursor-pointer items-start gap-3 p-3 text-sm text-gray-700 ${
              showErrors && !extraConfirm.checked
                ? 'border border-red-300 bg-red-50'
                : ''
            }`}
          >
            <input
              type="checkbox"
              checked={extraConfirm.checked}
              onChange={(e) => extraConfirm.onChange(e.target.checked)}
              className="accent-primary mt-0.5 h-5 w-5 flex-shrink-0"
            />
            <span>{extraConfirm.label}</span>
          </label>
        )}
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={adopt}
          disabled={busy}
          className="bg-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <PenLine className="h-4 w-4" /> {actionLabel}
        </button>
      </div>
    </div>
  );
}

/** Shows the adopted signature and initials side by side. */
function AdoptedPreview({ adopted }: { adopted: Adopted }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex h-20 w-56 items-center justify-center border border-gray-200 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={adopted.signature}
          alt="Your signature"
          className="max-h-16 max-w-[13rem]"
        />
      </div>
      <div className="flex h-20 w-24 flex-col items-center justify-center border border-gray-200 bg-white">
        <span className="text-[10px] tracking-widest text-gray-400 uppercase">
          Initials
        </span>
        <span className={`${script.className} text-3xl text-gray-900`}>
          {adopted.initials}
        </span>
      </div>
    </div>
  );
}

/**
 * The signing block at the end of every document. Signing here only marks
 * the document signed on this device; nothing is sent until Submit.
 */
function DocumentSignPanel({
  doc,
  packetName,
  adopted,
  signedAt,
  onAdopt,
  isReady,
  onSign,
  onContinue,
  isLast,
}: {
  doc: PacketDocument;
  packetName: string;
  adopted: Adopted | null;
  signedAt?: string;
  onAdopt: (adopted: Adopted) => void;
  /** False (and shows what is missing) when the form is incomplete. */
  isReady: () => boolean;
  /** Returns false when the document is not ready to sign yet. */
  onSign: () => boolean;
  onContinue: () => void;
  isLast: boolean;
}) {
  const [changing, setChanging] = useState(false);
  const [cardholder, setCardholder] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const placements = initialPlacements(doc.type).length;
  const confirmLabel =
    doc.type === 'credit_card_auth'
      ? 'I confirm I am the cardholder for the card provided, and I understand this authorization is valid for two years from the date of signing.'
      : doc.type === 'ach_auth'
        ? achSignerConfirm
        : null;
  const cardConfirm = confirmLabel
    ? { label: confirmLabel, checked: cardholder, onChange: setCardholder }
    : undefined;

  const what =
    placements > 0
      ? `Your initials will be added to ${placements === 1 ? 'the marked section' : `all ${placements} marked sections`} and your signature to this document.`
      : 'Your signature will be added to this document.';

  if (signedAt && !changing) {
    return (
      <div className="border-2 border-green-200 bg-white p-5 md:p-7">
        <p className="mb-4 flex items-center gap-2 text-lg text-green-800">
          <Check className="h-5 w-5" /> Signed &amp; initialed at{' '}
          {shortTime(signedAt)}
        </p>
        {adopted && <AdoptedPreview adopted={adopted} />}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center justify-center gap-2 bg-gray-900 px-6 py-3.5 text-sm tracking-wide text-white hover:bg-black"
          >
            {isLast ? 'Review & submit' : 'Next document'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-primary/40 border-2 bg-white p-5 md:p-7">
      <h3 className="mb-1 text-xl text-gray-900">
        Sign {doc.kind === 'form' ? 'this form' : 'this document'}
      </h3>
      <p className="mb-3 text-sm text-gray-500">{what}</p>
      <p className="mb-6 border-l-4 border-gray-900 bg-gray-50 px-3 py-2 text-sm font-bold text-gray-900">
        Please make sure you are authorized to sign this document.
      </p>

      {!adopted || changing ? (
        <AdoptSignature
          defaultName={packetName}
          current={adopted}
          firstTime={!adopted}
          actionLabel={changing ? 'Update & sign' : 'Adopt & sign'}
          extraConfirm={cardConfirm}
          onCancel={changing ? () => setChanging(false) : undefined}
          onAdopt={(next) => {
            onAdopt(next);
            setChanging(false);
            onSign();
          }}
        />
      ) : (
        <div>
          <AdoptedPreview adopted={adopted} />
          <button
            type="button"
            onClick={() => setChanging(true)}
            className="text-primary mt-2 text-sm underline-offset-2 hover:underline"
          >
            Use a different signature
          </button>
          {cardConfirm && (
            <label
              className={`mt-4 flex cursor-pointer items-start gap-3 p-3 text-sm text-gray-700 ${
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
              <span>{cardConfirm.label}</span>
            </label>
          )}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => {
                // Missing form fields first: they are the bigger problem.
                if (!isReady()) return;
                if (cardConfirm && !cardholder) {
                  setShowErrors(true);
                  return;
                }
                onSign();
              }}
              className="bg-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90"
            >
              <PenLine className="h-4 w-4" /> Sign &amp; initial
            </button>
          </div>
        </div>
      )}
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

  const [adopted, setAdopted] = useState<Adopted | null>(null);
  const [consentAt, setConsentAt] = useState<string | null>(null);
  // When each document was signed, and the form data it was signed with.
  const [signedAt, setSignedAt] = useState<Record<string, string>>({});
  const [signedWith, setSignedWith] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{
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

  // Warn before leaving mid-way; nothing is saved until Submit.
  useEffect(() => {
    if (!packet || submitted || step === 0) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [packet, submitted, step]);

  const goTo = (next: number) => {
    setStep(next);
    scrollToTop();
  };

  /** Signed, and (for forms) not edited since. */
  const isSigned = (doc: PacketDocument) =>
    !!signedAt[doc.type] &&
    (doc.kind === 'review' ||
      signedWith[doc.type] === JSON.stringify(forms[doc.type]?.data ?? {}));

  const formReady = (doc: PacketDocument) => {
    const missing = doc.kind === 'form' ? (forms[doc.type]?.missing ?? []) : [];
    if (missing.length > 0) {
      setFormErrors((prev) => ({ ...prev, [doc.type]: true }));
      scrollToTop();
      return false;
    }
    return true;
  };

  const signDocument = (doc: PacketDocument) => {
    if (!formReady(doc)) return false;
    setSignedAt((prev) => ({ ...prev, [doc.type]: new Date().toISOString() }));
    setSignedWith((prev) => ({
      ...prev,
      [doc.type]: JSON.stringify(forms[doc.type]?.data ?? {}),
    }));
    return true;
  };

  const handleSubmit = async () => {
    if (!adopted || docs.some((doc) => !isSigned(doc))) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/sign/packet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          typedName: adopted.typedName,
          initials: adopted.initials,
          signature: adopted.signature,
          viewTime,
          consentAt,
          documentSignedAt: signedAt,
          location: location?.label ?? 'Unknown',
          ipAddress: location?.ip ?? 'Unknown',
          formData: Object.fromEntries(
            Object.entries(forms).map(([type, state]) => [type, state.data])
          ),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (response.status === 409) {
        setStatus({
          tone: 'success',
          title: 'Already signed',
          message: body.message || 'These documents have already been signed.',
        });
        return;
      }
      if (!response.ok) {
        throw new Error(
          body.error || 'Something went wrong. Please try again in a moment.'
        );
      }
      setSubmitted(body);
      scrollToTop();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
      setSubmitting(false);
    }
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
  const submitStep = docs.length + 1;
  const totalMinutes = docs.reduce((sum, d) => sum + d.minutes, 0);
  const unsigned = docs.filter((doc) => !isSigned(doc));

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f6f4ef] px-4 pt-28 pb-16">
        <div className="mx-auto max-w-xl border border-gray-200 bg-white text-center shadow-sm">
          <div className="bg-[#0a0a0a] px-6 py-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d2b371]">
              <Check className="h-8 w-8 text-[#d2b371]" />
            </div>
            <h1 className="text-3xl text-white">Thank you, {firstName}</h1>
            <p className="mt-2 text-sm tracking-widest text-white/60 uppercase">
              All documents submitted
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
              Your signed documents have been emailed to{' '}
              <strong className="text-gray-900">{packet.email}</strong>. Our
              Event Services team will be in touch with next steps.
            </p>
            <div className="mt-6 bg-gray-50 p-4 text-sm text-gray-500">
              <p>Submitted {submitted.signedDate}</p>
              {submitted.reference && <p>Reference {submitted.reference}</p>}
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
                {step === submitStep ? 'Review & submit' : docs[step - 1].label}
              </span>
              <span className="flex-shrink-0 text-gray-500">
                {docs.length - unsigned.length} of {docs.length} signed
              </span>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {docs.map((doc, i) => (
                <div
                  key={doc.type}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    isSigned(doc)
                      ? 'bg-green-500'
                      : i + 1 === step
                        ? 'bg-primary'
                        : 'bg-gray-200'
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
                  [
                    '1',
                    'Review',
                    'Read each document and fill in any details.',
                  ],
                  [
                    '2',
                    'Sign each',
                    'Draw your signature once, then sign each document with a tap.',
                  ],
                  [
                    '3',
                    'Submit',
                    'Check everything, then send it to us. Nothing is sent before.',
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

              <p className="mt-5 border-l-4 border-gray-900 bg-gray-50 px-3 py-2 text-sm font-bold text-gray-900">
                Please make sure you are authorized to sign{' '}
                {docs.length === 1 ? 'this document' : 'these documents'}.
              </p>

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
                Begin <ArrowRight className="h-4 w-4" />
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
        const missing =
          doc.kind === 'form' ? (forms[doc.type]?.missing ?? []) : [];
        const blocked = !!formErrors[doc.type] && missing.length > 0;
        const signed = isSigned(doc);
        const editedAfterSigning = !!signedAt[doc.type] && !signed;

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
                  Please complete these before signing:
                </p>
                <ul className="list-inside list-disc space-y-0.5">
                  {missing.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {editedAfterSigning && (
              <p
                role="alert"
                className="mb-6 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
              >
                You changed this form after signing it. Please sign it again
                below.
              </p>
            )}

            {doc.type === 'credit_card_auth' && (
              <p className="mb-6 flex items-start gap-2 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                Only the cardholder may complete and sign this form. Card
                details are sent securely and never included in email.
              </p>
            )}

            {doc.type === 'ach_auth' && (
              <p className="mb-6 flex items-start gap-2 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0" />
                Only the account holder or an authorized signer on the account
                may complete and sign this form.
              </p>
            )}

            {doc.kind === 'review' ? (
              <ReviewDocument
                doc={doc}
                initials={signed ? adopted?.initials : undefined}
              />
            ) : doc.type === 'event_packet_ack' ? (
              <EventPacketAckForm
                clientName={packet.name}
                eventDate={packet.eventDate}
                packetUrl={packet.packetUrl || DEFAULT_EVENT_PACKET_URL}
                packetVersion={`Issued ${formatLongDate(packet.iat) || 'with this request'}`}
                documents={docs.filter((d) => !d.always).map((d) => d.label)}
                showErrors={!!formErrors[doc.type]}
                onChange={formHandlers[doc.type]}
              />
            ) : doc.type === 'ach_auth' ? (
              <AchAuthForm
                clientName={packet.name}
                clientEmail={packet.email}
                eventDate={packet.eventDate}
                showErrors={!!formErrors[doc.type]}
                onChange={formHandlers[doc.type]}
              />
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

            <div className="mt-8">
              <DocumentSignPanel
                doc={doc}
                packetName={packet.name}
                adopted={adopted}
                signedAt={signed ? signedAt[doc.type] : undefined}
                isLast={index === docs.length - 1}
                onAdopt={(next) => {
                  setAdopted(next);
                  setConsentAt((prev) => prev ?? new Date().toISOString());
                }}
                isReady={() => formReady(doc)}
                onSign={() => signDocument(doc)}
                onContinue={() => goTo(index + 2)}
              />
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => goTo(index)}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            </div>
          </div>
        );
      })}

      {/* Review & submit — the only place anything is sent. */}
      {step === submitStep && (
        <div className="mx-auto max-w-3xl px-4 pt-8">
          <div className="mb-6">
            <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">
              Last step
            </p>
            <h2 className="text-2xl text-gray-900 md:text-3xl">
              Review &amp; submit
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 bg-white p-5 md:p-7">
              <ul className="divide-y divide-gray-100">
                {docs.map((doc, index) => {
                  const signed = isSigned(doc);
                  return (
                    <li
                      key={doc.type}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                            signed ? 'bg-green-50' : 'bg-amber-50'
                          }`}
                        >
                          {signed ? (
                            <Check className="h-3.5 w-3.5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                          )}
                        </span>
                        <span>
                          <span className="block text-gray-900">
                            {doc.label}
                          </span>
                          <span className="block text-xs text-gray-500">
                            {signed
                              ? `Signed at ${shortTime(signedAt[doc.type])}`
                              : 'Not signed yet'}
                          </span>
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => goTo(index + 1)}
                        className="text-primary flex-shrink-0 text-sm underline-offset-2 hover:underline"
                      >
                        {signed ? 'View' : 'Sign'}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {adopted && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="mb-2 text-xs tracking-widest text-gray-500 uppercase">
                    Your signature &amp; initials
                  </p>
                  <AdoptedPreview adopted={adopted} />
                </div>
              )}
            </div>

            <div className="border-primary/40 border-2 bg-white p-5 md:p-7">
              <p className="mb-5 flex items-start gap-2 text-sm text-gray-700">
                <ShieldCheck className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                Nothing has been sent yet. When you press Submit, your signed
                documents are sealed, sent to 48 Wall Street and emailed to{' '}
                {packet.email}.
              </p>

              {unsigned.length > 0 && (
                <p
                  role="alert"
                  className="mb-5 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
                >
                  Please sign {unsigned.map((d) => d.label).join(', ')} before
                  submitting.
                </p>
              )}

              {submitError && (
                <p
                  role="alert"
                  className="mb-5 border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {submitError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => goTo(docs.length)}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting || unsigned.length > 0}
                  className="bg-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit{' '}
                      {docs.length === 1
                        ? 'signed document'
                        : `${docs.length} signed documents`}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
