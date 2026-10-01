import ProjectCard from './ProjectCard';

const projects = [
  {
    name: 'Magnus Smart City',
    img: '/img/magnus.jpg',
    status: 'Phase 1 · Live',
    dotColor: 'bg-green-400',
    locLine: 'Bangalore Highway · 75+ acres',
    chips: ['HMDA', 'RERA', 'From ₹18.5L'],
    description: 'A 75-acre integrated smart township with 35+ amenities, HMDA + RERA approved. Phase 1 (16.31 ac) is live.',
    points: [
      'Rameshwaram, Near Shadnagar',
      '153 to 582 sq. yards',
      '3 min from NH-44',
      'Clubhouse, pool, co-working, more',
    ],
    cta: 'View details',
  },
  {
    name: 'MIRAI',
    img: '/img/hero3.jpg',
    status: 'Selling fast',
    dotColor: 'bg-amber-400',
    locLine: 'Shadnagar · 6.3 acres',
    chips: ['HMDA', 'Boutique', 'From ₹12L'],
    description: 'A boutique 6.3-acre residential layout near Rameshwaram Temple in Shadnagar — smart infrastructure, Vastu-compliant plots, high-growth corridor.',
    points: [
      'HMDA approved',
      '24/7 CCTV security',
      'Vastu-compliant layouts',
      'Shadnagar growth corridor',
    ],
    cta: 'View details',
  },
  {
    name: 'Marvel Smart City',
    img: '/img/magnus-night.jpg',
    status: 'Pre-launch',
    dotColor: 'bg-sage',
    locLine: 'Srisailam Highway · 100+ acres',
    chips: ['Township', 'Mixed-use', 'Reg. open'],
    description: 'Our most ambitious release — a 100+ acre integrated township on the fast-growing Srisailam Highway. Early-bird registrations open.',
    points: [
      'Residential + commercial',
      'Pre-launch benefit pricing',
      'Srisailam Hwy corridor',
      'Launch Q2 FY26',
    ],
    cta: 'Register interest',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="section-label left mb-6 fade-up"><span>Our Portfolio</span></div>
            <h2 className="font-display text-5xl lg:text-7xl leading-[1.02] max-w-2xl fade-up" style={{ transitionDelay: '.1s' }}>
              Three communities.<br /><span className="italic text-gold/90">One standard.</span>
            </h2>
          </div>
          <p className="text-cream/60 max-w-md fade-up" style={{ transitionDelay: '.2s' }}>
            Every Mugdha layout is approved before we break ground. Nothing we don't fully own gets a booking receipt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {projects.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
        </div>

        <div className="mt-10 text-center fade-up">
          <p className="text-sm text-cream/40 italic">6 completed · 3 ongoing · 1 upcoming — a track record you can walk through.</p>
        </div>
      </div>
    </section>
  );
}
