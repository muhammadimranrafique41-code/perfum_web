# 🖤 Noir Éternel — Senior Frontend Developer Specification
**Document Version:** 2.0  
**Status:** Production-Ready  
**Reference Plan:** `implement_plan_landingpage.md`  
**Last Updated:** 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Developer Role & Mandate](#2-developer-role--mandate)
3. [Pre-Requisites & Environment Setup](#3-pre-requisites--environment-setup)
4. [Technical Stack](#4-technical-stack)
5. [Folder Architecture](#5-folder-architecture)
6. [Design System & Tokens](#6-design-system--tokens)
7. [Animation Architecture](#7-animation-architecture)
8. [Component Specifications](#8-component-specifications)
9. [Scroll & Parallax Behavior](#9-scroll--parallax-behavior)
10. [Image Usage Rules](#10-image-usage-rules)
11. [Responsive Design Contracts](#11-responsive-design-contracts)
12. [Performance & Accessibility Standards](#12-performance--accessibility-standards)
13. [Quality Gates](#13-quality-gates)
14. [Deliverables Checklist](#14-deliverables-checklist)
15. [Execution Order](#15-execution-order)

---

## 1. Project Overview

| Field | Detail |
|---|---|
| **Project Name** | Noir Éternel — Landing Page |
| **Type** | Luxury Fragrance Brand — Single Page Application |
| **Reference Site** | `https://noireternel.vercel.app/` |
| **Core Mandate** | Recreate the site's dark, cinematic soul — **without any right-side product/bottle asset on any viewport** |
| **Emotional Target** | Explosive elegance · Controlled darkness · Sensory provocation |
| **Primary Font** | Cormorant Garamond (headings) + Montserrat (body) |
| **Brand Color** | Near-black `#0a0a0a` background · Warm off-white `#e5e5e5` text |

> **⚠️ Golden Rule:** `implement_plan_landingpage.md` is the single source of truth. If any conflict arises between this document, the reference site, or this prompt — the plan file wins. Preserve the site's *soul*; override its *structure* where necessary.

---

## 2. Developer Role & Mandate

```
Role:     Senior Frontend Developer
Stack:    Next.js 14 · TypeScript · Tailwind CSS · Framer Motion
Context:  Luxury brand — every pixel carries weight
Standard: Production-grade, typed, documented, performance-optimised
```

### Guiding Principles

- **Intentionality over decoration.** Every animation, spacing choice, and typographic decision must serve the brand's emotional narrative.
- **Restraint is power.** Dark luxury design is defined by what is *not* shown as much as what is.
- **No layout debt.** Components must be self-contained, typed, and composable.
- **Zero placeholders.** Only the client's five provided images are used — never stock assets or gradients as primary visuals.
- **Forbidden element.** A right-column image of a bottle or product is banned across all breakpoints. This is non-negotiable.

---

## 3. Pre-Requisites & Environment Setup

### 3.1 One-Time Bootstrap

```bash
# 1. Scaffold the project
npx create-next-app@latest noir-eternel \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd noir-eternel

# 2. Install core dependencies
npm install framer-motion clsx tailwind-merge

# 3. Install dev utilities
npm install -D @types/node prettier eslint-config-prettier

# 4. Install taste-skill design guidelines
npx skills add Leonxlnx/taste-skill
```

### 3.2 Environment Validation

Before writing any component, confirm the following:

```bash
node --version     # v20+ required
npm --version      # v10+ required
ls public/images/  # Must list: 01.JPG  1.1.JPG  02.JPG  03.JPG  05.JPG
```

> **If any image is missing:** halt and request it from the client. Do not substitute.

---

## 4. Technical Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 14+ | `use client` only where motion is required |
| Language | TypeScript | 5.x | Strict mode — no `any`, no `@ts-ignore` |
| Styling | Tailwind CSS | 3.x | Extend with brand tokens in `tailwind.config.js` |
| Animation | Framer Motion | 11.x | `useScroll`, `useTransform`, `whileInView` |
| Fonts | `next/font/google` | — | Cormorant Garamond + Montserrat — no FOUT |
| Linting | ESLint + Prettier | — | Enforce on save |
| Deployment | Vercel | — | Zero-config, edge-optimised |

### 4.1 TypeScript — Strict Config (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "paths": { "@/*": ["./*"] }
  }
}
```

---

## 5. Folder Architecture

```
noir-eternel/
│
├── public/
│   └── images/
│       ├── 01.JPG          ← Story section background
│       ├── 1.1.JPG         ← Atelier section background
│       ├── 02.JPG          ← Collection section background
│       ├── 03.JPG          ← Atmosphere / accent
|       ├──3.3.JPG
|       ├── 04.JPG
│       └── 05.JPG          ← Fragrance section background
│
├── app/
│   ├── layout.tsx          ← Root layout: fonts, metadata, globals
│   ├── page.tsx            ← Section orchestrator (assembles all components)
│   └── globals.css         ← CSS reset, custom properties, noise texture
│
├── components/
│   ├── Navbar.tsx          ← Fixed navigation, scroll-aware
│   ├── Hero.tsx            ← Full-viewport entry section
│   ├── Story.tsx           ← Brand origin narrative + 01.JPG
│   ├── Atelier.tsx         ← Craft & process + 1.1.JPG
│   ├── Collection.tsx      ← Product grid overview + 02.JPG
│   ├── Fragrance.tsx       ← Feature fragrance + 05.JPG
│   └── Footer.tsx          ← Links, legal, social
│
├── hooks/
│   ├── useScrollAnimation.ts   ← Reusable scroll progress + parallax hook
│   └── useNavScroll.ts         ← Navbar transparency / color transitions
│
├── lib/
│   ├── animations.ts       ← Framer Motion variant library
│   └── utils.ts            ← clsx + tailwind-merge helper (cn())
│
├── types/
│   └── index.ts            ← Shared TypeScript interfaces & types
│
├── implement_plan_landingpage.md   ← ⚠️ READ FIRST — authoritative plan
├── tailwind.config.js
├── next.config.js
├── .eslintrc.json
├── .prettierrc
├── README.md
└── package.json
```

---

## 6. Design System & Tokens

### 6.1 Global CSS (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* ── Brand Palette ── */
  --color-bg:          #0a0a0a;
  --color-surface:     #111111;
  --color-border:      #1f1f1f;
  --color-text:        #e5e5e5;
  --color-muted:       #888888;
  --color-accent:      #c9a96e;   /* warm gold — use sparingly */
  --color-accent-dim:  #7a6441;

  /* ── Typography Scale ── */
  --font-display:      'Cormorant Garamond', Georgia, serif;
  --font-body:         'Montserrat', system-ui, sans-serif;

  /* ── Spacing Rhythm ── */
  --section-padding-y: clamp(5rem, 12vw, 10rem);
  --section-padding-x: clamp(1.5rem, 6vw, 8rem);

  /* ── Motion Timing ── */
  --ease-luxury:       cubic-bezier(0.2, 0.9, 0.4, 1.0);
  --ease-snap:         cubic-bezier(0.16, 1, 0.3, 1);
  --duration-slow:     900ms;
  --duration-medium:   600ms;
  --duration-fast:     350ms;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  overflow-x: hidden;
}

/* ── Noise Texture Overlay ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.35;
}

/* ── Selection Style ── */
::selection {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

/* ── Scrollbar ── */
::-webkit-scrollbar        { width: 3px; }
::-webkit-scrollbar-track  { background: var(--color-bg); }
::-webkit-scrollbar-thumb  { background: var(--color-accent-dim); border-radius: 3px; }
```

### 6.2 Tailwind Config (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:         '#0a0a0a',
        surface:    '#111111',
        border:     '#1f1f1f',
        'text-primary': '#e5e5e5',
        muted:      '#888888',
        accent:     '#c9a96e',
        'accent-dim': '#7a6441',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(4rem, 10vw, 9rem)',   { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 6rem)',  { lineHeight: '1.0',  letterSpacing: '-0.015em' }],
        'display-lg':  ['clamp(2rem, 4vw, 4rem)',    { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'label':       ['0.6875rem',                  { lineHeight: '1.5',  letterSpacing: '0.2em' }],
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.2, 0.9, 0.4, 1.0)',
        snap:   'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        slow:   '900ms',
        medium: '600ms',
      },
    },
  },
  plugins: [],
};
```

---

## 7. Animation Architecture

### 7.1 Shared Variants (`lib/animations.ts`)

```ts
import type { Variants } from 'framer-motion';

// ── Easing presets (taste-skill compliant) ──────────────────────────────────
export const EASE_LUXURY  = [0.2, 0.9, 0.4, 1.0] as const;
export const EASE_SNAP    = [0.16, 1, 0.3, 1]    as const;
export const EASE_OUT     = [0.0, 0.0, 0.2, 1.0] as const;

// ── Viewport defaults ───────────────────────────────────────────────────────
export const VIEWPORT_ONCE = { once: true, amount: 0.25 } as const;

// ── Reusable variants ───────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_LUXURY } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_SNAP } },
};

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE_LUXURY } },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_LUXURY } },
};

export const lineReveal: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE_LUXURY, delay: 0.3 } },
};
```

### 7.2 Scroll Hook (`hooks/useScrollAnimation.ts`)

```ts
'use client';

