import React, { useEffect, useRef, useState } from 'react';

export default function ContactedChapter() {
  const [budget, setBudget] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && el.classList.add('in')), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg('✓ Thank you. We will call you within one business hour.');
    e.currentTarget.reset();
    setBudget(null);
    setTimeout(() => setMsg(''), 6000);
  };

  const budgets = ['Under ₹20L', '₹20L – ₹40L', '₹40L – ₹75L', 'Above ₹75L'];

  return (
    <section id="contacted" ref={ref} className="chapter-section">
      <div className="chapter-bg" style={{ backgroundImage: "url('img/hero2.jpg')" }} />
      <div className="chapter-overlay" />

      <div className="relative w-full min-h-screen flex flex-col justify-between py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col justify-center">
          <span className="chapter-prefix italic text-cream/90 mb-2">let's get</span>
          <div className="chapter-script">contacted.</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
            <div className="chapter-body max-w-sm">
              <div className="space-y-5 text-cream/80">
                <a href="tel:+917416416416" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-bg transition-all duration-500 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 5a2 2 0 0 1 2-2h3l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5z" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </div>
                  <div><div className="text-[10px] text-cream/50 uppercase tracking-wider">Call</div><div className="font-display text-lg group-hover:text-gold transition">+91 74164 16416</div></div>
                </a>
                <a href="mailto:info@mugdharealty.com" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-bg transition-all duration-500 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </div>
                  <div><div className="text-[10px] text-cream/50 uppercase tracking-wider">Email</div><div className="font-display text-lg group-hover:text-gold transition">info@mugdharealty.com</div></div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22s-8-7-8-13a8 8 0 1 1 16 0c0 6-8 13-8 13z" stroke="#c9a961" strokeWidth="1.5"/><circle cx="12" cy="9" r="2.5" stroke="#c9a961" strokeWidth="1.5"/></svg>
                  </div>
                  <div><div className="text-[10px] text-cream/50 uppercase tracking-wider">Office</div><div className="text-sm leading-relaxed">Sri Chandra's Infinitum, Gachibowli, Hyderabad</div></div>
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="chapter-body listing-card rounded-2xl p-6 w-full max-w-md">
              <div className="space-y-4">
                <input required type="text" placeholder="Your name" className={inp} />
                <div className="grid grid-cols-2 gap-3">
                  <input required type="tel" placeholder="+91 phone" className={inp} />
                  <input type="email" placeholder="Email" className={inp} />
                </div>
                <select className={inp}>
                  <option className="bg-bg">Interested in Magnus Smart City</option>
                  <option className="bg-bg">Interested in MIRAI</option>
                  <option className="bg-bg">Interested in Marvel Smart City</option>
                  <option className="bg-bg">Need guidance</option>
                </select>
                <div className="flex gap-1.5 flex-wrap">
                  {budgets.map(b => (
                    <button type="button" key={b} onClick={() => setBudget(b)}
                      className={`px-3 py-1.5 border rounded-full text-[11px] transition ${budget === b ? 'bg-gold text-bg border-gold' : 'border-gold/20 hover:border-gold'}`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-primary mt-5 w-full py-3 bg-gold text-bg font-medium rounded-full flex items-center justify-center gap-2">
                <span>Request Callback</span>
                <svg className="arrow-slide" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/></svg>
              </button>
              {msg && <p className="mt-3 text-center text-sm text-gold">{msg}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const inp = 'w-full bg-transparent border-b border-gold/20 py-2.5 text-cream text-sm focus:outline-none focus:border-gold transition placeholder:text-cream/40';
