# 🌸 Haris Fragrance – Premium Perfume E-Commerce Website
### Senior Developer Build Specification | React + Next.js | Version 3.0

---

## 🚨 CRITICAL MIGRATION DIRECTIVE — READ FIRST

> **This is a Next.js + React rebuild.** The existing HTML/CSS/JS codebase (`index.html`) is the **visual and functional reference** — every design detail, section, color token, product, modal flow, and interaction must be preserved exactly. You are porting, not redesigning.

### ✅ Non-Negotiable Build Rules

```
1.  TECH STACK: Next.js 14+ (App Router) + React 18 + TypeScript + Tailwind CSS.
    No class components. No pages router. No CSS-in-JS libraries.
    Every file is .tsx or .ts. Strict TypeScript is ON.

2.  DESIGN PRESERVATION: The existing dark luxury aesthetic, color palette, typography,
    section layout, product grid, category filter, and modal flow must be IDENTICAL
    to the reference HTML file. A designer looking at both should see zero visual difference.

3.  BACKGROUND ANIMATION: Add a living, cinematic canvas-based particle/nebula animation
    on the hero section AND a subtle ambient animation layer on ALL other sections.
    These must be performant (RAF-based, paused when tab hidden) and GPU-accelerated.

4.  COMPONENT ARCHITECTURE: Each section becomes its own React component.
    Shared logic lives in custom hooks. Product data lives in a typed constants file.
    Zero prop drilling beyond 2 levels — use context for global state.

5.  SAME FILTER LOGIC: The category filter (Section 5 cards + Section 6 buttons) must
    still call ONE shared function. In React, this is a shared state setter via Context.
    Both surfaces read from and write to the same `activeCategory` state — never two
    separate states that try to stay in sync.

6.  MODALS: Still two separate screens (ProductDetail → Checkout). Implemented as
    portal-rendered React components, NOT browser dialogs.
    Screen 1 is never skipped. ESC key, backdrop click, and close button all dismiss.

7.  SAME WHATSAPP FLOW: The WhatsApp order message format must be byte-for-byte identical
    to the reference. Same fields, same emoji layout, same wa.me URL.

8.  PERFORMANCE: Lighthouse score ≥ 90 on desktop.
    Images: all via next/image with proper width/height and priority on hero.
    Fonts: all via next/font/google — no CDN font links in layout.tsx.
    Animations: requestAnimationFrame, will-change: transform, no layout thrashing.

9.  PRODUCT GRID: Pre-populated on first render via React state init.
    No useEffect to load products — they are static data, initialize with useState('all').
    Category filter updates instantly — no async, no loading state.

10. ACCESSIBILITY: All interactive elements have aria-label. Modals trap focus.
    Skip-to-content link at top. WCAG 2.1 AA contrast on text. Zero axe-core errors.
```

---

## 📌 Project Overview

**Same brand, same vision, new architecture.** Haris Fragrance is a premium Pakistani perfume brand. The website must feel like a Tom Ford or Creed digital experience — dark, opulent, gold-accented, with cinematic motion. The React/Next.js port adds:

- **Server-side rendering** for SEO and First Contentful Paint
- **Framer Motion** for orchestrated section reveals and modal transitions
- **Canvas-based particle engine** for the hero background — a living, breathing atmosphere of golden dust
- **Ambient SVG noise animation** as a persistent layer across all sections
- **CSS `@property` animated gradients** for button shimmer and border glow
- **Scroll-linked animation** via `useScroll` + `useTransform` for parallax depth

---

## 🗂 Project Structure

