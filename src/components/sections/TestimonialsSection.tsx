import Card from '@/components/ui/Card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Laura Mora',
    location: 'Escazú, San José',
    avatar: 'LM',
    quote: 'Pedí un par de tenis en una tienda de USA y llegaron en 6 días. El rastreo fue increíble, sabía exactamente dónde estaban en todo momento. Nunca más voy a usar otro courier.',
    rating: 5,
  },
  {
    name: 'Carlos Jiménez',
    location: 'Alajuela, CR',
    avatar: 'CJ',
    quote: 'Llevo 8 meses usando nexo para importar partes para mi taller. El precio es justo y el WhatsApp siempre responde. Es como tener un amigo en Miami.',
    rating: 5,
  },
  {
    name: 'Ana Solís',
    location: 'Cartago, CR',
    avatar: 'AS',
    quote: 'Mandé un regalo de cumpleaños para mi mamá desde Estados Unidos. Llegó puntual y sin problemas en aduana. La app de rastreo es lo mejor.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-space-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Testimonios</p>
          <h2 className="text-4xl md:text-5xl font-bold text-ghost mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-slate text-lg">
            Ticos en USA y en CR que ya confían en nexo.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} variant="default" className="flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} className="text-status-yellow fill-status-yellow" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-ghost/80 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan/20 flex items-center justify-center text-cyan text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-ghost text-sm font-semibold">{t.name}</p>
                  <p className="text-slate text-xs">{t.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
