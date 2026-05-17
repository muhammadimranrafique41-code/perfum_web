'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useModal } from '@/context/ModalContext'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { buildWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp'
import ModalPortal from './ModalPortal'

type NoteType = 'top' | 'middle' | 'base'
const VOLUMES = ['30ml', '50ml', '100ml'] as const

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`text-sm ${i < rating ? 'ri-star-fill text-brand-gold' : 'ri-star-line text-brand-gold/30'}`}
        />
      ))}
    </div>
  )
}

function NotesTabs({
  product,
  active,
  onChange,
}: {
  product: { notes: { top: string[]; middle: string[]; base: string[] } }
  active: NoteType
  onChange: (n: NoteType) => void
}) {
  const tabs: { key: NoteType; label: string }[] = [
    { key: 'top', label: 'Top' },
    { key: 'middle', label: 'Heart' },
    { key: 'base', label: 'Base' },
  ]

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`px-3 py-1.5 font-cinzel text-[0.6rem] tracking-[0.12em] uppercase transition-colors ${
              active === t.key
                ? 'bg-brand-gold text-brand-bg'
                : 'bg-brand-goldDim/30 text-brand-muted hover:text-brand-cream'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {product.notes[active].map((note) => (
          <span
            key={note}
            className="px-3 py-1 bg-brand-bg2 border border-brand-goldDim/30 font-cormorant text-xs text-brand-muted"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  )
}

function VolumeSelector({
  volumes,
  selected,
  onSelect,
  priceOf,
}: {
  volumes: readonly string[]
  selected: string
  onSelect: (v: string) => void
  priceOf: (v: string) => number
}) {
  return (
    <div className="mb-6">
      <p className="font-cinzel text-xs tracking-[0.12em] text-brand-muted mb-3 uppercase">Select Volume</p>
      <div className="flex gap-2">
        {volumes.map((v) => (
          <button
            key={v}
            onClick={() => onSelect(v)}
            className={`flex-1 py-2.5 font-cinzel text-xs transition-colors ${
              selected === v
                ? 'bg-brand-gold text-brand-bg'
                : 'bg-brand-goldDim/20 text-brand-muted border border-brand-goldDim/40 hover:border-brand-gold/40'
            }`}
          >
            {v}
            <span className="block font-jost text-[0.55rem] opacity-70 mt-0.5">
              Rs. {priceOf(v).toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function QtyControl({ qty, onChange }: { qty: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-cinzel text-xs tracking-[0.12em] text-brand-muted uppercase">Qty</span>
      <div className="flex items-center border border-brand-goldDim/40">
        <button
          onClick={() => onChange(Math.max(1, qty - 1))}
          className="px-3 py-1.5 text-brand-muted hover:text-brand-cream transition-colors"
          aria-label="Decrease quantity"
        >
          <i className="ri-subtract-line text-sm" />
        </button>
        <span className="px-4 py-1.5 font-cinzel text-sm text-white min-w-[2rem] text-center">{qty}</span>
        <button
          onClick={() => onChange(Math.min(10, qty + 1))}
          className="px-3 py-1.5 text-brand-muted hover:text-brand-cream transition-colors"
          aria-label="Increase quantity"
        >
          <i className="ri-add-line text-sm" />
        </button>
      </div>
    </div>
  )
}

export default function ProductModal() {
  const { activeProduct, modalScreen, closeModal, openCheckout, backToProduct } = useModal()
  const [selVolume, setSelVolume] = useState<string>('30ml')
  const [selQty, setSelQty] = useState(1)
  const [activeNote, setActiveNote] = useState<NoteType>('top')
  const isOpen = modalScreen === 'product'

  useBodyScrollLock(!!modalScreen && modalScreen !== null)

  useEffect(() => {
    if (activeProduct) {
      setSelVolume('30ml')
      setSelQty(1)
      setActiveNote('top')
    }
  }, [activeProduct])

  const volumePrice = (v: string) => {
    if (!activeProduct) return 0
    if (v === '50ml') return Math.round(activeProduct.price * 1.5)
    if (v === '100ml') return Math.round(activeProduct.price * 2.5)
    return activeProduct.price
  }

  const totalPrice = volumePrice(selVolume) * selQty

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalScreen === 'product') closeModal()
        else if (modalScreen === 'checkout') backToProduct()
      }
    }
    if (modalScreen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalScreen, closeModal, backToProduct])

  return (
    <ModalPortal>
      <AnimatePresence>
        {isOpen && activeProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(6,4,2,0.92)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-brand-card border border-brand-goldMuted/20 w-full max-w-4xl max-h-[92vh] overflow-y-auto"
              initial={{ y: 30, scale: 0.97, opacity: 0 }}
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={{
                y: 20,
                scale: 0.97,
                opacity: 0,
                transition: { duration: 0.25 },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[380px] bg-brand-bg">
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-brand-bg/80 border border-brand-goldDim/40 text-brand-cream hover:text-brand-gold transition-colors"
                    aria-label="Close modal"
                  >
                    <i className="ri-close-line" />
                  </button>
                </div>

                <div className="p-8 flex flex-col">
                  {activeProduct.badge && (
                    <span className="self-start px-3 py-1 bg-brand-gold text-brand-bg font-cinzel text-[0.55rem] tracking-[0.15em] rounded-full mb-3">
                      {activeProduct.badge}
                    </span>
                  )}
                  <h3 className="font-cinzel text-xl font-bold text-white mb-3">{activeProduct.name}</h3>

                  <div className="flex items-center gap-3 mb-6">
                    <StarRating rating={activeProduct.rating} />
                    <span className="font-jost text-xs text-brand-muted">({activeProduct.reviews} reviews)</span>
                  </div>

                  <NotesTabs product={activeProduct} active={activeNote} onChange={setActiveNote} />

                  <VolumeSelector volumes={VOLUMES} selected={selVolume} onSelect={setSelVolume} priceOf={volumePrice} />

                  <QtyControl qty={selQty} onChange={setSelQty} />

                  <div className="mt-auto pt-5 border-t border-brand-goldDim">
                    <p className="font-cinzel text-brand-gold text-2xl mb-4">
                      Rs. {totalPrice.toLocaleString()}
                    </p>
                    <button onClick={openCheckout} className="btn-gold w-full mb-3">
                      Proceed to Checkout
                      <i className="ri-arrow-right-line ml-2" />
                    </button>
                    <button className="btn-outline w-full">
                      <i className="ri-heart-line mr-2" />
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CheckoutModalContent
        isOpen={modalScreen === 'checkout'}
        product={activeProduct}
        volume={selVolume}
        qty={selQty}
        totalPrice={totalPrice}
        onBack={backToProduct}
        onClose={closeModal}
      />
    </ModalPortal>
  )
}

function CheckoutModalContent({
  isOpen,
  product,
  volume,
  qty,
  totalPrice,
  onBack,
  onClose,
}: {
  isOpen: boolean
  product: { name: string; price: number } | null
  volume: string
  qty: number
  totalPrice: number
  onBack: () => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useBodyScrollLock(isOpen)

  if (!product) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !city || !address) return
    setSubmitted(true)

    const msg = buildWhatsAppMessage({
      product: { name: product.name, price: product.price },
      volume,
      qty,
      customer: { name, phone, city, address, notes: notes || undefined },
    })
    openWhatsApp(msg)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(6,4,2,0.92)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-brand-card border border-brand-goldMuted/20 w-full max-w-lg max-h-[92vh] overflow-y-auto"
            initial={{ y: 30, scale: 0.97, opacity: 0 }}
            animate={{
              y: 0,
              scale: 1,
              opacity: 1,
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              y: 20,
              scale: 0.97,
              opacity: 0,
              transition: { duration: 0.25 },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-cinzel text-lg font-bold text-white">Checkout</h3>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-cream" aria-label="Close modal">
                  <i className="ri-close-line" />
                </button>
              </div>

              <div className="bg-brand-bg p-4 mb-6 border border-brand-goldDim/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinzel text-sm text-white">{product.name}</span>
                  <span className="font-cinzel text-sm text-brand-gold">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="font-jost text-xs text-brand-muted">
                  <span>{volume} x {qty}</span>
                  <span className="ml-3">Delivery: Rs. 200</span>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <i className="ri-checkbox-circle-line text-5xl text-brand-gold mb-4" />
                  <p className="font-cinzel text-lg text-white mb-2">Order Submitted!</p>
                  <p className="font-cormorant text-brand-muted">You will be redirected to WhatsApp to confirm your order.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-cinzel text-xs tracking-[0.12em] text-brand-muted mb-2 uppercase">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-brand-bg border border-brand-goldDim/40 px-4 py-3 font-jost text-sm text-white placeholder:text-brand-muted/50 focus:border-brand-gold/40 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-cinzel text-xs tracking-[0.12em] text-brand-muted mb-2 uppercase">Phone *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-brand-bg border border-brand-goldDim/40 px-4 py-3 font-jost text-sm text-white placeholder:text-brand-muted/50 focus:border-brand-gold/40 focus:outline-none transition-colors"
                      placeholder="03XX-XXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block font-cinzel text-xs tracking-[0.12em] text-brand-muted mb-2 uppercase">City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full bg-brand-bg border border-brand-goldDim/40 px-4 py-3 font-jost text-sm text-white placeholder:text-brand-muted/50 focus:border-brand-gold/40 focus:outline-none transition-colors"
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label className="block font-cinzel text-xs tracking-[0.12em] text-brand-muted mb-2 uppercase">Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      rows={2}
                      className="w-full bg-brand-bg border border-brand-goldDim/40 px-4 py-3 font-jost text-sm text-white placeholder:text-brand-muted/50 focus:border-brand-gold/40 focus:outline-none transition-colors resize-none"
                      placeholder="Your delivery address"
                    />
                  </div>
                  <div>
                    <label className="block font-cinzel text-xs tracking-[0.12em] text-brand-muted mb-2 uppercase">Order Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-brand-bg border border-brand-goldDim/40 px-4 py-3 font-jost text-sm text-white placeholder:text-brand-muted/50 focus:border-brand-gold/40 focus:outline-none transition-colors resize-none"
                      placeholder="Any special instructions"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={onBack} className="btn-outline flex-1">
                      <i className="ri-arrow-left-line mr-2" />
                      Back
                    </button>
                    <button type="submit" className="btn-gold flex-1">
                      Place Order
                      <i className="ri-whatsapp-line ml-2" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
