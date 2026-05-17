'use client'

import { motion } from 'framer-motion'
import OrnamentDivider from '@/components/ui/OrnamentDivider'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const pillars = [
  {
    icon: 'ri-sparkling-2-line',
    title: 'Artisanal Craft',
    desc: 'Each fragrance is hand-blended in small batches by master perfumers, ensuring every drop meets our exacting standards of excellence.',
  },
  {
    icon: 'ri-leaf-line',
    title: 'Pure Ingredients',
    desc: 'We source the finest raw materials — from Taif roses to Mysore sandalwood — never compromising on quality or authenticity.',
  },
  {
    icon: 'ri-time-line',
    title: 'Timeless Tradition',
    desc: 'Rooted in centuries-old perfumery techniques, our methods honor the heritage of fragrance-making while embracing modern refinement.',
  },
  {
    icon: 'ri-star-line',
    title: 'Unforgettable Sillage',
    desc: 'Our fragrances are crafted to linger — creating an invisible signature that stays with you from dawn until dusk.',
  },
]

export default function BrandPillars() {
  return (
    <section className="py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionLabel>Why Haris</SectionLabel>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              Our Pillars
            </h2>
            <OrnamentDivider />
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <RevealOnScroll key={pillar.title}>
              <motion.div
                className="group relative bg-brand-card border border-brand-goldDim/30 p-8 md:p-10 transition-all duration-500 hover:bg-brand-cardHover hover:border-brand-gold/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-brand-gold/20 bg-brand-goldDim/30">
                    <i className={`${pillar.icon} text-brand-gold text-xl`} />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-white mb-3">{pillar.title}</h3>
                    <p className="font-cormorant text-brand-muted leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
