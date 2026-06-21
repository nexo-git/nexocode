import { MessageCircle, Package2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { whatsappLink } from '@/lib/constants'

export default function TrackingPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center">
      <div className="max-w-lg mx-auto px-4 md:px-8 text-center">

        <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Rastreo</p>
        <h1 className="text-4xl font-bold text-ghost mb-4">Rastreá tu paquete</h1>
        <p className="text-slate text-lg mb-8">
          Ingresá a tu casillero para ver el estado actualizado de todos tus envíos en tiempo real,
          o escribinos directamente por WhatsApp y te ayudamos al instante.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pedidos">
            <Button size="lg" icon={<Package2 size={18} />}>
              Ver mis pedidos
            </Button>
          </Link>
          <a
            href={whatsappLink('Hola nexo, necesito ayuda para rastrear mi paquete.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" icon={<MessageCircle size={18} />}>
              Preguntar por WhatsApp
            </Button>
          </a>
        </div>

      </div>
    </div>
  )
}
