export default function MarqueeStrip() {
  const items = [
    'Luxury Perfumes',
    'Premium Attars',
    'Oud Collections',
    'Oriental Blends',
    'Gift Sets',
    'Free Delivery',
    '100% Authentic',
    'Handcrafted in Karachi',
  ]

  return (
    <section className="relative py-5 overflow-hidden bg-brand-bg2 border-y border-brand-goldDim/30">
      <div className="flex whitespace-nowrap animate-marquee-left">
        <div className="flex items-center gap-12 shrink-0 px-6">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-brand-gold/70 whitespace-nowrap">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/30 shrink-0" />
            </span>
          ))}
        </div>
        <div className="flex items-center gap-12 shrink-0 px-6">
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-12">
              <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-brand-gold/70 whitespace-nowrap">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/30 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
