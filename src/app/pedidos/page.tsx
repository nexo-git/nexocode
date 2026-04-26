'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Package, ArrowRight, MessageCircle } from 'lucide-react'
import { getCurrentUser } from '@/lib/casillero'
import { whatsappLink } from '@/lib/constants'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import type { NexoUser } from '@/types/casillero'

export default function PedidosPage() {
  const router = useRouter()
  const [user, setUser] = useState<NexoUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    getCurrentUser().then((current) => {
      if (!current) {
        router.replace('/login')
      } else {
        setUser(current)
        setReady(true)
      }
    })
  }, [router])

  if (!ready) return null

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Historial</p>
          <h1 className="text-4xl font-bold text-ghost mb-2">Tus pedidos</h1>
          <p className="text-slate">Hola <span className="text-ghost font-medium">{user?.nombre}</span>, acá aparecerán todos tus envíos con Nexo.</p>
        </div>

        {/* Empty state */}
        <div className="border border-dashed border-white/10 rounded-2xl p-14 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
            <Package size={28} className="text-slate" />
          </div>
          <h3 className="text-ghost font-semibold text-lg mb-2">Aún no tenés pedidos</h3>
          <p className="text-slate text-sm max-w-xs mb-8">
            Cuando realices tu primer envío con Nexo, el historial aparecerá aquí con el estado en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/cotizar">
              <Button size="md" icon={<ArrowRight size={16} />} iconPosition="right">
                Cotizá tu primer envío
              </Button>
            </Link>
            <a
              href={whatsappLink(`Hola nexo, soy ${user?.nombre} y quiero hacer mi primer envío.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="md" icon={<MessageCircle size={16} />}>
                Escribinos por WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Future: order list will go here */}
      </div>
    </div>
  )
}
