'use client'

import { openWhatsApp, buildWhatsAppMessage, WA_NUMBER } from '@/lib/whatsapp'
import OrnamentDivider from '@/components/ui/OrnamentDivider'

export default function Newsletter() {
  const handleSubscribe = () => {
    const msg = `Hi! I would like to know more about Haris Fragrance products and offers.`
    openWhatsApp(msg)
  }

  return (
    <section id="newsletter" className="py-28 px-6 md:px-12 bg-brand-bg2/50">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-dancing text-brand-gold text-xl mb-4">Stay in Touch</p>
        <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mb-4">
          Join Our Circle
        </h2>
        <OrnamentDivider />
        <p className="font-cormorant text-brand-muted text-lg leading-relaxed mt-8 mb-10 max-w-xl mx-auto">
          Be the first to know about new launches, exclusive offers, and fragrance stories.
          Connect with us on WhatsApp for a truly personal experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2"
          >
            <i className="ri-whatsapp-line text-lg" />
            Message Us on WhatsApp
          </a>
          <button onClick={handleSubscribe} className="btn-outline">
            Get Updates
          </button>
        </div>
      </div>
    </section>
  )
}
