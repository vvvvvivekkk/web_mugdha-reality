import { useEffect, useRef, useState } from 'react';

/**
 * ScrollVideo — the zero-to-hero opening shot.
 *
 * A 400vh pinned section. The AI-generated drone film (bare Deccan land →
 * foundations & mixers → crane raising walls → finished villa with pool)
 * is scrubbed by scroll: video.currentTime = scrollProgress × duration,
 * with damping so the scrub feels like drone footage, not a slider.
 * The video is encoded all-intra (every frame a keyframe) so seeking is
 * frame-accurate and instant.
 */

const PHASES = [
  { at: 0.0, prefix: 'Land you can hold. Trust you can see.', word: 'the land.' },
  { at: 0.18, prefix: 'every foundation', word: 'poured.' },
  { at: 0.45, prefix: 'every wall', word: 'raised.' },
  { at: 0.78, prefix: 'one address,', word: 'home.' },
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetP = useRef(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf = 0, alive = true, cur = 0;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      targetP.current = total > 0 ? clamp01(scrolled / total) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onLoaded = () => setReady(true);
    video.addEventListener('loadeddata', onLoaded);
    // iOS: a muted inline play–pause unlocks programmatic seeking
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('touchstart', unlock, { once: true, passive: true });

    const tick = () => {
      if (!alive) return;
      cur += (targetP.current - cur) * 0.12; // damped — drone-footage feel
      const p = Math.abs(cur - targetP.current) < 0.0005 ? targetP.current : cur;

      const d = video.duration;
      if (d && isFinite(d)) {
        const t = p * Math.max(0, d - 0.05);
        if (Math.abs(video.currentTime - t) > 0.02) {
          video.currentTime = t;
        }
      }
      let idx = 0;
      for (let i = 0; i < PHASES.length; i++) if (p >= PHASES[i].at) idx = i;
      setPhaseIdx(idx);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadeddata', onLoaded);
      window.removeEventListener('touchstart', unlock);
    };
  }, []);

  const ph = PHASES[phaseIdx];

  return (
    <section id="top" ref={sectionRef} style={{ height: '400vh' }} className="relative bg-bg">
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src="video/build.mp4"
          poster="video/poster.jpg"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Cinematic grade overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.05) 30%, rgba(10,9,8,0.05) 60%, rgba(10,9,8,0.72) 100%),' +
              'linear-gradient(90deg, rgba(10,9,8,0.5) 0%, rgba(10,9,8,0) 45%)',
          }}
        />

        {/* Approvals chip, under nav */}
        <div className="absolute top-24 left-6 lg:left-10 pointer-events-none">
          <div className="section-label left"><span>HMDA · RERA P02400010251 · Est. 2016</span></div>
        </div>

        {/* Phase words */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <span
              key={`p${phaseIdx}`}
              className="block font-display italic text-cream/95 mb-2"
              style={{
                fontSize: 'clamp(1.3rem,2.6vw,2.2rem)',
                animation: 'wordUp .8s cubic-bezier(.2,.8,.2,1) both',
                textShadow: '0 2px 24px rgba(0,0,0,.6)',
              }}
            >
              {ph.prefix}
            </span>
            <span
              key={`w${phaseIdx}`}
              className="block font-script text-cream"
              style={{
                fontSize: 'clamp(4.5rem,13vw,12rem)',
                lineHeight: 0.9,
                animation: 'wordUp 1s cubic-bezier(.2,.8,.2,1) both',
                textShadow: '0 4px 44px rgba(0,0,0,.55)',
              }}
            >
              {ph.word}
            </span>
          </div>
        </div>

        {/* Phase progress rail */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
          {PHASES.map((_, i) => (
            <div key={i} className={`w-px h-12 transition-colors duration-500 ${i <= phaseIdx ? 'bg-gold' : 'bg-gold/20'}`} />
          ))}
        </div>

        {/* Caption bottom-right */}
        <div className="absolute bottom-10 right-6 lg:right-10 max-w-xs text-right pointer-events-none">
          <p className="text-xs text-cream/70 leading-relaxed" style={{ textShadow: '0 1px 12px rgba(0,0,0,.7)' }}>
            Magnus Smart City — from first survey peg to handover,
            on the Bangalore Highway. Scroll to build.
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-cream/60 transition-opacity duration-700"
          style={{ opacity: phaseIdx === 0 ? 1 : 0 }}
        >
          <span>Scroll to build</span>
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
            <rect x="1" y="1" width="12" height="22" rx="6" stroke="currentColor" />
            <circle cx="7" cy="7" r="1.5" fill="currentColor">
              <animate attributeName="cy" from="7" to="17" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Loading shimmer until first frame decodes */}
        {!ready && (
          <div className="absolute inset-0 bg-bg flex items-center justify-center">
            <div className="loader-mark" />
          </div>
        )}
      </div>
    </section>
  );
}