import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationConfig {
  inputRange?:  [number, number];
  outputRange?: [number, number];
}

interface ScrollAnimationReturn {
  ref:      React.RefObject<HTMLElement>;
  opacity:  MotionValue<number>;
  y:        MotionValue<number>;
  scale:    MotionValue<number>;
}

export function useScrollAnimation(config: ScrollAnimationConfig = {}): ScrollAnimationReturn {
  const {
    inputRange  = [0, 1],
    outputRange = [0, -80],
  } = config;

  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target:  ref,
    offset:  ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, inputRange, outputRange);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [0.97, 1]);

  return { ref, opacity, y, scale };
}
```

---

## 8. Component Specifications

> **Universal rules for every component:**
> - Wrap in `motion.section` with `initial="hidden"` / `whileInView="visible"` / `viewport={VIEWPORT_ONCE}`
> - Section image goes `absolute inset-0`, `object-cover`, `opacity-[0.15]` to `opacity-[0.22]`
> - Padding: `py-[var(--section-padding-y)] px-[var(--section-padding-x)]`
> - **No right-column image. No product/bottle on the right side. Ever.**

---

### 8.1 `Navbar.tsx`

| Property | Value |
|---|---|
| Position | `fixed top-0 left-0 right-0 z-50` |
| Default state | Background `transparent`, border `border-b border-transparent` |
| Scrolled state | Background `bg-bg/90 backdrop-blur-md`, border `border-border` |
| Transition | `transition-all duration-medium ease-luxury` |
| Logo | Brand wordmark in Cormorant Garamond italic, `text-xl tracking-[0.3em]` |
| Nav links | `text-label font-body tracking-[0.2em] uppercase text-muted hover:text-text-primary` |
| CTA button | Outlined pill: `border border-accent text-accent hover:bg-accent hover:text-bg` |

```tsx
// Scroll-aware transparency
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

