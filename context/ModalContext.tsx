'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '@/lib/products'

type ModalScreen = 'product' | 'checkout' | null

interface ModalContextValue {
  activeProduct: Product | null
  modalScreen: ModalScreen
  openProduct: (product: Product) => void
  openCheckout: () => void
  closeModal: () => void
  backToProduct: () => void
}

const ModalContext = createContext<ModalContextValue>({} as ModalContextValue)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [modalScreen, setModalScreen] = useState<ModalScreen>(null)

  const openProduct = useCallback((p: Product) => {
    setActiveProduct(p)
    setModalScreen('product')
  }, [])
  const openCheckout = useCallback(() => setModalScreen('checkout'), [])
  const closeModal = useCallback(() => {
    setModalScreen(null)
    setActiveProduct(null)
  }, [])
  const backToProduct = useCallback(() => setModalScreen('product'), [])

  return (
    <ModalContext.Provider value={{ activeProduct, modalScreen, openProduct, openCheckout, closeModal, backToProduct }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
