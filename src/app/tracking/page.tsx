import { ExternalLink, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { whatsappLink } from '@/lib/constants'

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20 flex items-center">
      <div className="max-w-lg mx-auto px-4 md:px-8 text-center">

        <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Rastreo</p>
        <h1 className="text-4xl font-bold text-ghost mb-4">Rastreá tu paquete</h1>
        <p className="text-slate text-lg mb-8">
          Para rastrear tu envío, usá <span className="text-ghost font-medium">postal.ninja</span>, nuestro servicio de rastreo de confianza. Es gratuito y funciona con la mayoría de transportistas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a href="https://postal.ninja/es" target="_blank" rel="noopener noreferrer">
            <Button size="lg" icon={<ExternalLink size={18} />} iconPosition="right">
              Ir a postal.ninja
            </Button>
          </a>
          <a
            href={whatsappLink('Hola nexo, necesito ayuda para rastrear mi paquete.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" icon={<MessageCircle size={18} />}>
              Pedir ayuda por WhatsApp
            </Button>
          </a>
        </div>

        <div className="bg-midnight border border-white/5 rounded-2xl px-6 py-5 text-left">
          <p className="text-ghost font-medium text-sm mb-3">¿Cómo usarlo?</p>
          <ol className="space-y-2 text-slate text-sm">
            <li className="flex gap-2"><span className="text-cyan font-bold shrink-0">1.</span> Ingresá a postal.ninja</li>
            <li className="flex gap-2"><span className="text-cyan font-bold shrink-0">2.</span> Pegá tu número de guía del transportista (FedEx, UPS, DHL, etc.)</li>
            <li className="flex gap-2"><span className="text-cyan font-bold shrink-0">3.</span> Seguí el estado de tu envío en tiempo real</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
