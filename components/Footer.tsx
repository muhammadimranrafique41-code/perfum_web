'use client'

import { motion } from 'framer-motion'
import { fadeIn, VIEWPORT_ONCE } from '@/lib/animations'

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Collection', href: '#collection' },
  { label: 'Fragrance', href: '#fragrance' },
]

const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="py-[var(--section-padding-y)] px-[var(--section-padding-x)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <motion.div variants={fadeIn}>
            <p className="font-display italic text-xl tracking-[0.3em] text-text-primary mb-3">
              NOIR ÉTERNEL
            </p>
            <p className="font-body text-label tracking-[0.2em] uppercase text-muted">
              Haute Parfumerie · Paris
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-label tracking-[0.2em] uppercase text-muted hover:text-text-primary transition-colors duration-fast"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-col gap-3">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-label tracking-[0.2em] uppercase text-muted hover:text-text-primary transition-colors duration-fast"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="max-w-6xl mx-auto mt-16 pt-8 border-t border-border text-center"
        >
          <p className="font-body text-label tracking-[0.15em] text-muted">
            © 2026 Noir Éternel · All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
