import { useEffect, useRef, useState } from 'react';

function inr(n) {
  n = Math.round(n);
  const s = String(n);
  if (s.length <= 3) return '₹' + s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return '₹' + rest + ',' + last3;
}

export default function FinancedChapter() {
  const [plot, setPlot] = useState(2500000);
  const [downPct, setDownPct] = useState(30);
  const [tenure, setTenure] = useState(15);
  const [rate, setRate] = useState(8.75);
  const [emi, setEmi] = useState(17381);
  const lastRef = useRef(17381);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) el.classList.add('in'); });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const P = plot * (1 - downPct / 100);
    const r = (rate / 100) / 12;
    const n = tenure * 12;
    const target = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const start = lastRef.current;
    const dur = 400, t0 = performance.now();
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const val = start + (target - start) * (1 - Math.pow(1 - t, 3));
      setEmi(val);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    lastRef.current = target;
    return () => cancelAnimationFrame(raf);
  }, [plot, downPct, tenure, rate]);

  return (
    <section id="financed" ref={ref} className="chapter-section">
      <div className="chapter-bg" style={{ backgroundImage: "url('img/bg.jpg')" }} />
      <div className="chapter-overlay" />

      <div className="relative w-full h-screen flex flex-col justify-between py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col justify-center">
          <span className="chapter-prefix italic text-cream/90 mb-2">we help you get</span>
          <div className="chapter-script">financed.</div>
        </div>

        {/* Floating EMI card */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
            <div className="chapter-body max-w-sm text-cream/80">
              Loans up to 70% of plot value with HDFC, SBI, LIC Housing &amp; ICICI.
              Pre-approvals in 72 hours. End-to-end documentation.
            </div>
            <div className="chapter-body listing-card rounded-2xl p-6 w-full max-w-md">
              <div className="flex justify-between items-baseline mb-5">
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-cream/60 mb-1">Monthly EMI</div>
                  <div className="font-display text-4xl gold-text">{inr(emi)}</div>
                </div>
                <a href="#contacted" className="text-xs text-gold link-hover">Pre-approve me →</a>
              </div>
              <Slider label="Plot" value={inr(plot)} min={500000} max={10000000} step={100000} val={plot} onChange={setPlot} />
              <Slider label="Down" value={`${downPct}%`} min={10} max={60} step={5} val={downPct} onChange={setDownPct} />
              <Slider label="Tenure" value={`${tenure}y`} min={5} max={20} step={1} val={tenure} onChange={setTenure} />
              <Slider label="Rate" value={`${rate.toFixed(2)}%`} min={7} max={12} step={0.25} val={rate} onChange={setRate} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step, val, onChange }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[11px] uppercase tracking-wider text-cream/60">{label}</span>
        <span className="text-xs text-gold font-medium">{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val} onChange={e => onChange(+e.target.value)} />
    </div>
  );
}
