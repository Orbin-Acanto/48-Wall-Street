'use client';

import RulesRegulationsContent from '@/components/RulesRegulationsContent';
import { Suspense } from 'react';

export default function RulesRegulationsPage() {
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
      <RulesRegulationsContent />
    </Suspense>
  );
}
