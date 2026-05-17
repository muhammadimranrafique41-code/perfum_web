'use client'

import Image from 'next/image'
import GoldFrame from '@/components/ui/GoldFrame'
import OrnamentDivider from '@/components/ui/OrnamentDivider'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const promises = [
  {
    icon: 'ri-award-line',
    title: '100% Authentic',
    desc: 'Every product is genuine and sourced directly from our master perfumers.',
  },
  {
    icon: 'ri-truck-line',
    title: 'Free Delivery',
    desc: 'Complimentary shipping across all major cities in Pakistan.',
  },
  {
    icon: 'ri-refund-line',
    title: 'Satisfaction Guaranteed',
    desc: 'Not in love with your scent? We offer a 14-day exchange policy.',
  },
  {
    icon: 'ri-heart-line',
    title: 'Handcrafted with Love',
    desc: 'Each batch is made with care and intention in Karachi.',
  },
]

export default function OurPromise() {
  return (
    <section className="py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionLabel>Our Commitment</SectionLabel>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              The Haris Promise
            </h2>
            <OrnamentDivider />
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <RevealOnScroll>
            <div className="relative">
              <GoldFrame>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src="/images/perfum05.jpg"
                    alt="Haris Fragrance quality promise"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </GoldFrame>
            </div>
          </RevealOnScroll>

          <div className="grid gap-8">
            {promises.map((item, i) => (
              <RevealOnScroll key={item.title}>
                <div className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-brand-gold/20 bg-brand-goldDim/30">
                    <i className={`${item.icon} text-brand-gold text-xl`} />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="font-cormorant text-brand-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
