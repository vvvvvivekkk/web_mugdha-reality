import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * ConstructionChapter — the "zero to hero" drone shot.
 *
 * A 500vh pinned section. Scroll progress scrubs a procedurally drawn
 * aerial scene of Magnus Smart City BUILDING ITSELF under a slowly
 * descending drone camera:
 *
 *   0.00–0.14  bare land, morning haze            — "the land."
 *   0.12–0.30  gold survey lines draw across      — "surveyed."
 *   0.27–0.48  roads pave themselves in           — "connected."
 *   0.44–0.72  plots rise one by one (cranes+dust)— "built."
 *   0.68–0.84  clubhouse, pool, trees arrive      — "finished."
 *   0.82–1.00  dusk falls, every window lights up — "alive."
 *
 * All canvas, no video assets. Progress is damped for a buttery scrub.
 */

const PHASES = [
  { at: 0.0, prefix: 'Land you can hold. Trust you can see.', word: 'the land.' },
  { at: 0.14, prefix: 'every yard', word: 'surveyed.' },
  { at: 0.3, prefix: 'every road', word: 'connected.' },
  { at: 0.48, prefix: 'every plot', word: 'built.' },
  { at: 0.7, prefix: 'every detail', word: 'finished.' },
  { at: 0.85, prefix: 'one address,', word: 'alive.' },
];

// Seeded rng so the scene is identical every visit
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smooth = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };
const phase = (p, a, b) => smooth((p - a) / (b - a));

function buildScene() {
  const rand = rng(1337); // constant seed — identical scene every visit
  const W = 1600, H = 1000;

  // Main S-curve road across the scene + two branches
  const roadPts = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    roadPts.push({
      x: t * W,
      y: H * 0.42 + Math.sin(t * Math.PI * 1.7 + 0.6) * H * 0.07,
    });
  }
  const branchA = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    branchA.push({ x: W * 0.3 + t * W * 0.06, y: H * 0.40 + t * H * 0.55 });
  }
  const branchB = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    branchB.push({ x: W * 0.68 - t * W * 0.05, y: H * 0.40 + t * H * 0.55 });
  }

  // Survey lines (gold, dashed) — a loose grid
  const survey = [];
  for (let i = 0; i < 7; i++) {
    survey.push({ x1: 60 + i * 240, y1: H * 0.5, x2: 140 + i * 240, y2: H, o: i / 7 });
  }
  for (let j = 0; j < 5; j++) {
    survey.push({ x1: 0, y1: H * 0.52 + j * 110, x2: W, y2: H * 0.56 + j * 110, o: 0.3 + j / 8 });
  }

  // Plots — banded grid below the road, jittered
  const plots = [];
  let order = 0;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 11; col++) {
      if (rand() < 0.08) continue; // gaps keep it organic
      const x = 55 + col * 140 + rand() * 14;
      const y = H * 0.52 + row * 78 + rand() * 8;
      const w = 104 + rand() * 18;
      const h = 56 + rand() * 10;
      const base = 40 + Math.floor(rand() * 22);
      plots.push({
        x, y, w, h,
        tone: [base + 10, base + 5, base - 2],
        // wave order: sweeps from road outward, left to right
        thr: (col / 11) * 0.62 + (row / 6) * 0.3 + rand() * 0.08,
        pool: rand() < 0.14,
        win: [
          { dx: 0.25 + rand() * 0.2, dy: 0.3 + rand() * 0.3 },
          { dx: 0.6 + rand() * 0.25, dy: 0.35 + rand() * 0.3 },
        ],
      });
      order++;
    }
  }
  plots.sort((a, b) => a.thr - b.thr);

  // Amenity core — clubhouse + pool, upper right of the grid
  const core = { x: W * 0.47, y: H * 0.56, w: 150, h: 86 };

  // Trees
  const trees = [];
  for (let i = 0; i < 70; i++) {
    const nearRoad = rand() < 0.4;
    trees.push({
      x: rand() * W,
      y: nearRoad ? H * 0.44 + rand() * 30 : H * 0.5 + rand() * H * 0.5,
      r: 4 + rand() * 7,
      o: rand(),
      g: 40 + Math.floor(rand() * 30),
    });
  }

  // Street lamps along the main road
  const lamps = [];
  for (let i = 4; i < 100; i += 7) {
    lamps.push({ ...roadPts[i], o: i / 100 });
  }

  return { W, H, roadPts, branchA, branchB, survey, plots, core, trees, lamps };
}

