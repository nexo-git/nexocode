'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/casillero'
import { getAllOrders, updateOrderStatus, updateOrder, createOrderAdmin, deleteOrder } from '@/lib/orders'
import { calculateLoyalty } from '@/lib/loyalty'
import { Search, UserCog, Trash2, Edit, Package, Plus, X, Check } from 'lucide-react'
import Link from 'next/link'
import { fetchAuthSession } from 'aws-amplify/auth'
import type { NexoOrder, OrderStatus } from '@/types/casillero'

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
  { value: 'atascado_aduana', label: 'Atascado en Aduana' },
  { value: 'bodega_cr',       label: 'En Bodega CR · Pendiente de Pago' },
  { value: 'pagado_en_ruta',  label: 'Pagado · En Ruta a tu Puerta' },
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

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'usuarios' | 'pedidos'>('usuarios')

  // ── Usuarios ──────────────────────────────────────────────────────
  const [users, setUsers]       = useState<CognitoUser[]>([])
  const [filtered, setFiltered] = useState<CognitoUser[]>([])
  const [search, setSearch]     = useState('')
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [usersError, setUsersError]     = useState('')

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

  const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL

  useEffect(() => {
    getCurrentUser().then(async (user) => {
      if (!user) { router.push('/login'); return }
      const session = await fetchAuthSession()
      const groups = (session.tokens?.idToken?.payload['cognito:groups'] as string[]) ?? []
      if (!groups.includes('admin')) { router.replace('/casillero'); return }
      fetchUsers()
      fetchOrders()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  async function handleDeleteUser(username: string, email: string) {
    if (!confirm(`¿Eliminar la cuenta de ${email}? Esta acción no se puede deshacer.`)) return
    try {
      const headers = await authHeaders()
      await fetch(`${apiUrl}/admin/users/${username}`, { method: 'DELETE', headers })
      setUsers((prev) => prev.filter((u) => u.Username !== username))
    } catch {
      alert('Error al eliminar el usuario.')
    }
  }

  async function handleStatusChange(orderId: string, status: OrderStatus) {
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

  const inputCls = 'w-full bg-space-black border border-white/10 rounded-xl px-4 py-2.5 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 text-sm'

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-2">Panel de administración</p>
          <h1 className="text-3xl font-bold text-ghost">Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-midnight border border-white/5 rounded-xl p-1 w-fit mb-8">
          {(['usuarios', 'pedidos'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                tab === t ? 'bg-cyan text-space-black' : 'text-slate hover:text-ghost'
              }`}
            >
              {t === 'usuarios' ? 'Usuarios' : 'Pedidos'}
            </button>
          ))}
        </div>

        {/* ── TAB: USUARIOS ── */}
        {tab === 'usuarios' && (
          <>
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
                      <tr key={user.Username} className="border-b border-white/5 hover:bg-white/5 transition-colors">
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
                        <td className="px-5 py-4">
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

        {/* ── TAB: PEDIDOS ── */}
        {tab === 'pedidos' && (
          <>
            {/* Toolbar */}
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

            {/* Formulario inline */}
            {showForm && (
              <form onSubmit={handleCreateOrder} className="bg-midnight border border-white/5 rounded-2xl p-5 mb-5 space-y-4">
                <h3 className="text-ghost font-semibold text-sm">Nuevo pedido</h3>
                <div>
                  <label className="text-xs font-medium text-ghost/70 mb-1 block">Usuario <span className="text-status-red">*</span></label>
                  <select
                    value={formUserId}
                    onChange={(e) => setFormUserId(e.target.value)}
                    className={inputCls}
                  >
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
                  <input
                    className={inputCls}
                    placeholder="ej. 1Z999AA10123456784"
                    value={formTracking}
                    onChange={(e) => setFormTracking(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ghost/70 mb-1 block">Descripción <span className="text-slate">(opcional)</span></label>
                  <input
                    className={inputCls}
                    placeholder="ej. Audífonos Sony"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                  />
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
            ) : orders.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-2xl p-14 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
                  <Package size={28} className="text-slate" />
                </div>
                <p className="text-ghost font-semibold text-lg mb-2">Sin pedidos registrados</p>
                <p className="text-slate text-sm">Los pedidos de tus clientes aparecerán aquí.</p>
              </div>
            ) : (
              <div className="bg-midnight border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
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
                    {(() => {
                      const byUser: Record<string, typeof orders> = {}
                      orders.forEach((o) => { (byUser[o.userId] ??= []).push(o) })
                      const allDiscounts = new Map<string, number>()
                      Object.values(byUser).forEach((userOrders) => {
                        calculateLoyalty(userOrders).discountMap.forEach((pct, id) => allDiscounts.set(id, pct))
                      })
                      return orders.map((order) => {
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
                                className="w-20 bg-space-black border border-white/10 rounded-lg px-2 py-1.5 text-ghost text-xs focus:outline-none focus:border-cyan/60 placeholder-slate"
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
                                disabled={updatingId === order.orderId}
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
                      })
                    })()}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
