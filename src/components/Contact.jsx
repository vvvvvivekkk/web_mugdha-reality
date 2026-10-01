import { useState } from 'react';

export default function Contact() {
  const [budget, setBudget] = useState(null);
  const [msg, setMsg] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setMsg('✓ Thank you. Our team will call you within one business hour.');
    e.target.reset();
    setBudget(null);
    setTimeout(() => setMsg(''), 6000);
  };

  const budgets = ['Under ₹20L', '₹20L – ₹40L', '₹40L – ₹75L', 'Above ₹75L'];

  return (
    <section id="contact" className="py-24 lg:py-36 bg-bg2 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <div className="section-label left mb-6 fade-up"><span>Get In Touch</span></div>
            <h2 className="font-display text-5xl lg:text-6xl leading-tight mb-8 fade-up" style={{ transitionDelay: '.1s' }}>
              Let's find you<br /><span className="italic text-gold/90">the right plot.</span>
            </h2>
            <p className="text-cream/70 leading-relaxed mb-10 max-w-md fade-up" style={{ transitionDelay: '.2s' }}>
              Share a few details and our team will call you within one business hour with a tailored shortlist.
            </p>
            <div className="space-y-6 fade-up stagger" style={{ transitionDelay: '.3s' }}>
              <a href="tel:+917416416416" className="flex items-start gap-4 group" style={{ '--i': 0 }}>
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-bg transition-all duration-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 5a2 2 0 0 1 2-2h3l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div>
                  <div className="text-xs text-cream/50 uppercase tracking-wider mb-1">Call</div>
                  <div className="font-display text-xl group-hover:text-gold transition">+91 74164 16416</div>
                </div>
              </a>
              <a href="mailto:info@mugdharealty.com" className="flex items-start gap-4 group" style={{ '--i': 1 }}>
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-bg transition-all duration-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div>
                  <div className="text-xs text-cream/50 uppercase tracking-wider mb-1">Email</div>
                  <div className="font-display text-xl group-hover:text-gold transition">info@mugdharealty.com</div>
                </div>
              </a>
              <div className="flex items-start gap-4" style={{ '--i': 2 }}>
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s-8-7-8-13a8 8 0 1 1 16 0c0 6-8 13-8 13z" stroke="#c9a961" strokeWidth="1.5"/><circle cx="12" cy="9" r="2.5" stroke="#c9a961" strokeWidth="1.5"/></svg>
                </div>
                <div>
                  <div className="text-xs text-cream/50 uppercase tracking-wider mb-1">Office</div>
                  <div className="text-cream/90 leading-relaxed">5th floor, Sri Chandra's Infinitum,<br />Plot 44, Gachibowli, Hyderabad — 500032</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="fade-up p-8 lg:p-10 rounded-3xl bg-bg border border-gold/20" style={{ transitionDelay: '.2s' }}>
            <div className="space-y-5">
              <Field label="Full Name"><input required type="text" placeholder="Your name" className={inpCls} /></Field>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Phone"><input required type="tel" placeholder="+91" className={inpCls} /></Field>
                <Field label="Email"><input type="email" placeholder="you@email.com" className={inpCls} /></Field>
              </div>
              <Field label="Interested In">
                <select className={inpCls}>
                  <option className="bg-bg">Magnus Smart City</option>
                  <option className="bg-bg">MIRAI</option>
                  <option className="bg-bg">Marvel Smart City</option>
                  <option className="bg-bg">Not sure — need guidance</option>
                </select>
              </Field>
              <div>
                <label className="block text-xs text-cream/60 uppercase tracking-wider mb-2">Budget Range</label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {budgets.map(b => (
                    <button
                      type="button" key={b} onClick={() => setBudget(b)}
                      className={`px-4 py-2 border rounded-full text-xs transition-all duration-300 ${budget === b ? 'bg-gold text-bg border-gold' : 'border-gold/20 hover:border-gold'}`}
                    >{b}</button>
                  ))}
                </div>
              </div>
              <Field label="Message (optional)">
                <textarea rows="3" placeholder="Anything we should know?" className={`${inpCls} resize-none`} />
              </Field>
            </div>
            <button type="submit" className="btn-primary mt-8 w-full py-4 bg-gold text-bg font-medium rounded-full flex items-center justify-center gap-2">
              <span>Request Callback</span>
              <svg className="arrow-slide" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            {msg && <p className="mt-4 text-center text-sm text-gold">{msg}</p>}
            <p className="mt-4 text-center text-xs text-cream/40">We respect your privacy. Zero spam, ever.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

const inpCls = 'w-full bg-transparent border-b border-gold/20 py-3 text-cream focus:outline-none focus:border-gold transition-all duration-300';
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs text-cream/60 uppercase tracking-wider mb-2">{label}</label>
      {children}
    </div>
  );
}
