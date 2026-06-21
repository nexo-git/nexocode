import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-cyan font-mono text-sm font-semibold tracking-widest mb-4">404</p>

      <h1 className="text-3xl font-bold text-ghost mb-3">Página no encontrada</h1>
      <p className="text-slate text-sm max-w-xs mb-8">
        La dirección que buscás no existe o fue movida. Verificá la URL o volvé al inicio.
      </p>

      <div className="flex gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 bg-cyan text-space-black font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-cyan/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Ir al inicio
        </Link>

        <Link
          href="/cotizar"
          className="flex items-center gap-2 bg-white/5 text-ghost px-5 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-colors"
        >
          <Search className="w-4 h-4" />
          Cotizar envío
        </Link>
      </div>
    </div>
  )
}
