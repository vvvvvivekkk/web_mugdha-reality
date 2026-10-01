import { useEffect } from 'react';

/**
 * Observes elements with .fade-up, .fade-in, .scale-in, .split, [data-counter].
 * Adds .in class when they enter the viewport. Counter spans animate.
 */
export function useReveal() {
  useEffect(() => {
    // Split text first
    document.querySelectorAll<HTMLElement>('.split:not([data-split-done])').forEach(el => {
      el.dataset.splitDone = '1';
      const mode = el.dataset.split || 'word';
      const delayBase = parseFloat(el.dataset.delay || '0');
      const text = el.textContent ?? '';
      el.textContent = '';
      if (mode === 'word') {
        const parts = text.split(' ');
        parts.forEach((word, i) => {
          const span = document.createElement('span');
          span.className = 'word';
          span.style.transitionDelay = (delayBase + i * 0.09) + 's';
          span.textContent = word + (i < parts.length - 1 ? ' ' : '');
          el.appendChild(span);
        });
      } else {
        text.split('').forEach((ch, i) => {
          const span = document.createElement('span');
          span.className = 'char';
          span.style.transitionDelay = (delayBase + i * 0.03) + 's';
          span.textContent = ch === ' ' ? ' ' : ch;
          el.appendChild(span);
        });
      }
    });

    const animateCounter = (el: HTMLElement) => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const target = Number(el.dataset.counter);
      const dur = 1800;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.classList.add('in');
          if (el.dataset.counter !== undefined) animateCounter(el);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll<HTMLElement>('.fade-up, .fade-in, .scale-in, .split, [data-counter]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
