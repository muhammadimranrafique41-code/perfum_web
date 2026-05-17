'use client'

import { motion } from 'framer-motion'

interface FilterPillProps {
  label: string
  active: boolean
  onClick: () => void
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-5 py-2.5 font-cinzel text-[0.65rem] tracking-[0.15em] uppercase transition-colors duration-300 ${
        active
          ? 'bg-brand-gold text-brand-bg font-semibold'
          : 'bg-transparent text-brand-muted border border-brand-goldDim/40 hover:border-brand-gold/40 hover:text-brand-cream'
      }`}
      whileTap={{ scale: 0.97 }}
      aria-pressed={active}
      aria-label={`Filter by ${label}`}
    >
      {label}
    </motion.button>
  )
}
