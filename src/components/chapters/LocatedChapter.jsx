import Chapter from '../Chapter';

export default function LocatedChapter() {
  return (
    <Chapter
      id="located"
      bg="img/hero3.jpg"
      prefix="we build where"
      script="located."
      body={
        <p>
          On the Bangalore Highway. Three minutes to NH-44. Two minutes to ISRO.
          Thirty-five to the airport. The city's next decade is being built here.
        </p>
      }
      rightSlot={
        <div className="listing-card rounded-2xl p-5 w-80">
          <div className="font-display text-xl mb-4">Connectivity</div>
          <ul className="space-y-2.5 text-sm">
            {[
              ['NH-44 Bangalore Highway', '3 min'],
              ['Shadnagar town', '5 min'],
              ['Microsoft Data Centre', '7 min'],
              ['Symbiosis University', '10 min'],
              ['RGIA Airport', '35 min'],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between items-center">
                <span className="text-cream/80">{k}</span>
                <span className="text-gold font-display">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
