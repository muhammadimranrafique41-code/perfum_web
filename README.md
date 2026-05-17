# Haris Fragrance — Luxury Perfume E-Commerce

An opulent, high-performance e-commerce experience for a luxury perfume brand, built with cutting-edge web technologies.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 + tw-animate-css
- **Components**: shadcn/ui (Radix primitives)
- **Animation**: Framer Motion + GSAP
- **3D Graphics**: Three.js
- **Font**: Remix Icons, Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Available Scripts

| Script       | Description                  |
| ------------ | ---------------------------- |
| `dev`        | Start development server     |
| `build`      | Build for production         |
| `start`      | Start production server      |
| `lint`       | Run ESLint                   |
| `type-check` | Run TypeScript type checking |
| `format`     | Format code with Prettier    |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

## Deployment

Recommended platform: **Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Project Structure

```
app/            # Next.js App Router pages
components/     # React components (ui, sections, modals, layout)
context/        # React context providers
hooks/          # Custom React hooks
lib/            # Utility functions and data
public/         # Static assets
styles/         # Global styles
types/          # TypeScript type definitions
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

All rights reserved. Proprietary code.