---

### 8.2 `Hero.tsx`

| Property | Value |
|---|---|
| Height | `min-h-screen` (100dvh) |
| Image | None (dark atmospheric gradient only) — focus is typography |
| Headline | Display-2xl, Cormorant Garamond, centered or left-aligned per plan |
| Sub-copy | `text-label tracking-[0.4em] text-muted uppercase` |
| Entry animation | Staggered fade-up — tagline first, headline second, CTA third |
| CTA | Ghost button linking to `#fragrance` section |
| Forbidden | ❌ No product image column on the right |

```tsx
// Hero entry — staggered with 200ms delay per element
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.6 } }
};
```

---

### 8.3 `Story.tsx`

| Property | Value |
|---|---|
| Background image | `01.JPG` · `opacity-[0.18]` |
| Layout | Single column, generous padding, left-aligned text |
| Headline | Display-xl, Cormorant Garamond |
| Body | Montserrat, `text-sm leading-[1.9] text-muted max-w-prose` |
| Accent | Thin horizontal rule (`motion.div` with `lineReveal` variant, `bg-accent`) |
| Animation | `fadeUp` on heading, `staggerContainer` on body paragraphs |

---

### 8.4 `Atelier.tsx`

| Property | Value |
|---|---|
| Background image | `1.1.JPG` · `opacity-[0.20]` |
| Layout | Centered text block + optional grid of 2 stat/fact cards |
| Headline | Display-lg, italic Cormorant |
| Cards | `bg-surface border border-border rounded-none` — no border-radius (brand is sharp) |
| Animation | `scaleIn` on section enter, `staggerItem` on cards |