function strokePartial(ctx, pts, k, style, width) {
  const n = Math.floor(pts.length * clamp01(k));
  if (n < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < n; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.strokeStyle = style;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.stroke();
}

export default function ConstructionChapter() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const targetP = useRef(0);
  const drawnP = useRef(-1);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const scene = useMemo(buildScene, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf, alive = true;

    // Pre-render terrain once
    const terrain = document.createElement('canvas');
    terrain.width = scene.W; terrain.height = scene.H;
    {
      const t = terrain.getContext('2d');
      const g = t.createLinearGradient(0, 0, 0, scene.H);
      g.addColorStop(0, '#2a2418');
      g.addColorStop(0.35, '#3a3222');
      g.addColorStop(0.65, '#453a28');
      g.addColorStop(1, '#241e14');
      t.fillStyle = g;
      t.fillRect(0, 0, scene.W, scene.H);
      const r = rng(777);
      for (let i = 0; i < 2600; i++) {
        t.fillStyle = `rgba(${90 + r() * 60},${80 + r() * 50},${50 + r() * 40},${0.05 + r() * 0.08})`;
        t.fillRect(r() * scene.W, r() * scene.H, 1 + r() * 3, 1 + r() * 2);
      }
      // dusty patches
      for (let i = 0; i < 14; i++) {
        t.fillStyle = `rgba(20,16,10,${0.08 + r() * 0.1})`;
        t.beginPath();
        t.ellipse(r() * scene.W, scene.H * 0.4 + r() * scene.H * 0.6, 60 + r() * 140, 30 + r() * 60, r() * 3, 0, 7);
        t.fill();
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      drawnP.current = -1; // force redraw
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      targetP.current = total > 0 ? scrolled / total : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let cur = 0;
    const draw = () => {
      if (!alive) return;
      cur += (targetP.current - cur) * 0.09; // damped scrub
      const p = Math.abs(cur - targetP.current) < 0.0004 ? targetP.current : cur;

      if (Math.abs(p - drawnP.current) > 0.0005) {
        drawnP.current = p;
        render(p);
        // phase word
        let idx = 0;
        for (let i = 0; i < PHASES.length; i++) if (p >= PHASES[i].at) idx = i;
        setPhaseIdx(idx);
      }
      raf = requestAnimationFrame(draw);
    };

    const render = (p) => {
      const { W, H } = scene;
      const cw = canvas.width, ch = canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      // Drone camera: descend + settle. Cover-fit the 1600x1000 scene.
      const zoom = 1.28 - 0.28 * smooth(p);            // high → settle
      const cover = Math.max(cw / W, ch / H) * zoom;
      const panY = (1 - smooth(p)) * H * 0.06;          // slight downward drift
      const driftX = Math.sin(p * Math.PI * 2) * W * 0.012; // gentle lateral float
      ctx.setTransform(cover, 0, 0, cover,
        cw / 2 - (W / 2 + driftX) * cover,
        ch / 2 - (H / 2 - panY) * cover);

      // 1 — terrain
      ctx.drawImage(terrain, 0, 0);

      // 2 — survey lines
      const ps = phase(p, 0.1, 0.3);
      if (ps > 0) {
        ctx.save();
        ctx.setLineDash([7, 9]);
        for (const l of scene.survey) {
          const k = clamp01((ps - l.o * 0.5) / 0.5);
          if (k <= 0) continue;
          ctx.globalAlpha = 0.4 * k;
          ctx.strokeStyle = '#c9a961';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(l.x1, l.y1);
          ctx.lineTo(l.x1 + (l.x2 - l.x1) * k, l.y1 + (l.y2 - l.y1) * k);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3 — roads pave in
      const pr = phase(p, 0.27, 0.48);
      if (pr > 0) {
        strokePartial(ctx, scene.roadPts, pr, '#1d1813', 30);
        strokePartial(ctx, scene.roadPts, pr, '#3c332a', 22);
        if (pr > 0.3) {
          strokePartial(ctx, scene.branchA, (pr - 0.3) / 0.7, '#1d1813', 20);
          strokePartial(ctx, scene.branchA, (pr - 0.3) / 0.7, '#3c332a', 14);
          strokePartial(ctx, scene.branchB, (pr - 0.3) / 0.7, '#1d1813', 20);
          strokePartial(ctx, scene.branchB, (pr - 0.3) / 0.7, '#3c332a', 14);
        }
        ctx.save();
        ctx.setLineDash([10, 14]);
        ctx.globalAlpha = 0.5;
        strokePartial(ctx, scene.roadPts, pr, '#c9a961', 1);
        ctx.restore();
      }

      // 4 — plots rise, with cranes + dust on the newest
      const pp = phase(p, 0.44, 0.72);
      if (pp > 0) {
        for (const pl of scene.plots) {
          const tp = clamp01((pp - pl.thr * 0.82) / 0.14);
          if (tp <= 0) continue;
          const s = 0.55 + 0.45 * smooth(tp);
          const cx = pl.x + pl.w / 2, cy = pl.y + pl.h / 2;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.scale(s, s);
          ctx.globalAlpha = smooth(tp);
          ctx.fillStyle = `rgb(${pl.tone[0]},${pl.tone[1]},${pl.tone[2]})`;
          ctx.fillRect(-pl.w / 2, -pl.h / 2, pl.w, pl.h);
          ctx.strokeStyle = 'rgba(10,8,6,0.85)';
          ctx.lineWidth = 1.4;
          ctx.strokeRect(-pl.w / 2, -pl.h / 2, pl.w, pl.h);
          ctx.strokeStyle = 'rgba(16,12,9,0.6)';
          ctx.beginPath();
          ctx.moveTo(-pl.w / 2 + 8, 0);
          ctx.lineTo(pl.w / 2 - 8, 0);
          ctx.stroke();
          if (pl.pool && tp > 0.7) {
            ctx.fillStyle = 'rgba(58,96,118,0.95)';
            ctx.fillRect(-pl.w / 2 + 12, -pl.h / 2 + 12, pl.w - 24, pl.h - 24);
          }
          ctx.restore();

          // construction dressing while the plot is appearing
          if (tp < 1) {
            ctx.save();
            ctx.globalAlpha = (1 - tp) * 0.9;
            // dust puff
            ctx.fillStyle = 'rgba(190,170,140,0.18)';
            ctx.beginPath();
            ctx.arc(cx, cy, pl.w * (0.5 + tp * 0.5), 0, 7);
            ctx.fill();
            // tiny crane: mast + jib
            ctx.strokeStyle = '#d8bb77';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx + pl.w * 0.32, cy);
            ctx.lineTo(cx + pl.w * 0.32, cy - 34);
            ctx.lineTo(cx - pl.w * 0.15, cy - 30);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx - pl.w * 0.15, cy - 30);
            ctx.lineTo(cx - pl.w * 0.15, cy - 16);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 5 — amenity core + trees
      const pc = phase(p, 0.66, 0.84);
      if (pc > 0) {
        const { core } = scene;
        ctx.save();
        ctx.globalAlpha = smooth(pc);
        // clubhouse
        ctx.fillStyle = '#5c4836';
        ctx.fillRect(core.x, core.y, core.w, core.h * 0.55);
        ctx.fillStyle = '#6e5844';
        ctx.fillRect(core.x, core.y, core.w, 12);
        ctx.strokeStyle = 'rgba(10,8,6,0.9)';
        ctx.strokeRect(core.x, core.y, core.w, core.h * 0.55);
        // pool
        ctx.fillStyle = '#2f5e7e';
        ctx.fillRect(core.x - 10, core.y + core.h * 0.62, core.w + 20, core.h * 0.5);
        ctx.fillStyle = '#3f7ba0';
        ctx.fillRect(core.x, core.y + core.h * 0.68, core.w, core.h * 0.38);
        ctx.strokeStyle = 'rgba(201,169,97,0.5)';
        ctx.strokeRect(core.x - 10, core.y + core.h * 0.62, core.w + 20, core.h * 0.5);
        ctx.restore();

        for (const tr of scene.trees) {
          const tt = clamp01((pc - tr.o * 0.6) / 0.4);
          if (tt <= 0) continue;
          ctx.save();
          ctx.globalAlpha = 0.85 * smooth(tt);
          ctx.fillStyle = `rgb(${tr.g - 14},${tr.g + 8},${tr.g - 18})`;
          ctx.beginPath();
          ctx.arc(tr.x, tr.y, tr.r * smooth(tt), 0, 7);
          ctx.fill();
          ctx.restore();
        }
      }

      // 6 — dusk falls, lights come alive
      const pn = phase(p, 0.8, 1.0);
      if (pn > 0) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const night = ctx.createLinearGradient(0, 0, 0, ch);
        night.addColorStop(0, `rgba(8,12,34,${0.68 * pn})`);
        night.addColorStop(1, `rgba(4,5,16,${0.78 * pn})`);
        ctx.fillStyle = night;
        ctx.fillRect(0, 0, cw, ch);
        ctx.restore();

        // relight in scene space
        ctx.save();
        const cover2 = Math.max(cw / W, ch / H) * (1.28 - 0.28 * smooth(p));
        ctx.setTransform(cover2, 0, 0, cover2,
          cw / 2 - (W / 2 + Math.sin(p * Math.PI * 2) * W * 0.012) * cover2,
          ch / 2 - (H / 2 - (1 - smooth(p)) * H * 0.06) * cover2);

        for (const lamp of scene.lamps) {
          const lt = clamp01((pn - lamp.o * 0.5) / 0.3);
          if (lt <= 0) continue;
          ctx.globalAlpha = lt;
          ctx.fillStyle = 'rgba(255,224,160,0.16)';
          ctx.beginPath(); ctx.arc(lamp.x, lamp.y, 16, 0, 7); ctx.fill();
          ctx.fillStyle = '#ffe3a1';
          ctx.beginPath(); ctx.arc(lamp.x, lamp.y, 2.4, 0, 7); ctx.fill();
        }
        for (const pl of scene.plots) {
          const wt = clamp01((pn - pl.thr * 0.55) / 0.35);
          if (wt <= 0) continue;
          for (const wdw of pl.win) {
            ctx.globalAlpha = wt;
            ctx.fillStyle = 'rgba(255,210,140,0.2)';
            ctx.beginPath();
            ctx.arc(pl.x + pl.w * wdw.dx, pl.y + pl.h * wdw.dy, 6, 0, 7);
            ctx.fill();
            ctx.fillStyle = '#ffd28c';
            ctx.fillRect(pl.x + pl.w * wdw.dx - 1.6, pl.y + pl.h * wdw.dy - 1.6, 3.2, 3.2);
          }
        }
        // pool glow
        const { core } = scene;
        ctx.globalAlpha = pn;
        ctx.fillStyle = 'rgba(90,180,220,0.14)';
        ctx.beginPath();
        ctx.arc(core.x + core.w / 2, core.y + core.h * 0.85, 70, 0, 7);
        ctx.fill();
        ctx.restore();
      }

      // vignette
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const v = ctx.createRadialGradient(cw / 2, ch / 2, Math.min(cw, ch) * 0.35, cw / 2, ch / 2, Math.max(cw, ch) * 0.75);
      v.addColorStop(0, 'rgba(10,9,8,0)');
      v.addColorStop(1, 'rgba(10,9,8,0.55)');
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, cw, ch);
      ctx.restore();
    };

    raf = requestAnimationFrame(draw);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
    };
  }, [scene]);

  const ph = PHASES[phaseIdx];

  return (
    <section id="top" ref={sectionRef} style={{ height: '500vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Brand chip + approvals, top-left under nav */}
        <div className="absolute top-24 left-6 lg:left-10 pointer-events-none">
          <div className="section-label left"><span>HMDA · RERA P02400010251 · Est. 2016</span></div>
        </div>

        {/* Phase words — crossfade on change */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <span key={`p${phaseIdx}`} className="block font-display italic text-cream/90 mb-2 animate-[wordUp_.8s_cubic-bezier(.2,.8,.2,1)]"
              style={{ fontSize: 'clamp(1.3rem,2.6vw,2.2rem)' }}>
              {ph.prefix}
            </span>
            <span key={`w${phaseIdx}`} className="block font-script text-cream animate-[wordUp_1s_cubic-bezier(.2,.8,.2,1)]"
              style={{ fontSize: 'clamp(4.5rem,13vw,12rem)', lineHeight: 0.9, textShadow: '0 4px 40px rgba(0,0,0,.45)' }}>
              {ph.word}
            </span>
          </div>
        </div>

        {/* Phase progress rail */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
          {PHASES.map((_, i) => (
            <div key={i} className={`w-px h-10 transition-colors duration-500 ${i <= phaseIdx ? 'bg-gold' : 'bg-gold/20'}`} />
          ))}
        </div>

        {/* Caption bottom-right */}
        <div className="absolute bottom-10 right-6 lg:right-10 max-w-xs text-right">
          <p className="text-xs text-cream/60 leading-relaxed">
            Magnus Smart City — 75 acres taking shape on the Bangalore Highway.
            Keep scrolling: the township builds itself.
          </p>
        </div>

        {/* Scroll hint — fades once the journey starts */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-cream/50 transition-opacity duration-700"
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
      </div>
    </section>
  );
}
