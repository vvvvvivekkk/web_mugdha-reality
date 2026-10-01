const items = [
  'HMDA Approved', 'RERA P02400010251', 'Clear Title Deed', 'Vastu Compliant',
  'Gated Community', '24/7 CCTV Security', 'Smart Infrastructure',
];

const Row = () => (
  <div className="flex items-center gap-16 px-8 text-cream/50 font-display text-xl lg:text-2xl italic shrink-0">
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-16">
        {item}
        <span className="text-gold">·</span>
      </span>
    ))}
  </div>
);

export default function TrustMarquee() {
  return (
    <section id="approvals" className="py-10 border-y border-gold/10 overflow-hidden bg-bg2">
      <div className="flex marquee-track whitespace-nowrap">
        <Row />
        <Row />
      </div>
    </section>
  );
}
