'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LogIn } from 'lucide-react'
import Button from '@/components/ui/Button'
import { loginUser } from '@/lib/casillero'
import type { NexoUser } from '@/types/casillero'
import Link from 'next/link'

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(1, 'Ingresá tu contraseña'),
})

type FormData = z.infer<typeof schema>

interface LoginFormProps {
  onSuccess: (user: NexoUser) => void
}

const inputClass = 'w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors text-sm'
const labelClass = 'text-sm font-medium text-ghost/80 mb-1.5 block'
const errorClass = 'text-xs text-status-red mt-1'

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setServerError('')
    const result = await loginUser(data.email, data.password)
    if ('error' in result) {
      setServerError(result.error)
    } else {
      onSuccess(result.user)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>Correo electrónico</label>
        <input type="email" className={inputClass} placeholder="tucorreo@gmail.com" {...register('email')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Contraseña</label>
        <input type="password" className={inputClass} placeholder="••••••••" {...register('password')} />
        {errors.password && <p className={errorClass}>{errors.password.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" loading={isSubmitting} icon={<LogIn size={18} />}>
        Iniciar sesión
      </Button>

      <p className="text-center text-slate text-sm">
        ¿No tenés cuenta?{' '}
        <Link href="/casillero" className="text-cyan hover:underline">
          Abrí tu casillero gratis
        </Link>
      </p>
    </form>
  )
}
