'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserPlus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { registerUser } from '@/lib/casillero'
import type { NexoUser } from '@/types/casillero'
import Link from 'next/link'

const schema = z.object({
  tipo: z.enum(['persona', 'empresa']),
  nombre: z.string().min(1, 'Requerido'),
  apellido: z.string().optional(),
  movil: z.string().min(8, 'Ingresá un número válido'),
  telefono: z.string().optional(),
  email: z.string().email('Correo inválido'),
  emailConfirm: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  passwordConfirm: z.string().min(6, 'Mínimo 6 caracteres'),
  terminos: z.literal(true, { errorMap: () => ({ message: 'Debés aceptar los términos' }) }),
}).refine(d => d.tipo === 'empresa' || (d.apellido && d.apellido.length > 0), {
  message: 'Requerido',
  path: ['apellido'],
}).refine(d => d.email === d.emailConfirm, {
  message: 'Los correos no coinciden',
  path: ['emailConfirm'],
}).refine(d => d.password === d.passwordConfirm, {
  message: 'Las contraseñas no coinciden',
  path: ['passwordConfirm'],
})

type FormData = z.infer<typeof schema>

interface CasilleroFormProps {
  onSuccess: (user: NexoUser) => void
}

const inputClass = 'w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors text-sm'
const labelClass = 'text-sm font-medium text-ghost/80 mb-1.5 block'
const errorClass = 'text-xs text-status-red mt-1'

export default function CasilleroForm({ onSuccess }: CasilleroFormProps) {
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { tipo: 'persona' },
  })

  const tipo = watch('tipo')

  const onSubmit = (data: FormData) => {
    setServerError('')
    const result = registerUser({
      ...data,
      telefono: data.telefono ?? '',
      terminos: true,
    })
    if ('error' in result) {
      setServerError(result.error)
    } else {
      onSuccess(result.user)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Tipo */}
      <div className="flex gap-4">
        {(['persona', 'empresa'] as const).map((t) => (
          <label key={t} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value={t}
              {...register('tipo')}
              className="accent-cyan w-4 h-4"
            />
            <span className={`text-sm font-medium capitalize ${tipo === t ? 'text-cyan' : 'text-slate'}`}>
              {t === 'persona' ? 'Persona' : 'Empresa'}
            </span>
          </label>
        ))}
      </div>

      {/* Nombre + Apellido */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nombre <span className="text-status-red">*</span></label>
          <input className={inputClass} placeholder="Alejandro" {...register('nombre')} />
          {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
        </div>
        <div>
          <label className={labelClass}>
            Apellido {tipo === 'persona' && <span className="text-status-red">*</span>}
          </label>
          <input
            className={inputClass + (tipo === 'empresa' ? ' opacity-40 cursor-not-allowed' : '')}
            placeholder="Morales"
            disabled={tipo === 'empresa'}
            {...register('apellido')}
          />
          {errors.apellido && <p className={errorClass}>{errors.apellido.message}</p>}
        </div>
      </div>

      {/* Móvil + Teléfono */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Móvil <span className="text-status-red">*</span></label>
          <input className={inputClass} placeholder="+506 8765-4321" {...register('movil')} />
          {errors.movil && <p className={errorClass}>{errors.movil.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Teléfono</label>
          <input className={inputClass} placeholder="+506 2222-0000" {...register('telefono')} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Correo electrónico <span className="text-status-red">*</span></label>
        <input type="email" className={inputClass} placeholder="tucorreo@gmail.com" {...register('email')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Repita correo <span className="text-status-red">*</span></label>
        <input type="email" className={inputClass} placeholder="tucorreo@gmail.com" {...register('emailConfirm')} />
        {errors.emailConfirm && <p className={errorClass}>{errors.emailConfirm.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className={labelClass}>Contraseña <span className="text-status-red">*</span></label>
        <input type="password" className={inputClass} placeholder="••••••••" {...register('password')} />
        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Repita contraseña <span className="text-status-red">*</span></label>
        <input type="password" className={inputClass} placeholder="••••••••" {...register('passwordConfirm')} />
        {errors.passwordConfirm && <p className={errorClass}>{errors.passwordConfirm.message}</p>}
      </div>

      {/* Términos */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" {...register('terminos')} className="accent-cyan mt-0.5 w-4 h-4 shrink-0" />
        <span className="text-slate text-sm">
          Acepto los términos y condiciones del servicio de casillero Nexo.
        </span>
      </label>
      {errors.terminos && <p className={errorClass}>{errors.terminos.message}</p>}

      {serverError && (
        <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" loading={isSubmitting} icon={<UserPlus size={18} />}>
        Crear casillero
      </Button>

      <p className="text-center text-slate text-sm">
        ¿Ya tenés cuenta?{' '}
        <Link href="/login" className="text-cyan hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </form>
  )
}
