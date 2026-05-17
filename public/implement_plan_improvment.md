# Implementation Plan: Haris Fragrance (perfum_web) — Production-Ready Improvements

**Project**: Haris Fragrance Luxury Perfume E-commerce  
**Tech Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui  
**Author**: Senior Full-Stack Engineer  
**Date**: May 2026  
**Priority**: High (Pre-Launch Optimization)

---

## Executive Summary

The current codebase demonstrates strong design taste and modern architecture. However, to transform this beautiful prototype into a **production-grade, scalable, and SEO/performance-optimized luxury brand website**, we need to implement structured improvements across reliability, performance, SEO, maintainability, and conversion optimization.

---

## 1. Phase 1: Foundation & Documentation (1-2 days)

### 1.1 Create Professional README.md

- Project description with luxury brand tone
- Tech stack overview
- Local setup instructions
- Environment variables documentation
- Available scripts
- Deployment guide (Vercel recommended)
- Contributing guidelines

### 1.2 Add Supporting Files

- `.env.example`
- `CONTRIBUTING.md`
- `LICENSE` (if public)
- `.github/workflows/` for CI/CD (lint + build)

### 1.3 Project Configuration

- Update `package.json`: Add proper description, keywords, repository URL, author
- Add `scripts` for common tasks (`preview`, `type-check`, `lint:fix`, `format`)
- Configure Prettier + ESLint + Husky + lint-staged

---

## 2. Phase 2: Performance & Optimization (2-3 days)

### 2.1 Image Optimization

```js
// next.config.mjs
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**' } // tighten in production
  ],
  formats: ['image/avif', 'image/webp'],
}
```