```
haris-fragrance/
│
├── app/
│   ├── layout.tsx                 ← Root layout: fonts, metadata, global providers
│   ├── page.tsx                   ← Home page: assembles all section components
│   ├── globals.css                ← CSS variables, keyframes, base resets, scrollbar
│   └── favicon.ico
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             ← Sticky navbar with glass-morphism on scroll
│   │   └── Footer.tsx             ← 3-column footer
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx        ← Full-screen hero with canvas particle engine
│   │   ├── MarqueeStrip.tsx       ← Infinite horizontal scrolling text ribbon
│   │   ├── BrandStory.tsx         ← Two-column about section
│   │   ├── StatsStrip.tsx         ← 4-stat counter row
│   │   ├── BrandPillars.tsx       ← 4-card feature grid
│   │   ├── CategoryShowcase.tsx   ← 5 category cards (writes to filter context)
│   │   ├── ProductGrid.tsx        ← Filter bar + product card grid
│   │   ├── Bestsellers.tsx        ← 3 featured bestseller cards
│   │   ├── OurPromise.tsx         ← Two-column promise section
│   │   └── Newsletter.tsx         ← WhatsApp subscribe CTA
│   │
│   ├── ui/
│   │   ├── ProductCard.tsx        ← Individual product card
│   │   ├── BestsellerCard.tsx     ← Larger bestseller card variant
│   │   ├── CategoryCard.tsx       ← Category showcase card
│   │   ├── FilterPill.tsx         ← Filter bar button
│   │   ├── GoldFrame.tsx          ← Ornamental gold-corner image wrapper
│   │   ├── OrnamentDivider.tsx    ← Decorative diamond + line divider
│   │   ├── SectionLabel.tsx       ← Small caps gold label
│   │   ├── RevealOnScroll.tsx     ← Framer Motion scroll reveal wrapper
│   │   └── ScrollProgressBar.tsx  ← Thin gold line at top of viewport
│   │
│   ├── modals/
│   │   ├── ProductModal.tsx       ← Screen 1: product detail modal
│   │   ├── CheckoutModal.tsx      ← Screen 2: checkout form modal
│   │   └── ModalPortal.tsx        ← createPortal wrapper for document.body
│   │
│   ├── animations/
│   │   ├── ParticleCanvas.tsx     ← Canvas-based hero particle engine
│   │   ├── AmbientBackground.tsx  ← Subtle SVG noise + gradient for all sections
│   │   └── GrainOverlay.tsx       ← Film-grain texture SVG overlay
│   │
│   └── floating/
│       ├── WhatsAppButton.tsx     ← Fixed bottom-right WhatsApp CTA
│       └── BackToTop.tsx          ← Fixed bottom-left scroll-to-top
│
├── context/
│   ├── FilterContext.tsx          ← activeCategory state + setActiveCategory
│   └── ModalContext.tsx           ← activeProduct state + modal open/close
│
├── hooks/
│   ├── useScrolled.ts             ← Returns true when window.scrollY > threshold
│   ├── useParticleEngine.ts       ← Canvas RAF animation loop for particles
│   ├── useRevealOnScroll.ts       ← IntersectionObserver-based reveal hook
│   └── useBodyScrollLock.ts       ← Locks/restores body overflow for modals
│
├── lib/
│   ├── products.ts                ← PRODUCTS array + TypeScript interface
│   ├── categories.ts              ← CATEGORIES config with color tokens
│   └── whatsapp.ts                ← buildWhatsAppMessage() + encodeForWhatsApp()
│
├── public/
│   ├── logo.jpg
│   ├── hero.jpg
│   ├── perfum01.jpg … perfum11.jpeg
│   └── [all product images]
│
├── tailwind.config.ts             ← Extended colors + fonts matching reference
├── next.config.ts                 ← Image domains, headers config
└── tsconfig.json                  ← Strict mode ON
```

---

## ⚙️ Tech Stack & Dependencies

