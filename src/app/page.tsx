import HeroSection from '@/components/sections/HeroSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ValuesSection from '@/components/sections/ValuesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CtaBannerSection from '@/components/sections/CtaBannerSection'

const stats = [
  { value: '$14/kg', label: 'tarifa por kilo' },
  { value: '6 días', label: 'tiempo promedio' },
]

export default function Home() {
  return (
    <>
      <HeroSection />

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
      <ValuesSection />
      <TestimonialsSection />

      <CtaBannerSection
        heading="¿Listo para tu primer envío?"
        subtext="Cotizá gratis en 30 segundos. Sin registro, sin complicaciones."
        ctaLabel="Cotizá tu envío"
        ctaHref="/cotizar"
        secondaryLabel="Rastrear con postal.ninja"
        secondaryHref="https://postal.ninja/es"
      />
    </>
  )
}
