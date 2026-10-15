'use client';

import { Suspense } from 'react';
import CreditCardAuthForm from '@/components/CreditCardAuthForm';

export default function CreditCardAuthPage() {
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
      <CreditCardAuthForm />
    </Suspense>
  );
}
