interface OrderDetails {
  product: { name: string; price: number }
  volume: string
  qty: number
  customer: { name: string; phone: string; city: string; address: string; notes?: string }
}

function getVolumePrice(basePrice: number, volume: string): number {
  if (volume === '50ml') return Math.round(basePrice * 1.5)
  if (volume === '100ml') return Math.round(basePrice * 2.5)
  return basePrice
}

export function buildWhatsAppMessage(order: OrderDetails): string {
  const unitPrice = getVolumePrice(order.product.price, order.volume)
  const subtotal = unitPrice * order.qty
  const total = subtotal + 200

  return `*New Order — Haris Fragrance*
━━━━━━━━━━━━━━━━━━━━━━━━
*Product:* ${order.product.name}
*Volume:* ${order.volume}
*Qty:* ${order.qty}
*Subtotal:* Rs. ${subtotal.toLocaleString()}
*Delivery:* Rs. 200
*Total:* Rs. ${total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━
--- Customer ---
Name: ${order.customer.name}
Phone: ${order.customer.phone}
City: ${order.customer.city}
Address: ${order.customer.address}${order.customer.notes ? `\nNotes: ${order.customer.notes}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━
Please confirm my order. Thank you!`
}

export const WA_NUMBER = '923153223496'

export function openWhatsApp(message: string): void {
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}
