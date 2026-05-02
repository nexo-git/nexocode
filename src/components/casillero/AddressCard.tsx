'use client'

import { useState } from 'react'
import { Copy, Check, Package, MapPin } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { NexoUser } from '@/types/casillero'
import { generateAddress } from '@/lib/casillero'

interface AddressCardProps {
  user: NexoUser
}

export default function AddressCard({ user }: AddressCardProps) {
  const [copied, setCopied] = useState(false)
  const address = generateAddress(user.nombre, user.apellido)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nombre = address.split('\n')[0]

  const fields: { label: string; value: string; cyan?: boolean }[] = [
    { label: 'Nombre',    value: nombre,                         cyan: true },
    { label: 'Dirección', value: 'KEBRA LOGISTICS, 784 E 14TH PL' },
    { label: 'Ciudad',    value: 'LOS ANGELES' },
    { label: 'Estado',    value: 'California (CA)' },
    { label: 'ZIP',       value: '90021-2118' },
    { label: 'País',      value: 'Estados Unidos' },
    { label: 'Teléfono',  value: '3238750520' },
  ]

  return (
    <Card variant="highlighted" className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
          <MapPin size={20} className="text-cyan" />
        </div>
        <div>
          <p className="text-slate text-xs uppercase tracking-wider mb-0.5">Tu casillero en USA</p>
          <p className="text-ghost font-semibold">Dirección de envío asignada</p>
        </div>
      </div>

      {/* Address block */}
      <div className="bg-space-black/60 rounded-xl px-5 py-4 mb-4 font-mono text-sm">
        <table className="w-full border-separate border-spacing-y-1.5">
          <tbody>
            {fields.map(({ label, value, cyan }) => (
              <tr key={label}>
                <td className="text-slate text-xs pr-4 whitespace-nowrap align-top pt-0.5 w-24">{label}:</td>
                <td className={cyan ? 'text-cyan font-semibold' : 'text-ghost'}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda nombre */}
      <div className="flex items-start gap-2 bg-cyan/5 border border-cyan/20 rounded-xl px-4 py-3 mb-6">
        <span className="text-cyan text-sm shrink-0">⚠</span>
        <p className="text-slate text-xs leading-relaxed">
          El <span className="text-ghost font-semibold">nombre</span> debe ir exactamente como aparece arriba —{' '}
          con <span className="text-cyan font-semibold">- NEXO</span> al final — para que podamos identificar tu paquete en bodega.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleCopy}
          size="md"
          className="flex-1"
          icon={copied ? <Check size={16} /> : <Copy size={16} />}
        >
          {copied ? 'Copiado' : 'Copiar dirección'}
        </Button>
        <a href="https://postal.ninja/es" target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="secondary" size="md" className="w-full" icon={<Package size={16} />}>
            Rastrear paquete
          </Button>
        </a>
      </div>
    </Card>
  )
}
