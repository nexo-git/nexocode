'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/casillero/LoginForm'
import { getCurrentUser } from '@/lib/casillero'
import type { NexoUser } from '@/types/casillero'

export default function LoginPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

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

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Mi cuenta</p>
          <h1 className="text-4xl font-bold text-ghost mb-3">Iniciá sesión</h1>
          <p className="text-slate">Accedé a tu casillero y seguí tus envíos.</p>
        </div>

        <div className="bg-midnight border border-white/5 rounded-2xl p-6 shadow-card">
          <LoginForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}
