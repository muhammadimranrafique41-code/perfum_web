'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useModal } from '@/context/ModalContext'
import type { Product } from '@/lib/products'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`text-[10px] ${i < rating ? 'ri-star-fill text-brand-gold' : 'ri-star-line text-brand-gold/30'}`}
        />
      ))}
    </div>
  )
}

export default function ProductCard({ product }: { product: Product }) {
  const { openProduct } = useModal()

  return (
    <motion.button
      onClick={() => openProduct(product)}
      className="group relative bg-brand-card border border-brand-goldDim/30 w-full text-left overflow-hidden transition-all duration-500 hover:bg-brand-cardHover hover:border-brand-gold/20"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      aria-label={`View ${product.name}`}
    >
      <div className="relative aspect-square overflow-hidden bg-brand-bg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-gold text-brand-bg font-cinzel text-[0.55rem] tracking-[0.15em] rounded-full z-10">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-cinzel text-sm font-bold text-white">{product.name}</h3>
          <StarRating rating={product.rating} />
        </div>
        <p className="font-cormorant text-sm text-brand-gold font-semibold mb-1">
          Rs. {product.price.toLocaleString()}
        </p>
        <p className="font-cormorant text-xs text-brand-muted leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>
    </motion.button>
  )
}
