'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { buildShareUrl, useCopyLink } from '@/lib/shareTheme';

interface ShareThemeButtonProps {
  themeId: string;
  /** Tailwind colour classes, so each modal matches its own palette. */
  className?: string;
  label?: string;
}

/**
 * Copies a deep link to this modal, for sending to a client.
 *
 * Sits beside the close control inside each theme modal.
 */
export default function ShareThemeButton({
  themeId,
  className = '',
  label = 'Share',
}: ShareThemeButtonProps) {
  const { copied, copy } = useCopyLink();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => copy(buildShareUrl(themeId))}
        aria-label={copied ? 'Link copied' : 'Copy a shareable link'}
        className={`flex h-10 items-center gap-2 rounded-full border px-4 backdrop-blur-md transition-all duration-300 ${className}`}
      >
        {copied ? (
          <svg
            className="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            className="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
          </svg>
        )}
        <span className="font-secondary text-[10px] font-semibold tracking-[0.16em] uppercase">
          {copied ? 'Copied' : label}
        </span>
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="font-secondary pointer-events-none absolute top-12 right-0 z-50 rounded bg-black/85 px-3 py-1.5 text-[10px] tracking-[0.1em] whitespace-nowrap text-white shadow-lg"
          >
            Link copied to clipboard
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
