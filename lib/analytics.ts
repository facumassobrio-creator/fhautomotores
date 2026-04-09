type TrackingEventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || '';
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || '';

export function trackPageView(url?: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const pagePath = url || `${window.location.pathname}${window.location.search}`;

  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('config', GA_ID, {
      page_path: pagePath,
    });
  }

  if (META_PIXEL_ID && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

export function trackEvent(eventName: string, params: TrackingEventParams = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  if (META_PIXEL_ID && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
}
