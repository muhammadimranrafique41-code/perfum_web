export interface Product {
  id: number
  name: string
  category: CategoryKey
  price: number
  image: string
  rating: 1 | 2 | 3 | 4 | 5
  reviews: number
  badge: string | null
  description: string
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
}

export type CategoryKey = 'all' | 'edp' | 'attar' | 'oud' | 'oriental' | 'giftsets'

export const PRODUCTS: Product[] = [
  {
    id: 0, name: 'Royal Oud Intense', category: 'oud', price: 12500,
    image: '/images/perfum06.jpeg', rating: 5, reviews: 328, badge: 'BEST SELLER',
    description: 'A majestic blend of rare agarwood, saffron, and precious spices for the truly discerning.',
    notes: { top: ['Saffron', 'Bergamot', 'Pink Pepper'], middle: ['Rose', 'Jasmine', 'Oud'], base: ['Amber', 'Sandalwood', 'Musk'] },
  },
  {
    id: 1, name: 'Rose Elixir', category: 'oriental', price: 8500,
    image: '/images/perfum07.jpeg', rating: 5, reviews: 256, badge: 'POPULAR',
    description: 'An enchanting rose bouquet with jasmine heart and warm sandalwood base.',
    notes: { top: ['Rose', 'Lemon', 'Peach'], middle: ['Jasmine', 'Ylang-Ylang'], base: ['Sandalwood', 'Vanilla', 'Musk'] },
  },
  {
    id: 2, name: 'Black Musk Attar', category: 'attar', price: 6500,
    image: '/images/perfum08.jpeg', rating: 5, reviews: 412, badge: 'FAVORITE',
    description: 'Deep, sensual musk with amber and vanilla — a pure attar that never fades.',
    notes: { top: ['Bergamot', 'Black Pepper'], middle: ['Musk', 'Jasmine'], base: ['Amber', 'Vanilla', 'Patchouli'] },
  },
  {
    id: 3, name: 'Amber Gold EDP', category: 'edp', price: 9500,
    image: '/images/perfum09.jpeg', rating: 4, reviews: 189, badge: 'NEW',
    description: 'Luxurious amber with warm vanilla and woody base — opulent and unforgettable.',
    notes: { top: ['Amber', 'Orange Blossom'], middle: ['Vanilla', 'Jasmine'], base: ['Sandalwood', 'Musk'] },
  },
  {
    id: 4, name: 'Mystic Oud', category: 'oud', price: 15000,
    image: '/images/perfum01.jpg', rating: 5, reviews: 234, badge: 'PREMIUM',
    description: 'A mysterious blend of aged agarwood with exotic Eastern spices and leather.',
    notes: { top: ['Cardamom', 'Cinnamon'], middle: ['Oud', 'Rose'], base: ['Patchouli', 'Leather'] },
  },
  {
    id: 5, name: 'Silver Rose', category: 'edp', price: 7500,
    image: '/images/perfum02.jpg', rating: 4, reviews: 167, badge: 'NEW',
    description: 'Delicate rose with sparkling citrus and a soft musky drydown.',
    notes: { top: ['Grapefruit', 'Raspberry'], middle: ['Rose', 'Iris'], base: ['Musk', 'Amber'] },
  },
  {
    id: 6, name: 'Traditional Attar', category: 'attar', price: 4500,
    image: '/images/perfum03.jpg', rating: 4, reviews: 289, badge: null,
    description: 'Classic pure attar — rose and sandalwood in their most authentic, uncut form.',
    notes: { top: ['Pure Rose'], middle: ['Sandalwood'], base: ['Base Musk'] },
  },
  {
    id: 7, name: 'Evening Amber', category: 'oriental', price: 11000,
    image: '/images/perfum04.jpg', rating: 4, reviews: 145, badge: 'EVENING',
    description: 'Rich amber with warm spices perfectly composed for sophisticated evenings.',
    notes: { top: ['Cinnamon', 'Nutmeg'], middle: ['Amber', 'Vanilla'], base: ['Patchouli', 'Musk'] },
  },
  {
    id: 8, name: 'Royal Gift Set', category: 'giftsets', price: 25000,
    image: '/images/perfum05.jpg', rating: 5, reviews: 98, badge: 'GIFT',
    description: 'Three of our finest fragrances in a stunning luxury presentation box.',
    notes: { top: ['Various'], middle: ['Various'], base: ['Various'] },
  },
  {
    id: 9, name: 'Fresh Citrus EDP', category: 'edp', price: 5500,
    image: '/images/perfum06.jpeg', rating: 4, reviews: 312, badge: 'FRESH',
    description: 'Energizing citrus tempered by green tea and clean musk — perfect every day.',
    notes: { top: ['Lemon', 'Lime', 'Bergamot'], middle: ['Jasmine', 'Green Tea'], base: ['Musk', 'Sandalwood'] },
  },
  {
    id: 10, name: 'Oud Al Hind', category: 'oud', price: 18000,
    image: '/images/perfum07.jpeg', rating: 5, reviews: 178, badge: 'RARE',
    description: 'Rare Indian agarwood of exceptional depth and age — a collector\'s treasure.',
    notes: { top: ['Spices', 'Resins'], middle: ['Aged Oud'], base: ['Woody Notes'] },
  },
  {
    id: 11, name: 'Floral Attar', category: 'attar', price: 5500,
    image: '/images/perfum08.jpeg', rating: 4, reviews: 201, badge: null,
    description: 'Pure floral attar with jasmine and mogra — light, feminine, softly intoxicating.',
    notes: { top: ['Jasmine'], middle: ['Mogra', 'Rose'], base: ['Sandalwood'] },
  },
  {
    id: 12, name: 'Spice Market', category: 'oriental', price: 8900,
    image: '/images/perfum09.jpeg', rating: 4, reviews: 156, badge: 'EXOTIC',
    description: 'Exotic spices swirl with warm vanilla — a journey through ancient bazaars.',
    notes: { top: ['Cinnamon', 'Cardamom'], middle: ['Clove', 'Nutmeg'], base: ['Vanilla', 'Amber'] },
  },
  {
    id: 13, name: 'Couple Gift Set', category: 'giftsets', price: 18000,
    image: '/images/perfum10.jpg', rating: 5, reviews: 87, badge: 'COUPLE',
    description: 'Complementary His & Her fragrances in one luxurious presentation.',
    notes: { top: ['Various'], middle: ['Various'], base: ['Various'] },
  },
  {
    id: 14, name: 'Midnight Oud', category: 'oud', price: 13500,
    image: '/images/perfum11.jpeg', rating: 5, reviews: 223, badge: 'MIDNIGHT',
    description: 'Dark, intense oud built for after dark — bold, commanding, deeply seductive.',
    notes: { top: ['Black Pepper', 'Saffron'], middle: ['Oud', 'Rose'], base: ['Leather', 'Musk'] },
  },
  {
    id: 15, name: 'Citrus Blossom', category: 'edp', price: 6500,
    image: '/images/perfum01.jpg', rating: 4, reviews: 189, badge: 'SPRING',
    description: 'Vibrant citrus meets delicate orange blossom — the freshness of spring.',
    notes: { top: ['Orange', 'Lemon'], middle: ['Orange Blossom', 'Jasmine'], base: ['Musk', 'White Wood'] },
  },
  {
    id: 16, name: 'Sandalwood Special', category: 'attar', price: 7500,
    image: '/images/perfum02.jpg', rating: 5, reviews: 267, badge: 'SPECIAL',
    description: 'Pure Mysore sandalwood attar — creamy, sacred, incomparably smooth.',
    notes: { top: ['Sandalwood'], middle: ['Sandalwood'], base: ['Sandalwood'] },
  },
  {
    id: 17, name: 'Luxury Collection Box', category: 'giftsets', price: 35000,
    image: '/images/perfum03.jpg', rating: 5, reviews: 45, badge: 'ULTIMATE',
    description: 'Five signature fragrances in a collector\'s edition luxury box.',
    notes: { top: ['Various'], middle: ['Various'], base: ['Various'] },
  },
]
