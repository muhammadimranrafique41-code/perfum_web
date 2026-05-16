'use client'

import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ScrollAnimationConfig, ScrollAnimationReturn } from '@/types'

export function useScrollAnimation(config: ScrollAnimationConfig = {}): ScrollAnimationReturn {
  const {
    inputRange = [0, 1],
    outputRange = [0, -80],
  } = config

  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, inputRange, outputRange)
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.97, 1])

  return { ref, opacity, y, scale }
}
