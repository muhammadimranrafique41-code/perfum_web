import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Story } from '@/components/Story'
import { Atelier } from '@/components/Atelier'
import { Collection } from '@/components/Collection'
import { Fragrance } from '@/components/Fragrance'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Story />
      <Atelier />
      <Collection />
      <Fragrance />
      <Footer />
    </main>
  )
}
