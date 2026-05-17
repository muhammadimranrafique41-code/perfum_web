'use client'

export default function Footer() {
  return (
    <footer className="border-t border-brand-goldDim bg-brand-bg2">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-cinzel text-lg font-bold tracking-[0.15em] text-brand-cream mb-4">HARIS FRAGRANCE</h3>
            <p className="font-cormorant text-brand-muted leading-relaxed max-w-xs">
              Handcrafted luxury perfumes, attars, and oud collections. Rooted in the ancient traditions of Karachi, Pakistan.
            </p>
          </div>
          <div>
            <h4 className="font-cinzel text-sm tracking-[0.12em] text-brand-gold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Story', 'Fragrances', 'Bestsellers', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase() === 'fragrances' ? 'products' : link.toLowerCase()}`}
                    className="font-jost text-sm text-brand-muted hover:text-brand-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-cinzel text-sm tracking-[0.12em] text-brand-gold mb-4">Contact</h4>
            <ul className="space-y-3 font-jost text-sm text-brand-muted">
              <li className="flex items-center gap-2">
                <i className="ri-map-pin-line text-brand-gold/60" />
                <span>Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-phone-line text-brand-gold/60" />
                <span>+92 315 3223496</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-mail-line text-brand-gold/60" />
                <span>info@harisfragrance.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-brand-goldDim/50 text-center">
          <p className="font-jost text-xs text-brand-muted">
            &copy; {new Date().getFullYear()} Haris Fragrance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
