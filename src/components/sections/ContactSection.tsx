import { MessageCircle, Mail, Clock, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'
import { whatsappLink } from '@/lib/constants'

const contactItems = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+506 6113-2863',
    description: 'Respuesta en menos de 1 hora en horario laboral.',
    cta: { label: 'Escribir ahora', href: whatsappLink('Hola nexo, quiero más información.') },
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'nexxo.courier@gmail.com',
    description: 'Para consultas que requieren documentación.',
    cta: { label: 'Enviar email', href: 'mailto:nexxo.courier@gmail.com' },
  },
  {
    icon: Clock,
    label: 'Horario de atención',
    value: '24 horas, 7 días a la semana',
    description: 'Siempre disponibles para atenderte.',
    cta: null,
  },
  {
    icon: MapPin,
    label: 'Bodega Miami',
    value: 'Miami, Florida, USA',
    description: 'Dirección exacta se entrega al registrar tu primera compra.',
    cta: null,
  },
]

export default function ContactSection() {
  return (
    <section className="py-24 bg-space-black">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Contacto</p>
          <h2 className="text-4xl md:text-5xl font-bold text-ghost mb-4">Estamos para ayudarte</h2>
          <p className="text-slate text-lg max-w-xl mx-auto">
            Disponible las 24 horas, los 7 días de la semana. Respuesta rápida para que nunca te quedés sin información sobre tu envío.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {contactItems.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="bg-midnight border border-white/5 rounded-2xl p-6 hover:border-cyan/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-ghost font-semibold mb-1">{item.value}</p>
                    <p className="text-slate text-sm mb-3">{item.description}</p>
                    {item.cta && (
                      <a href={item.cta.href} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" size="sm">
                          {item.cta.label}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* WhatsApp big CTA */}
        <div className="text-center">
          <a
            href={whatsappLink('Hola nexo 👋 Quiero información sobre sus servicios.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" icon={<MessageCircle size={18} />}>
              Hablar por WhatsApp ahora
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
