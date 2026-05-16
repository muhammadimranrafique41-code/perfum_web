'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, lineReveal, VIEWPORT_ONCE } from '@/lib/animations'

const collection = [
  {
    label: 'Eau de Parfum',
    name: 'Noir Éternel',
    price: '€280',
    wide: true,
  },
  {
    label: 'Eau de Parfum',
    name: "L'Ombre",
    price: '€250',
    wide: false,
  },
  {
    label: 'Extrait',
    name: 'Ténèbres',
    price: '€420',
    wide: true,
  },
  {
    label: 'Eau de Parfum',
    name: 'Crépuscule',
    price: '€280',
    wide: false,
  },
  {
    label: 'Extrait',
    name: 'Lueur Noire',
    price: '€380',
    wide: true,
  },
]

export function Collection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative overflow-hidden py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
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

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-label tracking-[0.3em] uppercase text-accent mb-6"
          >
            The Collection
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-display-xl font-normal tracking-[-0.015em] text-text-primary mb-16"
          >
            Crafted for
            <br />
            <span className="text-accent">the discerning.</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 max-w-5xl mx-auto">
          {collection.map((item, i) => (
            <motion.div
              key={item.name}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              custom={i}
              className="group cursor-pointer"
            >
              <motion.p
                variants={fadeUp}
                className="font-body text-label tracking-[0.2em] uppercase text-muted mb-3"
              >
                {item.label}
              </motion.p>
              <motion.h3
                variants={fadeUp}
                className="font-display text-display-lg font-normal text-text-primary mb-2"
              >
                {item.name}
              </motion.h3>
              <motion.div variants={lineReveal} className="h-px bg-accent/40 w-16 mb-4" />
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted">{item.price}</span>
                <motion.span
                  className="block h-px bg-accent origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.9, 0.4, 1.0] }}
                  style={{ width: item.wide ? 60 : 30 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
