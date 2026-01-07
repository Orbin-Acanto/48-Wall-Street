'use client';

import { useState } from 'react';

interface InitialsButtonProps {
  sectionId: string;
  clientName: string;
  onInitialed: (sectionId: string, initials: string) => void;
  isInitialed: boolean;
  initials?: string;
  isFirstInitial: boolean;
  confirmedInitials?: string;
}

export default function InitialsButton({
  sectionId,
  clientName,
  onInitialed,
  isInitialed,
  initials,
  isFirstInitial,
  confirmedInitials,
}: InitialsButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const generateInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleClick = () => {
    if (isInitialed) return;

    if (isFirstInitial) {
      setShowConfirm(true);
    } else {
      const initialsToUse = confirmedInitials || generateInitials(clientName);
      onInitialed(sectionId, initialsToUse);
    }
  };

  const handleConfirm = () => {
    const generatedInitials = generateInitials(clientName);
    onInitialed(sectionId, generatedInitials);
    setShowConfirm(false);
  };

  if (isInitialed) {
    return (
      <div className="inline-flex items-center gap-2 border border-green-200 bg-green-50 px-4 py-2">
        <svg
          className="h-5 w-5 text-green-600"
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
        <span className="font-serif text-lg font-semibold text-green-700 italic">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary inline-flex items-center gap-2 border px-4 py-2 font-medium transition-colors"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        Click Here
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Confirm Your Initials
            </h3>
            <p className="mb-4 text-gray-600">
              Your initials will be used throughout this document. By clicking
              confirm, you agree to initial this and all subsequent sections as:
            </p>
            <div className="mb-4 bg-gray-50 py-4 text-center">
              <span className="font-serif text-3xl font-bold text-gray-900 italic">
                {generateInitials(clientName)}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-primary hover:bg-primary/90 flex-1 px-4 py-2 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
