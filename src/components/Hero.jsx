import { useEffect, useRef } from 'react';

const slides = ['img/hero1.jpg', 'img/hero3.jpg', 'img/hero2.jpg'];

export default function Hero() {
  const slideRefs = useRef([]);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      slideRefs.current[i]?.classList.remove('on');
      i = (i + 1) % slides.length;
      slideRefs.current[i]?.classList.add('on');
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative">
      <div id="hero" className="relative overflow-hidden" style={{ height: '100vh', minHeight: 700 }}>
        {slides.map((src, i) => (
          <div
            key={src}
            ref={el => (slideRefs.current[i] = el)}
            className={`hero-img ${i === 0 ? 'on' : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
        <div className="hero-vignette" />

        <div className="relative h-full flex flex-col justify-end pb-28 lg:pb-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="section-label left mb-8 fade-up"><span>HMDA · RERA P02400010251 · Est. 2016</span></div>
            <h1 className="font-display leading-[0.95] mb-10 max-w-5xl" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>
              <span className="split" data-split="word">Land you can hold.</span><br />
              <span className="split italic text-gold/90" data-split="word" data-delay=".4">Trust you can see.</span>
            </h1>
            <p className="text-lg lg:text-xl text-cream/70 max-w-xl mb-10 fade-up" style={{ transitionDelay: '1s' }}>
              Hyderabad's most trusted name in approved villa plots. Eight years. Five hundred families. Zero title disputes.
            </p>
            <div className="flex flex-wrap gap-4 fade-up" style={{ transitionDelay: '1.15s' }}>
              <a href="#projects" className="btn-primary inline-flex items-center gap-3 px-8 py-4 bg-gold text-bg font-medium rounded-full">
                <span>View Live Projects</span>
                <svg className="arrow-slide" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
              <a href="#contact" className="link-hover inline-flex items-center gap-3 px-8 py-4 border border-cream/30 rounded-full hover:border-gold hover:text-gold transition-all duration-500">
                Schedule a Site Visit
              </a>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="hidden md:flex absolute bottom-10 right-6 lg:right-10 gap-3 fade-up" style={{ transitionDelay: '1.3s' }}>
          {[['8', 'yrs', 'Delivering trust'], ['500', '+', 'Happy families'], ['181', 'ac', 'Under development']].map(([n, suf, label]) => (
            <div key={label} className="backdrop-blur-xl bg-bg/40 border border-gold/20 rounded-2xl p-5 w-36">
              <div className="font-display text-4xl gold-text">
                <span data-counter={n}>0</span><span className="text-lg">{suf}</span>
              </div>
              <div className="text-[10px] text-cream/60 tracking-[0.2em] uppercase mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-cream/40 tracking-[0.3em] uppercase flex flex-col items-center gap-3 fade-up" style={{ transitionDelay: '1.5s' }}>
          <span>Scroll</span>
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
            <rect x="1" y="1" width="12" height="22" rx="6" stroke="currentColor"/>
            <circle cx="7" cy="7" r="1.5" fill="currentColor">
              <animate attributeName="cy" from="7" to="17" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
}
