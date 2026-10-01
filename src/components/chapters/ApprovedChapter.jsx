import Chapter from '../Chapter';

export default function ApprovedChapter() {
  return (
    <Chapter
      id="approved"
      bg="img/magnus-day.jpg"
      prefix="we deliver land"
      script="approved."
      body={
        <p>
          Every Mugdha layout receives HMDA or RERA approval before a single plot is sold.
          Zero disputes across 500 titles. We don't open bookings on land we don't fully own.
        </p>
      }
      rightSlot={
        <div className="listing-card rounded-2xl p-5 w-72">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-gold/20 text-gold text-[10px] tracking-wider uppercase">HMDA</span>
            <span className="px-2.5 py-1 rounded-full bg-gold/20 text-gold text-[10px] tracking-wider uppercase">RERA</span>
          </div>
          <div className="font-display text-xl mb-1">Magnus Smart City</div>
          <div className="text-xs text-cream/60 mb-4">Registration · P02400010251</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div><div className="font-display text-lg text-gold">75+</div><div className="text-[9px] uppercase tracking-wider text-cream/50">acres</div></div>
            <div><div className="font-display text-lg text-gold">500+</div><div className="text-[9px] uppercase tracking-wider text-cream/50">families</div></div>
            <div><div className="font-display text-lg text-gold">0</div><div className="text-[9px] uppercase tracking-wider text-cream/50">disputes</div></div>
          </div>
        </div>
      }
    />
  );
}
