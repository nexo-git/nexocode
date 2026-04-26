'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash2 } from 'lucide-react'
import { getCurrentUser, updateCurrentUser, deleteCurrentUser, logoutUser } from '@/lib/casillero'
import Button from '@/components/ui/Button'
import type { NexoUser } from '@/types/casillero'

const schema = z.object({
  nombre:   z.string().min(1, 'Requerido'),
  apellido: z.string().optional(),
  movil:    z.string().min(8, 'Mínimo 8 dígitos'),
  telefono: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const inputClass  = 'w-full bg-space-black border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors text-sm'
const labelClass  = 'text-sm font-medium text-ghost/80 mb-1.5 block'
const errorClass  = 'text-xs text-status-red mt-1'

export default function CuentaPage() {
  const router = useRouter()
  const [user, setUser] = useState<NexoUser | null>(null)
  const [ready, setReady] = useState(false)
  const [saveOk, setSaveOk] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) { router.replace('/login'); return }
      setUser(u)
      reset({ nombre: u.nombre, apellido: u.apellido, movil: u.movil, telefono: u.telefono })
      setReady(true)
    })
  }, [router, reset])

  const onSubmit = async (data: FormData) => {
    setSaveOk(false)
    setSaveError('')
    const result = await updateCurrentUser({
      nombre:   data.nombre,
      apellido: data.apellido ?? '',
      movil:    data.movil,
      telefono: data.telefono ?? '',
    })
    if ('error' in result) { setSaveError(result.error) } else { setSaveOk(true) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    const result = await deleteCurrentUser()
    if ('error' in result) { setDeleting(false); return }
    await logoutUser()
    router.replace('/')
  }

  if (!ready) return null

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Perfil</p>
          <h1 className="text-4xl font-bold text-ghost mb-2">Mi cuenta</h1>
          <p className="text-slate text-sm">{user?.email}</p>
        </div>

        {/* Datos personales */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-midnight border border-white/5 rounded-2xl p-6 space-y-5 mb-6">
          <h2 className="text-ghost font-semibold">Datos personales</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nombre <span className="text-status-red">*</span></label>
              <input className={inputClass} {...register('nombre')} />
              {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Apellido</label>
              <input className={inputClass} {...register('apellido')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Móvil <span className="text-status-red">*</span></label>
              <input className={inputClass} {...register('movil')} />
              {errors.movil && <p className={errorClass}>{errors.movil.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <input className={inputClass} {...register('telefono')} />
            </div>
          </div>

          {saveError && (
            <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">{saveError}</p>
          )}
          {saveOk && (
            <p className="text-sm text-status-green bg-status-green/10 border border-status-green/20 rounded-xl px-4 py-3">Cambios guardados correctamente.</p>
          )}

          <Button type="submit" size="md" loading={isSubmitting} icon={<Save size={15} />}>
            Guardar cambios
          </Button>
        </form>

        {/* Eliminar cuenta */}
        <div className="bg-midnight border border-status-red/20 rounded-2xl p-6">
          <h2 className="text-ghost font-semibold mb-1">Eliminar cuenta</h2>
          <p className="text-slate text-sm mb-5">
            Se elimina tu cuenta y datos personales. Tus pedidos se mantienen como registro interno.
          </p>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-status-red/30 text-status-red hover:bg-status-red/10 text-sm font-medium transition-colors"
            >
              <Trash2 size={15} /> Eliminar mi cuenta
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-status-red font-medium">¿Estás seguro? Esta acción no se puede deshacer.</p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-status-red text-white text-sm font-medium hover:bg-status-red/80 transition-colors disabled:opacity-50"
                >
                  {deleting ? 'Eliminando...' : 'Sí, eliminar'}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-slate hover:text-ghost text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
