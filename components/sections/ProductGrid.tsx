'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFilter } from '@/context/FilterContext'
import { PRODUCTS } from '@/lib/products'
import { FILTER_PILLS } from '@/lib/categories'
import ProductCard from '@/components/ui/ProductCard'
import FilterPill from '@/components/ui/FilterPill'
import OrnamentDivider from '@/components/ui/OrnamentDivider'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function ProductGrid() {
  const { activeCategory, setFilter } = useFilter()

  const filtered = useMemo(
    () => activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <section id="products" className="py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <SectionLabel>Collection</SectionLabel>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              Our Fragrances
            </h2>
            <OrnamentDivider />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {FILTER_PILLS.map((pill) => (
              <FilterPill
                key={pill.key}
                label={pill.label}
                active={activeCategory === pill.key}
                onClick={() => setFilter(pill.key)}
              />
            ))}
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{ opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
