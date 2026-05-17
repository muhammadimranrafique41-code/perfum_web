'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CategoryKey } from '@/lib/products'

interface FilterContextValue {
  activeCategory: CategoryKey
  setFilter: (cat: CategoryKey) => void
}

const FilterContext = createContext<FilterContextValue>({
  activeCategory: 'all',
  setFilter: () => {},
})

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')

  const setFilter = useCallback((cat: CategoryKey) => {
    setActiveCategory(cat)
    if (cat !== 'all') {
      const el = document.getElementById('products')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <FilterContext.Provider value={{ activeCategory, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
