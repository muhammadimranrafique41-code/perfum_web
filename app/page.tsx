import { FilterProvider } from '@/context/FilterContext'
import { ModalProvider } from '@/context/ModalContext'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import AmbientBackground from '@/components/animations/AmbientBackground'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import BrandStory from '@/components/sections/BrandStory'
import StatsStrip from '@/components/sections/StatsStrip'
import BrandPillars from '@/components/sections/BrandPillars'
import CategoryShowcase from '@/components/sections/CategoryShowcase'
import ProductGrid from '@/components/sections/ProductGrid'
import Bestsellers from '@/components/sections/Bestsellers'
import OurPromise from '@/components/sections/OurPromise'
import Newsletter from '@/components/sections/Newsletter'
import Footer from '@/components/layout/Footer'
import ProductModal from '@/components/modals/ProductModal'
import WhatsAppButton from '@/components/floating/WhatsAppButton'
import BackToTop from '@/components/floating/BackToTop'

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
        <ProductModal />
        <WhatsAppButton />
        <BackToTop />
      </ModalProvider>
    </FilterProvider>
  )
}
