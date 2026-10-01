import { useEffect, useRef, useState } from 'react';

function inr(n) {
  n = Math.round(n);
  const s = String(n);
  if (s.length <= 3) return '₹' + s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return '₹' + rest + ',' + last3;
}

export default function EMI() {
  const [plot, setPlot] = useState(2500000);
  const [downPct, setDownPct] = useState(30);
  const [tenure, setTenure] = useState(15);
  const [rate, setRate] = useState(8.75);

  const [emiDisplay, setEmiDisplay] = useState(17381);
  const lastRef = useRef(17381);

  useEffect(() => {
    const P = plot * (1 - downPct / 100);
    const r = (rate / 100) / 12;
    const n = tenure * 12;
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    // tween
    const start = lastRef.current;
    const dur = 400, t0 = performance.now();
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const val = start + (emi - start) * (1 - Math.pow(1 - t, 3));
      setEmiDisplay(val);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    lastRef.current = emi;
    return () => cancelAnimationFrame(raf);
  }, [plot, downPct, tenure, rate]);

  return (
    <section id="emi" className="py-24 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label left mb-6 fade-up"><span>Plan Your Purchase</span></div>
            <h2 className="font-display text-5xl lg:text-6xl leading-tight mb-6 fade-up" style={{ transitionDelay: '.1s' }}>
              Know what you'll pay.<br />
              <span className="italic text-gold/90">Before you commit.</span>
            </h2>
            <p className="text-cream/70 leading-relaxed mb-8 max-w-md fade-up" style={{ transitionDelay: '.2s' }}>
              Our in-house finance team works with HDFC, SBI, LIC Housing & ICICI to pre-approve plot loans in as little as 72 hours.
            </p>
            <div className="space-y-3 text-sm text-cream/70 fade-up stagger" style={{ transitionDelay: '.3s' }}>
              {['Loans up to 70% of plot value', 'Tenure up to 20 years', 'No prepayment penalty on floating rate', 'End-to-end documentation support'].map((x, i) => (
                <div key={x} className="flex gap-3" style={{ '--i': i }}><span className="text-gold">✓</span>{x}</div>
              ))}
            </div>
          </div>

          <div className="fade-up p-8 lg:p-10 rounded-3xl border border-gold/20 bg-gradient-to-br from-bg2 to-bg" style={{ transitionDelay: '.3s' }}>
            <h3 className="font-display text-2xl mb-8">EMI Calculator</h3>
            <div className="space-y-7">
              <Slider label="Plot Value" value={inr(plot)} min={500000} max={10000000} step={100000} val={plot} onChange={setPlot} legend={['₹5L', '₹1Cr']} />
              <Slider label="Down Payment" value={`${inr(plot * downPct / 100)} (${downPct}%)`} min={10} max={60} step={5} val={downPct} onChange={setDownPct} legend={['10%', '60%']} />
              <Slider label="Tenure" value={`${tenure} years`} min={5} max={20} step={1} val={tenure} onChange={setTenure} legend={['5 yr', '20 yr']} />
              <Slider label="Interest" value={`${rate.toFixed(2)}%`} min={7} max={12} step={0.25} val={rate} onChange={setRate} legend={['7%', '12%']} />
            </div>
            <div className="mt-10 pt-8 border-t border-gold/15 flex items-end justify-between">
              <div>
                <div className="text-xs text-cream/60 uppercase tracking-wider mb-2">Your monthly EMI</div>
                <div className="font-display text-5xl gold-text">{inr(emiDisplay)}</div>
              </div>
              <a href="#contact" className="link-hover inline-flex items-center gap-2 px-5 py-3 border border-gold/40 rounded-full text-sm hover:bg-gold hover:text-bg transition">
                <span>Pre-approve me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step, val, onChange, legend }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-xs text-cream/60 uppercase tracking-wider">{label}</label>
        <span className="font-display text-xl text-gold">{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val} onChange={e => onChange(+e.target.value)} />
      <div className="flex justify-between text-[10px] text-cream/40 mt-1"><span>{legend[0]}</span><span>{legend[1]}</span></div>
    </div>
  );
}
