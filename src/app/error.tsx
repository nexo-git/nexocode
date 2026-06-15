'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[nexo error]', error)
  }, [error])

  return (
    <div className="min-h-screen bg-space-black flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 w-16 h-16 rounded-full bg-status-red/10 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-status-red" />
      </div>

      <h1 className="text-2xl font-bold text-ghost mb-2">Algo salió mal</h1>
      <p className="text-slate text-sm max-w-xs mb-8">
        Ocurrió un error inesperado. Podés intentarlo de nuevo o volver al inicio.
      </p>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 bg-cyan text-space-black font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-cyan/90 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Intentar de nuevo
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 bg-white/5 text-ghost px-5 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-colors"
        >
          <Home className="w-4 h-4" />
          Inicio
        </Link>
      </div>

      {error.digest && (
        <p className="mt-6 text-xs text-slate/50 font-mono">
          ID: {error.digest}
        </p>
      )}
    </div>
  )
}