---

### 8.5 `Collection.tsx`

| Property | Value |
|---|---|
| Background image | `02.JPG` · `opacity-[0.15]` |
| Layout | 1-column on mobile · 2-column on md+ · **no right-side product asset** |
| Items | Text-only cards with label, name, price line — no bottle images |
| Hover | Underline reveal via `motion.span` with `scaleX` transform |
| Animation | `staggerContainer` with `staggerItem` per card |

> **⚠️ Warning:** The collection grid must NOT render any product photography. Text and atmospheric backgrounds only.

---

### 8.6 `Fragrance.tsx` — ⭐ Hero Feature Section

| Property | Value |
|---|---|
| Background image | `05.JPG` · `opacity-[0.22]` |
| Section ID | `id="fragrance"` (CTA target) |
| Required copy | `EXPLOSIVE ELEGANCE` · `Georgiemar` · `black pepper` · `IGNITES SENSES` |
| Headline treatment | Oversized display text, some words in `text-accent` |
| Body | Fragrance notes listed as spaced labels (not bullets) |
| Animation | Parallax on background image (`useScrollAnimation`), `fadeUp` on text |
| Layout | Centered single column — no right-side element |

```tsx
// Fragrance notes presentation example
const notes = ['Black Pepper', 'Oud Wood', 'Bergamot', 'Amber Resin'];
// Render as: PEPPER · OUD · BERGAMOT · AMBER
```

---

### 8.7 `Footer.tsx`

| Property | Value |
|---|---|
| Background | `bg-surface border-t border-border` |
| Layout | 3-column on desktop · stacked on mobile |
| Columns | Brand logo/tagline · Navigation links · Social + legal |
| Typography | `text-label text-muted` throughout |
| Animation | Simple `fadeIn` on mount |

---

## 9. Scroll & Parallax Behavior

| Element | Scroll Effect | Implementation |
|---|---|---|
| Section background images | Move at 60% foreground scroll speed (parallax) | `useTransform(scrollYProgress, [0,1], ['0%', '15%'])` on `y` |
| Section headlines | Fade up from `y: 40px` → `y: 0` | `whileInView` + `fadeUp` variant |
| Navbar background | Transparent → `bg/90` after 60px scroll | `useEffect` + `window.addEventListener('scroll')` |
| Fragrance background | Deeper parallax (20% shift) | `useScrollAnimation({ outputRange: [0, -120] })` |
| Hero tagline | Fades out on scroll-away | `useTransform(heroScrollProgress, [0, 0.4], [1, 0])` |

### Parallax Image Pattern

```tsx
// Inside any section component:
const { ref, y } = useScrollAnimation({ outputRange: [0, -80] });

<section ref={ref} className="relative overflow-hidden ...">
  <motion.div style={{ y }} className="absolute inset-0">
    <Image
      src="/images/05.JPG"
      alt=""          // decorative — empty alt
      fill
      sizes="100vw"
      className="object-cover opacity-[0.2]"
      priority={false}
      aria-hidden="true"
    />
  </motion.div>
  {/* Foreground content */}
</section>
```

---

## 10. Image Usage Rules

| Image | Section | Opacity | Usage |
|---|---|---|---|
| `01.JPG` | Story | `0.18` | Full-bleed absolute background |
| `1.1.JPG` | Atelier | `0.20` | Full-bleed absolute background |
| `02.JPG` | Collection | `0.15` | Full-bleed absolute background |
| `03.JPG` | Accent / transitional use | `0.12` | Optional — between sections or in footer |
| `05.JPG` | Fragrance | `0.22` | Full-bleed absolute background (deepest) |

### Absolute Rules

