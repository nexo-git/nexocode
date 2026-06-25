'use client'

import { useEffect, useMemo, useState } from 'react'
import { getAllOrders, updateOrderStatus, updateOrder, createOrderAdmin, deleteOrder } from '@/lib/orders'
import { calculateLoyalty, MILESTONES } from '@/lib/loyalty'
import { getReviews, deleteReview } from '@/lib/reviews'
import {
  Search, UserCog, Trash2, Edit, Package, Plus, X, Check, MapPin, Copy, Star,
  LayoutDashboard, Users, ShoppingBag, MessageSquare, MessagesSquare, ChevronRight, ArrowLeft,
  TrendingUp, Weight, DollarSign, Clock, Menu,
} from 'lucide-react'
import type { NexoReview } from '@/types/casillero'
import Link from 'next/link'
import { fetchAuthSession } from 'aws-amplify/auth'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import type { NexoOrder, OrderStatus } from '@/types/casillero'
import ConversationsPanel from '@/components/admin/ConversationsPanel'

interface CognitoUser {
  Username: string
  Attributes: { Name: string; Value: string }[]
  UserStatus: string
  UserCreateDate: string
}

function getAttr(user: CognitoUser, name: string) {
  return user.Attributes.find((a) => a.Name === name)?.Value ?? '—'
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'en_ruta',         label: 'En Ruta' },
  { value: 'atascado_aduana', label: 'En Aduana' },
  { value: 'bodega_cr',       label: 'Bodega CR · Pagar' },
  { value: 'pagado_en_ruta',  label: 'Pago · Ruta Local' },
  { value: 'entregado',       label: 'Entregado' },
]

const statusStyle: Record<OrderStatus, string> = {
  en_ruta:         'bg-blue-500/10 text-blue-400',
  atascado_aduana: 'bg-status-yellow/10 text-status-yellow',
  bodega_cr:       'bg-orange-500/10 text-orange-400',
  pendiente_pago:  'bg-orange-500/10 text-orange-400',
  pagado_en_ruta:  'bg-emerald-400/10 text-emerald-400',
  entregado:       'bg-status-green/10 text-status-green',
}

async function authHeaders(): Promise<HeadersInit> {
  const session = await fetchAuthSession()
  const token = session.tokens?.idToken?.toString() ?? ''
  return { Authorization: token, 'Content-Type': 'application/json' }
}

type AdminSection = 'dashboard' | 'usuarios' | 'pedidos' | 'resenas' | 'conversaciones'

const NAV_ITEMS: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard',      label: 'Dashboard',       icon: <LayoutDashboard size={17} /> },
  { id: 'usuarios',       label: 'Usuarios',        icon: <Users size={17} /> },
  { id: 'pedidos',        label: 'Pedidos',         icon: <ShoppingBag size={17} /> },
  { id: 'resenas',        label: 'Reseñas',         icon: <MessageSquare size={17} /> },
  { id: 'conversaciones', label: 'Conversaciones',  icon: <MessagesSquare size={17} /> },
]

