import { useEffect, useRef, type ReactNode } from 'react';
import Compass from './Compass';

interface ChapterProps {
  id: string;
  bg: string;
  bgRemote?: string;        // optional live photo URL layered over the local fallback
  prefix?: string;
  script: string;
  prefixAlign?: 'before' | 'after';
  body?: ReactNode;
  bodyPos?: 'left' | 'right';
  rightSlot?: ReactNode;    // JSX for the floating card
  showCompass?: boolean;
  compassLabel?: string;
}

/**
 * Full-bleed cinematic chapter — the Abhay-reel pattern.
 * - A background image fills the viewport
 * - A huge script word anchors the left side ("procurement", "building", ...)
 * - A small serif prefix precedes it ("we build", "we handle", ...)
 * - A SCROLL TO EXPLORE compass sits center
 * - A paragraph lives in the right lower area
 * - An optional floating card can be placed in the bottom-right
 */
export default function Chapter({
  id,
  bg,
  bgRemote,
  prefix,
  script,
  prefixAlign = 'before',
  body,
  bodyPos = 'right',
  rightSlot,
  showCompass = true,
  compassLabel = 'Scroll to explore',
}: ChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const bgImage = bgRemote ? `url('${bgRemote}'), url('${bg}')` : `url('${bg}')`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) el.classList.add('in');
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="chapter-section">
      <div className="chapter-bg" style={{ backgroundImage: bgImage }} />
      <div className="chapter-overlay" />

      <div className="relative w-full h-screen flex flex-col justify-between py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex-1 flex flex-col justify-center">
          {prefixAlign === 'before' && prefix && (
            <span className="chapter-prefix italic text-cream/90 mb-2">{prefix}</span>
          )}
          <div className="chapter-script">{script}</div>
          {prefixAlign === 'after' && prefix && (
            <span className="chapter-prefix italic text-cream/90 mt-4">{prefix}</span>
          )}
        </div>

        {/* Compass (center) */}
        {showCompass && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Compass label={compassLabel} />
          </div>
        )}

        {/* Right-side body + optional floating card */}
        {(body || rightSlot) && (
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
              <div className={`chapter-body max-w-md ${bodyPos === 'right' ? 'lg:ml-auto lg:text-right' : ''}`}>
                {body && <div className="text-cream/80 leading-relaxed">{body}</div>}
              </div>
              {rightSlot && <div className="chapter-body">{rightSlot}</div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
