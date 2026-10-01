import { useEffect } from 'react';

/**
 * Native smooth scrolling for in-page anchors. No scroll-hijack library —
 * every animation in the site is scroll-position driven, so plain native
 * scrolling keeps the experience identical and can never block scrolling.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);
}
