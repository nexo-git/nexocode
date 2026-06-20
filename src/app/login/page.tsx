'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import LoginForm from '@/components/casillero/LoginForm'
import { getCurrentUser } from '@/lib/casillero'
import type { NexoUser } from '@/types/casillero'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [ready, setReady] = useState(false)
  const resetOk = searchParams.get('reset') === 'ok'

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        router.replace('/casillero')
      } else {
        setReady(true)
      }
    })
  }, [router])

  const handleSuccess = (_user: NexoUser) => {
    router.push('/casillero')
  }

  if (!ready) return null

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20 flex items-center">
      <div className="w-full max-w-md mx-auto px-4 md:px-8">

        <div className="text-center mb-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Mi cuenta</p>
          <h1 className="text-4xl font-bold text-ghost mb-3">Iniciá sesión</h1>
          <p className="text-slate">Accedé a tu casillero y seguí tus envíos.</p>
        </div>

        {resetOk && (
          <p className="text-sm text-status-green bg-status-green/10 border border-status-green/20 rounded-xl px-4 py-3 mb-4 text-center">
            Contraseña actualizada correctamente. Podés iniciar sesión.
          </p>
        )}

        <div className="bg-midnight border border-white/5 rounded-2xl p-6 shadow-card">
          <LoginForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
