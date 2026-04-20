import type { QuoteResult as QuoteResultType } from '@/types/quote'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { MessageCircle, Clock, RefreshCw } from 'lucide-react'
import { whatsappLink } from '@/lib/constants'

interface QuoteResultProps {
  result: QuoteResultType
  onReset: () => void
}

function formatUSD(value: number) {
  return `$${value.toFixed(2)}`
}

export default function QuoteResult({ result, onReset }: QuoteResultProps) {
  const waMessage = `Hola nexo, hice una cotización en su web:\n- Total: ${formatUSD(result.totalUsd)}\nQuisiera proceder con el envío.`

  return (
    <Card variant="highlighted" className="h-fit">
      {/* Header */}
      <div className="mb-6 pb-5 border-b border-white/10">
        <p className="text-slate text-xs uppercase tracking-wider mb-1">Cotización estimada</p>
        <p className="text-4xl font-black text-ghost">
          {formatUSD(result.totalUsd)}
          <span className="text-slate text-base font-normal ml-2">USD</span>
        </p>
        <p className="text-slate text-xs mt-1">Precio final sujeto a confirmación de peso real.</p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
        <div className="flex justify-between text-sm">
          <span className="text-slate">Tarifa ($14 × peso)</span>
          <span className="text-ghost">{formatUSD(result.baseRateUsd)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold pt-2 border-t border-white/10">
          <span className="text-ghost">Total</span>
          <span className="text-cyan">{formatUSD(result.totalUsd)}</span>
        </div>
      </div>

      {/* Transit time */}
      <div className="flex items-center gap-2.5 mb-6 pb-6 border-b border-white/10">
        <Clock size={16} className="text-cyan shrink-0" />
        <p className="text-sm text-ghost">
          Tiempo estimado:{' '}
          <span className="font-semibold">
            {result.estimatedDaysMin}–{result.estimatedDaysMax} días hábiles
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button size="md" className="w-full" icon={<MessageCircle size={16} />}>
            Iniciar envío por WhatsApp
          </Button>
        </a>
        <Button
          variant="ghost"
          size="md"
          className="w-full"
          onClick={onReset}
          icon={<RefreshCw size={16} />}
        >
          Nueva cotización
        </Button>
      </div>
    </Card>
  )
}
