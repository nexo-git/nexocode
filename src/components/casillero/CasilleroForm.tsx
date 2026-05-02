'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserPlus, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import { registerUser, confirmAndLogin, resendCode } from '@/lib/casillero'
import type { NexoUser } from '@/types/casillero'
import Link from 'next/link'

const schema = z.object({
  tipo: z.enum(['persona', 'empresa']),
  nombreCompleto: z.string().min(2, 'Ingresá tu nombre completo.'),
  movil: z.string().min(8, 'Ingresá un número válido'),
  telefono: z.string().optional(),
  email: z.string().email('Correo inválido'),
  emailConfirm: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  passwordConfirm: z.string().min(6, 'Mínimo 6 caracteres'),
  terminos: z.literal(true, { errorMap: () => ({ message: 'Debés aceptar los términos' }) }),
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
  const [pendingEmail, setPendingEmail] = useState<string | null>(null)
  const [pendingPassword, setPendingPassword] = useState('')
  const [code, setCode] = useState('')
  const [confirmingCode, setConfirmingCode] = useState(false)
  const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { tipo: 'persona' },
  })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    const result = await registerUser({
      ...data,
      telefono: data.telefono ?? '',
      terminos: true,
    })
    if ('error' in result) {
      setServerError(result.error)
    } else {
      setPendingEmail(result.email)
      setPendingPassword(data.password)
    }
  }

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pendingEmail || !code.trim()) return
    setConfirmingCode(true)
    setServerError('')
    const result = await confirmAndLogin(pendingEmail, pendingPassword, code.trim())
    setConfirmingCode(false)
    if ('error' in result) {
      setServerError(result.error)
    } else {
      onSuccess(result.user)
    }
  }

  const handleResend = async () => {
    if (!pendingEmail) return
    setResendStatus('idle')
    const result = await resendCode(pendingEmail)
    setResendStatus('error' in result ? 'error' : 'sent')
  }

  if (pendingEmail) {
    return (
      <form onSubmit={handleConfirm} className="space-y-5">
        <div className="flex flex-col items-center text-center mb-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan/10 flex items-center justify-center mb-4">
            <Mail size={26} className="text-cyan" />
          </div>
          <h2 className="text-ghost font-semibold text-lg mb-1">Verificá tu correo</h2>
          <p className="text-slate text-sm">
            Enviamos un código a <span className="text-ghost font-medium">{pendingEmail}</span>.<br />
            Ingresalo para activar tu cuenta.
          </p>
        </div>

        <div>
          <label className={labelClass}>Código de verificación <span className="text-status-red">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="123456"
            className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-4 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors text-2xl font-mono tracking-[0.4em] text-center"
          />
        </div>

        {serverError && (
          <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">
            {serverError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" loading={confirmingCode}>
          Confirmar cuenta
        </Button>

        <div className="text-center">
          {resendStatus === 'sent' ? (
            <p className="text-status-green text-sm">Código reenviado. Revisá tu correo.</p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-slate text-sm hover:text-cyan transition-colors"
            >
              ¿No recibiste el código? <span className="text-cyan">Reenviar</span>
            </button>
          )}
        </div>
      </form>
    )
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
            <span className="text-sm font-medium capitalize text-slate">
              {t === 'persona' ? 'Persona' : 'Empresa'}
            </span>
          </label>
        ))}
      </div>

      {/* Nombre Completo */}
      <div>
        <label className={labelClass}>Nombre completo <span className="text-status-red">*</span></label>
        <input className={inputClass} placeholder="" {...register('nombreCompleto')} />
        {errors.nombreCompleto && <p className={errorClass}>{errors.nombreCompleto.message}</p>}
      </div>

      {/* Móvil + Teléfono */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Móvil <span className="text-status-red">*</span></label>
          <input className={inputClass} placeholder="" {...register('movil')} />
          {errors.movil && <p className={errorClass}>{errors.movil.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Teléfono</label>
          <input className={inputClass} placeholder="" {...register('telefono')} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Correo electrónico <span className="text-status-red">*</span></label>
        <input type="email" className={inputClass} placeholder="" {...register('email')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Repita correo <span className="text-status-red">*</span></label>
        <input type="email" className={inputClass} placeholder="" {...register('emailConfirm')} />
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
