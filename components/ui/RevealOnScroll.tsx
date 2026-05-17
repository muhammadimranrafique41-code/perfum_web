'use client'

import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import type { ReactNode } from 'react'

export default function RevealOnScroll({
  children,
  threshold = 0.12,
}: {
  children: ReactNode
  threshold?: number
}) {
  const { ref, revealed } = useRevealOnScroll(threshold)

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      {children}
    </div>
  )
}
