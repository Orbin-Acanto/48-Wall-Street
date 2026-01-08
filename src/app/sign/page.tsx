'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function SignContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAndRedirect = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setError('Invalid or missing signing link.');
        return;
      }

      try {
        const [payload, signature] = token.split('.');

        if (!payload || !signature) {
          setError('Invalid signing link format.');
          return;
        }

        const verifyResponse = await fetch('/api/documents/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload, signature }),
        });

        if (!verifyResponse.ok) {
          setError('Invalid or tampered signing link.');
          return;
        }

        const { data } = await verifyResponse.json();

        if (!data.name || !data.email || !data.type) {
          setError('Invalid signing link. Missing required information.');
          return;
        }

        if (data.type === 'client_guidelines') {
          router.replace(`/sign/client-guidelines?token=${token}`);
        } else if (data.type === 'floor_plan') {
          router.replace(`/sign/floor-plan?token=${token}`);
        } else if (data.type === 'credit_card_auth') {
          router.replace(`/sign/credit-card-auth?token=${token}`);
        } else if (data.type === 'av_production') {
          router.replace(`/sign/av-form?token=${token}`);
        } else {
          setError('Unknown document type.');
        }
      } catch (err) {
        console.error('Failed to verify token:', err);
        setError('Invalid or corrupted signing link.');
      }
    };

    verifyAndRedirect();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Invalid Link
          </h1>
          <p className="text-gray-600">{error}</p>
          <p className="mt-4 text-sm text-gray-500">
            Please contact the sender for a new signing link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
        <p className="text-gray-600">Loading your document...</p>
      </div>
    </div>
  );
}

export default function SignPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
            <p className="text-gray-600">Loading your document...</p>
          </div>
        </div>
      }
    >
      <SignContent />
    </Suspense>
  );
}
