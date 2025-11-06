import React from 'react';

export const MobileWarning: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8 text-center">
      <svg
        className="mb-6 h-24 w-24 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>

      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Desktop Required
      </h1>

      <p className="mb-2 max-w-md text-lg text-gray-600">
        The Floor Plan Editor requires a larger screen for the best experience.
      </p>

      <p className="max-w-md text-base text-gray-500">
        Please access this page on a tablet (768px+) or desktop device to use
        all features.
      </p>

      <div className="mt-8 max-w-md rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Minimum screen width:</span> 768px
        </p>
      </div>
    </div>
  );
};
