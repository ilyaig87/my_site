'use client';

/**
 * Google Analytics 4 event helper.
 * Safe to call anywhere on the client — no-ops when gtag isn't loaded
 * (ad-blocker, GA disabled, SSR).
 */
type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: GtagParams) => void;
  }
}

export function trackEvent(eventName: string, params?: GtagParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Analytics must never break the UI.
  }
}

/**
 * Standard WhatsApp-click conversion event.
 * `location` identifies the button ('footer', 'floating_button', ...);
 * `page` records which page the click came from.
 */
export function trackWhatsAppClick(location: string) {
  if (typeof window === 'undefined') return;
  trackEvent('whatsapp_click', { location, page: window.location.pathname });
}
