// Real Mugdha Realty photos (hotlinked from their live site).
// Each entry pairs the remote original with a local fallback that ships
// in /public/img — CSS multi-background means the remote paints on top
// when reachable, and the local placeholder shows anywhere it is blocked.
export const REAL = {
  hero1: 'https://mugdharealty.com/images/hero_carousel/1.jpg',
  hero2: 'https://mugdharealty.com/images/hero_carousel/2.jpg',
  hero3: 'https://mugdharealty.com/images/hero_carousel/3.jpg',
  magnus4k: 'https://mugdharealty.com/images/projects/magnus/1.jpg',
};

/** CSS background-image stack: remote first (paints on top), local fallback under it. */
export function bgStack(remote: string, local: string): string {
  return `url('${remote}'), url('${local}')`;
}
