import type { Variants, Transition } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export const EASE_LUXURY = [0.2, 0.9, 0.4, 1.0] as const
export const EASE_SNAP = [0.16, 1, 0.3, 1] as const
export const EASE_OUT = [0.0, 0.0, 0.2, 1.0] as const

export const SPRING_STIFF: Transition = { type: 'spring', stiffness: 120, damping: 18 }
export const SPRING_GENTLE: Transition = { type: 'spring', stiffness: 80, damping: 14 }
export const SPRING_BOUNCE: Transition = { type: 'spring', stiffness: 200, damping: 10 }

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

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE_LUXURY } },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE_LUXURY } },
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

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { ...SPRING_GENTLE } },
}

export function useAccessibleVariants(variants: Variants): Variants {
  const reduce = useReducedMotion()
  if (!reduce) return variants
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  }
}
