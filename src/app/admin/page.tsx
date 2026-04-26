'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/casillero'
import { getAllOrders, updateOrderStatus, updateOrder } from '@/lib/orders'
import { Search, UserCog, Trash2, Edit, Package } from 'lucide-react'
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
  { value: 'en_ruta',   label: 'En ruta' },
  { value: 'atascado',  label: 'Atascado' },
  { value: 'entregado', label: 'Entregado' },
]

const statusStyle: Record<OrderStatus, string> = {
  en_ruta:   'bg-blue-500/10 text-blue-400',
  atascado:  'bg-status-yellow/10 text-status-yellow',
  entregado: 'bg-status-green/10 text-status-green',
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
  const [users, setUsers] = useState<CognitoUser[]>([])
  const [filtered, setFiltered] = useState<CognitoUser[]>([])
  const [search, setSearch] = useState('')
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [usersError, setUsersError] = useState('')

  // ── Pedidos ───────────────────────────────────────────────────────
  const [orders, setOrders] = useState<NexoOrder[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [ordersError, setOrdersError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) { router.push('/login'); return }
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
    if (data.length === 0) setOrdersError('')
  }

  async function handleDelete(username: string, email: string) {
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
    if (ok) {
      setOrders((prev) => prev.map((o) => o.orderId === orderId ? { ...o, status } : o))
    }
    setUpdatingId(null)
  }

  async function handleFieldBlur(orderId: string, field: 'peso' | 'totalPagado', raw: string) {
    const value = parseFloat(raw)
    if (isNaN(value) || value < 0) return
    const current = orders.find((o) => o.orderId === orderId)
    if (current?.[field] === value) return
    const ok = await updateOrder(orderId, { [field]: value })
    if (ok) {
      setOrders((prev) => prev.map((o) => o.orderId === orderId ? { ...o, [field]: value } : o))
    }
  }

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
                              onClick={() => handleDelete(user.Username, getAttr(user, 'email'))}
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
              <div className="bg-midnight border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-slate text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-4">Cliente</th>
                      <th className="text-left px-5 py-4 hidden md:table-cell">Tracking</th>
                      <th className="text-left px-5 py-4 hidden lg:table-cell">Descripción</th>
                      <th className="text-left px-5 py-4 hidden lg:table-cell">Fecha</th>
                      <th className="text-left px-5 py-4 hidden xl:table-cell">Peso (lb)</th>
                      <th className="text-left px-5 py-4 hidden xl:table-cell">Total ($)</th>
                      <th className="text-left px-5 py-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.orderId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4">
                          <p className="text-ghost font-medium">{order.userName}</p>
                          <p className="text-slate text-xs">{order.userEmail}</p>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell text-ghost font-mono text-xs">
                          {order.trackingNumber}
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell text-slate max-w-[180px] truncate">
                          {order.description || '—'}
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
                            onBlur={(e) => handleFieldBlur(order.orderId, 'peso', e.target.value)}
                            className="w-20 bg-space-black border border-white/10 rounded-lg px-2 py-1.5 text-ghost text-xs focus:outline-none focus:border-cyan/60 placeholder-slate"
                          />
                        </td>
                        <td className="px-5 py-4 hidden xl:table-cell">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            defaultValue={order.totalPagado ?? ''}
                            placeholder="—"
                            onBlur={(e) => handleFieldBlur(order.orderId, 'totalPagado', e.target.value)}
                            className="w-24 bg-space-black border border-white/10 rounded-lg px-2 py-1.5 text-ghost text-xs focus:outline-none focus:border-cyan/60 placeholder-slate"
                          />
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-slate text-xs mt-4">{orders.length} pedido{orders.length !== 1 ? 's' : ''}</p>
          </>
        )}

      </div>
    </div>
  )
}
