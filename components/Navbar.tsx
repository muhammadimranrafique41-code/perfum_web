'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SPRING_GENTLE, SPRING_STIFF } from '@/lib/animations'

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Atelier', href: '#atelier' },
  { label: 'Collection', href: '#collection' },
  { label: 'Fragrance', href: '#fragrance' },
]

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
    const maxDist = 200
    const strength = Math.max(0, 1 - dist / maxDist)
    x.set(dx * strength * 0.3)
    y.set(dy * strength * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href="#fragrance"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, borderRadius: 0 }}
      className="border border-accent text-accent hover:bg-accent hover:text-bg px-5 py-2 text-label tracking-[0.2em] uppercase transition-colors duration-fast"
    >
      Discover
    </motion.a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-medium ease-luxury',
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="flex items-center justify-between px-[var(--section-padding-x)] py-4">
        <a
          href="#"
          className="font-display italic text-xl tracking-[0.3em] text-text-primary"
        >
          NOIR ÉTERNEL
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ y: -1 }}
              transition={SPRING_GENTLE}
              className="text-label font-body tracking-[0.2em] uppercase text-muted hover:text-text-primary transition-colors duration-fast"
            >
              {link.label}
            </motion.a>
          ))}
          <MagneticCta />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={SPRING_STIFF}
            className="block w-6 h-px bg-text-primary"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-text-primary"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={SPRING_STIFF}
            className="block w-6 h-px bg-text-primary"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[-1] bg-bg/95 backdrop-blur-lg"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: SPRING_GENTLE },
                  }}
                  onClick={() => setOpen(false)}
                  className="font-display text-display-lg text-text-primary hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
