import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Haris Fragrance | Luxury Perfumes & Attars — Pakistan',
  description: 'Discover Haris Fragrance — handcrafted luxury perfumes, attars, oud collections and oriental blends. Premium fragrances rooted in Karachi, Pakistan.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${jost.variable} ${dancing.variable}`}>
      <body className="bg-brand-bg text-brand-cream font-jost overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
