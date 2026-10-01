import Chapter from '../Chapter';

const topAmenities = [
  'Swimming Pool', 'Clubhouse', 'Sky Lounge', 'Mini Theater',
  'Gym & Spa', 'Multi-sports Zone', 'Meditation Center', 'EV Charging',
  'Temple', 'Kids Play Area', 'Pet Zone', 'Co-working',
];

export default function AmenitiesChapter() {
  return (
    <Chapter
      id="amenities"
      bg="img/magnus-detail.jpg"
      prefix="we design what's"
      script="inside."
      body={
        <p>
          Thirty-five amenities across twenty acres — clubhouse, pool, sky lounge, mini theater,
          cricket, meditation, pet zones. A life, not a layout.
        </p>
      }
      rightSlot={
        <div className="listing-card rounded-2xl p-5 w-80">
          <div className="font-display text-xl mb-4">35+ Amenities</div>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-cream/80">
            {topAmenities.map(a => (
              <div key={a} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                {a}
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gold/20 text-[11px] text-cream/50 italic">
            ...plus 23 more
          </div>
        </div>
      }
    />
  );
}
