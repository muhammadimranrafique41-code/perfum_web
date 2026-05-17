'use client'

import { motion } from 'framer-motion'
import { useFilter } from '@/context/FilterContext'
import { CATEGORIES } from '@/lib/categories'
import OrnamentDivider from '@/components/ui/OrnamentDivider'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function CategoryShowcase() {
  const { setFilter } = useFilter()

  return (
    <section className="py-28 px-6 md:px-12 bg-brand-bg2/30">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionLabel>Collections</SectionLabel>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              Browse by Category
            </h2>
            <OrnamentDivider />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <RevealOnScroll key={cat.key}>
              <motion.button
                onClick={() => setFilter(cat.key)}
                className="group relative flex flex-col items-center justify-center p-8 md:p-10 border border-brand-goldDim/30 bg-brand-card transition-all duration-500 hover:bg-brand-cardHover hover:border-brand-gold/20 w-full text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                aria-label={`Browse ${cat.label}`}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-4 rounded-full"
                  style={{ background: `${cat.color}15` }}
                >
                  <i className={`${cat.icon} text-xl`} style={{ color: cat.color }} />
                </div>
                <h3 className="font-cinzel text-sm font-bold text-white mb-2 tracking-[0.08em]">
                  {cat.label}
                </h3>
                <span className="font-cormorant text-xs text-brand-muted">Explore</span>
                <div className="absolute inset-0 border border-transparent group-hover:border-brand-gold/20 transition-colors duration-500" />
              </motion.button>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
