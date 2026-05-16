'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, lineReveal, VIEWPORT_ONCE } from '@/lib/animations'

export function Story() {
  const { ref, y } = useScrollAnimation({ outputRange: [0, -80] })

  return (
    <section
      ref={ref}
      id="story"
      className="relative overflow-hidden py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/01.JPG"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18]"
          priority={false}
          aria-hidden="true"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative z-10 max-w-2xl"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-display-xl font-normal tracking-[-0.015em] text-text-primary mb-8"
        >
          Born from darkness,
          <br />
          forged in silence.
        </motion.h2>

        <motion.div
          variants={lineReveal}
          className="h-px bg-accent w-24 mb-8"
        />

        <motion.p
          variants={fadeUp}
          className="font-body text-sm leading-[1.9] text-muted max-w-prose"
        >
          In the depths of an ancient atelier, where light barely touches stone,
          Noir Éternel was conceived. Not as a fragrance, but as a feeling.
          A memory of shadows and amber, of nights that stretch into eternity.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-body text-sm leading-[1.9] text-muted max-w-prose mt-6"
        >
          Every bottle carries the weight of centuries — distilled not in haste,
          but in the quiet patience of master perfumers who understand that true
          elegance cannot be rushed. It must be earned.
        </motion.p>
      </motion.div>
    </section>
  )
}
