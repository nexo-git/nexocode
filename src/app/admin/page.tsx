'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/casillero'
import { Search, UserCog, Trash2, Edit } from 'lucide-react'
import Link from 'next/link'

interface CognitoUser {
  Username: string
  Attributes: { Name: string; Value: string }[]
  UserStatus: string
  UserCreateDate: string
}

function getAttr(user: CognitoUser, name: string) {
  return user.Attributes.find((a) => a.Name === name)?.Value ?? '—'
}

export default function AdminPage() {
  const router = useRouter()
  const [users, setUsers] = useState<CognitoUser[]>([])
  const [filtered, setFiltered] = useState<CognitoUser[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) { router.push('/login'); return }
      fetchUsers()
    })
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
      const res = await fetch(`${apiUrl}/admin/users`)
      if (!res.ok) throw new Error('Error al cargar usuarios')
      const data = await res.json()
      setUsers(data)
      setFiltered(data)
    } catch (err) {
      setError('No se pudieron cargar los usuarios.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(username: string, email: string) {
    if (!confirm(`¿Eliminár la cuenta de ${email}? Esta acción no se puede deshacer.`)) return
    try {
      await fetch(`${apiUrl}/admin/users/${username}`, { method: 'DELETE' })
      setUsers((prev) => prev.filter((u) => u.Username !== username))
    } catch {
      alert('Error al eliminar el usuario.')
    }
  }

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-2">Panel de administración</p>
          <h1 className="text-3xl font-bold text-ghost">Usuarios</h1>
        </div>

        {/* Search */}
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

        {/* Table */}
        {loading ? (
          <p className="text-slate text-sm">Cargando usuarios...</p>
        ) : error ? (
          <p className="text-status-red text-sm">{error}</p>
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
      </div>
    </div>
  )
}
