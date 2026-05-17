'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useModal } from '@/context/ModalContext'
import type { Product } from '@/lib/products'

export default function BestsellerCard({ product }: { product: Product }) {
  const { openProduct } = useModal()

  return (
    <motion.button
      onClick={() => openProduct(product)}
      className="group relative bg-brand-card border border-brand-goldDim/30 w-full text-left overflow-hidden transition-all duration-500 hover:bg-brand-cardHover hover:border-brand-gold/20"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      aria-label={`View ${product.name}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1.5 bg-brand-gold text-brand-bg font-cinzel text-[0.6rem] tracking-[0.15em] rounded-full z-10">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/70 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-cinzel text-lg font-bold text-white mb-2">{product.name}</h3>
        <p className="font-cormorant text-base text-brand-gold font-semibold mb-2">
          Rs. {product.price.toLocaleString()}
        </p>
        <p className="font-cormorant text-sm text-brand-muted leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-brand-goldDim/30">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`text-xs ${i < product.rating ? 'ri-star-fill text-brand-gold' : 'ri-star-line text-brand-gold/30'}`}
              />
            ))}
          </div>
          <span className="font-jost text-xs text-brand-muted">({product.reviews})</span>
        </div>
      </div>
    </motion.button>
  )
}
