import { useEffect, useRef } from 'react';

/** Attach to the outer .tilt-card; it will transform its first .tilt-inner. */
export function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const card = ref.current;
    if (!card) return;
    const inner = card.querySelector('.tilt-inner');
    if (!inner) return;
    const move = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
    };
    const leave = () => { inner.style.transform = 'rotateY(0) rotateX(0) translateZ(0)'; };
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseleave', leave);
    return () => {
      card.removeEventListener('mousemove', move);
      card.removeEventListener('mouseleave', leave);
    };
  }, []);
  return ref;
}