### Core
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "typescript": "^5.4.0"
}
```

### Styling & Animation
```json
{
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "framer-motion": "^11.2.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.3.0"
}
```

### Icons
```json
{
  "remixicon": "^4.3.0"
}
```
> Import via CSS: `import 'remixicon/fonts/remixicon.css'` in `layout.tsx`

### No other runtime dependencies. No Redux. No React Query. No UI libraries.

---

## 🎨 Design Tokens — `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        '#0D0A07',
          bg2:       '#141009',
          card:      '#1C1510',
          cardHover: '#241C14',
          gold:      '#C9A84C',
          goldLight: '#E8C97A',
          goldMuted: '#7A6535',
          goldDim:   '#2E2412',
          cream:     '#F0E6D0',
          muted:     '#9A8B75',
          rose:      '#8C3A50',
        },
        cat: {
          edp:      '#C9A84C',
          attar:    '#9C7A4A',
          oud:      '#7A4E2E',
          oriental: '#8C3A50',
          giftsets: '#4A6741',
        },
      },
      fontFamily: {
        cinzel:    ['var(--font-cinzel)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        jost:      ['var(--font-jost)', 'sans-serif'],
        dancing:   ['var(--font-dancing)', 'cursive'],
      },
      animation: {
        'fade-up':       'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'letter-drop':   'letterDrop 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'marquee-left':  'marqueeLeft 30s linear infinite',
        'wa-pulse':      'waPulse 2.5s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 2.2s ease-in-out infinite',
        'shimmer':       'shimmer 3s ease-in-out infinite',
        'grain':         'grain 0.4s steps(2) infinite',
        'card-remove':   'cardRemove 0.38s cubic-bezier(0.4,0,0.2,1) forwards',
        'border-glow':   'borderGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:       { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        letterDrop:   { from: { opacity: '0', transform: 'translateY(-20px) rotateX(40deg)', filter: 'blur(4px)' }, to: { opacity: '1', transform: 'none', filter: 'none' } },
        marqueeLeft:  { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        waPulse:      { '0%,100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.5)' }, '50%': { boxShadow: '0 0 0 14px rgba(37,211,102,0)' } },
        scrollBounce: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(8px)' } },
        shimmer:      { '0%': { backgroundPosition: '-300% center' }, '100%': { backgroundPosition: '300% center' } },
        grain:        { '0%,100%': { transform: 'translate(0,0)' }, '25%': { transform: 'translate(-2%,3%)' }, '50%': { transform: 'translate(3%,-2%)' }, '75%': { transform: 'translate(-1%,4%)' } },
        cardRemove:   { '0%': { opacity: '1', transform: 'scale(1)', maxHeight: '600px' }, '60%': { opacity: '0', transform: 'scale(0.96) translateY(-10px)' }, '100%': { opacity: '0', maxHeight: '0', padding: '0', margin: '0' } },
        borderGlow:   { '0%,100%': { borderColor: 'rgba(201,168,76,0.3)' }, '50%': { borderColor: 'rgba(201,168,76,0.8)' } },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 🔤 Typography — `app/layout.tsx`

```typescript
import { Cinzel, Cormorant_Garamond, Jost, Dancing_Script } from 'next/font/google'
import 'remixicon/fonts/remixicon.css'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata = {
  title: 'Haris Fragrance | Luxury Perfumes & Attars — Pakistan',
  description: 'Discover Haris Fragrance — handcrafted luxury perfumes, attars, oud collections and oriental blends. Premium fragrances rooted in Karachi, Pakistan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${jost.variable} ${dancing.variable}`}>
      <body className="bg-brand-bg text-brand-cream font-jost overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
```

---

## 🎆 Background Animation System

### ✦ Hero: Canvas Particle Engine — `components/animations/ParticleCanvas.tsx`

This is the most important animation. A living, GPU-accelerated field of golden particles that:
- Float upward with gentle drift and rotation
- Have varying sizes (1–4px), opacities, and speeds
- Pulse with a soft gold glow
- Pause when the browser tab is hidden (Page Visibility API)
- Respond to mouse proximity (particles gently repel from cursor within 80px radius)

```typescript
'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  radius: number; opacity: number
  opacityDelta: number; life: number; maxLife: number
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
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Init particles spread across canvas
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const p = createParticle(canvas)
      p.y = Math.random() * canvas.height  // scatter vertically on init
      p.life = Math.random() * p.maxLife   // stagger lifecycle
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
      if (hidden) { animFrameRef.current = requestAnimationFrame(draw); return }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p, i) => {
        p.life++

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          const force = (80 - dist) / 80
          p.vx += (dx / dist) * force * 0.15
          p.vy += (dy / dist) * force * 0.15
        }

        // Dampen velocity
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        // Opacity life cycle (fade in → hold → fade out)
        if (p.life < p.maxLife * 0.15) {
          p.opacity = Math.min(0.7, p.opacity + p.opacityDelta)
        } else if (p.life > p.maxLife * 0.8) {
          p.opacity = Math.max(0, p.opacity - p.opacityDelta * 1.5)
        }

        // Draw glow + core
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

        // Reset when expired or out of bounds
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
```

---

### ✦ Ambient Section Background — `components/animations/AmbientBackground.tsx`

A **persistent, non-distracting animation layer** placed behind all non-hero sections. Creates a sense of depth without competing with content:

- Slow-drifting radial gradient "nebula" blobs — 2–3 large glowing areas in deep gold/amber, very low opacity (3–6%)
- Animated via `@keyframes` CSS (not Canvas) for zero JS overhead
- Uses CSS `@property` for smooth hue-shift animation
- Implemented as `position: fixed` behind all content (z-index: -1)

```typescript
// AmbientBackground.tsx
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
      {/* Nebula Blob 1 — top-left */}
      <div className="ambient-blob ambient-blob-1" />
      {/* Nebula Blob 2 — bottom-right */}
      <div className="ambient-blob ambient-blob-2" />
      {/* Grain overlay */}
      <div className="grain-overlay" />
    </div>
  )
}
```

```css
/* In globals.css */
@keyframes blobDrift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(40px, -30px) scale(1.08); }
  66%       { transform: translate(-20px, 20px) scale(0.95); }
}
@keyframes blobDrift2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%       { transform: translate(-50px, 30px) scale(1.12); }
  70%       { transform: translate(30px, -40px) scale(0.92); }
}

