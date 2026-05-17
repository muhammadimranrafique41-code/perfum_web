'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  opacityDelta: number
  life: number
  maxLife: number
}

const PARTICLE_COUNT = 80
const GOLD = { r: 201, g: 168, b: 76 }

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: -999, y: -999 })

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => ({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 20,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(Math.random() * 0.6 + 0.3),
    radius: Math.random() * 1.8 + 0.5,
    opacity: 0,
    opacityDelta: Math.random() * 0.008 + 0.003,
    life: 0,
    maxLife: Math.random() * 300 + 200,
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const p = createParticle(canvas)
      p.y = Math.random() * canvas.height
      p.life = Math.random() * p.maxLife
      return p
    })

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMouseMove, { passive: true })

    let hidden = false
    const onVisibility = () => { hidden = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    const draw = () => {
      if (hidden) {
        animFrameRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p, i) => {
        p.life++

        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          const force = (80 - dist) / 80
          p.vx += (dx / dist) * force * 0.15
          p.vy += (dy / dist) * force * 0.15
        }

        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        if (p.life < p.maxLife * 0.15) {
          p.opacity = Math.min(0.7, p.opacity + p.opacityDelta)
        } else if (p.life > p.maxLife * 0.8) {
          p.opacity = Math.max(0, p.opacity - p.opacityDelta * 1.5)
        }

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
        grd.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.opacity})`)
        grd.addColorStop(1, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.opacity})`
        ctx.fill()

        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particlesRef.current[i] = createParticle(canvas)
        }
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }

    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [createParticle])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  )
}
