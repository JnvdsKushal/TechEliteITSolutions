/**
 * SAVE AS: src/components/ScrollToTop.tsx
 * (replace your existing ScrollToTop.tsx)
 *
 * Scrolls the window to the top on every route change.
 * Already imported and used in App.tsx — no changes needed there.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // instant jump — no smooth scroll so the new page feels fresh
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}