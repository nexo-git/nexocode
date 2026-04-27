'use client'

import type { NexoOrder } from '@/types/casillero'

const TIERS = [
  { kg: 10, label: 'Bronce', pct: 3 },
  { kg: 25, label: 'Plata',  pct: 5 },
  { kg: 50, label: 'Oro',    pct: 7 },
]

const MAX_KG = 50

function getCurrentTier(kg: number) {
  const reached = TIERS.filter((t) => kg >= t.kg)
  return reached[reached.length - 1] ?? null
}

export default function LoyaltyBar({ orders }: { orders: NexoOrder[] }) {
  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1)

  const kgAcumulado = orders
    .filter((o) => o.status === 'entregado' && o.peso != null && new Date(o.startDate) >= twelveMonthsAgo)
    .reduce((sum, o) => sum + (o.peso ?? 0), 0)

  const progress = Math.min((kgAcumulado / MAX_KG) * 100, 100)
  const currentTier = getCurrentTier(kgAcumulado)

  return (
    <div className="bg-midnight border border-white/5 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-1">
        <p className="text-cyan text-xs font-semibold tracking-widest uppercase">Nexo Fiel</p>
        {currentTier ? (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan/10 text-cyan">
            {currentTier.label} · {currentTier.pct}% descuento
          </span>
        ) : (
          <span className="text-xs text-slate">Acumulá 10 kg para tu primer descuento</span>
        )}
      </div>

      <p className="text-ghost font-semibold mb-6">
        {kgAcumulado > 0
          ? `${kgAcumulado.toFixed(1)} kg acumulados este año`
          : '¡Empezá a acumular kg con tu primer envío!'}
      </p>

      {/* Track + milestones */}
      <div className="relative pb-10">
        {/* Background track */}
        <div className="h-2.5 bg-white/5 rounded-full">
          {/* Fill */}
          <div
            className="h-full bg-gradient-to-r from-cyan/50 to-cyan rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Milestone markers */}
        {TIERS.map((tier) => {
          const pos = (tier.kg / MAX_KG) * 100
          const reached = kgAcumulado >= tier.kg
          return (
            <div
              key={tier.kg}
              className="absolute top-0 flex flex-col items-center"
              style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
            >
              {/* Circle on track */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center -mt-[5px] transition-all duration-500 ${
                reached ? 'bg-cyan border-cyan shadow-[0_0_8px_rgba(0,212,255,0.5)]' : 'bg-midnight border-white/20'
              }`}>
                {reached && <div className="w-1.5 h-1.5 rounded-full bg-space-black" />}
              </div>
              {/* Labels below */}
              <div className="mt-2 text-center">
                <p className={`text-xs font-bold leading-tight ${reached ? 'text-cyan' : 'text-slate'}`}>
                  {tier.kg} kg
                </p>
                <p className={`text-xs leading-tight ${reached ? 'text-ghost' : 'text-slate/50'}`}>
                  {tier.pct}%
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-slate text-xs">
        Solo cuentan pedidos <span className="text-ghost">Entregados</span> en los últimos 12 meses. El descuento se aplica en tu próximo envío.
      </p>
    </div>
  )
}
