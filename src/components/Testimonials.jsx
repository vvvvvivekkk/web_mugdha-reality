import { useEffect, useState } from 'react';

const items = [
  {
    quote: "I'd been burned by two unapproved layouts before Mugdha. The difference was obvious from day one — they handed me the HMDA papers before I handed them a cheque.",
    initials: 'RV', name: 'Rajesh Varma', role: 'Plot owner · Magnus Phase 1',
    bg: 'linear-gradient(135deg, #1a1612, #2a2420)',
  },
  {
    quote: "We bought from the US without ever flying down. Video walkthroughs, DocuSign'd papers, remote registration — rare in Indian real estate. They respect our time.",
    initials: 'PK', name: 'Priya & Karthik Rao', role: 'NRI owners · MIRAI',
    bg: 'linear-gradient(135deg, #1e1a1d, #2d2528)',
  },
  {
    quote: "My father bought in 2019. My brother in 2022. I closed on a plot last month. Three generations, zero issues. That tells you everything.",
    initials: 'AR', name: 'Anitha Reddy', role: 'Repeat buyer · Magnus Ph. 2',
    bg: 'linear-gradient(135deg, #1b1a16, #2a2822)',
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 lg:py-36 bg-bg2 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="section-label mb-6 fade-up" style={{ justifyContent: 'center' }}><span>Owner Voices</span></div>
        <h2 className="font-display text-5xl lg:text-6xl leading-tight mb-20 fade-up" style={{ transitionDelay: '.1s' }}>
          500 families.<br /><span className="italic text-gold/90">A few of their stories.</span>
        </h2>

        <div className="relative min-h-[280px]">
          {items.map((t, i) => (
            <div key={i} className={`testimonial ${i === idx ? 'on' : ''}`}>
              <p className="font-display text-2xl lg:text-4xl leading-snug text-cream/90 mb-10 italic">"{t.quote}"</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg text-gold border border-gold/40" style={{ background: t.bg }}>{t.initials}</div>
                <div className="text-left">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-cream/50">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-16">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`w-10 h-0.5 transition-colors ${i === idx ? 'bg-gold' : 'bg-gold/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
