import { useEffect } from 'react';

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scrollBarFill');
    const nav = document.querySelector('.nav-root');
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = window.scrollY / h;
      if (bar) bar.style.width = (p * 100) + '%';
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
