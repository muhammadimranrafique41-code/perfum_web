'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, staggerContainer, staggerItem, VIEWPORT_ONCE } from '@/lib/animations'

const notes = ['Black Pepper', 'Oud Wood', 'Bergamot', 'Amber Resin']

export function Fragrance() {
  const { ref, y } = useScrollAnimation({ outputRange: [0, -120] })

  return (
    <section
      ref={ref}
      id="fragrance"
      className="relative overflow-hidden py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/05.JPG"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22]"
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
        <motion.p
          variants={fadeUp}
          className="font-body text-label tracking-[0.3em] uppercase text-accent mb-6"
        >
          Explosive Elegance
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-display text-display-2xl font-normal leading-[0.95] tracking-[-0.02em] text-text-primary mb-4"
        >
          <span className="text-accent">Georgiemar</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-body text-sm text-muted max-w-lg mx-auto mb-12 leading-relaxed"
        >
          A fragrance that ignites the senses. Black pepper meets amber in a
          provocative dance of light and shadow. This is not merely a scent —
          it is a statement.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-display text-display-lg italic text-accent mb-14"
        >
          Ignites Senses
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-x-10 gap-y-4"
        >
          {notes.map((note) => (
            <motion.span
              key={note}
              variants={staggerItem}
              className="font-body text-label tracking-[0.25em] uppercase text-muted"
            >
              {note}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
