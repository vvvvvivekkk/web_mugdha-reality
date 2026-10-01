import { useEffect, useRef, useState } from 'react';

const voices = [
  {
    quote: "They handed me the HMDA papers before I handed them a cheque.",
    name: 'Rajesh Varma', role: 'Magnus Phase 1 · 2024',
    initials: 'RV',
  },
  {
    quote: "We bought from the US without ever flying down. They respect our time.",
    name: 'Priya & Karthik Rao', role: 'NRI owners · MIRAI · 2025',
    initials: 'PK',
  },
  {
    quote: "Three generations. Zero issues. That tells you everything.",
    name: 'Anitha Reddy', role: 'Repeat buyer · Magnus Ph. 2',
    initials: 'AR',
  },
];

export default function TrustedChapter() {
  const [i, setI] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && el.classList.add('in')), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % voices.length), 5000);
    return () => clearInterval(t);
  }, []);
  const v = voices[i];

  return (
    <section id="trusted" ref={ref} className="chapter-section">
      <div className="chapter-bg" style={{ backgroundImage: "url('/img/hero1.jpg')" }} />
      <div className="chapter-overlay" />

      <div className="relative w-full h-screen flex flex-col justify-between py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col justify-center">
          <span className="chapter-prefix italic text-cream/90 mb-2">five hundred families,</span>
          <div className="chapter-script">trusted.</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
            <div className="chapter-body listing-card rounded-2xl p-8 max-w-xl">
              <p className="font-display text-2xl italic text-cream mb-6 leading-snug min-h-[6rem]">"{v.quote}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-display text-base text-gold border border-gold/40 bg-bg2">{v.initials}</div>
                  <div>
                    <div className="font-medium text-sm">{v.name}</div>
                    <div className="text-xs text-cream/50">{v.role}</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {voices.map((_, idx) => (
                    <button key={idx} onClick={() => setI(idx)} className={`w-8 h-0.5 transition-colors ${idx === i ? 'bg-gold' : 'bg-gold/20'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
