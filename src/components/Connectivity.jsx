import { useState } from 'react';

const locs = [
  { id: 'magnus', pin: { left: '20%', top: '55%' }, tag: 'Flagship', title: 'Magnus Smart City', note: '15 km from ORR', body: 'Rameshwaram, Near Shadnagar · 75+ acres · Phase 1 live' },
  { id: 'mirai', pin: { left: '15%', top: '72%' }, tag: 'Boutique', title: 'MIRAI', note: 'Shadnagar', body: '6.3 acres · Near Rameshwaram Temple · HMDA' },
  { id: 'marvel', pin: { left: '68%', top: '78%' }, tag: 'Township', title: 'Marvel Smart City', note: 'Srisailam Hwy', body: '100+ acres · Mixed-use · Pre-launch' },
];

export default function Connectivity() {
  const [active, setActive] = useState('magnus');
  return (
    <section id="connectivity" className="py-24 lg:py-36 bg-bg2 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <div className="section-label mb-6 fade-up" style={{ justifyContent: 'center' }}><span>Where We Build</span></div>
          <h2 className="font-display text-5xl lg:text-7xl leading-tight fade-up" style={{ transitionDelay: '.1s' }}>
            Hyderabad's growth corridors,<br /><span className="italic text-gold/90">curated.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3 fade-up">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 bg-bg">
              <svg viewBox="0 0 600 450" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="mapGlow" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#c9a961" stopOpacity="0.08"/>
                    <stop offset="100%" stopColor="#c9a961" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <rect width="600" height="450" fill="#0a0908"/>
                <rect width="600" height="450" fill="url(#mapGlow)"/>
                <path d="M50 220 Q 200 180 300 220 T 550 240" stroke="#2a2520" strokeWidth="20" fill="none"/>
                <path d="M50 220 Q 200 180 300 220 T 550 240" stroke="#c9a961" strokeWidth="1" fill="none" strokeDasharray="6 10" opacity="0.5"/>
                <path d="M300 50 Q 320 150 300 220 T 310 400" stroke="#2a2520" strokeWidth="20" fill="none"/>
                <path d="M300 50 Q 320 150 300 220 T 310 400" stroke="#c9a961" strokeWidth="1" fill="none" strokeDasharray="6 10" opacity="0.4"/>
                <path d="M80 100 Q 180 150 280 230 T 480 390" stroke="#2a2520" strokeWidth="14" fill="none"/>
                <path d="M80 100 Q 180 150 280 230 T 480 390" stroke="#c9a961" strokeWidth="1" fill="none" strokeDasharray="6 10" opacity="0.3"/>
                <circle cx="300" cy="220" r="6" fill="#c9a961"/>
                <circle cx="300" cy="220" r="12" fill="none" stroke="#c9a961" opacity=".4">
                  <animate attributeName="r" from="6" to="30" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite"/>
                </circle>
                <text x="315" y="215" fill="#f5f0e6" fontFamily="Fraunces" fontSize="18" fontStyle="italic">Hyderabad</text>
                <text x="315" y="232" fill="#9a948a" fontFamily="Inter" fontSize="10" letterSpacing="2">CITY CENTER</text>
                <text x="200" y="200" fill="#8b7742" fontFamily="Inter" fontSize="9" letterSpacing="1.5">NH-44 BANGALORE HWY</text>
                <text x="320" y="360" fill="#8b7742" fontFamily="Inter" fontSize="9" letterSpacing="1.5">SRISAILAM HWY</text>
              </svg>
              {locs.map(l => (
                <button key={l.id} className="absolute" style={l.pin} onClick={() => setActive(l.id)}>
                  <div className="relative w-5 h-5">
                    <div className="pin absolute w-5 h-5 rounded-full bg-gold/30" />
                    <div className="absolute inset-1 rounded-full bg-gold ring-2 ring-bg" />
                  </div>
                  <div className="mt-2 text-[10px] font-medium text-cream whitespace-nowrap">{l.title.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4 fade-up" style={{ transitionDelay: '.2s' }}>
            {locs.map(l => (
              <div
                key={l.id}
                onClick={() => setActive(l.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-500 ${active === l.id ? 'border border-gold/40 bg-bg' : 'border border-gold/15 hover:border-gold/40'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className={`text-xs tracking-wider uppercase mb-1 ${active === l.id ? 'text-gold' : 'text-cream/60'}`}>{l.tag}</div>
                    <h3 className="font-display text-xl">{l.title}</h3>
                  </div>
                  <span className="text-xs text-cream/60">{l.note}</span>
                </div>
                <p className="text-xs text-cream/60 leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
