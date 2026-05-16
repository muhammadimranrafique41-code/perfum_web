export interface NavLink {
  label: string
  href: string
}

export interface FragranceNote {
  name: string
}

export interface CollectionItem {
  label: string
  name: string
  price: string
}

export interface ScrollAnimationConfig {
  inputRange?: [number, number]
  outputRange?: [number, number]
}

export interface ScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>
  opacity: import('framer-motion').MotionValue<number>
  y: import('framer-motion').MotionValue<number>
  scale: import('framer-motion').MotionValue<number>
}
