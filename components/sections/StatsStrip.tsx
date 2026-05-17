'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-center">
      <span className="font-cinzel text-3xl md:text-4xl font-bold text-brand-gold">
        {count.toLocaleString()}{suffix}
      </span>
    </div>
  )
}

const stats = [
  { value: 50, suffix: '+', label: 'Unique Fragrances' },
  { value: 15000, suffix: '+', label: 'Happy Customers' },
  { value: 8, suffix: '', label: 'Cities in Pakistan' },
  { value: 100, suffix: '%', label: 'Authentic Guarantee' },
]

export default function StatsStrip() {
  return (
    <section className="py-16 px-6 md:px-12 bg-brand-bg2/50">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="font-jost text-sm text-brand-muted mt-2 uppercase tracking-[0.12em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
