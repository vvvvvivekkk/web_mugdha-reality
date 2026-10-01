# Mugdha Realty — Concept Redesign

Cinematic spec-pitch website for Mugdha Realty (Hyderabad villa-plot developer,
mugdharealty.com), built to win them as a freelance client. The signature
feature: the site opens on an AI-generated drone film of a villa being built
on red Deccan earth, **scrubbed by scroll** — scroll down and it builds,
scroll up and it un-builds.

## Stack

- React 19 + TypeScript (strict) + Vite 6
- TailwindCSS 3 (config in `tailwind.config.js`; custom colors: bg/bg2/bg3,
  cream, gold, goldDim, sage, muted)
- Fonts: Fraunces (display serif), Great Vibes (script), Inter (body) — all
  via Google Fonts in `index.html`
- No animation libraries. All motion is scroll-position driven vanilla code.
  **Never add Lenis or any scroll-hijack library** — it broke scrolling
  inside embedded preview frames and was deliberately removed.

## Commands

```bash
npm run dev        # localhost:5173
npm run build      # tsc --noEmit gate, then vite build → dist/
npm run typecheck  # types only
```

The build FAILS on type errors by design. Keep it that way.

## Architecture

The site is a sequence of full-bleed "chapters" (design language copied from
a reference IG reel: huge Great Vibes script word over a full-screen image,
serif prefix line, SCROLL TO EXPLORE compass, floating glass card).

```
src/
  App.tsx                      section order lives here
  components/
    Chapter.tsx                base full-bleed chapter (typed props)
    Compass.tsx  Nav.tsx  Loader.tsx  Footer.tsx
    chapters/
      ScrollVideo.tsx          ★ the scroll-scrubbed opening film
      ApprovedChapter.tsx      HMDA/RERA (script word "approved.")
      LocatedChapter.tsx       connectivity ("located.")
      AmenitiesChapter.tsx     35+ amenities ("inside.")
      OwnedChapter.tsx         3 project cards ("owned.")
      FinancedChapter.tsx      EMI calculator ("financed.")
      TrustedChapter.tsx       testimonials ("trusted.")
      ContactedChapter.tsx     contact form ("contacted.")
  hooks/
    useReveal.ts               IntersectionObserver reveals + text splits + counters
    useScrollProgress.ts       top progress bar + nav blur state
    useSmoothScroll.ts         native anchor smooth-scroll (no library)
    useTilt.ts                 3D mouse tilt for cards
  lib/images.ts                real mugdharealty.com photo URLs + local fallback
public/
  video/build.mp4              scrub-ready film (ALL-INTRA, no audio)
  video/poster.jpg             instant first paint
  img/*.jpg                    generated placeholder stills (fallbacks)
```

## The scroll-video system (ScrollVideo.tsx)

- Section is 400vh; a sticky 100vh child pins the `<video>`
- rAF loop: damped scroll progress → `video.currentTime = p * duration`
- `PHASES` array maps progress → overlay words
  (the land. / poured. / raised. / home.) — tune the `at` values there
- Poster `<img>` paints instantly; video fades in on
  loadedmetadata/loadeddata/canplay with a 4s fallback. NEVER gate the
  page on the video download.

**Video encoding rule:** any clip used for scrubbing MUST be re-encoded
all-intra or seeking stutters:

```bash
ffmpeg -i input.mp4 -an -c:v libx264 -g 1 -keyint_min 1 -crf 28 \
  -preset slow -pix_fmt yuv420p -movflags +faststart public/video/build.mp4
```

The raw Gemini original lives at repo root
(`gemini_generated_video_bb35f24f.mp4`) — source material only, never
referenced by the site directly.

## Paths rule

Vite `base` is `'./'` and ALL asset references in components are relative
(`img/...`, `video/...` — no leading slash). This keeps the build working
when served from a subpath (artifact preview). Don't use absolute `/img/...`
paths.

## Data accuracy

Project facts (Magnus Smart City 75+ ac / RERA P02400010251 / connectivity
timings, MIRAI 6.3 ac, Marvel 100+ ac, phone +91 74164 16416, Gachibowli
address) were scraped from mugdharealty.com — keep them real. Testimonials
and prices marked "From ₹…" are illustrative spec-pitch content. The fixed
"Concept redesign" badge (bottom-left, in App.tsx) must stay — it marks
this as unaffiliated spec work.

## Deploy

Cloudflare Pages: Framework Vite · build `npm run build` · output `dist`.
