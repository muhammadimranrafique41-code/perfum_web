'use client'

import { WA_NUMBER } from '@/lib/whatsapp'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5A] transition-colors animate-wa-pulse group"
      aria-label="Chat on WhatsApp"
    >
      <i className="ri-whatsapp-line text-2xl" />
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-brand-bg border border-brand-goldDim/40 px-3 py-1.5 font-jost text-xs text-brand-cream whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </a>
  )
}
