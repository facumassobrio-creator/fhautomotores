"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  PUBLIC_AUTO_REFRESH_INTERVAL_MS,
  PUBLIC_REFRESH_COOLDOWN_MS,
} from '@/lib/publicCacheClient';

function nowMs() {
  return Date.now();
}

export function PublicVehiclesAutoRefresh() {
  const router = useRouter();
  const pathname = usePathname();
  const lastRefreshAtRef = useRef(0);

  useEffect(() => {
    const refreshIfAllowed = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        return;
      }

      const currentTime = nowMs();
      if (currentTime - lastRefreshAtRef.current < PUBLIC_REFRESH_COOLDOWN_MS) {
        return;
      }

      lastRefreshAtRef.current = currentTime;
      router.refresh();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshIfAllowed();
      }
    };

    const intervalId = window.setInterval(refreshIfAllowed, PUBLIC_AUTO_REFRESH_INTERVAL_MS);

    window.addEventListener('focus', refreshIfAllowed);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', refreshIfAllowed);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [router, pathname]);

  return null;
}
