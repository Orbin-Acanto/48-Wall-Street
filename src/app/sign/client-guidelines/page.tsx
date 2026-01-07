'use client';

import ClientGuidelinesContent from '@/components/ClientGuidelinesContent';
import { Suspense } from 'react';

export default function ClientGuidelinesPage() {
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
      <ClientGuidelinesContent />
    </Suspense>
  );
}