1. ✅ Images are **always** `position: absolute; inset: 0; object-fit: cover`
2. ✅ Images are **always** `aria-hidden="true"` with `alt=""`
3. ✅ Image opacity is **always** below `0.25`
4. ❌ **NEVER** place any image in a right-side column
5. ❌ **NEVER** show a product bottle or packshot in any layout column
6. ❌ **NEVER** use images as foreground content elements

---

## 11. Responsive Design Contracts

| Breakpoint | Alias | Width | Behaviour |
|---|---|---|---|
| Mobile | `sm` | `< 640px` | Single column · `text-display-lg` for hero · nav collapses to hamburger |
| Tablet | `md` | `640–1024px` | Wider padding · `text-display-xl` for hero |
| Desktop | `lg+` | `> 1024px` | Full layout · `text-display-2xl` for hero · nav fully visible |

### Font Scaling Strategy

Use `clamp()` for fluid typography — no layout shifts between breakpoints:

```css
/* Hero headline — fluid from 2.5rem → 9rem */
font-size: clamp(2.5rem, 8vw + 1rem, 9rem);
```

### Mobile Hamburger Menu

```tsx
// State-driven, animated with Framer Motion
const [open, setOpen] = useState(false);
// Menu items animate with staggerChildren: 0.08
// Backdrop: motion.div with opacity 0 → 0.85
```

---

## 12. Performance & Accessibility Standards

### Performance

- Use `next/image` for all images with `fill`, `sizes`, and explicit `priority` on above-fold
- Enable `next/font` for zero FOUT on both typefaces
- All animations gated behind `prefers-reduced-motion`:

```ts
// lib/animations.ts
import { useReducedMotion } from 'framer-motion';

export function useAccessibleVariants(variants: Variants): Variants {
  const reduce = useReducedMotion();
  if (!reduce) return variants;
  // Strip motion, keep opacity only
  return {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  };
}
```

- Target **Lighthouse score ≥ 90** on all four metrics (Performance, Accessibility, Best Practices, SEO)
- Image formats: serve WebP via `next/image` automatic optimisation

### Accessibility

- All interactive elements have visible `:focus-visible` outlines (gold ring)
- Decorative images: `alt=""` + `aria-hidden="true"`
- Nav links have `aria-current="page"` when active
- Color contrast ratio ≥ 4.5:1 for all body text
- Skip-to-main-content link as first focusable element

---

## 13. Quality Gates

All gates must pass before delivery. No exceptions.

```
VISUAL INTEGRITY
─────────────────────────────────────────────────────────────────────
[ ] No right-side product/bottle asset on any viewport (320px–2560px)
[ ] All five images used as atmospheric backgrounds (opacity < 0.25)
[ ] Dark luxury emotion is immediately felt within 2 seconds of load

ANIMATION QUALITY
─────────────────────────────────────────────────────────────────────
[ ] Scroll animations trigger exactly once per section (once: true)
[ ] No janky reflows — animations use transform/opacity only
[ ] Parallax on background images (foreground scrolls faster)
[ ] taste-skill easing curves applied: [0.2, 0.9, 0.4, 1.0]
[ ] prefers-reduced-motion respected — all animations stripped

CONTENT ACCURACY
─────────────────────────────────────────────────────────────────────
[ ] "EXPLOSIVE ELEGANCE" present in Fragrance section
[ ] "Georgiemar" fragrance name present
[ ] "black pepper" noted in fragrance composition
[ ] "IGNITES SENSES" copy present

TECHNICAL STANDARDS
─────────────────────────────────────────────────────────────────────
[ ] TypeScript strict mode — zero errors, zero warnings
[ ] No ESLint errors
[ ] next/image used for all images
[ ] next/font used for Cormorant Garamond + Montserrat
[ ] Lighthouse Performance ≥ 90
[ ] Lighthouse Accessibility ≥ 95
[ ] Responsive: tested at 375px, 768px, 1280px, 1920px

CODE QUALITY
─────────────────────────────────────────────────────────────────────
[ ] All components typed (no implicit any)
[ ] Shared animation variants in lib/animations.ts
[ ] No inline styles — Tailwind utility classes only
[ ] README complete with install + run instructions
```

---

