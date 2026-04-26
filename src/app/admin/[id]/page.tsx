'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getCurrentUser } from '@/lib/casillero'
import { fetchAuthSession } from 'aws-amplify/auth'

async function authHeaders(): Promise<HeadersInit> {
  const session = await fetchAuthSession()
  const token = session.tokens?.idToken?.toString() ?? ''
  return { Authorization: token, 'Content-Type': 'application/json' }
}
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  given_name: z.string().min(1, 'Requerido'),
  family_name: z.string().optional(),
  'custom:movil': z.string().optional(),
  'custom:telefono': z.string().optional(),
  'custom:tipo': z.enum(['persona', 'empresa']),
})

type FormData = z.infer<typeof schema>

const inputClass = 'w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors text-sm'
const labelClass = 'text-sm font-medium text-ghost/80 mb-1.5 block'
const errorClass = 'text-xs text-status-red mt-1'

export default function AdminUserDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) { router.push('/login'); return }
      fetchUser()
    })
  }, [])

  async function fetchUser() {
    try {
      const headers = await authHeaders()
      const res = await fetch(`${apiUrl}/admin/users/${id}`, { headers })
      const data = await res.json()
      const attrs: Record<string, string> = {}
      data.UserAttributes?.forEach((a: { Name: string; Value: string }) => {
        attrs[a.Name] = a.Value
      })
      setEmail(attrs.email ?? '')
      reset({
        given_name: attrs.given_name ?? '',
        family_name: attrs.family_name ?? '',
        'custom:movil': attrs['custom:movil'] ?? '',
        'custom:telefono': attrs['custom:telefono'] ?? '',
        'custom:tipo': (attrs['custom:tipo'] as 'persona' | 'empresa') ?? 'persona',
      })
    } catch {
      setError('No se pudo cargar el usuario.')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      const headers = await authHeaders()
      await fetch(`${apiUrl}/admin/users/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      })
      router.push('/admin')
    } catch {
      setError('Error al guardar los cambios.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar la cuenta de ${email}? Esta acción no se puede deshacer.`)) return
    const headers = await authHeaders()
    await fetch(`${apiUrl}/admin/users/${id}`, { method: 'DELETE', headers })
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-slate hover:text-cyan text-sm mb-8 transition-colors">
          <ArrowLeft size={15} /> Volver a usuarios
        </Link>

        <div className="mb-8">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-2">Editar usuario</p>
          <h1 className="text-2xl font-bold text-ghost">{email}</h1>
        </div>

        {loading ? (
          <p className="text-slate text-sm">Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-midnight border border-white/5 rounded-2xl p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre <span className="text-status-red">*</span></label>
                <input className={inputClass} {...register('given_name')} />
                {errors.given_name && <p className={errorClass}>{errors.given_name.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Apellido</label>
                <input className={inputClass} {...register('family_name')} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Móvil</label>
                <input className={inputClass} {...register('custom:movil')} />
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <input className={inputClass} {...register('custom:telefono')} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Tipo</label>
              <select className={inputClass} {...register('custom:tipo')}>
                <option value="persona">Persona</option>
                <option value="empresa">Empresa</option>
              </select>
            </div>

            {error && (
              <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" size="md" loading={saving} icon={<Save size={15} />} className="flex-1">
                Guardar cambios
              </Button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-status-red/30 text-status-red hover:bg-status-red/10 text-sm font-medium transition-colors"
              >
                <Trash2 size={15} /> Eliminar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
