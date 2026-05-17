'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Story', href: '#story' },
  { label: 'Fragrances', href: '#products' },
  { label: 'Bestsellers', href: '#bestsellers' },
  { label: 'Contact', href: '#newsletter' },
]

export default function Navbar() {
  const scrolled = useScrolled(80)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8"
      >
        <div
          className="mx-auto flex max-w-[1280px] items-center justify-between rounded-[1.35rem] border px-4 py-3 transition-all duration-500 md:px-5"
          style={{
            background: scrolled ? 'rgba(13,10,7,0.85)' : 'rgba(13,10,7,0.3)',
            borderColor: scrolled ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(28px) saturate(1.25)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.25)',
            boxShadow: scrolled
              ? '0 18px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 10px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <a href="#hero" className="flex items-center gap-3" aria-label="Haris Fragrance home">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[0.9rem] border border-white/10 bg-white/[0.04]">
              <i className="ri-sparkling-2-fill text-brand-gold text-sm" />
              <span className="absolute inset-x-2 bottom-1 h-px bg-brand-gold opacity-50" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-cinzel text-[0.76rem] font-semibold tracking-[0.28em] text-brand-cream">
                HARIS FRAGRANCE
              </span>
              <span className="hidden font-jost text-[0.58rem] font-light uppercase tracking-[0.22em] text-brand-muted sm:block">
                Luxury Perfumes, Karachi
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative flex items-center rounded-[0.95rem] px-4 py-2 font-jost text-[0.7rem] font-medium uppercase tracking-[0.16em] text-brand-muted transition-colors duration-300 hover:text-brand-cream"
              >
                {item.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-brand-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#products"
              className="rounded-[0.95rem] border border-brand-gold/30 px-4 py-2 font-jost text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-gold transition-all duration-300 hover:border-brand-gold/70 hover:bg-brand-gold/10 active:translate-y-px"
            >
              Explore
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.95rem] border border-white/10 bg-white/[0.04] md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span className="relative h-4 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 h-px w-5 bg-brand-cream"
                transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              />
              <motion.span
                animate={open ? { opacity: 0, x: -5 } : { opacity: 1, x: 0 }}
                className="absolute left-0 top-[7px] h-px w-5 bg-brand-cream"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 h-px w-5 bg-brand-cream"
                transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-3 max-w-[1280px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-brand-bg/90 p-3 backdrop-blur-2xl md:hidden"
            >
              <div className="grid gap-2">
                {navLinks.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[1rem] border border-white/[0.06] bg-white/[0.03] p-3 active:scale-[0.99]"
                  >
                    <span className="block font-cinzel text-lg tracking-[0.08em] text-brand-cream">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
