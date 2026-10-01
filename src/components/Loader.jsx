import { useEffect, useState } from 'react';

export default function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setGone(true);
      document.body.style.overflow = 'auto';
      // trigger hero reveals immediately
      document.querySelectorAll('#hero .fade-up, #hero .split').forEach(el => el.classList.add('in'));
    }, 1800);
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
