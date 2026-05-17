'use client'

import { motion } from 'framer-motion'

interface CategoryCardProps {
  icon: string
  label: string
  color: string
  onClick: () => void
}

export default function CategoryCard({ icon, label, color, onClick }: CategoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-8 border border-brand-goldDim/30 bg-brand-card transition-all duration-500 hover:bg-brand-cardHover hover:border-brand-gold/20"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      aria-label={`Browse ${label}`}
    >
      <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-full transition-transform duration-500 group-hover:scale-110" style={{ background: `${color}15` }}>
        <i className={`${icon} text-2xl`} style={{ color }} />
      </div>
      <h3 className="font-cinzel text-sm font-bold text-white mb-1 tracking-[0.08em]">{label}</h3>
      <span className="font-cormorant text-xs text-brand-muted">Explore Collection</span>
    </motion.button>
  )
}
