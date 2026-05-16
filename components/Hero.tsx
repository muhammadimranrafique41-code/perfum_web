'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'

function MagneticCta() {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const strength = Math.max(0, 1 - dist / 200)
    x.set(dx * strength * 0.3)
    y.set(dy * strength * 0.3)
  }

  return (
    <motion.a
      ref={ref}
      href="#fragrance"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x, y, borderRadius: 0 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block border border-accent text-accent hover:bg-accent hover:text-bg px-8 py-3 text-label tracking-[0.2em] uppercase transition-colors duration-medium"
    >
      Discover the Fragrance
    </motion.a>
  )
}

const titleWords = ['Noir', 'Éternel']

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.35], [0, -80])

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-surface" />
        <div className="absolute top-1/2 right-0 w-[40vw] h-[80vh] opacity-[0.04]">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full rounded-full bg-accent blur-[120px]"
          />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, x: textX }}
        className="relative z-10 w-full px-[var(--section-padding-x)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.9, 0.4, 1.0] }}
              className="text-label tracking-[0.4em] text-accent uppercase font-body mb-8"
            >
              Haute Parfumerie
            </motion.p>

            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.5, ease: [0.2, 0.9, 0.4, 1.0] }}
                className="font-display text-display-2xl font-normal leading-[0.9] tracking-[-0.02em] text-text-primary"
              >
                Noir
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.65, ease: [0.2, 0.9, 0.4, 1.0] }}
                className="font-display text-display-2xl font-normal leading-[0.9] tracking-[-0.02em] text-accent"
              >
                Éternel
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.2, 0.9, 0.4, 1.0] }}
              className="font-body text-sm font-light leading-relaxed text-muted max-w-md mb-12"
            >
              Where darkness meets desire. A fragrance without boundaries — 
              born in the silence of an ancient Parisian atelier.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: [0.2, 0.9, 0.4, 1.0] }}
            >
              <MagneticCta />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
