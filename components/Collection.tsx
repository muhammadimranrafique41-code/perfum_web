'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { staggerContainer, staggerItem, fadeUp, VIEWPORT_ONCE } from '@/lib/animations'

const collection = [
  {
    label: 'Eau de Parfum',
    name: 'Noir Éternel',
    price: '€280',
  },
  {
    label: 'Eau de Parfum',
    name: 'L\'Ombre',
    price: '€250',
  },
  {
    label: 'Extrait',
    name: 'Ténèbres',
    price: '€420',
  },
  {
    label: 'Eau de Parfum',
    name: 'Crépuscule',
    price: '€280',
  },
]

export function Collection() {
  const { ref, y } = useScrollAnimation({ outputRange: [0, -80] })

  return (
    <section
      ref={ref}
      id="collection"
      className="relative overflow-hidden py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/02.JPG"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.15]"
          priority={false}
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative z-10"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-display-xl font-normal tracking-[-0.015em] text-text-primary mb-16"
        >
          The Collection
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-4xl"
        >
          {collection.map((item) => (
            <motion.div
              key={item.name}
              variants={staggerItem}
              className="group cursor-pointer"
            >
              <p className="font-body text-label tracking-[0.2em] uppercase text-muted mb-3">
                {item.label}
              </p>
              <h3 className="font-display text-display-lg font-normal text-text-primary mb-2">
                {item.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted">{item.price}</span>
                <motion.span
                  className="h-px bg-accent origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{ width: 40 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
