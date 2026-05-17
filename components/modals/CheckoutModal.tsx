'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useModal } from '@/context/ModalContext'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { buildWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp'
import ModalPortal from './ModalPortal'

export default function CheckoutModal() {
  const { activeProduct, modalScreen, closeModal, backToProduct, openCheckout } = useModal()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isOpen = modalScreen === 'checkout'

  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (activeProduct) {
      setName('')
      setPhone('')
      setCity('')
      setAddress('')
      setNotes('')
      setSubmitted(false)
    }
  }, [activeProduct, isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

  if (!activeProduct) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !city || !address) return
    setSubmitted(true)

    const msg = buildWhatsAppMessage({
      product: { name: activeProduct.name, price: activeProduct.price },
      volume: '30ml',
      qty: 1,
      customer: { name, phone, city, address, notes: notes || undefined },
    })
    openWhatsApp(msg)
  }

  return (
    <ModalPortal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(6,4,2,0.92)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-brand-card border border-brand-goldMuted/20 w-full max-w-lg max-h-[92vh] overflow-y-auto"
              initial={{ y: 30, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ y: 20, scale: 0.97, opacity: 0, transition: { duration: 0.25 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-cinzel text-lg font-bold text-white">Checkout</h3>
                  <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-cream" aria-label="Close modal">
                    <i className="ri-close-line" />
                  </button>
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
                      <button type="button" onClick={backToProduct} className="btn-outline flex-1">
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
    </ModalPortal>
  )
}
