export default function Compass({ label = 'Scroll to explore' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="compass">
        <div className="compass-ring" />
        <div className="compass-ring spin" style={{ borderStyle: 'dashed', opacity: 0.35 }} />
        <svg viewBox="0 0 56 56" className="absolute inset-0">
          <line x1="28" y1="8" x2="28" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="28" y1="36" x2="28" y2="48" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="28" x2="20" y2="28" stroke="currentColor" strokeWidth="1" />
          <line x1="36" y1="28" x2="48" y2="28" stroke="currentColor" strokeWidth="1" />
          <polygon points="28,14 25,22 28,20 31,22" fill="currentColor" />
          <polygon points="28,42 25,34 28,36 31,34" fill="currentColor" />
          <circle cx="28" cy="28" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="text-[10px] tracking-[0.4em] uppercase text-gold/80">{label}</div>
    </div>
  );
}
