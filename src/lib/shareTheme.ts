'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Deep linking and sharing for the holiday theme modals.
 *
 * A modal is addressable as `?experience=<id>` on whatever page hosts it, so a
 * manager can copy the link and send it to a client who lands directly on that
 * modal. The query string is kept in sync as modals open and close, and the
 * URL is rewritten without a navigation so the page never reloads.
 */

const PARAM = 'experience';

/** Reads the theme id the URL is currently pointing at, if any. */
export function useSharedTheme(validIds: string[]): string | null {
  const [initial, setInitial] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const value = new URLSearchParams(window.location.search).get(PARAM);
    if (value && validIds.includes(value)) setInitial(value);
    // validIds is a literal array defined at module scope; re-running on each
    // render would clear a freshly opened modal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return initial;
}

/** Pushes the open modal into the URL, or clears it when nothing is open. */
export function syncThemeParam(themeId: string | null): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (themeId) {
    url.searchParams.set(PARAM, themeId);
  } else {
    url.searchParams.delete(PARAM);
  }

  // replaceState avoids adding a history entry per modal open.
  window.history.replaceState({}, '', url.toString());
}

/** Builds the absolute link for a theme on the current page. */
export function buildShareUrl(themeId: string): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.searchParams.set(PARAM, themeId);
  url.hash = '';
  return url.toString();
}

/**
 * Copy helper with a graceful fallback.
 *
 * navigator.clipboard is unavailable on insecure origins, so fall back to a
 * hidden textarea and execCommand rather than failing silently.
 */
export function useCopyLink(): {
  copied: boolean;
  copy: (text: string) => Promise<void>;
} {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
    } catch {
      // Clipboard denied: leave `copied` false so the label does not lie.
    }
  }, []);

  return { copied, copy };
}
