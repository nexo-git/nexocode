import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import StoreLogosSection from '@/components/sections/StoreLogosSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import NexoFielSection from '@/components/sections/NexoFielSection'
import ValuesSection from '@/components/sections/ValuesSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import CtaBannerSection from '@/components/sections/CtaBannerSection'
import { pageMetadata, HOME_TITLE, HOME_DESCRIPTION } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
  absoluteTitle: true,
})

const stats = [
  { value: '$14/kg', label: 'tarifa por kilo' },
  { value: '5–8 días', label: 'hábiles de entrega' },
]

export default function Home() {
  return (
    <>
      <HeroSection />
      <StoreLogosSection />

      {/* Stats bar */}
      <div className="bg-midnight border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-2 gap-6 text-center max-w-sm mx-auto">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-black text-cyan mb-1">{stat.value}</p>
                <p className="text-slate text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HowItWorksSection />
      <NexoFielSection />
      <ValuesSection />
      <ReviewsSection />

      <CtaBannerSection
        heading="¿Listo para tu primer envío?"
        subtext="Cotizá gratis en 30 segundos. Sin registro, sin complicaciones."
        ctaLabel="Cotizá tu envío"
        ctaHref="/cotizar"
      />
    </>
  )
}
