import { useState } from 'react';

const projects = [
  {
    name: 'Magnus Smart City',
    tag: 'Phase 1 · Live',
    loc: 'Bangalore Hwy · 75+ acres',
    price: 'From ₹18.5L',
    specs: ['153–582 sq. yd', 'HMDA + RERA', '35+ amenities'],
    img: 'img/magnus.jpg',
    dot: 'bg-green-400',
  },
  {
    name: 'MIRAI',
    tag: 'Selling fast',
    loc: 'Shadnagar · 6.3 acres',
    price: 'From ₹12L',
    specs: ['Boutique layout', 'HMDA approved', 'Vastu compliant'],
    img: 'img/hero3.jpg',
    dot: 'bg-amber-400',
  },
  {
    name: 'Marvel Smart City',
    tag: 'Pre-launch',
    loc: 'Srisailam Hwy · 100+ acres',
    price: 'Reg. open',
    specs: ['Mixed-use township', 'Launch Q2 FY26', 'Early-bird pricing'],
    img: 'img/magnus-night.jpg',
    dot: 'bg-sage',
  },
];

export default function OwnedChapter() {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <section id="owned" className="chapter-section">
      <div className="chapter-bg transition-opacity duration-1000" style={{ backgroundImage: `url('${current.img}')` }} />
      <div className="chapter-overlay" />

      <div className="relative w-full h-screen flex flex-col justify-between py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col justify-center">
          <span className="chapter-prefix italic text-cream/90 mb-2 opacity-100" style={{ opacity: 1, transform: 'translateY(0)' }}>a plot of yours,</span>
          <div className="chapter-script" style={{ opacity: 1, transform: 'translateX(0)' }}>owned.</div>
        </div>

        {/* Floating listing cards — bottom */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex flex-wrap gap-4 justify-end">
            {projects.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActive(i)}
                className={`listing-card rounded-2xl p-5 w-72 text-left ${active === i ? 'ring-1 ring-gold/60' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-cream/80">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                    {p.tag}
                  </span>
                  <span className="text-xs text-gold font-display">{p.price}</span>
                </div>
                <div className="font-display text-xl mb-1">{p.name}</div>
                <div className="text-xs text-cream/60 mb-3">{p.loc}</div>
                <ul className="space-y-1 text-[11px] text-cream/70">
                  {p.specs.map(s => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