## 14. Deliverables Checklist

```
📁 Source Code
  ├── Full Next.js project matching folder structure in §5
  ├── All 7 components implemented (Navbar, Hero, Story, Atelier,
  │   Collection, Fragrance, Footer)
  ├── Shared hooks and animation library
  └── TypeScript strict — zero errors

📄 Documentation
  ├── README.md
  │   ├── Project overview
  │   ├── Prerequisites
  │   ├── npm install
  │   ├── npm run dev
  │   ├── npm run build
  │   └── Environment variables (if any)
  └── implement_plan_landingpage.md (updated/confirmed)

🚀 Deployment
  ├── Vercel project linked to repository
  ├── Preview URL shared with client
  └── Custom domain configured (if provided)
```

---

## 15. Execution Order

Follow this exact sequence. Do not skip or reorder steps.

```
Step 01 │ READ implement_plan_landingpage.md — extract all specs
Step 02 │ Validate environment (Node, npm, 5 images present)
Step 03 │ Scaffold project via create-next-app (if not done)
Step 04 │ Install all dependencies (framer-motion, clsx, etc.)
Step 05 │ Configure tailwind.config.js with brand tokens
Step 06 │ Set up globals.css — dark palette, noise, custom properties
Step 07 │ Configure next/font in app/layout.tsx
Step 08 │ Write lib/animations.ts — all shared variants
Step 09 │ Write hooks/useScrollAnimation.ts
Step 10 │ Implement Navbar.tsx — transparent → solid transition
Step 11 │ Implement Hero.tsx — full viewport, staggered entrance
Step 12 │ Implement Story.tsx — 01.JPG bg, narrative text
Step 13 │ Implement Atelier.tsx — 1.1.JPG bg, craft section
Step 14 │ Implement Collection.tsx — 02.JPG bg, text-only grid
Step 15 │ Implement Fragrance.tsx — 05.JPG bg, all required copy
Step 16 │ Implement Footer.tsx
Step 17 │ Assemble in app/page.tsx
Step 18 │ Apply taste-skill — audit easing, spacing, typographic rhythm
Step 19 │ Run ALL quality gates from §13
Step 20 │ Deploy to Vercel, share preview URL
Step 21 │ Write / update README.md
Step 22 │ Deliver all files to client
```

---

## Appendix A — Key Design Principles from taste-skill

| Principle | Application |
|---|---|
| **Typographic contrast** | Pair ultra-light body (Montserrat 300) with regular/medium headings (Cormorant 400/500) |
| **Spatial breathing** | Minimum 80px vertical gap between any two text groups |
| **Motion restraint** | Only one animated element per viewport visible area at a time |
| **Easing personality** | Custom `[0.2, 0.9, 0.4, 1.0]` — starts gentle, arrives with authority |
| **Hover micro-interactions** | 200ms duration, `ease-out`, opacity shift + subtle translate |
| **Letter-spacing discipline** | Uppercase labels: `0.2em+` · Display text: `-0.02em` · Body: `0` |
| **Image restraint** | Dark overlay always present — images serve mood, not information |

---

## Appendix B — Anti-Pattern Reference

The following patterns are **explicitly forbidden** in this project:

| ❌ Anti-Pattern | ✅ Correct Approach |
|---|---|
| Right-side product image column | Single-column centered layout only |
| `opacity > 0.25` on background images | Max `0.22` — preserve dark atmosphere |
| `border-radius` on cards/buttons | `rounded-none` — brand is sharp-edged |
| Purple/blue gradient schemes | `#0a0a0a` + `#c9a96e` gold accent only |
| Inter / Roboto / system fonts | Cormorant Garamond + Montserrat only |
| Cubic-bezier `ease-in-out` (generic) | Custom `[0.2, 0.9, 0.4, 1.0]` only |
| Stock photos or placeholder images | Five client images — zero substitutes |
| Framer Motion `animate` on mount (always) | `whileInView` + `once: true` always |
| Inline styles | Tailwind utility classes exclusively |
| `any` TypeScript type | Explicit typing everywhere |

---

*End of Specification — Version 2.0*  
*Treat this document as living documentation. Update it as decisions are made during implementation.*
