import { Eye, DollarSign, MessageCircle, Zap, Shield } from 'lucide-react'

const values = [
  {
    icon: Eye,
    title: 'Transparencia total',
    description: 'Rastreo en tiempo real. Sabés exactamente dónde está tu paquete en cada momento. Sin letra pequeña.',
  },
  {
    icon: DollarSign,
    title: 'Precios claros',
    description: 'Cotizás antes de enviar. $14 por kilo, sin recargos ocultos. El costo de entrega local varía según tu zona.',
  },
  {
    icon: MessageCircle,
    title: 'Atención 24/7',
    description: 'Escribinos por WhatsApp a cualquier hora. Respuesta rápida, sin esperas.',
  },
  {
    icon: Zap,
    title: 'Proceso ágil',
    description: 'Tecnología que trabaja mientras dormís. Notificaciones automáticas en cada etapa.',
  },
  {
    icon: Shield,
    title: 'Tu paquete, seguro',
    description: 'Cada paquete es una responsabilidad. Manejamos tu carga con cuidado desde Miami hasta tu puerta.',
  },
]

export default function ValuesSection() {
  return (
    <section className="py-24 bg-midnight/40 relative overflow-hidden">
      <div className="section-line absolute top-0 left-0 right-0" />
      <div className="section-line absolute bottom-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Por qué nexo</p>
          <h2 className="text-4xl md:text-5xl font-bold text-ghost mb-4">
            Diferente desde el primer envío
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            No somos un courier más. Somos tecnología + servicio al precio justo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <div
                key={i}
                className="group rounded-2xl p-6 border border-white/5 bg-midnight/60 hover:border-cyan/20 hover:-translate-y-1 hover:shadow-cyan-glow transition-all duration-300 shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan/15 to-cyan/5 border border-cyan/15 flex items-center justify-center mb-4 group-hover:from-cyan/20 group-hover:border-cyan/25 transition-all">
                  <Icon size={22} className="text-cyan" />
                </div>
                <h3 className="text-ghost font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
