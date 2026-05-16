import type { Variants } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export const EASE_LUXURY = [0.2, 0.9, 0.4, 1.0] as const
export const EASE_SNAP = [0.16, 1, 0.3, 1] as const
export const EASE_OUT = [0.0, 0.0, 0.2, 1.0] as const

export const VIEWPORT_ONCE = { once: true, amount: 0.25 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_LUXURY } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: EASE_OUT } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_SNAP } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_LUXURY } },
}

export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE_LUXURY, delay: 0.3 } },
}

export function useAccessibleVariants(variants: Variants): Variants {
  const reduce = useReducedMotion()
  if (!reduce) return variants
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  }
}
