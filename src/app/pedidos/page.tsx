'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Package, ArrowRight, Plus, X, CreditCard } from 'lucide-react'
import { getCurrentUser } from '@/lib/casillero'
import { getMyOrders, addOrder } from '@/lib/orders'

import Button from '@/components/ui/Button'
import Link from 'next/link'
import LoyaltyBar from '@/components/pedidos/LoyaltyBar'
import { calculateLoyalty } from '@/lib/loyalty'
import type { NexoUser, NexoOrder } from '@/types/casillero'

const statusLabel: Record<string, { label: string; color: string }> = {
  en_ruta:         { label: 'En Ruta',                          color: 'bg-blue-500/10 text-blue-400' },
  atascado_aduana: { label: 'Atascado en Aduana',               color: 'bg-status-yellow/10 text-status-yellow' },
  bodega_cr:       { label: 'En Bodega CR · Pendiente de Pago', color: 'bg-orange-500/10 text-orange-400' },
  pendiente_pago:  { label: 'En Bodega CR · Pendiente de Pago', color: 'bg-orange-500/10 text-orange-400' },
  pagado_en_ruta:  { label: 'Pagado · En Ruta a tu Puerta',     color: 'bg-emerald-400/10 text-emerald-400' },
  entregado:       { label: 'Entregado',                        color: 'bg-status-green/10 text-status-green' },
}

export default function PedidosPage() {
  const router = useRouter()
  const [user, setUser]         = useState<NexoUser | null>(null)
  const [orders, setOrders]     = useState<NexoOrder[]>([])
  const [ready, setReady]       = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [tracking, setTracking] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting]   = useState(false)
  const [formError, setFormError]     = useState('')

  useEffect(() => {
    getCurrentUser().then((current) => {
      if (!current) { router.replace('/login'); return }
      setUser(current)
      getMyOrders().then((data) => { setOrders(data); setReady(true) })
    })
  }, [router])

  if (!ready) return null

  async function handleAddOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!tracking.trim()) { setFormError('El número de tracking es requerido.'); return }
    setSubmitting(true)
    setFormError('')
    const result = await addOrder({ trackingNumber: tracking.trim(), description: description.trim() })
    setSubmitting(false)
    if ('error' in result) { setFormError(result.error); return }
    setOrders((prev) => [result.order, ...prev])
    setTracking('')
    setDescription('')
    setShowForm(false)
  }

  const { discountMap } = calculateLoyalty(orders)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  const inputClass = 'w-full bg-space-black border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 text-sm'

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Historial</p>
            <h1 className="text-4xl font-bold text-ghost mb-2">Tus pedidos</h1>
            <p className="text-slate">Hola <span className="text-ghost font-medium">{user?.nombre}</span>, acá aparecen todos tus envíos con Nexo.</p>
          </div>
          <button
            onClick={() => { setShowForm((v) => !v); setFormError('') }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan text-space-black font-semibold text-sm hover:bg-cyan/90 transition-colors mt-1 shrink-0"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? 'Cancelar' : 'Agregar pedido'}
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <form onSubmit={handleAddOrder} className="bg-midnight border border-white/5 rounded-2xl p-6 mb-6 space-y-4">
            <h2 className="text-ghost font-semibold">Nuevo pedido</h2>
            <div>
              <label className="text-sm font-medium text-ghost/80 mb-1.5 block">Número de tracking <span className="text-status-red">*</span></label>
              <input
                className={inputClass}
                placeholder="ej. 1Z999AA10123456784"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ghost/80 mb-1.5 block">Descripción <span className="text-slate">(opcional)</span></label>
              <input
                className={inputClass}
                placeholder="ej. Audífonos Sony, Talla M"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {formError && (
              <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">{formError}</p>
            )}
            <Button type="submit" size="md" loading={submitting}>
              Agregar pedido
            </Button>
          </form>
        )}

        {/* Layout: tabla + sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Lista de pedidos — orden 2 en mobile, 1 en desktop */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {sortedOrders.length > 0 ? (
              <div className="space-y-3">
                {sortedOrders.map((order) => {
                  const st       = statusLabel[order.status] ?? statusLabel.en_ruta
                  const discount = discountMap.get(order.orderId)
                  return (
                    <div key={order.orderId} className="bg-midnight border border-white/5 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-ghost font-medium text-sm truncate">{order.trackingNumber}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${st.color}`}>{st.label}</span>
                          {discount && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 bg-cyan/10 text-cyan border border-cyan/20">
                              ✦ {discount}% Nexo Fiel
                            </span>
                          )}
                        </div>
                        {order.description && (
                          <p className="text-slate text-xs truncate">{order.description}</p>
                        )}
                        <div className="flex items-center gap-3 flex-wrap mt-1">
                          <p className="text-slate text-xs">
                            {new Date(order.startDate).toLocaleDateString('es-CR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                          {order.peso != null && (
                            <span className="text-xs text-ghost/60">{order.peso} kg</span>
                          )}
                          {order.totalPagado != null && (
                            discount ? (
                              <span className="flex items-center gap-1.5">
                                <span className="line-through text-slate text-xs">${order.totalPagado.toFixed(2)}</span>
                                <span className="text-xs font-semibold text-status-green">
                                  ${(order.totalPagado * (1 - discount / 100)).toFixed(2)}
                                </span>
                              </span>
                            ) : (
                              <span className="text-xs font-medium text-cyan">${order.totalPagado.toFixed(2)}</span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Botón pagar — solo cuando entregado */}
                      {(order.status === 'bodega_cr' || order.status === 'pendiente_pago') && (
                        <button
                          onClick={() => alert('Próximamente — pagos con tarjeta')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-status-green/10 text-status-green text-xs font-semibold border border-status-green/20 hover:bg-status-green/20 transition-colors shrink-0"
                        >
                          <CreditCard size={13} />
                          Pagar
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              /* Empty state */
              <div className="border border-dashed border-white/10 rounded-2xl p-14 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
                  <Package size={28} className="text-slate" />
                </div>
                <h3 className="text-ghost font-semibold text-lg mb-2">Aún no tenés pedidos</h3>
                <p className="text-slate text-sm max-w-xs mb-8">
                  Usá el botón <span className="text-ghost">"Agregar pedido"</span> para registrar tu primer envío con el número de tracking.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/casillero">
                    <Button size="md" icon={<ArrowRight size={16} />} iconPosition="right">
                      Tu casillero
                    </Button>
                  </Link>
                  <a href="https://postal.ninja/es" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="md" icon={<ArrowRight size={16} />} iconPosition="right">
                      Rastrear paquete
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Loyalty bar — arriba en mobile, derecha en desktop */}
          <div className="w-full lg:w-72 order-1 lg:order-2 lg:sticky lg:top-28">
            <LoyaltyBar orders={orders} />
          </div>

        </div>
      </div>
    </div>
  )
}
