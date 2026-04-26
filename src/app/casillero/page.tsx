'use client'

import { useState, useEffect } from 'react'
import CasilleroForm from '@/components/casillero/CasilleroForm'
import AddressCard from '@/components/casillero/AddressCard'
import { getCurrentUser, logoutUser } from '@/lib/casillero'
import type { NexoUser } from '@/types/casillero'
import Button from '@/components/ui/Button'
import { LogOut } from 'lucide-react'

export default function CasilleroPage() {
  const [user, setUser] = useState<NexoUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    getCurrentUser().then((u) => { setUser(u); setReady(true) })
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
  }

  if (!ready) return null

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-lg mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Casillero USA</p>
          {user ? (
            <>
              <h1 className="text-4xl font-bold text-ghost mb-2">
                Hola, {user.nombre}
              </h1>
              <p className="text-slate">Esta es tu dirección de casillero en Estados Unidos.</p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-ghost mb-3">Abrí tu casillero</h1>
              <p className="text-slate text-lg">Gratis. Sin contratos. Tu dirección en USA en 30 segundos.</p>
            </>
          )}
        </div>

        {/* Content */}
        {user ? (
          <div className="space-y-4">
            <AddressCard user={user} />
            <div className="text-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                icon={<LogOut size={14} />}
                className="text-slate"
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-midnight border border-white/5 rounded-2xl p-6 shadow-card">
            <h2 className="text-ghost font-semibold mb-6">Crear cuenta</h2>
            <CasilleroForm onSuccess={(u) => setUser(u)} />
          </div>
        )}
      </div>
    </div>
  )
}
