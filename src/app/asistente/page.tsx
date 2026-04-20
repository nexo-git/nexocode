import AsistenteForm from '@/components/asistente/AsistenteForm'
import Card from '@/components/ui/Card'
import { ShoppingBag, CheckCircle2, Info } from 'lucide-react'

const tips = [
  {
    icon: ShoppingBag,
    title: 'Tiendas soportadas',
    body: 'Amazon, Walmart, Target, eBay, Nike, SHEIN, y cualquier tienda con URL pública.',
  },
  {
    icon: CheckCircle2,
    title: 'Cómo copiar el link',
    body: 'Abrí el producto, copiá la URL completa desde la barra del navegador y pegala en el formulario.',
  },
  {
    icon: Info,
    title: '¿Qué pasa después?',
    body: 'Nuestro equipo revisa el producto, te confirma disponibilidad, peso estimado y costo total de envío.',
  },
]

export default function AsistentePage() {
  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Asistente de compra</p>
          <h1 className="text-4xl md:text-5xl font-bold text-ghost mb-3">
            Comprá en USA sin complicaciones
          </h1>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Pegá el link del producto que querés. Nosotros te cotizamos el envío por WhatsApp en minutos.
          </p>
        </div>

        {/* Layout 2 col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Form */}
          <div className="bg-midnight border border-white/5 rounded-2xl p-6 shadow-card">
            <h2 className="text-ghost font-semibold mb-6">¿Qué producto querés traer?</h2>
            <AsistenteForm />
          </div>

          {/* Tips */}
          <div className="flex flex-col gap-4">
            {tips.map((tip, i) => {
              const Icon = tip.icon
              return (
                <Card key={i} variant="default" className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={17} className="text-cyan" />
                  </div>
                  <div>
                    <p className="text-ghost font-semibold text-sm mb-1">{tip.title}</p>
                    <p className="text-slate text-sm leading-relaxed">{tip.body}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
