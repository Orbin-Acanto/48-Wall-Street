'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  clientGuidelinesContent,
  documentIntro,
  documentTitle,
  Section,
} from '@/lib/client-guidelines-content';
import InitialsButton from '@/components/InitialsButton';
import SignaturePad from '@/components/SignaturePad';

interface InitialsData {
  [sectionId: string]: {
    initials: string;
    timestamp: string;
  };
}

interface LocationData {
  city: string;
  region: string;
  country: string;
  ip: string;
}

export default function ClientGuidelinesContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [deadline, setDeadline] = useState('');
  const [docId, setDocId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [viewTime] = useState<string>(new Date().toISOString());
  const [initials, setInitials] = useState<InitialsData>({});
  const [confirmedInitials, setConfirmedInitials] = useState<string | null>(
    null
  );
  const [signature, setSignature] = useState<string | null>(null);
  const [signedDate, setSignedDate] = useState<string>('');
  const [typedName, setTypedName] = useState<string>('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signatureSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setLocation({
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          country: data.country_name || 'Unknown',
          ip: data.ip || 'Unknown',
        });
      } catch (err) {
        console.error('Failed to get location:', err);
        setLocation({
          city: 'Unknown',
          region: 'Unknown',
          country: 'Unknown',
          ip: 'Unknown',
        });
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('Invalid or missing signing link.');
        setIsLoading(false);
        return;
      }

      try {
        const [payload, signature] = token.split('.');

        const response = await fetch('/api/documents/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload, signature }),
        });

        if (!response.ok) {
          setError('Invalid or tampered signing link.');
          setIsLoading(false);
          return;
        }

        const { data } = await response.json();
        setClientName(data.name || '');
        setClientEmail(data.email || '');
        setDeadline(data.deadline || '');
        setDocId(data.docId || '');
        setIsLoading(false);
      } catch (err) {
        setError('Invalid or corrupted signing link.');
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const sectionsRequiringInitials = clientGuidelinesContent.filter(
    (s) => s.requiresInitials
  );
  const totalInitialsRequired = sectionsRequiringInitials.length;
  const initialsCompleted = Object.keys(initials).length;
  const progress = Math.round(
    ((initialsCompleted + (signature ? 1 : 0)) / (totalInitialsRequired + 1)) *
      100
  );

  const handleInitialed = (sectionId: string, initialValue: string) => {
    if (!confirmedInitials) {
      setConfirmedInitials(initialValue);
    }

    setInitials((prev) => ({
      ...prev,
      [sectionId]: {
        initials: initialValue,
        timestamp: new Date().toISOString(),
      },
    }));
  };

  const handleDateClick = () => {
    if (!signedDate) {
      const now = new Date();
      const formatted = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });
      setSignedDate(formatted);
    }
  };

  const isReadyToSubmit =
    initialsCompleted === totalInitialsRequired &&
    signature &&
    signedDate &&
    typedName.trim().length > 0;

  const handleSubmit = async () => {
    if (!isReadyToSubmit) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const signTime = new Date().toISOString();

      const response = await fetch('/api/sign/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          documentType: 'client_guidelines',
          viewTime,
          signTime,
          location: location
            ? `${location.city}, ${location.region}, ${location.country}`
            : 'Unknown',
          ipAddress: location?.ip || 'Unknown',
          initials,
          signature,
          signedDate,
          typedName,
          deadline,
          docId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit document');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isReadyToSubmit && !isSubmitting && !isSubmitted) {
      handleSubmit();
    }
  }, [isReadyToSubmit, signature, signedDate, typedName]);

  const firstUninitiatedSectionId = sectionsRequiringInitials.find(
    (s) => !initials[s.id]
  )?.id;

  if (isSubmitted) {
    return (
      <div className="mt-18 min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
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
            <h1 className="mb-2 text-2xl font-semibold text-gray-900">
              Document Signed Successfully
            </h1>
            <p className="mb-6 text-gray-600">
              Thank you, {clientName}. Your signed document has been submitted
              and a copy will be sent to {clientEmail}.
            </p>
            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
              <p>Signed on: {signedDate}</p>
              <p>
                Location: {location?.city}, {location?.region},{' '}
                {location?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-gray-600">Loading your document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="fixed top-22 right-0 left-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Signing Progress
            </span>
            <span className="text-sm text-gray-500">
              {initialsCompleted} of {totalInitialsRequired} sections completed
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 pt-24">
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 border-b border-gray-200 pb-6">
            <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              {documentTitle}
            </h1>
            <p className="text-gray-600">{documentIntro}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <span className="block text-gray-500">Client Name</span>
              <span className="font-medium text-gray-900">{clientName}</span>
            </div>
            <div>
              <span className="block text-gray-500">Email</span>
              <span className="font-medium text-gray-900">{clientEmail}</span>
            </div>
            <div>
              <span className="block text-gray-500">Deadline</span>
              <span className="font-medium text-gray-900">
                {deadline
                  ? new Date(deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {clientGuidelinesContent.map((section: Section, index: number) => (
          <div
            key={section.id}
            className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="mb-4 flex items-start gap-3 text-xl font-semibold text-gray-900">
              <span className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                {index + 1}
              </span>
              {section.title}
            </h2>

            <div className="space-y-4 pl-11 leading-relaxed text-gray-700">
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-sm md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {section.requiresInitials && (
              <div className="mt-6 border-t border-gray-100 pt-4 pl-11">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Please initial to acknowledge:
                  </span>
                  <InitialsButton
                    sectionId={section.id}
                    clientName={clientName}
                    onInitialed={handleInitialed}
                    isInitialed={!!initials[section.id]}
                    initials={initials[section.id]?.initials}
                    isFirstInitial={
                      !confirmedInitials &&
                      section.id === firstUninitiatedSectionId
                    }
                    confirmedInitials={confirmedInitials || undefined}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <div
          ref={signatureSectionRef}
          className="border-primary/30 mb-6 rounded-lg border-2 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Client Acknowledgment & Authorization
          </h2>

          <p className="mb-8 text-gray-700">
            By signing below, the Client acknowledges that they have read,
            understand, and agree to all guidelines, policies, restrictions, and
            financial authorization terms contained in this document.
          </p>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Client Name (Type your full legal name)
              </label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Enter your full name"
                className="focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Signature
              </label>
              <SignaturePad
                onSignatureChange={setSignature}
                width={500}
                height={200}
              />
            </div>

            {signature && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div
                  onClick={handleDateClick}
                  className={`w-full cursor-pointer rounded-lg border px-4 py-3 transition-colors ${
                    signedDate
                      ? 'border-gray-300 bg-gray-50 text-gray-900'
                      : 'hover:border-primary hover:text-primary border-dashed border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {signedDate || "Click to add today's date and timestamp"}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {isSubmitting && (
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="border-primary h-5 w-5 animate-spin rounded-full border-b-2"></div>
              <p className="text-sm text-blue-600">
                Submitting your signed document...
              </p>
            </div>
          )}

          {!isReadyToSubmit && !isSubmitting && (
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-700">
                Please complete all sections above to submit:
                {initialsCompleted < totalInitialsRequired && (
                  <span className="mt-1 block">
                    • Initial all {totalInitialsRequired} sections (
                    {totalInitialsRequired - initialsCompleted} remaining)
                  </span>
                )}
                {!typedName.trim() && (
                  <span className="mt-1 block">• Type your full name</span>
                )}
                {!signature && (
                  <span className="mt-1 block">• Add your signature</span>
                )}
                {!signedDate && signature && (
                  <span className="mt-1 block">• Click to add the date</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
