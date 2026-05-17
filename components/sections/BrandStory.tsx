'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import GoldFrame from '@/components/ui/GoldFrame'
import OrnamentDivider from '@/components/ui/OrnamentDivider'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function BrandStory() {
  return (
    <section id="story" className="py-28 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              Born from a Passion
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
                    src="/images/perfum01.jpg"
                    alt="Haris Fragrance artisanal perfume crafting"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </GoldFrame>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div>
              <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white mb-6">
                A Legacy of Scent
              </h3>
              <div className="space-y-4 font-cormorant text-brand-muted text-lg leading-relaxed">
                <p>
                  Born in the heart of Karachi, Haris Fragrance weaves together centuries-old
                  perfumery traditions with the raw, vibrant spirit of Pakistan. Every attar,
                  every EDP, every oud creation tells a story of patience, precision, and
                  uncompromising artistry.
                </p>
                <p>
                  Our master perfumers source the finest ingredients from across the globe — rare
                  agarwood from Assam, pure rose from Taif, premium sandalwood from Mysore — and
                  blend them with the warm, resinous treasures of the Indus Valley.
                </p>
                <p>
                  We believe fragrance is not merely an accessory but a memory made manifest — a
                  invisible signature that lingers long after you have left the room.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
