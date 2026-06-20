import type { Metadata } from 'next'
import { Suspense } from 'react'
import ResetPasswordForm from '@/components/casillero/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Nueva contraseña — nexo',
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20 flex items-center">
      <div className="w-full max-w-md mx-auto px-4 md:px-8">

        <div className="text-center mb-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Mi cuenta</p>
          <h1 className="text-4xl font-bold text-ghost mb-3">Nueva contraseña</h1>
          <p className="text-slate">Ingresá el código que recibiste y tu nueva contraseña.</p>
        </div>

        <div className="bg-midnight border border-white/5 rounded-2xl p-6 shadow-card">
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