export default function AdminPage() {
  const { ready } = useCurrentUser({ adminOnly: true })
  const [section, setSection] = useState<AdminSection>('pedidos')
  const [selectedUser, setSelectedUser] = useState<CognitoUser | null>(null)

  // ── Usuarios ──────────────────────────────────────────────────────
  const [users, setUsers]       = useState<CognitoUser[]>([])
  const [filtered, setFiltered] = useState<CognitoUser[]>([])
  const [search, setSearch]     = useState('')
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [usersError, setUsersError]     = useState('')

  // ── Reseñas ───────────────────────────────────────────────────────
  const [reviews, setReviews]             = useState<NexoReview[]>([])
  const [loadingReviews, setLoadingReviews] = useState(false)

  // ── Pedidos ───────────────────────────────────────────────────────
  const [orders, setOrders]           = useState<NexoOrder[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [ordersError, setOrdersError]     = useState('')
  const [updatingId, setUpdatingId]       = useState<string | null>(null)

  // ── Editar pedido inline ─────────────────────────────────────────
  const [editingId, setEditingId]       = useState<string | null>(null)
  const [editTracking, setEditTracking] = useState('')
  const [editDesc, setEditDesc]         = useState('')

  // ── Crear pedido ──────────────────────────────────────────────────
  const [showForm, setShowForm]         = useState(false)
  const [formUserId, setFormUserId]     = useState('')
  const [formTracking, setFormTracking] = useState('')
  const [formDesc, setFormDesc]         = useState('')
  const [formError, setFormError]       = useState('')
  const [submitting, setSubmitting]     = useState(false)

  // ── Sidebar mobile ────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Conversaciones pendientes (badge sidebar) ─────────────────────
  const [pendingConvos, setPendingConvos] = useState(0)

  const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL

  useEffect(() => {
    if (!ready) return
    fetchUsers()
    fetchOrders()
    fetchReviews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  useEffect(() => {
    if (!ready) return
    const poll = async () => {
      try {
        const headers = await authHeaders()
        const res = await fetch('/api/admin/bot/conversations', { headers })
        if (!res.ok) return
        const data = await res.json()
        const pending = (data.conversations ?? []).filter(
          (c: { last_message_role: string }) => c.last_message_role === 'user'
        ).length
        setPendingConvos(pending)
      } catch { /* silencioso */ }
    }
    poll()
    const id = setInterval(poll, 30_000)
    return () => clearInterval(id)
  }, [ready])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      users.filter((u) =>
        getAttr(u, 'email').toLowerCase().includes(q) ||
        getAttr(u, 'given_name').toLowerCase().includes(q)
      )
    )
  }, [search, users])

  async function fetchUsers() {
    try {
      const headers = await authHeaders()
      const res = await fetch(`${apiUrl}/admin/users`, { headers })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setUsers(data)
      setFiltered(data)
    } catch {
      setUsersError('No se pudieron cargar los usuarios.')
    } finally {
      setLoadingUsers(false)
    }
  }

  async function fetchOrders() {
    const data = await getAllOrders()
    setOrders(data)
    setLoadingOrders(false)
  }

  async function fetchReviews() {
    setLoadingReviews(true)
    const data = await getReviews()
    setReviews(data)
    setLoadingReviews(false)
  }

  async function handleDeleteReview(reviewId: string, userName: string) {
    if (!confirm(`¿Eliminar la reseña de ${userName}? Esta acción no se puede deshacer.`)) return
    const ok = await deleteReview(reviewId)
    if (ok) setReviews((prev) => prev.filter((r) => r.reviewId !== reviewId))
    else alert('Error al eliminar la reseña.')
  }

  async function handleDeleteUser(username: string, email: string) {
    if (!confirm(`¿Eliminar la cuenta de ${email}? Esta acción no se puede deshacer.`)) return
    try {
      const headers = await authHeaders()
      await fetch(`${apiUrl}/admin/users/${username}`, { method: 'DELETE', headers })
      setUsers((prev) => prev.filter((u) => u.Username !== username))
      if (selectedUser?.Username === username) setSelectedUser(null)
    } catch {
      alert('Error al eliminar el usuario.')
    }
  }

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    if (status === 'bodega_cr') {
      const order = orders.find((o) => o.orderId === orderId)
      if (!order?.peso) {
        alert('Ingresá el peso del pedido antes de moverlo a Bodega CR.')
        return
      }
    }
    setUpdatingId(orderId)
    const ok = await updateOrderStatus(orderId, status)
    if (ok) setOrders((prev) => prev.map((o) => o.orderId === orderId ? { ...o, status } : o))
    setUpdatingId(null)
  }

  const TARIFA_KG = 14

  async function handlePesoBlur(orderId: string, raw: string) {
    const peso = parseFloat(raw)
    if (isNaN(peso) || peso < 0) return
    const current = orders.find((o) => o.orderId === orderId)
    if (current?.peso === peso) return
    const totalPagado = Math.round(peso * TARIFA_KG * 100) / 100
    const ok = await updateOrder(orderId, { peso, totalPagado })
    if (ok) setOrders((prev) => prev.map((o) => o.orderId === orderId ? { ...o, peso, totalPagado } : o))
  }

  function startEdit(order: NexoOrder) {
    setEditingId(order.orderId)
    setEditTracking(order.trackingNumber)
    setEditDesc(order.description || '')
  }

  async function handleSaveEdit(orderId: string) {
    if (!editTracking.trim()) return
    const ok = await updateOrder(orderId, {
      trackingNumber: editTracking.trim(),
      description: editDesc.trim(),
    })
    if (ok) {
      setOrders((prev) => prev.map((o) =>
        o.orderId === orderId
          ? { ...o, trackingNumber: editTracking.trim(), description: editDesc.trim() }
          : o
      ))
    }
    setEditingId(null)
  }

  async function handleDeleteOrder(orderId: string, tracking: string) {
    if (!confirm(`¿Eliminar el pedido ${tracking}? Esta acción no se puede deshacer.`)) return
    const ok = await deleteOrder(orderId)
    if (ok) setOrders((prev) => prev.filter((o) => o.orderId !== orderId))
    else alert('Error al eliminar el pedido.')
  }

  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!formUserId) { setFormError('Seleccioná un usuario.'); return }
    if (!formTracking.trim()) { setFormError('El número de tracking es requerido.'); return }
    setSubmitting(true)
    setFormError('')
    const selected = users.find((u) => u.Username === formUserId)
    const result = await createOrderAdmin({
      userId: formUserId,
      userName: selected ? `${getAttr(selected, 'given_name')} ${getAttr(selected, 'family_name')}`.trim() : '',
      userEmail: selected ? getAttr(selected, 'email') : '',
      trackingNumber: formTracking.trim(),
      description: formDesc.trim(),
    })
    setSubmitting(false)
    if ('error' in result) { setFormError(result.error); return }
    setOrders((prev) => [result.order, ...prev])
    setFormUserId('')
    setFormTracking('')
    setFormDesc('')
    setShowForm(false)
  }

  // ── Memos ─────────────────────────────────────────────────────────
  const { allDiscounts } = useMemo(() => {
    const byUser: Record<string, typeof orders> = {}
    orders.forEach((o) => { (byUser[o.userId] ??= []).push(o) })
    const allDiscounts = new Map<string, number>()
    Object.values(byUser).forEach((userOrders) => {
      calculateLoyalty(userOrders).discountMap.forEach((pct, id) => allDiscounts.set(id, pct))
    })
    return { allDiscounts }
  }, [orders])

  const dashboardStats = useMemo(() => {
    const activeStatuses = ['en_ruta', 'atascado_aduana', 'bodega_cr', 'pendiente_pago', 'pagado_en_ruta']
    const active = orders.filter((o) => activeStatuses.includes(o.status))
    const pendingPayment = orders.filter((o) => o.status === 'bodega_cr' || o.status === 'pendiente_pago')
    const kgInTransit = active.reduce((sum, o) => sum + (o.peso ?? 0), 0)
    return { active: active.length, pendingPayment: pendingPayment.length, kgInTransit }
  }, [orders])

  const inputCls = 'w-full bg-space-black border border-white/10 rounded-xl px-4 py-2.5 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 text-sm'

  if (!ready) return (
    <div className="fixed inset-0 z-40 bg-space-black flex items-center justify-center">
      <div className="text-slate text-sm animate-pulse">Cargando panel...</div>
    </div>
  )

  // ── Componente: tabla de pedidos (reutilizada en admin y detalle de usuario) ──
  function OrdersTable({ rows }: { rows: NexoOrder[] }) {
    return (
      <div className="bg-midnight border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5 text-slate text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-4">Cliente</th>
                <th className="text-left px-5 py-4 hidden md:table-cell">Tracking</th>
                <th className="text-left px-5 py-4 hidden lg:table-cell">Descripción</th>
                <th className="text-left px-5 py-4 hidden lg:table-cell">Fecha</th>
                <th className="text-left px-5 py-4 hidden xl:table-cell">Peso (kg)</th>
                <th className="text-left px-5 py-4 hidden xl:table-cell">Total ($)</th>
                <th className="text-left px-5 py-4">Estado</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((order) => {
                const discount = allDiscounts.get(order.orderId)
                return (
                  <tr key={order.orderId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-ghost font-medium">{order.userName}</p>
                      <p className="text-slate text-xs">{order.userEmail}</p>
                      {discount && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-cyan/10 text-cyan border border-cyan/20 mt-1">
                          ✦ Nexo Fiel {discount}%
                        </span>
                      )}
                      {order.deliveryDistrict && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <MapPin size={10} className="text-slate shrink-0" />
                          <span className="text-slate text-[11px] truncate max-w-[160px]">
                            {order.deliveryDistrict}, {order.deliveryCanton}
                          </span>
                          <button
                            onClick={() => {
                              const full = `${order.deliveryProvince}, ${order.deliveryCanton}, ${order.deliveryDistrict}. ${order.deliverySenas}`
                              navigator.clipboard.writeText(full)
                            }}
                            title="Copiar dirección completa"
                            className="ml-0.5 p-0.5 rounded hover:bg-white/10 text-slate hover:text-cyan transition-colors shrink-0"
                          >
                            <Copy size={10} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      {editingId === order.orderId ? (
                        <input
                          value={editTracking}
                          onChange={(e) => setEditTracking(e.target.value)}
                          className="w-full bg-space-black border border-cyan/40 rounded-lg px-2 py-1.5 text-ghost font-mono text-xs focus:outline-none focus:border-cyan/70"
                        />
                      ) : (
                        <span className="text-ghost font-mono text-xs">{order.trackingNumber}</span>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      {editingId === order.orderId ? (
                        <input
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          placeholder="—"
                          className="w-full bg-space-black border border-cyan/40 rounded-lg px-2 py-1.5 text-ghost text-xs focus:outline-none focus:border-cyan/70 placeholder-slate"
                        />
                      ) : (
                        <span className="text-slate text-xs truncate max-w-[180px] block">{order.description || '—'}</span>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-slate">
                      {new Date(order.startDate).toLocaleDateString('es-CR')}
                    </td>
                    <td className="px-5 py-4 hidden xl:table-cell">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={order.peso ?? ''}
                        placeholder="—"
                        onBlur={(e) => handlePesoBlur(order.orderId, e.target.value)}
                        disabled={(order.status === 'pagado_en_ruta' || order.status === 'entregado') && editingId !== order.orderId}
                        className="w-20 bg-space-black border border-white/10 rounded-lg px-2 py-1.5 text-ghost text-xs focus:outline-none focus:border-cyan/60 placeholder-slate disabled:opacity-40 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-5 py-4 hidden xl:table-cell">
                      {order.totalPagado != null ? (
                        discount ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="line-through text-slate text-xs">${order.totalPagado.toFixed(2)}</span>
                            <span className="text-xs font-semibold text-status-green">
                              ${(order.totalPagado * (1 - discount / 100)).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-ghost text-xs">${order.totalPagado.toFixed(2)}</span>
                        )
                      ) : (
                        <span className="text-slate text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        disabled={updatingId === order.orderId || (order.status === 'entregado' && editingId !== order.orderId)}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value as OrderStatus)}
                        className={`text-xs px-2 py-1.5 rounded-lg border border-white/10 bg-space-black focus:outline-none focus:border-cyan/60 cursor-pointer disabled:opacity-50 ${statusStyle[order.status]}`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-midnight text-ghost">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        {editingId === order.orderId ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(order.orderId)}
                              className="p-2 rounded-lg hover:bg-status-green/10 text-slate hover:text-status-green transition-colors"
                              title="Guardar"
                            >
                              <Check size={15} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2 rounded-lg hover:bg-white/10 text-slate hover:text-ghost transition-colors"
                              title="Cancelar"
                            >
                              <X size={15} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(order)}
                              className="p-2 rounded-lg hover:bg-cyan/10 text-slate hover:text-cyan transition-colors"
                              title="Editar"
                            >
                              <Edit size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order.orderId, order.trackingNumber)}
                              className="p-2 rounded-lg hover:bg-status-red/10 text-slate hover:text-status-red transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // ── Detalle de usuario ────────────────────────────────────────────
  function UserDetailView({ user }: { user: CognitoUser }) {
    const userOrders = useMemo(() =>
      orders
        .filter((o) => o.userId === user.Username)
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()),
      [user.Username]
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

    return (
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate mb-6">
          <button onClick={() => setSelectedUser(null)} className="flex items-center gap-1.5 hover:text-ghost transition-colors">
            <ArrowLeft size={14} />
            Usuarios
          </button>
          <ChevronRight size={14} />
          <span className="text-ghost">{firstName} {lastName}</span>
        </div>

        {/* Profile card */}
        <div className="bg-midnight border border-white/5 rounded-2xl p-6 mb-6 flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
            <span className="text-cyan font-bold text-lg">{firstName[0] ?? '?'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-ghost font-semibold text-lg">{firstName} {lastName}</h2>
            <p className="text-slate text-sm">{email}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-xs text-slate capitalize bg-white/5 px-2 py-0.5 rounded-md">{tipo}</span>
              {movil !== '—' && <span className="text-xs text-slate">{movil}</span>}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                user.UserStatus === 'CONFIRMED' ? 'bg-status-green/10 text-status-green' : 'bg-status-yellow/10 text-status-yellow'
              }`}>
                {user.UserStatus === 'CONFIRMED' ? 'Activo' : 'Pendiente'}
              </span>
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
              onClick={() => handleDeleteUser(user.Username, email)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate hover:text-status-red hover:border-status-red/30 transition-colors"
            >
              <Trash2 size={13} />
              Eliminar
            </button>
          </div>
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
          <OrdersTable rows={userOrders} />
        )}
      </div>
    )
  }

  // ── Render principal ──────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-40 bg-space-black flex overflow-hidden">

      {/* Overlay oscuro mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Botón hamburger — solo mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-3.5 left-3.5 z-50 p-2 bg-midnight border border-white/10 rounded-lg text-slate hover:text-ghost transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* ── Sidebar ── */}
      <aside className={`w-56 shrink-0 bg-midnight border-r border-white/5 flex flex-col overflow-y-auto fixed inset-y-0 left-0 z-50 transition-transform duration-200 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5 flex items-start justify-between">
          <div>
            <span className="text-xl font-extrabold">
              <span className="text-cyan">nexo</span>
              <span className="text-ghost">courier</span>
            </span>
            <p className="text-slate text-[11px] mt-0.5 tracking-widest uppercase">Admin</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 text-slate hover:text-ghost transition-colors mt-0.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => { setSection(id); setSelectedUser(null); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 text-left ${
                section === id
                  ? 'bg-cyan/10 text-cyan border-l-2 border-cyan'
                  : 'text-slate hover:text-ghost hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              {icon}
              <span className="flex-1">{label}</span>
              {id === 'conversaciones' && pendingConvos > 0 && (
                <span className="text-[11px] font-bold bg-cyan/20 text-cyan rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                  {pendingConvos > 9 ? '9+' : pendingConvos}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer sidebar */}
        <div className="px-5 py-4 border-t border-white/5">
          <Link href="/" className="text-slate text-xs hover:text-ghost transition-colors">
            ← Volver al sitio
          </Link>
        </div>
      </aside>

      {/* ── Contenido principal ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-6 py-8">

          {/* ── DASHBOARD ── */}
          {section === 'dashboard' && (
            <>
              <div className="mb-8">
                <p className="text-cyan text-xs font-semibold tracking-widest uppercase mb-1">Panel</p>
                <h1 className="text-2xl font-bold text-ghost">Dashboard</h1>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Usuarios',           value: users.length,                    icon: <Users size={18} className="text-cyan" />,          color: 'text-cyan' },
                  { label: 'Pedidos activos',     value: dashboardStats.active,           icon: <Package size={18} className="text-blue-400" />,    color: 'text-blue-400' },
                  { label: 'Pendientes de pago',  value: dashboardStats.pendingPayment,   icon: <Clock size={18} className="text-orange-400" />,    color: 'text-orange-400' },
                  { label: 'Kg en tránsito',      value: `${dashboardStats.kgInTransit.toFixed(1)} kg`, icon: <TrendingUp size={18} className="text-status-green" />, color: 'text-status-green' },
                ].map(({ label, value, icon, color }) => (
                  <div key={label} className="bg-midnight border border-white/5 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">{icon}</div>
                    <p className={`text-3xl font-bold mb-1 ${color}`}>{value}</p>
                    <p className="text-slate text-xs">{label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-midnight border border-white/5 rounded-2xl p-6">
                <h2 className="text-ghost font-semibold mb-4">Actividad reciente</h2>
                <div className="space-y-3">
                  {orders.slice(0, 8).map((o) => (
                    <div key={o.orderId} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-ghost text-sm font-medium truncate">{o.userName}</p>
                        <p className="text-slate text-xs font-mono">{o.trackingNumber}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-lg font-medium shrink-0 ${statusStyle[o.status]}`}>
                        {statusOptions.find(s => s.value === o.status)?.label ?? o.status}
                      </span>
                      <span className="text-slate text-xs shrink-0">
                        {new Date(o.startDate).toLocaleDateString('es-CR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── USUARIOS ── */}
          {section === 'usuarios' && (
            <>
              {selectedUser ? (
                <UserDetailView user={selectedUser} />
              ) : (
                <>
                  <div className="mb-8">
                    <p className="text-cyan text-xs font-semibold tracking-widest uppercase mb-1">Gestión</p>
                    <h1 className="text-2xl font-bold text-ghost">Usuarios</h1>
                  </div>

                  <div className="relative mb-6">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre o correo..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-midnight border border-white/10 rounded-xl pl-10 pr-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 text-sm"
                    />
                  </div>

                  {loadingUsers ? (
                    <p className="text-slate text-sm">Cargando usuarios...</p>
                  ) : usersError ? (
                    <p className="text-status-red text-sm">{usersError}</p>
                  ) : (
                    <div className="bg-midnight border border-white/5 rounded-2xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-slate text-xs uppercase tracking-wider">
                            <th className="text-left px-5 py-4">Usuario</th>
                            <th className="text-left px-5 py-4 hidden md:table-cell">Tipo</th>
                            <th className="text-left px-5 py-4 hidden lg:table-cell">Registrado</th>
                            <th className="text-left px-5 py-4">Estado</th>
                            <th className="px-5 py-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((user) => (
                            <tr
                              key={user.Username}
                              onClick={() => setSelectedUser(user)}
                              className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                            >
                              <td className="px-5 py-4">
                                <p className="text-ghost font-medium">{getAttr(user, 'given_name')} {getAttr(user, 'family_name')}</p>
                                <p className="text-slate text-xs">{getAttr(user, 'email')}</p>
                              </td>
                              <td className="px-5 py-4 hidden md:table-cell text-slate capitalize">
                                {getAttr(user, 'custom:tipo')}
                              </td>
                              <td className="px-5 py-4 hidden lg:table-cell text-slate">
                                {new Date(user.UserCreateDate).toLocaleDateString('es-CR')}
                              </td>
                              <td className="px-5 py-4">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  user.UserStatus === 'CONFIRMED'
                                    ? 'bg-status-green/10 text-status-green'
                                    : 'bg-status-yellow/10 text-status-yellow'
                                }`}>
                                  {user.UserStatus === 'CONFIRMED' ? 'Activo' : 'Pendiente'}
                                </span>
                              </td>
                              <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2 justify-end">
                                  <Link
                                    href={`/admin/${user.Username}`}
                                    className="p-2 rounded-lg hover:bg-cyan/10 text-slate hover:text-cyan transition-colors"
                                  >
                                    <Edit size={15} />
                                  </Link>
                                  <button
                                    onClick={() => handleDeleteUser(user.Username, getAttr(user, 'email'))}
                                    className="p-2 rounded-lg hover:bg-status-red/10 text-slate hover:text-status-red transition-colors"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filtered.length === 0 && (
                        <div className="text-center py-12">
                          <UserCog size={32} className="text-slate mx-auto mb-3" />
                          <p className="text-slate text-sm">No se encontraron usuarios.</p>
                        </div>
                      )}
                    </div>
                  )}
                  <p className="text-slate text-xs mt-4">{filtered.length} usuario{filtered.length !== 1 ? 's' : ''}</p>
                </>
              )}
            </>
          )}

          {/* ── PEDIDOS ── */}
          {section === 'pedidos' && (
            <>
              <div className="mb-8">
                <p className="text-cyan text-xs font-semibold tracking-widest uppercase mb-1">Gestión</p>
                <h1 className="text-2xl font-bold text-ghost">Pedidos</h1>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-slate text-sm">{orders.length} pedido{orders.length !== 1 ? 's' : ''}</p>
                <button
                  onClick={() => { setShowForm((v) => !v); setFormError('') }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan text-space-black font-semibold text-sm hover:bg-cyan/90 transition-colors"
                >
                  {showForm ? <X size={15} /> : <Plus size={15} />}
                  {showForm ? 'Cancelar' : 'Agregar pedido'}
                </button>
              </div>

              {showForm && (
                <form onSubmit={handleCreateOrder} className="bg-midnight border border-white/5 rounded-2xl p-5 mb-5 space-y-4">
                  <h3 className="text-ghost font-semibold text-sm">Nuevo pedido</h3>
                  <div>
                    <label className="text-xs font-medium text-ghost/70 mb-1 block">Usuario <span className="text-status-red">*</span></label>
                    <select value={formUserId} onChange={(e) => setFormUserId(e.target.value)} className={inputCls}>
                      <option value="">Seleccioná un usuario...</option>
                      {users.map((u) => (
                        <option key={u.Username} value={u.Username}>
                          {getAttr(u, 'given_name')} {getAttr(u, 'family_name')} — {getAttr(u, 'email')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ghost/70 mb-1 block">Número de tracking <span className="text-status-red">*</span></label>
                    <input className={inputCls} placeholder="ej. 1Z999AA10123456784" value={formTracking} onChange={(e) => setFormTracking(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ghost/70 mb-1 block">Descripción <span className="text-slate">(opcional)</span></label>
                    <input className={inputCls} placeholder="ej. Audífonos Sony" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} />
                  </div>
                  {formError && (
                    <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">{formError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-xl bg-cyan text-space-black font-semibold text-sm hover:bg-cyan/90 disabled:opacity-50 transition-colors"
                  >
                    {submitting ? 'Creando...' : 'Crear pedido'}
                  </button>
                </form>
              )}

              {loadingOrders ? (
                <p className="text-slate text-sm">Cargando pedidos...</p>
              ) : ordersError ? (
                <p className="text-status-red text-sm">{ordersError}</p>
              ) : orders.length === 0 ? (
                <div className="border border-dashed border-white/10 rounded-2xl p-14 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
                    <Package size={28} className="text-slate" />
                  </div>
                  <p className="text-ghost font-semibold text-lg mb-2">Sin pedidos registrados</p>
                  <p className="text-slate text-sm">Los pedidos de tus clientes aparecerán aquí.</p>
                </div>
              ) : (
                <OrdersTable rows={orders} />
              )}
            </>
          )}

          {/* ── RESEÑAS ── */}
          {section === 'resenas' && (
            <>
              <div className="mb-8">
                <p className="text-cyan text-xs font-semibold tracking-widest uppercase mb-1">Comunidad</p>
                <h1 className="text-2xl font-bold text-ghost">Reseñas</h1>
              </div>
              {loadingReviews ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-midnight border border-white/5 rounded-2xl h-24 animate-pulse" />
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <p className="text-slate text-sm">No hay reseñas todavía.</p>
              ) : (
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div key={r.reviewId} className="bg-midnight border border-white/5 rounded-2xl px-5 py-4 flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <p className="text-ghost font-medium text-sm">{r.userName}</p>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((n) => (
                              <Star key={n} size={12} className={n <= r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'} />
                            ))}
                          </div>
                          <span className="text-slate text-xs">
                            {new Date(r.createdAt).toLocaleDateString('es-CR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-slate text-sm leading-relaxed">{r.comment}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(r.reviewId, r.userName)}
                        className="p-2 rounded-lg hover:bg-status-red/10 text-slate hover:text-status-red transition-colors shrink-0"
                        title="Eliminar reseña"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}


          {/* ── CONVERSACIONES ── */}
          {section === 'conversaciones' && <ConversationsPanel />}

        </div>
      </main>
    </div>
  )
}
