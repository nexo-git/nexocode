'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, ChevronRight, Edit, Trash2, Copy, Check, MapPin, Home,
  ShoppingBag, Weight, DollarSign, Star, Phone, Smartphone, Calendar, Fingerprint,
} from 'lucide-react'
import { calculateLoyalty, MILESTONES } from '@/lib/loyalty'
import { getUserAddresses } from '@/lib/addresses'
import { generateAddress } from '@/lib/casillero'
import type { CognitoUser, NexoAddress, NexoOrder } from '@/types/casillero'

export function getAttr(user: CognitoUser, name: string) {
  return user.Attributes.find((a) => a.Name === name)?.Value ?? '—'
}

function formatDate(value?: string) {
  if (!value) return '—'
  const d = new Date(value)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('es-CR', { day: '2-digit', month: 'short', year: 'numeric' })
}

/** Botón de copiar con feedback temporal. */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(id)
  }, [copied])

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value)
        setCopied(true)
      }}
      aria-label={label}
      title={label}
      className="p-1.5 rounded-lg hover:bg-cyan/10 text-slate hover:text-cyan transition-colors shrink-0"
    >
      {copied ? <Check size={13} className="text-status-green" /> : <Copy size={13} />}
    </button>
  )
}

/** Fila de dato del perfil: icono + label + valor. */
function InfoRow({ icon, label, value, mono, copy }: {
  icon: React.ReactNode
  label: string
  value: string
  mono?: boolean
  copy?: boolean
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="text-slate shrink-0">{icon}</span>
      <span className="text-slate text-xs shrink-0">{label}</span>
      <span className={`text-ghost text-xs truncate ${mono ? 'font-mono' : ''}`}>{value}</span>
      {copy && value !== '—' && <CopyButton value={value} label={`Copiar ${label.toLowerCase()}`} />}
    </div>
  )
}

interface Props {
  user: CognitoUser
  orders: NexoOrder[]
  onBack: () => void
  onDelete: (username: string, email: string) => void
  renderOrders: (rows: NexoOrder[]) => React.ReactNode
}

