'use client'

import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/products'
import BestsellerCard from '@/components/ui/BestsellerCard'
import OrnamentDivider from '@/components/ui/OrnamentDivider'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const bestsellerIds = [0, 2, 4]

export default function Bestsellers() {
  const bestsellers = bestsellerIds.map((id) => PRODUCTS[id])

  return (
    <section id="bestsellers" className="py-28 px-6 md:px-12 bg-brand-bg2/30">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionLabel>Top Rated</SectionLabel>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              Bestsellers
            </h2>
            <OrnamentDivider />
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {bestsellers.map((product, i) => (
            <RevealOnScroll key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <BestsellerCard product={product} />
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
