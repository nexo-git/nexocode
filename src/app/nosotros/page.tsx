import ValuesSection from '@/components/sections/ValuesSection'
import ContactSection from '@/components/sections/ContactSection'
import CtaBannerSection from '@/components/sections/CtaBannerSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes somos — nexo',
  description: 'Conocé el equipo detrás de nexo, nuestra misión y por qué somos el courier de referencia USA–CR.',
}

const missions = [
  {
    label: 'Misión',
    text: 'Conectar a las personas con lo que quieren, sin importar la distancia, a través de tecnología accesible, procesos claros y una experiencia de cliente que realmente hace la diferencia.',
  },
  {
    label: 'Visión',
    text: 'Ser la empresa de paquetería de referencia en el corredor USA–CR para 2030, reconocida por su confiabilidad, transparencia y adopción de tecnología como primer diferenciador competitivo.',
  },
]

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex items-end bg-space-black pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4">Quiénes somos</p>
          <h1 className="text-5xl md:text-6xl font-black text-ghost leading-tight mb-6">
            Ticos que entienden<br />
            <span className="gradient-text">al tico.</span>
          </h1>
          <p className="text-slate text-xl max-w-2xl leading-relaxed">
            Nexo nació de una necesidad real: traer lo que querías de Estados Unidos era complicado,
            caro y lleno de sorpresas. Decidimos cambiar eso con tecnología, transparencia y gente que habla tu idioma.
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-20 bg-midnight/40">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((m, i) => (
              <div key={i} className="bg-midnight border border-white/5 rounded-2xl p-8">
                <p className="text-cyan text-xs font-semibold tracking-widest uppercase mb-3">{m.label}</p>
                <p className="text-ghost leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 bg-space-black">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4">Nuestra historia</p>
              <h2 className="text-3xl md:text-4xl font-bold text-ghost mb-5">
                Empezó con una caja de USA y mucha frustración.
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                Fundamos nexo porque sabemos lo que es esperar semanas por un paquete sin saber dónde está,
                recibir cobros inesperados en aduana, y no tener a quién llamar cuando algo sale mal.
              </p>
              <p className="text-slate leading-relaxed mb-4">
                Somos un equipo tico con raíces en los dos países. Entendemos el proceso desde ambos lados del corredor.
                Por eso construimos una plataforma que hace lo que prometemos: transparencia total en cada etapa.
              </p>
              <p className="text-slate leading-relaxed">
                Hoy manejamos miles de paquetes al mes con el mismo cuidado que le daríamos al nuestro propio.
              </p>
            </div>
            {/* Visual placeholder */}
            <div className="bg-midnight border border-white/5 rounded-3xl aspect-square flex flex-col items-center justify-center gap-4 text-center p-10">
              <div className="text-6xl">🇺🇸→🇨🇷</div>
              <p className="text-ghost font-semibold text-lg">USA → Costa Rica</p>
              <p className="text-slate text-sm">El corredor que más conocemos.</p>
            </div>
          </div>
        </div>
      </section>

      <ValuesSection />
      <ContactSection />

      <CtaBannerSection
        heading="Empezá hoy."
        subtext="Tu primer envío con nexo está a 30 segundos de distancia."
        ctaLabel="Cotizá gratis"
        ctaHref="/cotizar"
        secondaryLabel="Rastrear con postal.ninja"
        secondaryHref="https://postal.ninja/es"
      />
    </>
  )
}
