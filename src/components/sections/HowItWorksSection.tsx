import { ShoppingCart, Package, Plane, Home } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ShoppingCart,
    title: 'Comprá en USA',
    description: 'Usá nuestra dirección en Miami como destino de entrega en cualquier tienda de USA.',
  },
  {
    number: '02',
    icon: Package,
    title: 'Llegá a nuestra bodega',
    description: 'Tu paquete llega a nuestra bodega en Miami. Te notificamos de inmediato con foto y peso.',
  },
  {
    number: '03',
    icon: Plane,
    title: 'Lo enviamos a CR',
    description: 'Consolidamos tu carga y la enviamos en vuelo directo hacia Costa Rica. Todo rastreable.',
  },
  {
    number: '04',
    icon: Home,
    title: 'Recibilo en tu puerta',
    description: 'Entrega a domicilio en todo CR. Te avisamos cuando el repartidor está en camino.',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24">
      <div className="section-line mb-0" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24">
        <div className="text-center mb-16">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Proceso</p>
          <h2 className="text-4xl md:text-5xl font-bold text-ghost mb-4">
            Cómo funciona
          </h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Cuatro pasos y tu paquete va de cualquier tienda en USA a tu puerta en Costa Rica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={i}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-midnight/40 hover:border-cyan/20 hover:bg-midnight/60 hover:-translate-y-1 hover:shadow-cyan-glow transition-all duration-300"
              >
                {/* Step bubble */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan/15 to-cyan/5 border border-cyan/20 flex items-center justify-center">
                    <Icon size={24} className="text-cyan" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan text-space-black text-xs font-black flex items-center justify-center leading-none shadow-cyan-glow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ghost mb-2">{step.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
