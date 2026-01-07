'use client';

import { useSearchParams } from 'next/navigation';

export default function FloorPlanPage() {
  const searchParams = useSearchParams();
  const clientName = searchParams.get('name') || '';
  const clientEmail = searchParams.get('email') || '';

  return (
    <div className="mt-18 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-primary h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">
            Floor Plan Document
          </h1>
          <p className="mb-6 text-gray-600">
            Hello {clientName}, the floor plan signing page is coming soon.
          </p>
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
            <p>This document will be available shortly.</p>
            <p className="mt-1">
              A notification will be sent to {clientEmail}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
