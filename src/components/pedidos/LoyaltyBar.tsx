'use client'

import type { NexoOrder } from '@/types/casillero'
import { calculateLoyalty, MILESTONES } from '@/lib/loyalty'

const TIER_COLORS = [
  { active: '#C97B3A', inactive: '#9CA3AF' }, // Bronce
  { active: '#6B7280', inactive: '#9CA3AF' }, // Plata
  { active: '#D4A200', inactive: '#9CA3AF' }, // Oro
]

function StarIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export default function LoyaltyBar({ orders }: { orders: NexoOrder[] }) {
  const { cycleKg, milestoneIdx } = calculateLoyalty(orders)
  const next = MILESTONES[milestoneIdx]

  // Progress across the full 50kg range, segmented
  const totalKg = 50
  const progressPct = Math.min((cycleKg / totalKg) * 100, 100)

  return (
    <div className="mb-8 rounded-2xl border border-black/[0.06] bg-midnight p-5 shadow-sm dark:border-white/10">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: '#C97B3A' }}>
            Nexo Fiel
          </p>
          <p className="text-ghost font-bold text-lg leading-snug">
            {cycleKg > 0
              ? <>{cycleKg.toFixed(1)} kg <span className="text-slate font-normal text-base">en este ciclo</span></>
              : '¡Empezá a acumular\ncon tu primer envío!'}
          </p>
        </div>

        {/* Next milestone badge */}
        <div
          className="shrink-0 ml-4 rounded-xl px-3 py-2 text-right"
          style={{ background: 'rgba(201,123,58,0.10)', border: '1px solid rgba(201,123,58,0.20)' }}
        >
          <p className="text-[10px] text-slate mb-0.5">Tu primer hito</p>
          <p className="text-sm font-bold" style={{ color: '#C97B3A' }}>
            {next.kg} kg → {next.pct}% off
          </p>
        </div>
      </div>

      {/* Segmented progress bar */}
      <div className="relative mb-6">
        <div className="h-[4px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #C97B3A, #E8943A)',
            }}
          />
        </div>
        {/* Segment dividers */}
        {MILESTONES.slice(0, -1).map((m) => (
          <div
            key={m.kg}
            className="absolute top-0 h-[4px] w-[2px] bg-midnight"
            style={{ left: `${(m.kg / totalKg) * 100}%` }}
          />
        ))}
      </div>

      {/* Milestone circles */}
      <div className="grid grid-cols-3 gap-3">
        {MILESTONES.map((m, i) => {
          const done = i < milestoneIdx
          const active = i === milestoneIdx
          const color = done || active ? TIER_COLORS[i].active : TIER_COLORS[i].inactive
          const borderColor = done || active ? TIER_COLORS[i].active : 'rgba(0,0,0,0.12)'
          const bgColor = done || active ? `${TIER_COLORS[i].active}15` : 'transparent'

          return (
            <div key={m.kg} className="flex flex-col items-center gap-1.5">
              {/* Circle */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                }}
              >
                <StarIcon color={color} />
              </div>
              {/* Label */}
              <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: done || active ? color : '#9CA3AF' }}>
                {m.label}
              </p>
              <p className="text-[11px] font-bold text-ghost leading-none">{m.kg} kg</p>
              <p className="text-[11px]" style={{ color: done || active ? color : '#9CA3AF' }}>
                {m.pct}% off
              </p>
              {done && (
                <span className="text-[9px] text-status-green font-semibold">✓ Obtenido</span>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-slate text-[10px] mt-4">
        Solo cuentan pedidos <span className="text-ghost">Entregados</span>. Al cruzar cada meta, ese pedido recibe el descuento. El ciclo se reinicia al llegar a Oro.
      </p>
    </div>
  )
}
