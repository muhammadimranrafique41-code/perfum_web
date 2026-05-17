import type { ReactNode } from 'react'

export default function GoldFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-brand-gold/60 z-10" />
      <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-brand-gold/60 z-10" />
      <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-brand-gold/60 z-10" />
      <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-brand-gold/60 z-10" />
      {children}
    </div>
  )
}
