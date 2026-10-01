const links = [
  ['Approved', '#approved'],
  ['Located', '#located'],
  ['Amenities', '#amenities'],
  ['Owned', '#owned'],
  ['Financed', '#financed'],
  ['Contacted', '#contacted'],
];

export default function Nav() {
  return (
    <nav className="nav-root">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L22 7 L22 17 L12 22 L2 17 L2 7 Z" stroke="#c9a961" strokeWidth="1.2"/>
              <circle cx="12" cy="12" r="3" fill="#c9a961"/>
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg">Mugdha</div>
            <div className="text-[10px] tracking-[0.3em] text-gold/80 uppercase">Realty</div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-10 text-sm text-cream/80">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link hover:text-gold transition">{label}</a>
          ))}
        </div>
        <a
          href="https://wa.me/917416416416"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 text-sm text-cream hover:bg-gold hover:text-bg transition-all duration-500"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 14.4c-.3-.1-1.7-.9-2-.9-.3-.1-.4-.2-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.5-.4-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>
          </svg>
          <span>Enquire</span>
        </a>
      </div>
    </nav>
  );
}
