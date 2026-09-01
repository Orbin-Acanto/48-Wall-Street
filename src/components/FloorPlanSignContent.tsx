'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface DecodedData {
  name: string;
  email: string;
  type: string;
  deadline: string;
}

export default function FloorPlanSignContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);

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

        const params = new URLSearchParams({
          name: data.name,
          email: data.email,
          deadline: data.deadline || '',
        });

        if (data.type === 'client_guidelines') {
          router.replace(`/sign/client-guidelines?token=${token}`);
        } else if (data.type === 'floor_plan') {
          // The floor plan agreement has no document to render yet. Redirecting
          // here would point this page at itself and spin forever, so say so
          // plainly instead.
          setUnavailable(true);
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

  if (unavailable) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Not available online
          </h1>
          <p className="text-gray-600">
            The floor plan agreement cannot be signed on the website yet.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Please email{' '}
            <a
              href="mailto:info@48WallNYC.com"
              className="text-primary underline"
            >
              info@48WallNYC.com
            </a>{' '}
            and our events team will send it over directly.
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
