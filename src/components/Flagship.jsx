import { useEffect, useRef, useState } from 'react';

const chapters = [
  {
    img: '/img/magnus.jpg',
    label: 'Flagship Project',
    idx: 'Chapter 1 of 4',
    titleA: 'Magnus',
    titleB: 'Smart City.',
    body: 'Our largest integrated plot community — 75 acres on the Bangalore Highway, three minutes from NH-44, two minutes from ISRO.',
    footer: <p className="text-xs text-cream/40 italic">Scroll to see what sets Magnus apart ↓</p>,
  },
  {
    img: '/img/magnus-day.jpg',
    label: 'The Approvals',
    idx: 'Chapter 2 of 4',
    titleA: 'Papers first.',
    titleB: 'Then plots.',
    body: 'HMDA approved. Registered under TS RERA — P02400010251. Every title cleared by independent legal counsel. We don\'t open bookings on land we don\'t fully own.',
    footer: (
      <div className="flex gap-6 flex-wrap">
        <div><div className="font-display text-2xl text-gold">HMDA</div><div className="text-xs text-cream/50 uppercase tracking-wider">Approved</div></div>
        <div><div className="font-display text-2xl text-gold">RERA</div><div className="text-xs text-cream/50 uppercase tracking-wider">Registered</div></div>
        <div><div className="font-display text-2xl text-gold">0</div><div className="text-xs text-cream/50 uppercase tracking-wider">Title disputes</div></div>
      </div>
    ),
  },
  {
    img: '/img/magnus-detail.jpg',
    label: 'The Amenities',
    idx: 'Chapter 3 of 4',
    titleA: 'Twenty acres,',
    titleB: 'lived in.',
    body: 'Clubhouse, sky lounge, mini theater, pool, co-working space, gym & spa, meditation center, temple, kids park, cricket nets, pet zones, EV charging. A community, not a layout.',
    footer: (
      <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm text-cream/70 max-w-md">
        {['Swimming pool', 'Clubhouse', 'Multi-sports zone', 'Mini theater', 'Gym & spa', 'EV charging'].map(x => (
          <div key={x} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold"></span>{x}</div>
        ))}
      </div>
    ),
  },
  {
    img: '/img/magnus-night.jpg',
    label: 'The Connectivity',
    idx: 'Chapter 4 of 4',
    titleA: 'Three minutes',
    titleB: 'to everywhere.',
    body: 'Rameshwaram, Near Shadnagar. On the Bangalore Highway. Where the city\'s next decade is being built.',
    footer: (
      <>
        <ul className="space-y-2 text-sm text-cream/70 max-w-md">
          {[
            ['NH-44 Bangalore Highway', '3 min'],
            ['Shadnagar town', '5 min'],
            ['Microsoft Data Centre', '7 min'],
            ['Symbiosis University · JIMS Hospital', '10 min'],
            ['RGIA International Airport', '35 min'],
          ].map(([p, t], i, arr) => (
            <li key={p} className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? 'border-b border-gold/10' : ''}`}>
              <span>{p}</span><span className="text-gold">{t}</span>
            </li>
          ))}
        </ul>
        <a href="#contact" className="mt-8 inline-flex items-center gap-3 text-gold link-hover font-medium">
          <span>Request the full brochure</span>
          <svg className="arrow-slide" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </a>
      </>
    ),
  },
];

export default function Flagship() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const r = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      setActive(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="flagship" ref={sectionRef} className="flagship-section" style={{ height: '400vh' }}>
      <div className="flagship-sticky">
        {chapters.map((c, i) => (
          <div
            key={i}
            className={`flagship-img ${i === active ? 'on' : ''} ${i === 0 ? 'mobile-show' : ''}`}
            style={{ backgroundImage: `url('${c.img}')` }}
          />
        ))}
        <div className="flagship-vignette" />

        <div className="relative w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
            <div />
            <div className="relative lg:min-h-[70vh]">
              {chapters.map((c, i) => (
                <div
                  key={i}
                  className={`chapter ${i === active ? 'on' : ''} absolute lg:static inset-0 flex flex-col justify-center`}
                >
                  <div className="section-label left mb-6"><span>{c.label}</span></div>
                  <div className="text-[10px] tracking-[0.4em] uppercase text-cream/50 mb-3">{c.idx}</div>
                  <h2 className="font-display text-5xl lg:text-7xl leading-[1.02] mb-6">
                    {c.titleA}<br />
                    <span className="italic text-gold/90">{c.titleB}</span>
                  </h2>
                  <p className="text-cream/70 leading-relaxed mb-6 max-w-md">{c.body}</p>
                  {c.footer}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-10">
          {chapters.map((_, i) => (
            <div key={i} className={`w-px h-16 ${i === active ? 'bg-gold' : 'bg-gold/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
