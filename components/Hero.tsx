'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { EASE_SNAP, EASE_LUXURY } from '@/lib/animations'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.6 } },
}

const childVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_LUXURY } },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80])

  return (
    <section ref={sectionRef} className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex flex-col items-center px-[var(--section-padding-x)] text-center"
      >
        <motion.p
          variants={childVariants}
          initial="hidden"
          animate="visible"
          className="text-label tracking-[0.4em] text-muted uppercase font-body mb-8"
        >
          Haute Parfumerie
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <motion.h1
            variants={childVariants}
            className="font-display text-display-2xl font-normal leading-[0.95] tracking-[-0.02em] text-text-primary"
          >
            Noir
          </motion.h1>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <motion.h1
            variants={childVariants}
            className="font-display text-display-2xl font-normal leading-[0.95] tracking-[-0.02em] text-text-primary"
          >
            Éternel
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-6 font-body text-sm font-extralight tracking-[0.12em] text-muted"
        >
          Where darkness meets desire · A fragrance without boundaries
        </motion.p>

        <motion.a
          href="#fragrance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: EASE_SNAP }}
          className="mt-12 border border-accent text-accent hover:bg-accent hover:text-bg px-8 py-3 text-label tracking-[0.2em] uppercase transition-all duration-medium"
          style={{ borderRadius: 0 }}
        >
          Discover the Fragrance
        </motion.a>
      </motion.div>
    </section>
  )
}
