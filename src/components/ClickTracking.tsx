'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

// One listener for phone, email and PDF links on the public pages.
export default function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (/^\/(admin|sign|verify)(\/|$)/.test(location.pathname)) return;
      const link = e.target instanceof Element ? e.target.closest('a') : null;
      if (!link) return;
      if (link.protocol === 'tel:') track('contact_click', { type: 'phone' });
      else if (link.protocol === 'mailto:')
        track('contact_click', { type: 'email' });
      else if (/\.pdf$/i.test(link.pathname)) {
        const file = decodeURIComponent(link.pathname.split('/').pop() ?? '');
        track('brochure_opened', { name: file.replace(/\.pdf$/i, '') });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
