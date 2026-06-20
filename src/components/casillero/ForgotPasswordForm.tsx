'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { forgotPassword } from '@/lib/casillero'

const schema = z.object({
  email: z.string().email('Ingresá un correo válido'),
})

type FormData = z.infer<typeof schema>

const inputClass = 'w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors text-sm'
const labelClass = 'text-sm font-medium text-ghost/80 mb-1.5 block'
const errorClass = 'text-xs text-status-red mt-1'

export default function ForgotPasswordForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    const result = await forgotPassword(data.email)
    if ('error' in result) {
      setServerError(result.error)
    } else {
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>Correo electrónico</label>
        <input
          type="email"
          className={inputClass}
          placeholder="tucorreo@gmail.com"
          {...register('email')}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" loading={isSubmitting} icon={<Mail size={18} />}>
        Enviar código
      </Button>

      <p className="text-center text-slate text-sm">
        ¿Recordaste tu contraseña?{' '}
        <Link href="/login" className="text-cyan hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </form>
  )
}
