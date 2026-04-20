'use client'

import { useState } from 'react'
import QuoteForm from '@/components/cotizar/QuoteForm'
import QuoteResult from '@/components/cotizar/QuoteResult'
import CtaBannerSection from '@/components/sections/CtaBannerSection'
import type { QuoteResult as QuoteResultType } from '@/types/quote'

const faqs = [
  {
    q: '¿Cómo se calcula el precio?',
    a: 'El precio se basa en el peso real del paquete: $14 por kilogramo. Sin cargos ocultos ni recargos adicionales. La entrega en Guápiles Centro es <strong class="text-status-green">gratis</strong>. Para otras partes del país, el costo de entrega local está sujeto a las tarifas de la mensajería seleccionada por el cliente.',
  },
  {
    q: '¿Qué artículos no puedo enviar?',
    a: 'Están prohibidos: artículos inflamables, baterías de litio sueltas, sustancias controladas, armas de fuego, y artículos perecederos. Consultanos si tenés dudas.',
  },
  {
    q: '¿Qué pasa con la aduana de Costa Rica?',
    a: 'Nexo gestiona el proceso aduanero. Los impuestos de aduana son cobrados por el gobierno de Costa Rica y no forman parte de la tarifa de nexo. Si tenés dudas sobre tu caso específico, consultanos por WhatsApp.',
  },
  {
    q: '¿Puedo enviar varios paquetes juntos?',
    a: 'Sí, ofrecemos consolidación. Si comprás en varias tiendas, los unimos en un solo envío para que paguéis menos flete.',
  },
]

export default function CotizarPage() {
  const [result, setResult] = useState<QuoteResultType | null>(null)

  return (
    <>
      <div className="min-h-screen bg-space-black pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Cotizador</p>
            <h1 className="text-4xl md:text-5xl font-bold text-ghost mb-3">Cotizá tu envío</h1>
            <p className="text-slate text-lg">Sin registro. Sin compromiso. En 30 segundos.</p>
          </div>

          {/* Form + Result */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Form */}
            <div className="bg-midnight border border-white/5 rounded-2xl p-6 shadow-card">
              <h2 className="text-ghost font-semibold mb-6">Detalles del envío</h2>
              <QuoteForm onResult={(r) => { setResult(r); setTimeout(() => { document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' }) }, 100) }} />
            </div>

            {/* Result */}
            <div id="result-section">
              {result ? (
                <QuoteResult result={result} onReset={() => setResult(null)} />
              ) : (
                <div className="border border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <p className="text-ghost font-medium mb-1">Tu cotización aparece aquí</p>
                  <p className="text-slate text-sm">Completá el formulario para calcular el precio de tu envío.</p>
                </div>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-ghost mb-6 text-center">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group border border-white/5 rounded-xl bg-midnight overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-ghost font-medium text-sm select-none hover:text-cyan transition-colors">
                    {faq.q}
                    <span className="text-slate group-open:rotate-180 transition-transform ml-2 shrink-0">▾</span>
                  </summary>
                  <div
                    className="px-5 pb-4 text-slate text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.a }}
                  />
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CtaBannerSection
        heading="¿Tenés dudas?"
        subtext="Nuestro equipo está disponible por WhatsApp para ayudarte con cualquier consulta."
        ctaLabel="Escribinos ahora"
        ctaHref="https://wa.me/50661132863"
        secondaryLabel="Rastrear con postal.ninja"
        secondaryHref="https://postal.ninja/es"
      />
    </>
  )
}