export default function UserDetailView({ user, orders, onBack, onDelete, renderOrders }: Props) {
  const [addresses, setAddresses] = useState<NexoAddress[]>([])
  const [loadingAddresses, setLoadingAddresses] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoadingAddresses(true)
    getUserAddresses(user.Username).then((data) => {
      if (cancelled) return
      setAddresses(data)
      setLoadingAddresses(false)
    })
    return () => { cancelled = true }
  }, [user.Username])

  const userOrders = useMemo(() =>
    orders
      .filter((o) => o.userId === user.Username)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()),
    [orders, user.Username]
  )

  const stats = useMemo(() => {
    const BILLABLE = ['bodega_cr', 'pendiente_pago', 'pagado_en_ruta', 'entregado']
    const totalKg = userOrders
      .filter((o) => BILLABLE.includes(o.status) && o.peso != null)
      .reduce((sum, o) => sum + o.peso!, 0)
    const totalPaid = userOrders
      .filter((o) => ['pagado_en_ruta', 'entregado'].includes(o.status) && o.totalPagado != null)
      .reduce((sum, o) => sum + o.totalPagado!, 0)
    const { cycleKg, milestoneIdx } = calculateLoyalty(userOrders)
    const tier = milestoneIdx > 0 ? MILESTONES[milestoneIdx - 1] : null
    const nextMilestone = MILESTONES[milestoneIdx]
    return { totalKg, totalPaid, tier, cycleKg, nextMilestone }
  }, [userOrders])

  const firstName = getAttr(user, 'given_name')
  const lastName  = getAttr(user, 'family_name')
  const email     = getAttr(user, 'email')
  const tipo      = getAttr(user, 'custom:tipo')
  const movil     = getAttr(user, 'custom:movil')
  const telefono  = getAttr(user, 'custom:telefono')

  const casillero = generateAddress(
    firstName === '—' ? '' : firstName,
    lastName === '—' ? '' : lastName,
  )

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate mb-6">
        <button onClick={onBack} className="flex items-center gap-1.5 hover:text-ghost transition-colors">
          <ArrowLeft size={14} />
          Usuarios
        </button>
        <ChevronRight size={14} />
        <span className="text-ghost">{firstName} {lastName}</span>
      </div>

      {/* Profile card */}
      <div className="bg-midnight border border-white/5 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
            <span className="text-cyan font-bold text-lg">{firstName[0] ?? '?'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-ghost font-semibold text-lg">{firstName} {lastName}</h2>
            <p className="text-slate text-sm">{email}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-xs text-slate capitalize bg-white/5 px-2 py-0.5 rounded-md">{tipo}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                user.UserStatus === 'CONFIRMED' ? 'bg-status-green/10 text-status-green' : 'bg-status-yellow/10 text-status-yellow'
              }`}>
                {user.UserStatus === 'CONFIRMED' ? 'Activo' : 'Pendiente'}
              </span>
              {user.Enabled === false && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-status-red/10 text-status-red">
                  Deshabilitado
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/admin/${user.Username}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate hover:text-ghost hover:border-white/20 transition-colors"
            >
              <Edit size={13} />
              Editar
            </Link>
            <button
              onClick={() => onDelete(user.Username, email)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate hover:text-status-red hover:border-status-red/30 transition-colors"
            >
              <Trash2 size={13} />
              Eliminar
            </button>
          </div>
        </div>

        {/* Datos completos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-5 pt-5 border-t border-white/5">
          <InfoRow icon={<Smartphone size={13} />} label="Móvil" value={movil} copy />
          <InfoRow icon={<Phone size={13} />} label="Fijo" value={telefono} copy />
          <InfoRow icon={<Calendar size={13} />} label="Registrado" value={formatDate(user.UserCreateDate)} />
          <InfoRow icon={<Calendar size={13} />} label="Últ. modificación" value={formatDate(user.UserLastModifiedDate)} />
          <div className="sm:col-span-2">
            <InfoRow icon={<Fingerprint size={13} />} label="ID" value={user.Username} mono copy />
          </div>
        </div>
      </div>

      {/* Direcciones de entrega */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-ghost font-semibold">Direcciones de entrega</h3>
        {!loadingAddresses && addresses.length > 0 && (
          <span className="text-slate text-xs">
            {addresses.length} dirección{addresses.length !== 1 ? 'es' : ''}
          </span>
        )}
      </div>

      {loadingAddresses ? (
        <div className="bg-midnight border border-white/5 rounded-2xl p-6 mb-6">
          <p className="text-slate text-sm animate-pulse">Cargando direcciones...</p>
        </div>
      ) : addresses.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center mb-6">
          <p className="text-slate text-sm">Este usuario no tiene direcciones registradas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {addresses.map((addr) => {
            const full = `${addr.province}, ${addr.canton}, ${addr.district}. ${addr.senas}`
            return (
              <div
                key={addr.addressId}
                className={`bg-midnight rounded-2xl p-5 border ${addr.isDefault ? 'border-cyan/30' : 'border-white/5'}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin size={14} className="text-cyan shrink-0" />
                    <h4 className="text-ghost font-medium text-sm truncate">
                      {addr.district}, {addr.canton}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-cyan/10 text-cyan border border-cyan/20">
                        Predeterminada
                      </span>
                    )}
                    <CopyButton value={full} label="Copiar dirección completa" />
                  </div>
                </div>
                <p className="text-slate text-xs mb-2">{addr.province}</p>
                <p className="text-ghost text-sm leading-relaxed whitespace-pre-line">{addr.senas}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Casillero USA */}
      <h3 className="text-ghost font-semibold mb-4">Casillero USA</h3>
      <div className="bg-midnight border border-white/5 rounded-2xl p-5 mb-6 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <Home size={14} className="text-cyan shrink-0 mt-0.5" />
          <p className="text-ghost text-sm leading-relaxed whitespace-pre-line">{casillero}</p>
        </div>
        <CopyButton value={casillero} label="Copiar casillero USA" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total pedidos', value: userOrders.length, icon: <ShoppingBag size={16} className="text-cyan" /> },
          { label: 'Kg enviados', value: `${stats.totalKg.toFixed(1)} kg`, icon: <Weight size={16} className="text-purple-400" /> },
          { label: 'Total pagado', value: `$${stats.totalPaid.toFixed(2)}`, icon: <DollarSign size={16} className="text-status-green" /> },
          {
            label: 'Nexo Fiel',
            value: stats.tier ? `${stats.tier.label} (${stats.tier.pct}%)` : 'Sin tier',
            icon: <Star size={16} className="text-yellow-400" />,
          },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-midnight border border-white/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">{icon}<span className="text-slate text-xs">{label}</span></div>
            <p className="text-ghost font-semibold text-lg">{value}</p>
          </div>
        ))}
      </div>

      {/* Loyalty progress */}
      {stats.nextMilestone && (
        <div className="bg-midnight border border-white/5 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate text-xs">Progreso Nexo Fiel</span>
            <span className="text-slate text-xs">{stats.cycleKg.toFixed(1)} / {stats.nextMilestone.kg} kg → {stats.nextMilestone.label}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan rounded-full transition-all"
              style={{ width: `${Math.min(100, (stats.cycleKg / stats.nextMilestone.kg) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Orders */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-ghost font-semibold">Pedidos</h3>
        <span className="text-slate text-xs">{userOrders.length} pedido{userOrders.length !== 1 ? 's' : ''}</span>
      </div>
      {userOrders.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center">
          <p className="text-slate text-sm">Este usuario no tiene pedidos.</p>
        </div>
      ) : (
        renderOrders(userOrders)
      )}
    </div>
  )
}
