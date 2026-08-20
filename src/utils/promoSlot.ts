/**
 * Coordination between the two full-width promo panels.
 *
 * Both panels render below the navbar at full width, so they cannot be shown
 * at the same time. Holiday-related pages mount SpeakeasyPromoBanner, which is
 * the more specific message and takes precedence; the site-wide
 * HolidayPromoBanner suppresses itself whenever the speakeasy panel is
 * present on the page.
 *
 * This is deliberately NOT tied to either dismissal key: suppression is about
 * which panel a page shows, while dismissal is the user's own choice and is
 * tracked independently per panel.
 */

const EVENT = '48wall-speakeasy-mounted';

/** Called by SpeakeasyPromoBanner while it is mounted on the page. */
export function claimPromoSlot(): () => void {
  if (typeof window === 'undefined') return () => {};
  window.__wall48SpeakeasyMounted = true;
  window.dispatchEvent(new Event(EVENT));
  return () => {
    window.__wall48SpeakeasyMounted = false;
    window.dispatchEvent(new Event(EVENT));
  };
}

/** True when the speakeasy panel owns the slot on this page. */
export function isPromoSlotClaimed(): boolean {
  if (typeof window === 'undefined') return false;
  return window.__wall48SpeakeasyMounted === true;
}

/** Subscribe to claim/release so a suppressed panel can re-evaluate. */
export function onPromoSlotChange(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

declare global {
  interface Window {
    __wall48SpeakeasyMounted?: boolean;
  }
}
