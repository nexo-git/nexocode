import type { TrackingResult } from '@/types/tracking'
import Card from '@/components/ui/Card'
import StatusBadge from './StatusBadge'
import TrackingTimeline from './TrackingTimeline'
import Button from '@/components/ui/Button'
import { MessageCircle, Scale } from 'lucide-react'
import { whatsappLink } from '@/lib/constants'

interface TrackingCardProps {
  result: TrackingResult
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function TrackingCard({ result }: TrackingCardProps) {
  const waMessage = `Hola nexo, tengo una pregunta sobre mi paquete ${result.id}.`

  return (
    <Card variant="highlighted" className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 pb-6 border-b border-white/10">
        <div>
          <p className="text-xs text-slate mb-1">Número de seguimiento</p>
          <p className="tracking-id text-base">{result.id}</p>
        </div>
        <StatusBadge status={result.status} />
      </div>

      {/* Package meta */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <p className="text-xs text-slate mb-1">Destinatario</p>
          <p className="text-ghost text-sm font-medium">{result.recipient}</p>
        </div>
        <div>
          <p className="text-xs text-slate mb-1">Peso</p>
          <p className="text-ghost text-sm font-medium flex items-center gap-1.5">
            <Scale size={12} className="text-slate" />
            {result.weight} kg
          </p>
        </div>
        <div>
          <p className="text-xs text-slate mb-1">Entrega estimada</p>
          <p className="text-ghost text-sm font-medium">{formatDate(result.estimatedDelivery)}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <p className="text-xs text-slate uppercase tracking-wider mb-4">Historial de eventos</p>
        <TrackingTimeline events={result.events} />
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-slate text-xs mb-3">¿Tenés alguna pregunta sobre tu paquete?</p>
        <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer">
          <Button
            variant="secondary"
            size="sm"
            icon={<MessageCircle size={14} />}
            iconPosition="left"
          >
            Escribir por WhatsApp
          </Button>
        </a>
      </div>
    </Card>
  )
}
