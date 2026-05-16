'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, scaleIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/animations'

const facts = [
  { label: 'Years of Heritage', value: 'Since 1887' },
  { label: 'Master Perfumers', value: 'Three Generations' },
  { label: 'Signature Extracts', value: 'Twelve' },
]

export function Atelier() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])

  return (
    <section
      ref={sectionRef}
      id="atelier"
      className="relative overflow-hidden py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
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

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="max-w-xl ml-auto mr-0 md:mr-[8vw]"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-label tracking-[0.3em] uppercase text-accent mb-6"
          >
            The Atelier
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-display-lg italic font-normal text-text-primary mb-10"
          >
            The Art of Perfumery
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-body text-sm leading-[1.9] text-muted max-w-prose mb-16"
          >
            Ingredients are sourced from the four corners of the earth — vanilla 
            from Madagascar, oud from the ancient forests of Southeast Asia, 
            bergamot from the sun-drenched cliffs of Calabria. Each element is 
            honored, its story preserved through three generations of master perfumers.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-4xl mx-auto"
        >
          {facts.map((fact) => (
            <motion.div
              key={fact.label}
              variants={scaleIn}
              className="bg-surface p-10 text-center"
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
      </div>
    </section>
  )
}
