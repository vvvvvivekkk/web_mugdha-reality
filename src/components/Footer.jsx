const social = [
  { href: '#', path: 'M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z' },
  { href: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
  { href: '#', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { href: 'https://wa.me/917416416416', path: 'M17.5 14.4c-.3-.1-1.7-.9-2-.9-.3-.1-.4-.2-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.5-.4-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.4A10 10 0 1 0 12 2z' },
];

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2 L22 7 L22 17 L12 22 L2 17 L2 7 Z" stroke="#c9a961" strokeWidth="1.2"/><circle cx="12" cy="12" r="3" fill="#c9a961"/></svg>
              </div>
              <div className="leading-tight">
                <div className="font-display text-lg">Mugdha</div>
                <div className="text-[10px] tracking-[0.3em] text-gold/80 uppercase">Realty</div>
              </div>
            </div>
            <p className="text-sm text-cream/50 leading-relaxed">Transforming spaces. Enriching lives. Since 2016.</p>
          </div>
          <div>
            <div className="text-xs text-cream/40 uppercase tracking-wider mb-4">Projects</div>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#owned" className="hover:text-gold transition">Magnus Smart City</a></li>
              <li><a href="#owned" className="hover:text-gold transition">MIRAI</a></li>
              <li><a href="#owned" className="hover:text-gold transition">Marvel Smart City</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs text-cream/40 uppercase tracking-wider mb-4">Company</div>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#approved" className="hover:text-gold transition">Approvals &amp; RERA</a></li>
              <li><a href="#located" className="hover:text-gold transition">Connectivity</a></li>
              <li><a href="#financed" className="hover:text-gold transition">Financing</a></li>
              <li><a href="#contacted" className="hover:text-gold transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs text-cream/40 uppercase tracking-wider mb-4">Connect</div>
            <div className="flex gap-3">
              {social.map((s, i) => (
                <a key={i} href={s.href} className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center hover:border-gold hover:text-gold transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hairline mb-8" />
        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-cream/40">
          <div>© 2026 Mugdha Realty Pvt Ltd · RERA P02400010251 · All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition">Privacy</a>
            <a href="#" className="hover:text-gold transition">Terms</a>
            <a href="#" className="hover:text-gold transition">RERA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
