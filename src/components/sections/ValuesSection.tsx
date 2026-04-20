import { Eye, DollarSign, MessageCircle, Zap, Shield } from 'lucide-react'
import Card from '@/components/ui/Card'

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
    <section className="py-24 bg-midnight/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Por qué nexo</p>
          <h2 className="text-4xl md:text-5xl font-bold text-ghost mb-4">
            Diferente desde el primer envío
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            No somos un courier más. Somos tecnología + servicio al precio justo.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <Card key={i} variant="default" className="group hover:border-cyan/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/15 transition-colors">
                  <Icon size={20} className="text-cyan" />
                </div>
                <h3 className="text-ghost font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{value.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
