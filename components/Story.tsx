'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, lineReveal, VIEWPORT_ONCE } from '@/lib/animations'

const paragraphs = [
  'In the depths of an ancient atelier, where light barely touches stone, Noir Éternel was conceived. Not as a fragrance, but as a feeling — a memory of shadows and amber, of nights that stretch into eternity.',
  'Every bottle carries the weight of centuries. Distilled not in haste, but in the quiet patience of master perfumers who understand that true elegance cannot be rushed. It must be earned.',
]

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

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="max-w-3xl ml-0 md:ml-[8vw]"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-label tracking-[0.3em] uppercase text-accent mb-6"
          >
            Our Story
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-display-xl font-normal tracking-[-0.015em] text-text-primary mb-10"
          >
            Born from darkness,
            <br />
            <span className="text-accent">forged in silence.</span>
          </motion.h2>

          <motion.div
            variants={lineReveal}
            className="h-px bg-accent w-24 mb-10"
          />

          <div className="space-y-6">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="font-body text-sm leading-[1.9] text-muted max-w-prose"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
