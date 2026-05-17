'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ParticleCanvas from '@/components/animations/ParticleCanvas'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
}

const letterVariants = {
  hidden: { opacity: 0, y: -20, rotateX: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          className="object-cover scale-110"
          style={{ animation: 'kenBurns 8s ease-in-out forwards' }}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/70 via-brand-bg/50 to-brand-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/40 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>

      <ParticleCanvas />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          className="font-cinzel text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.08em] text-white mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {'HARIS FRAGRANCE'.split('').map((ch, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
              style={{ display: 'inline-block' }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="font-cormorant text-brand-gold-light text-lg sm:text-xl md:text-2xl italic mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          The Essence of Pakistani Luxury
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#products" className="btn-gold">Explore Collection</a>
          <a href="#story" className="btn-outline">Our Story</a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <div className="flex flex-col items-center gap-2 animate-scroll-bounce">
          <span className="w-px h-8 bg-brand-gold/40" />
          <i className="ri-arrow-down-s-line text-brand-gold/60 text-lg" />
        </div>
      </motion.div>
    </section>
  )
}
