import type { CategoryKey } from './products'

export interface CategoryConfig {
  key: CategoryKey
  label: string
  icon: string
  color: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: 'edp',
    label: 'Eau de Parfum',
    icon: 'ri-water-flash-line',
    color: 'var(--color-cat-edp)',
  },
  {
    key: 'attar',
    label: 'Attars',
    icon: 'ri-oil-line',
    color: 'var(--color-cat-attar)',
  },
  {
    key: 'oud',
    label: 'Oud Collection',
    icon: 'ri-fire-line',
    color: 'var(--color-cat-oud)',
  },
  {
    key: 'oriental',
    label: 'Oriental',
    icon: 'ri-sparkling-2-line',
    color: 'var(--color-cat-oriental)',
  },
  {
    key: 'giftsets',
    label: 'Gift Sets',
    icon: 'ri-gift-line',
    color: 'var(--color-cat-giftsets)',
  },
]

export const FILTER_PILLS: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: 'All' },
  ...CATEGORIES.map((c) => ({ key: c.key, label: c.label })),
]
