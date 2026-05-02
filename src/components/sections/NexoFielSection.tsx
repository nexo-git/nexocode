'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchUserAttributes } from 'aws-amplify/auth'

const tiers = [
  {
    name: 'Bronce',
    kg: 10,
    discount: 3,
    color: 'text-amber-600',
    bg: 'bg-amber-600/10',
    border: 'border-amber-600/20',
    dot: 'bg-amber-600',
  },
  {
    name: 'Plata',
    kg: 25,
    discount: 5,
    color: 'text-slate-300',
    bg: 'bg-slate-300/10',
    border: 'border-slate-300/20',
    dot: 'bg-slate-300',
  },
  {
    name: 'Oro',
    kg: 50,
    discount: 7,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    dot: 'bg-yellow-400',
  },
]

export default function NexoFielSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetchUserAttributes().then(() => setIsLoggedIn(true)).catch(() => setIsLoggedIn(false))
  }, [])

  return (
    <section className="bg-space-black py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Eyebrow + heading */}
        <div className="text-center mb-14">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            Nexo Fiel · Programa de lealtad
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-ghost leading-tight mb-4">
            Mientras más enviás,<br className="hidden sm:block" /> más ahorrás
          </h2>
          <p className="text-slate max-w-xl mx-auto">
            Cada kilo cuenta. Acumulá peso en tus pedidos entregados y desbloqueá descuentos automáticos en futuros envíos.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border ${tier.border} ${tier.bg} px-6 py-7 flex flex-col gap-3`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${tier.dot}`} />
                <span className={`text-sm font-bold uppercase tracking-wider ${tier.color}`}>{tier.name}</span>
              </div>
              <p className="text-ghost text-3xl font-black">{tier.discount}%</p>
              <p className="text-slate text-sm">de descuento al alcanzar <span className="text-ghost font-semibold">{tier.kg} kg</span> entregados</p>
            </div>
          ))}
        </div>

        {/* Progress bar ilustrativa */}
        <div className="bg-midnight border border-white/5 rounded-2xl px-6 py-5 mb-10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate text-xs">0 kg</p>
            <p className="text-slate text-xs">50 kg</p>
          </div>
          <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden">
            {/* Segments */}
            <div className="absolute inset-y-0 left-0 w-[20%] bg-amber-600/60 rounded-l-full" />
            <div className="absolute inset-y-0 left-[20%] w-[30%] bg-slate-300/50" />
            <div className="absolute inset-y-0 left-[50%] w-[50%] bg-yellow-400/40 rounded-r-full" />
          </div>
          <div className="flex justify-between mt-2.5">
            <span className="text-amber-600 text-xs font-semibold">Bronce · 10 kg</span>
            <span className="text-slate-300 text-xs font-semibold">Plata · 25 kg</span>
            <span className="text-yellow-400 text-xs font-semibold">Oro · 50 kg</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-cyan font-semibold text-xs shrink-0">①</span>
              <p className="text-slate text-xs">El descuento aplica <span className="text-ghost font-semibold">solo al pedido</span> que alcanza o supera el hito — no a todos tus envíos.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan font-semibold text-xs shrink-0">②</span>
              <p className="text-slate text-xs">El contador se <span className="text-ghost font-semibold">reinicia a 0 kg</span> después de llegar al Oro (50 kg) y vuelve a Bronce.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan font-semibold text-xs shrink-0">③</span>
              <p className="text-slate text-xs">Los descuentos se aplican automáticamente — no tenés que hacer nada.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={isLoggedIn ? '/pedidos' : '/casillero'}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan text-space-black font-bold text-sm hover:bg-cyan/90 transition-colors"
          >
            {isLoggedIn ? 'Ver mis pedidos' : 'Empezar a enviar'}
          </Link>
        </div>

      </div>
    </section>
  )
}
