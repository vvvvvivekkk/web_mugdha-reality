import { useTilt } from '../hooks/useTilt';

export default function ProjectCard({ p, i }) {
  const ref = useTilt();
  return (
    <article ref={ref} className="tilt-card scale-in relative rounded-2xl overflow-hidden aspect-[3/4] bg-bg" style={{ '--i': i }}>
      <div className="tilt-inner relative w-full h-full">
        <img src={p.img} className="absolute inset-0 w-full h-full object-cover" alt={p.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
        <div className="project-badge absolute top-4 left-4 backdrop-blur-xl bg-bg/40 border border-gold/30 rounded-full px-3 py-1 text-[10px] tracking-wider uppercase flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${p.dotColor}`}></span> {p.status}
        </div>
        <div className="absolute bottom-0 inset-x-0 p-6 project-badge">
          <div className="text-xs text-cream/60 tracking-wider uppercase mb-2">{p.locLine}</div>
          <h3 className="font-display text-3xl mb-3">{p.name}</h3>
          <div className="flex gap-4 text-xs text-cream/70 flex-wrap">
            {p.chips.map((c, i) => (
              <span key={i} className="flex gap-4">
                {c}
                {i < p.chips.length - 1 && <span className="text-gold">·</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="project-overlay absolute inset-0 p-6 flex flex-col justify-end backdrop-blur-sm">
          <h3 className="font-display text-3xl mb-4">{p.name}</h3>
          <p className="text-sm text-cream/70 mb-6 leading-relaxed">{p.description}</p>
          <ul className="text-xs text-cream/60 space-y-1.5 mb-6">
            {p.points.map(x => (
              <li key={x} className="flex gap-2"><span className="text-gold">—</span> {x}</li>
            ))}
          </ul>
          <a href="#contact" className="link-hover inline-flex items-center gap-2 text-gold text-sm font-medium">
            <span>{p.cta}</span>
            <svg className="arrow-slide" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
