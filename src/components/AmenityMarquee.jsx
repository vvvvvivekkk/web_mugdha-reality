const amenities = [
  { name: 'Swimming Pool', path: 'M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0' },
  { name: 'Clubhouse', path: 'M3 21V8l9-5 9 5v13M9 21v-8h6v8' },
  { name: 'Multi-sports Zone', custom: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1"/></> },
  { name: 'Mini Theater', custom: <><rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M8 2v3M16 2v3" stroke="currentColor" strokeWidth="1.5"/></> },
  { name: 'Business Center', path: 'M4 6v12c0 1 1 2 2 2h12c1 0 2-1 2-2V6M8 10h8M8 14h5' },
  { name: 'Gym & Spa', custom: <><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M9 12h6" stroke="currentColor" strokeWidth="1.5"/></> },
  { name: 'Meditation Center', path: 'M12 3C8 7 4 11 4 15a8 8 0 0 0 16 0c0-4-4-8-8-12z' },
  { name: 'EV Charging', path: 'M13 2L4 14h7l-2 8 9-12h-7l2-8z' },
  { name: 'Temple', path: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6' },
  { name: 'Kids Play Area', custom: <><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5"/></> },
  { name: 'Cricket Nets', custom: <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.5"/> },
  { name: 'Basketball & Tennis', custom: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M3 15c3 0 5-1 9-1s6 1 9 1" stroke="currentColor" strokeWidth="1" opacity=".6"/></> },
  { name: 'Sky Lounge', custom: <><path d="M3 12h18M12 3v18M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="1" opacity=".4"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></> },
  { name: 'Amphitheatre', path: 'M4 20V8M20 20V8M4 14h16M4 8l8-5 8 5' },
  { name: 'Pet Zone', custom: <><circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M6 20c0-3 3-6 6-6s6 3 6 6M4 10h2M18 10h2" stroke="currentColor" strokeWidth="1.5"/></> },
  { name: 'Smart Access', custom: <><rect x="3" y="11" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5"/></> },
  { name: 'Solar Street Lighting', custom: <><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/></> },
  { name: 'Co-working Space', path: 'M3 20h18M5 20v-6M9 20v-10M13 20v-13M17 20v-7M21 20v-4' },
  { name: '24/7 Security', custom: <><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5"/></> },
  { name: 'Senior Park', path: 'M12 2L4 7v7c0 5 3 8 8 8s8-3 8-8V7z' },
];

const Chip = ({ a }) => (
  <div className="amenity-chip">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {a.custom ? a.custom : <path d={a.path} stroke="currentColor" strokeWidth="1.5"/>}
    </svg>
    <span>{a.name}</span>
  </div>
);

const Row = ({ aria }) => (
  <div className="flex gap-4 px-4 shrink-0" aria-hidden={aria}>
    {amenities.map(a => <Chip key={a.name} a={a} />)}
  </div>
);

export default function AmenityMarquee() {
  return (
    <section id="amenities" className="py-20 lg:py-28 overflow-hidden bg-bg2 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <div className="section-label left mb-6 fade-up"><span>Life Inside Magnus</span></div>
        <h2 className="font-display text-4xl lg:text-6xl leading-tight max-w-3xl fade-up" style={{ transitionDelay: '.1s' }}>
          Thirty-five amenities,<br /><span className="italic text-gold/90">one address.</span>
        </h2>
      </div>

      <div className="flex marquee-track whitespace-nowrap">
        <Row />
        <Row aria={true} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10 flex justify-between items-center flex-wrap gap-6">
        <p className="text-sm text-cream/50 italic">...plus pet zones, jogging tracks, amphitheatre, co-working, solar lighting & more.</p>
        <a href="#contact" className="link-hover inline-flex items-center gap-2 text-gold text-sm font-medium">
          <span>See the full master plan</span>
          <svg className="arrow-slide" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
