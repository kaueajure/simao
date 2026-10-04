'use client';
import { useEffect } from 'react';
export function LandingAnalytics() {
  useEffect(() => {
    void fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'LANDING_VISIT' }),
    });
    const click = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a[href="/entrar"]'))
        void fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'CTA_CLICK' }),
        });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  return null;
}
