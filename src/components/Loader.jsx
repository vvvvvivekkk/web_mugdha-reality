import { useEffect, useState } from 'react';

export default function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setGone(true);
      // trigger hero/first-chapter reveals
      document.querySelectorAll('.fade-up, .split').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      });
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="loader" className={gone ? 'gone' : ''}>
      <div className="loader-brand">
        <div className="loader-mark" />
        <div className="loader-text font-display text-3xl text-cream">
          <span className="word">Mugdha</span>&nbsp;<span className="word italic text-gold/90">Realty</span>
        </div>
      </div>
      <div className="loader-bar" />
    </div>
  );
}
