'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-[1px] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), rgba(201,168,76,0.8), rgba(201,168,76,0.6), transparent)',
      }}
    />
  )
}
