'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { scaleIn, fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from '@/lib/animations'

const facts = [
  { label: 'Years of Heritage', value: 'Since 1887' },
  { label: 'Master Perfumers', value: 'Three Generations' },
]

export function Atelier() {
  const { ref, y } = useScrollAnimation({ outputRange: [0, -80] })

  return (
    <section
      ref={ref}
      id="atelier"
      className="relative overflow-hidden py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/1.1.JPG"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.20]"
          priority={false}
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-display-lg italic font-normal text-text-primary mb-12"
        >
          The Art of Perfumery
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-body text-sm leading-[1.9] text-muted max-w-prose mx-auto mb-16"
        >
          In our atelier, time moves differently. Ingredients are sourced from
          the four corners of the earth — vanilla from Madagascar, oud from
          the ancient forests of Southeast Asia, bergamot from the sun-drenched
          cliffs of Calabria. Each element is honored, its story preserved.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {facts.map((fact) => (
            <motion.div
              key={fact.label}
              variants={staggerItem}
              className="bg-surface border border-border p-8"
            >
              <p className="font-display text-display-lg text-accent mb-2">
                {fact.value}
              </p>
              <p className="font-body text-label tracking-[0.2em] uppercase text-muted">
                {fact.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
