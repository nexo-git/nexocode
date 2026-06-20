'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { KeyRound } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { confirmNewPassword, forgotPassword } from '@/lib/casillero'

const schema = z.object({
  code: z.string().min(6, 'Ingresá el código de 6 dígitos').max(6, 'El código es de 6 dígitos'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirmá tu contraseña'),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

const inputClass = 'w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors text-sm'
const labelClass = 'text-sm font-medium text-ghost/80 mb-1.5 block'
const errorClass = 'text-xs text-status-red mt-1'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const [serverError, setServerError] = useState('')
  const [resending, setResending] = useState(false)
  const [resendMsg, setResendMsg] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    const result = await confirmNewPassword(email, data.code, data.password)
    if ('error' in result) {
      setServerError(result.error)
    } else {
      router.push('/login?reset=ok')
    }
  }

  const handleResend = async () => {
    if (!email) return
    setResending(true)
    setResendMsg('')
    const result = await forgotPassword(email)
    setResending(false)
    setResendMsg('error' in result ? result.error : 'Código reenviado. Revisá tu correo.')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {email && (
        <p className="text-sm text-slate text-center">
          Enviamos el código a <span className="text-ghost font-medium">{email}</span>
        </p>
      )}

      <div>
        <label className={labelClass}>Código de verificación</label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          className={`${inputClass} font-mono tracking-widest text-center text-lg`}
          placeholder="000000"
          {...register('code')}
        />
        {errors.code && <p className={errorClass}>{errors.code.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Nueva contraseña</label>
        <input type="password" className={inputClass} placeholder="••••••••" {...register('password')} />
        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Confirmar contraseña</label>
        <input type="password" className={inputClass} placeholder="••••••••" {...register('confirmPassword')} />
        {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" loading={isSubmitting} icon={<KeyRound size={18} />}>
        Cambiar contraseña
      </Button>

      <div className="text-center space-y-2">
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="text-xs text-cyan hover:brightness-110 disabled:opacity-50 transition-all"
        >
          {resending ? 'Reenviando...' : '¿No recibiste el código? Reenviar'}
        </button>
        {resendMsg && (
          <p className={`text-xs ${resendMsg.includes('Código reenviado') ? 'text-status-green' : 'text-status-red'}`}>
            {resendMsg}
          </p>
        )}
      </div>

      <p className="text-center text-slate text-sm">
        <Link href="/login" className="text-cyan hover:underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </form>
  )
}
