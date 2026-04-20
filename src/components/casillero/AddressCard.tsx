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

  const lines = address.split('\n')

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
      <div className="bg-space-black/60 rounded-xl px-5 py-4 mb-6 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <p key={i} className={i === 0 ? 'text-cyan font-semibold' : 'text-ghost'}>
            {line}
          </p>
        ))}
      </div>

      <p className="text-slate text-xs mb-6">
        Usá esta dirección cuando realices compras en tiendas de USA. Nexo recibirá tu paquete y lo enviará a Costa Rica.
      </p>

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
