# Mugdha Realty — Concept Redesign

A cinematic React 19 + Vite spec redesign of mugdharealty.com, built as a pitch asset.

## Stack

- React 19
- Vite 6
- TailwindCSS 3
- Lenis (smooth scroll)
- Vanilla JS for animations — no GSAP/Framer bloat

## Scripts

```bash
npm install
npm run dev      # localhost:5173
npm run build    # production build to dist/
npm run preview  # preview dist/
```

## Deploy to Cloudflare Pages

1. Push to GitHub (already done).
2. In Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Select repo `vvvvvivekkk/web_mugdha-reality`.
4. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy. Done — you get `*.pages.dev` URL instantly.

## Structure

```
src/
  components/
    Loader.jsx          — branded entrance
    Nav.jsx             — fixed, blur-on-scroll
    Hero.jsx            — Ken-Burns + word-split reveal
    TrustMarquee.jsx    — HMDA/RERA strip
    Flagship.jsx        — pinned 4-chapter scroll (image crossfades)
    AmenityMarquee.jsx  — 20 amenities, infinite marquee
    Projects.jsx        — 3D tilt cards
    Connectivity.jsx    — stylized map + pins
    EMI.jsx             — calculator with tweened output
    Testimonials.jsx    — auto-rotating carousel
    Story.jsx
    Contact.jsx         — form with budget chips
    Footer.jsx
  hooks/
    useSmoothScroll.js  — Lenis setup + anchor hijack
    useReveal.js        — IntersectionObserver + text splits + counters
    useScrollProgress.js — top progress bar + nav state
    useTilt.js          — mouse-driven 3D tilt
```

## Images

Placeholder atmospheric images are in `public/img/`. Swap these with real drone photography when ready — same filenames, no code changes needed.

## Disclaimer

This is a concept redesign built as a spec pitch — not affiliated with Mugdha Realty. The "Concept redesign" badge in the bottom-left of every page keeps that explicit.
