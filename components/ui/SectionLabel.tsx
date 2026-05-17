import type { ReactNode } from 'react'

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-cinzel text-[0.6rem] tracking-[0.25em] uppercase text-brand-gold/70">
      <span className="h-px w-6 bg-brand-gold/40" />
      {children}
      <span className="h-px w-6 bg-brand-gold/40" />
    </span>
  )
}
