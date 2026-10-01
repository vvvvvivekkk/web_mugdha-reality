export default function Story() {
  return (
    <section id="story" className="py-24 lg:py-36 relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="section-label mb-6 fade-up" style={{ justifyContent: 'center' }}><span>Our Story</span></div>
        <h2 className="font-display text-5xl lg:text-7xl leading-[1.05] mb-10 fade-up" style={{ transitionDelay: '.1s' }}>
          We started in 2016 with one belief —
          <span className="italic text-gold/90"> land ownership should be a joy, not a gamble.</span>
        </h2>
        <div className="hairline w-32 mx-auto mb-10 fade-up" style={{ transitionDelay: '.2s' }} />
        <p className="text-lg text-cream/70 leading-relaxed max-w-3xl mx-auto fade-up" style={{ transitionDelay: '.3s' }}>
          Eight years in, we've delivered 500+ plots across three ongoing communities and six completed layouts. Every one approved. Every one documented. Every one handed over on time. The Hyderabad real estate market has given us many lessons; the one we keep coming back to is this: <span className="italic text-cream">trust compounds, and so does doubt.</span> We choose to build the first.
        </p>
      </div>
    </section>
  );
}
