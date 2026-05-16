'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from '@/lib/animations'

const notes = ['Black Pepper', 'Oud Wood', 'Bergamot', 'Amber Resin']

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/20"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + i * 1.5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function Fragrance() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '15%'])

  return (
    <section
      ref={sectionRef}
      id="fragrance"
      className="relative overflow-hidden py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <Image
          src="/images/05.JPG"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22]"
          priority={false}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-bg/20" />
      </motion.div>

      <FloatingParticles />

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
          className="font-body text-sm text-muted max-w-lg mx-auto mb-10 leading-relaxed"
        >
          A fragrance that ignites the senses. Black pepper meets amber in a
          provocative dance of light and shadow. This is not merely a scent —
          it is a statement.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
          <span className="font-display text-display-lg italic text-accent">
            Ignites Senses
          </span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-x-12 gap-y-4"
        >
          {notes.map((note) => (
            <motion.span
              key={note}
              variants={fadeUp}
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