.ambient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}
.ambient-blob-1 {
  width: 600px; height: 600px;
  top: -150px; left: -150px;
  background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
  animation: blobDrift1 18s ease-in-out infinite;
}
.ambient-blob-2 {
  width: 500px; height: 500px;
  bottom: -100px; right: -100px;
  background: radial-gradient(circle, rgba(140,58,80,0.04) 0%, transparent 70%);
  animation: blobDrift2 22s ease-in-out infinite;
}
.grain-overlay {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.025;
  animation: grain 0.5s steps(2) infinite;
}
```

---

### ✦ Hero Extended Animation Stack — `components/sections/HeroSection.tsx`

The hero has **4 layered animation systems** running simultaneously:

| Layer | Technology | Effect |
|---|---|---|
| Background image | `next/image` + CSS | Ken Burns slow zoom (8s) |
| Gradient overlays | CSS (2 layers) | Cinematic dark vignette |
| Grain texture | CSS `@keyframes grain` | Film-grain noise flicker |
| Particle engine | Canvas + RAF | Golden floating dust |
| Headline | Framer Motion stagger | Letter-by-letter drop-in |
| Tagline / sub | Framer Motion | Fade-up sequence |
| CTAs | Framer Motion | Fade-up with delay |
| Scroll indicator | CSS `animation-scroll-bounce` | Bouncing line |

**Framer Motion orchestration pattern:**
```tsx
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
}
const letterVariants = {
  hidden: { opacity: 0, y: -20, rotateX: 40, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

// Usage:
<motion.h1 variants={containerVariants} initial="hidden" animate="visible">
  {'HARIS FRAGRANCE'.split('').map((ch, i) => (
    <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
      {ch === ' ' ? '\u00A0' : ch}
    </motion.span>
  ))}
</motion.h1>
```

---

## 📦 Data Layer — `lib/products.ts`

```typescript
export interface Product {
  id:          number
  name:        string
  category:    CategoryKey
  price:       number
  image:       string
  rating:      1 | 2 | 3 | 4 | 5
  reviews:     number
  badge:       string | null
  description: string
  notes: {
    top:    string[]
    middle: string[]
    base:   string[]
  }
}

export type CategoryKey = 'all' | 'edp' | 'attar' | 'oud' | 'oriental' | 'giftsets'

export const PRODUCTS: Product[] = [
  {
    id: 0, name: 'Royal Oud Intense', category: 'oud', price: 12500,
    image: '/perfum06.jpeg', rating: 5, reviews: 328, badge: 'BEST SELLER',
    description: 'A majestic blend of rare agarwood, saffron, and precious spices for the truly discerning.',
    notes: { top: ['Saffron', 'Bergamot', 'Pink Pepper'], middle: ['Rose', 'Jasmine', 'Oud'], base: ['Amber', 'Sandalwood', 'Musk'] },
  },
  {
    id: 1, name: 'Rose Elixir', category: 'oriental', price: 8500,
    image: '/perfum07.jpeg', rating: 5, reviews: 256, badge: 'POPULAR',
    description: 'An enchanting rose bouquet with jasmine heart and warm sandalwood base.',
    notes: { top: ['Rose', 'Lemon', 'Peach'], middle: ['Jasmine', 'Ylang-Ylang'], base: ['Sandalwood', 'Vanilla', 'Musk'] },
  },
  {
    id: 2, name: 'Black Musk Attar', category: 'attar', price: 6500,
    image: '/perfum08.jpeg', rating: 5, reviews: 412, badge: 'FAVORITE',
    description: 'Deep, sensual musk with amber and vanilla — a pure attar that never fades.',
    notes: { top: ['Bergamot', 'Black Pepper'], middle: ['Musk', 'Jasmine'], base: ['Amber', 'Vanilla', 'Patchouli'] },
  },
  {
    id: 3, name: 'Amber Gold EDP', category: 'edp', price: 9500,
    image: '/perfum09.jpeg', rating: 4, reviews: 189, badge: 'NEW',
    description: 'Luxurious amber with warm vanilla and woody base — opulent and unforgettable.',
    notes: { top: ['Amber', 'Orange Blossom'], middle: ['Vanilla', 'Jasmine'], base: ['Sandalwood', 'Musk'] },
  },
  {
    id: 4, name: 'Mystic Oud', category: 'oud', price: 15000,
    image: '/perfum01.jpg', rating: 5, reviews: 234, badge: 'PREMIUM',
    description: 'A mysterious blend of aged agarwood with exotic Eastern spices and leather.',
    notes: { top: ['Cardamom', 'Cinnamon'], middle: ['Oud', 'Rose'], base: ['Patchouli', 'Leather'] },
  },
  {
    id: 5, name: 'Silver Rose', category: 'edp', price: 7500,
    image: '/perfum02.jpg', rating: 4, reviews: 167, badge: 'NEW',
    description: 'Delicate rose with sparkling citrus and a soft musky drydown.',
    notes: { top: ['Grapefruit', 'Raspberry'], middle: ['Rose', 'Iris'], base: ['Musk', 'Amber'] },
  },
  {
    id: 6, name: 'Traditional Attar', category: 'attar', price: 4500,
    image: '/perfum03.jpg', rating: 4, reviews: 289, badge: null,
    description: 'Classic pure attar — rose and sandalwood in their most authentic, uncut form.',
    notes: { top: ['Pure Rose'], middle: ['Sandalwood'], base: ['Base Musk'] },
  },
  {
    id: 7, name: 'Evening Amber', category: 'oriental', price: 11000,
    image: '/perfum04.jpg', rating: 4, reviews: 145, badge: 'EVENING',
    description: 'Rich amber with warm spices perfectly composed for sophisticated evenings.',
    notes: { top: ['Cinnamon', 'Nutmeg'], middle: ['Amber', 'Vanilla'], base: ['Patchouli', 'Musk'] },
  },
  {
    id: 8, name: 'Royal Gift Set', category: 'giftsets', price: 25000,
    image: '/perfum05.jpg', rating: 5, reviews: 98, badge: 'GIFT',
    description: 'Three of our finest fragrances in a stunning luxury presentation box.',
    notes: { top: ['Various'], middle: ['Various'], base: ['Various'] },
  },
  {
    id: 9, name: 'Fresh Citrus EDP', category: 'edp', price: 5500,
    image: '/perfum06.jpeg', rating: 4, reviews: 312, badge: 'FRESH',
    description: 'Energizing citrus tempered by green tea and clean musk — perfect every day.',
    notes: { top: ['Lemon', 'Lime', 'Bergamot'], middle: ['Jasmine', 'Green Tea'], base: ['Musk', 'Sandalwood'] },
  },
  {
    id: 10, name: 'Oud Al Hind', category: 'oud', price: 18000,
    image: '/perfum07.jpeg', rating: 5, reviews: 178, badge: 'RARE',
    description: 'Rare Indian agarwood of exceptional depth and age — a collector\'s treasure.',
    notes: { top: ['Spices', 'Resins'], middle: ['Aged Oud'], base: ['Woody Notes'] },
  },
  {
    id: 11, name: 'Floral Attar', category: 'attar', price: 5500,
    image: '/perfum08.jpeg', rating: 4, reviews: 201, badge: null,
    description: 'Pure floral attar with jasmine and mogra — light, feminine, softly intoxicating.',
    notes: { top: ['Jasmine'], middle: ['Mogra', 'Rose'], base: ['Sandalwood'] },
  },
  {
    id: 12, name: 'Spice Market', category: 'oriental', price: 8900,
    image: '/perfum09.jpeg', rating: 4, reviews: 156, badge: 'EXOTIC',
    description: 'Exotic spices swirl with warm vanilla — a journey through ancient bazaars.',
    notes: { top: ['Cinnamon', 'Cardamom'], middle: ['Clove', 'Nutmeg'], base: ['Vanilla', 'Amber'] },
  },
  {
    id: 13, name: 'Couple Gift Set', category: 'giftsets', price: 18000,
    image: '/perfum10.jpg', rating: 5, reviews: 87, badge: 'COUPLE',
    description: 'Complementary His & Her fragrances in one luxurious presentation.',
    notes: { top: ['Various'], middle: ['Various'], base: ['Various'] },
  },
  {
    id: 14, name: 'Midnight Oud', category: 'oud', price: 13500,
    image: '/perfum11.jpeg', rating: 5, reviews: 223, badge: 'MIDNIGHT',
    description: 'Dark, intense oud built for after dark — bold, commanding, deeply seductive.',
    notes: { top: ['Black Pepper', 'Saffron'], middle: ['Oud', 'Rose'], base: ['Leather', 'Musk'] },
  },
  {
    id: 15, name: 'Citrus Blossom', category: 'edp', price: 6500,
    image: '/perfum01.jpg', rating: 4, reviews: 189, badge: 'SPRING',
    description: 'Vibrant citrus meets delicate orange blossom — the freshness of spring.',
    notes: { top: ['Orange', 'Lemon'], middle: ['Orange Blossom', 'Jasmine'], base: ['Musk', 'White Wood'] },
  },
  {
    id: 16, name: 'Sandalwood Special', category: 'attar', price: 7500,
    image: '/perfum02.jpg', rating: 5, reviews: 267, badge: 'SPECIAL',
    description: 'Pure Mysore sandalwood attar — creamy, sacred, incomparably smooth.',
    notes: { top: ['Sandalwood'], middle: ['Sandalwood'], base: ['Sandalwood'] },
  },
  {
    id: 17, name: 'Luxury Collection Box', category: 'giftsets', price: 35000,
    image: '/perfum03.jpg', rating: 5, reviews: 45, badge: 'ULTIMATE',
    description: 'Five signature fragrances in a collector\'s edition luxury box.',
    notes: { top: ['Various'], middle: ['Various'], base: ['Various'] },
  },
]
```

---

## 🎭 State Architecture

### FilterContext — `context/FilterContext.tsx`

```typescript
'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { CategoryKey } from '@/lib/products'

interface FilterContextValue {
  activeCategory: CategoryKey
  setFilter: (cat: CategoryKey) => void
}

const FilterContext = createContext<FilterContextValue>({
  activeCategory: 'all',
  setFilter: () => {},
})

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')

  const setFilter = useCallback((cat: CategoryKey) => {
    setActiveCategory(cat)
    // Auto-scroll to product section when triggered from category showcase
    if (cat !== 'all') {
      const el = document.getElementById('products')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <FilterContext.Provider value={{ activeCategory, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
```

> **Critical:** Both `<CategoryShowcase>` and `<ProductGrid>` import `useFilter()`. They both read `activeCategory` and call `setFilter()`. There is **one source of truth** — never two `useState` hooks trying to sync.

### ModalContext — `context/ModalContext.tsx`

```typescript
'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Product } from '@/lib/products'

type ModalScreen = 'product' | 'checkout' | null

interface ModalContextValue {
  activeProduct: Product | null
  modalScreen:   ModalScreen
  openProduct:   (product: Product) => void
  openCheckout:  () => void
  closeModal:    () => void
  backToProduct: () => void
}

const ModalContext = createContext<ModalContextValue>({} as ModalContextValue)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [modalScreen,   setModalScreen  ] = useState<ModalScreen>(null)

  const openProduct  = useCallback((p: Product) => { setActiveProduct(p); setModalScreen('product') }, [])
  const openCheckout = useCallback(() => setModalScreen('checkout'), [])
  const closeModal   = useCallback(() => { setModalScreen(null); setActiveProduct(null) }, [])
  const backToProduct = useCallback(() => setModalScreen('product'), [])

  return (
    <ModalContext.Provider value={{ activeProduct, modalScreen, openProduct, openCheckout, closeModal, backToProduct }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
```

### Global State in `app/page.tsx`

```tsx
import { FilterProvider } from '@/context/FilterContext'
import { ModalProvider }  from '@/context/ModalContext'
// ... all section imports

export default function HomePage() {
  return (
    <FilterProvider>
      <ModalProvider>
        <ScrollProgressBar />
        <AmbientBackground />
        <Navbar />
        <main>
          <HeroSection />
          <MarqueeStrip />
          <BrandStory />
          <StatsStrip />
          <BrandPillars />
          <CategoryShowcase />
          <ProductGrid />
          <Bestsellers />
          <OurPromise />
          <Newsletter />
        </main>
        <Footer />
        {/* Portals */}
        <ProductModal />
        <WhatsAppButton />
        <BackToTop />
      </ModalProvider>
    </FilterProvider>
  )
}
```

---

## 🛍 Product Filter — React Implementation

```tsx
// ProductGrid.tsx (simplified)
'use client'
import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFilter } from '@/context/FilterContext'
import { PRODUCTS } from '@/lib/products'

export default function ProductGrid() {
  const { activeCategory, setFilter } = useFilter()

  const filtered = useMemo(
    () => activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <section id="products">
      {/* Filter Pills */}
      <FilterBar active={activeCategory} onFilter={setFilter} />

      {/* Product Grid with AnimatePresence for smooth enter/exit */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.5, ease: [0.16,1,0.3,1] } }}
              exit={{ opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.2 } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
```

> `AnimatePresence mode="popLayout"` handles card enter + exit animations natively. No manual `cardFadeOut` CSS needed — Framer Motion manages it. Cards never disappear instantly.

---

## 🎭 Modal System — React Portal Implementation

```tsx
// ProductModal.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useModal } from '@/context/ModalContext'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import Image from 'next/image'

type NoteType = 'top' | 'middle' | 'base'
const VOLUMES = ['30ml', '50ml', '100ml'] as const

export default function ProductModal() {
  const { activeProduct, modalScreen, closeModal, openCheckout } = useModal()
  const [selVolume, setSelVolume] = useState<string>('30ml')
  const [selQty,    setSelQty   ] = useState(1)
  const [activeNote, setActiveNote] = useState<NoteType>('top')
  const isOpen = modalScreen === 'product'

  useBodyScrollLock(isOpen)

  // Reset when product changes
  useEffect(() => {
    if (activeProduct) { setSelVolume('30ml'); setSelQty(1); setActiveNote('top') }
  }, [activeProduct])

  const volumePrice = (v: string) => {
    if (!activeProduct) return 0
    if (v === '30ml')  return activeProduct.price
    if (v === '50ml')  return Math.round(activeProduct.price * 1.5)
    if (v === '100ml') return Math.round(activeProduct.price * 2.5)
    return 0
  }

  const totalPrice = volumePrice(selVolume) * selQty

  // Keyboard dismiss
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

  if (typeof window === 'undefined') return null // SSR guard

  return createPortal(
    <AnimatePresence>
      {isOpen && activeProduct && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(6,4,2,0.92)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-brand-card border border-brand-goldMuted/20 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm"
            initial={{ y: 30, scale: 0.97, opacity: 0 }}
            animate={{ y: 0,  scale: 1,    opacity: 1, transition: { duration: 0.4, ease: [0.16,1,0.3,1] } }}
            exit={{ y: 20, scale: 0.97, opacity: 0, transition: { duration: 0.25 } }}
            onClick={e => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative min-h-[380px] bg-brand-bg">
                <Image src={activeProduct.image} alt={activeProduct.name} fill className="object-cover" />
                <button onClick={closeModal} className="modal-close-btn absolute top-4 right-4" aria-label="Close modal">
                  <i className="ri-close-line" />
                </button>
              </div>

              {/* Details */}
              <div className="p-8 flex flex-col">
                {activeProduct.badge && (
                  <span className="self-start px-3 py-1 bg-brand-gold text-brand-bg font-cinzel text-[0.55rem] tracking-[0.15em] rounded-full mb-3">
                    {activeProduct.badge}
                  </span>
                )}
                <h3 className="font-cinzel text-xl font-bold text-white mb-3">{activeProduct.name}</h3>

                {/* Stars + Reviews */}
                <StarRating rating={activeProduct.rating} reviews={activeProduct.reviews} />

                {/* Notes Tabs */}
                <NotesTabs product={activeProduct} active={activeNote} onChange={setActiveNote} />

                {/* Volume */}
                <VolumeSelector volumes={VOLUMES} selected={selVolume} onSelect={setSelVolume} priceOf={volumePrice} />

                {/* Qty */}
                <QtyControl qty={selQty} onChange={setSelQty} />

                {/* Price + CTA */}
                <div className="mt-auto pt-5 border-t border-brand-goldDim">
                  <p className="font-cinzel text-brand-gold text-2xl mb-4">Rs. {totalPrice.toLocaleString()}</p>
                  <button onClick={openCheckout} className="btn-gold w-full mb-3">Proceed to Checkout →</button>
                  <button className="btn-outline w-full"><i className="ri-heart-line mr-2" />Add to Wishlist</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
```

---

## 💬 WhatsApp Integration — `lib/whatsapp.ts`

```typescript
interface OrderDetails {
  product:  { name: string; price: number }
  volume:   string
  qty:      number
  customer: { name: string; phone: string; city: string; address: string; notes?: string }
}

function getVolumePrice(basePrice: number, volume: string): number {
  if (volume === '50ml')  return Math.round(basePrice * 1.5)
  if (volume === '100ml') return Math.round(basePrice * 2.5)
  return basePrice
}

export function buildWhatsAppMessage(order: OrderDetails): string {
  const unitPrice = getVolumePrice(order.product.price, order.volume)
  const subtotal  = unitPrice * order.qty
  const total     = subtotal + 200

  return `🌸 *New Order — Haris Fragrance*
━━━━━━━━━━━━━━━━━━━━━━━━
🛍 *Product:* ${order.product.name}
📦 *Volume:* ${order.volume}
🔢 *Qty:* ${order.qty}
💰 *Subtotal:* Rs. ${subtotal.toLocaleString()}
🚚 *Delivery:* Rs. 200
✅ *Total:* Rs. ${total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer:*
Name: ${order.customer.name}
Phone: ${order.customer.phone}
City: ${order.customer.city}
Address: ${order.customer.address}${order.customer.notes ? `\nNotes: ${order.customer.notes}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━
Please confirm my order. Thank you! ✨`
}

export const WA_NUMBER = '923153223496'

export function openWhatsApp(message: string): void {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}
```

---

## 🪝 Custom Hooks

### `useScrolled.ts`
```typescript
'use client'
import { useState, useEffect } from 'react'

export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}
```

### `useBodyScrollLock.ts`
```typescript
'use client'
import { useEffect } from 'react'

export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [locked])
}
```

### `useRevealOnScroll.ts`
```typescript
'use client'
import { useEffect, useRef, useState } from 'react'

export function useRevealOnScroll(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, revealed }
}
```

---

## 🏁 Acceptance Checklist

### Architecture
- [ ] Next.js 14 App Router, all files in `app/` directory
- [ ] TypeScript strict mode — zero `any` types
- [ ] No class components, no pages router, no getServerSideProps
- [ ] All images via `next/image`, all fonts via `next/font/google`
- [ ] Zero CDN script or link tags in layout (no Tailwind CDN, no Remix Icon CDN)

### Design Preservation (Compare Side-by-Side with Reference)
- [ ] Color palette is pixel-perfect: same exact hex values as reference
- [ ] All 10 sections present in correct order
- [ ] Typography — Cinzel / Cormorant Garamond / Jost / Dancing Script render correctly
- [ ] Gold ornament dividers appear in all section headers
- [ ] Gold frame corners visible on story and promise images
- [ ] Navbar transparent at top, glass-morphism after 80px scroll
- [ ] Mobile hamburger drawer slides in from right, links stagger in

### Background Animations
- [ ] Hero: Canvas particle engine runs at 60fps, pauses when tab hidden
- [ ] Hero: Particles repel from mouse cursor within 80px
- [ ] Hero: Ken Burns slow zoom on background image (8s)
- [ ] Hero: Grain flicker overlay visible (subtle)
- [ ] All sections: Ambient blob animation drifts behind content
- [ ] Headline: Letters drop in one by one with blur+fade on page load
- [ ] Scroll indicator bounces continuously at hero bottom

### Product & Filter System
- [ ] All 18 products render on first page load — no empty state ever
- [ ] `FilterContext` has ONE `activeCategory` state — both category cards and filter pills read from it
- [ ] Clicking a category card scrolls to product section AND activates the matching pill
- [ ] Clicking a filter pill activates the matching category card
- [ ] `AnimatePresence` handles card exit animation — no card disappears instantly
- [ ] Filter stagger: cards animate in with 40ms per-card delay

### Modal System
- [ ] Clicking product card opens Screen 1 (Product Detail) via portal
- [ ] "Proceed to Checkout" opens Screen 2 — modal stays open, screen cross-fades
- [ ] Clicking backdrop, pressing ESC, or close button closes modal
- [ ] Body scroll locked while modal open, restored on close
- [ ] Volume selector updates price in real-time
- [ ] Qty +/− clamped between 1 and 10

### WhatsApp
- [ ] Checkout form requires: name, phone, city, address (all required)
- [ ] WhatsApp message format matches reference byte-for-byte
- [ ] Opens in new tab with `noopener,noreferrer`
- [ ] Floating WhatsApp button always visible (z-index: 9999), has tooltip on hover

### Performance
- [ ] Lighthouse ≥ 90 Performance (desktop)
- [ ] Lighthouse ≥ 95 Accessibility
- [ ] No console errors or warnings in production build
- [ ] `next build` completes with zero type errors

---

## 💡 Senior Developer Notes

1. **Canvas cleanup is mandatory.** Every `useParticleEngine` must cancel its RAF on unmount. Use `useEffect` return to `cancelAnimationFrame(animFrameRef.current)`. Memory leaks from un-cancelled RAF loops cause severe performance degradation.

2. **`'use client'` is not a free pass.** Only leaf components that need browser APIs (Canvas, scroll, mouse events) get `'use client'`. Section containers should be server components where possible. The less client JS, the faster the initial paint.

3. **`AnimatePresence` requires stable keys.** The product `id` (number) is the key for `AnimatePresence` children — never the array index. Using index as key breaks exit animations when filtering.

4. **Portal SSR guard.** `createPortal` requires `document.body` which doesn't exist during SSR. Guard with `if (typeof window === 'undefined') return null` or use a `mounted` state.

5. **`next/image` sizes prop is mandatory for layout images.** Every `<Image>` with `fill` must have a `sizes` prop to prevent over-fetching. Example: `sizes="(max-width: 768px) 100vw, 50vw"`.

6. **Filter context must NOT trigger a full page re-render.** The `FilterProvider` wraps only `CategoryShowcase` and `ProductGrid` — not the entire page. This keeps filter changes isolated to those two components.

7. **Framer Motion `layout` prop causes layout recalculation.** Only apply `layout` to product cards inside the grid — not to the grid container itself. Apply `layout="position"` (not `layout`) to minimize reflow cost.

8. **Grain overlay must use `will-change: transform`.** The `grain` animation shifts `transform`, which triggers GPU compositing. Without `will-change: transform`, it causes main-thread painting every frame.

9. **Background blobs are `position: fixed`, not `position: absolute`.** Fixed positioning means the blobs drift independently of scroll, creating a true parallax depth effect without any JS scroll listener.

10. **Type your WhatsApp handler strictly.** The checkout form state should be a typed interface `CustomerFormData`. Never use `(document.getElementById(...) as HTMLInputElement).value` — use React controlled inputs with `useState<CustomerFormData>`.

---

## 🚀 Getting Started

```bash
# 1. Create Next.js project
npx create-next-app@latest haris-fragrance \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

# 2. Install animation + utility dependencies
npm install framer-motion clsx tailwind-merge remixicon

# 3. Copy all product images to /public/

# 4. Build and verify
npm run build && npm run start

# 5. Lighthouse audit (must score ≥ 90 Performance, ≥ 95 Accessibility)
npx lighthouse http://localhost:3000 --view
```

---

*Built for Haris Fragrance — Karachi, Pakistan | React + Next.js | Version 3.0*
