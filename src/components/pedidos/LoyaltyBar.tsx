'use client'

import type { NexoOrder } from '@/types/casillero'
import { calculateLoyalty, MILESTONES } from '@/lib/loyalty'

const TIER_ICONS = ['🥉', '🥈', '🥇']

export default function LoyaltyBar({ orders }: { orders: NexoOrder[] }) {
  const { cycleKg, milestoneIdx } = calculateLoyalty(orders)
  const next = MILESTONES[milestoneIdx]
  const progress = Math.min((cycleKg / next.kg) * 100, 100)

  return (
    <div
      className="mb-8 rounded-2xl border border-white/10 p-5"
      style={{
        background: 'rgba(var(--c-midnight) / 0.8)',
        backdropFilter: 'blur(24px) saturate(150%)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 40px rgba(0,0,0,0.15)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-cyan text-[10px] font-semibold tracking-widest uppercase mb-1">Nexo Fiel</p>
          <p className="text-ghost font-semibold text-base leading-snug">
            {cycleKg > 0
              ? <>{cycleKg.toFixed(1)} kg <span className="text-slate font-normal text-sm">en este ciclo</span></>
              : '¡Empezá a acumular kg con tu primer envío!'}
          </p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className="text-slate text-[10px] uppercase tracking-wider mb-0.5">Próximo</p>
          <p className="text-ghost font-bold text-xl leading-none">{next.kg} kg</p>
          <p className="text-cyan text-xs font-semibold mt-0.5">{next.pct}% off</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(0,185,222,0.6), rgb(0,212,255))',
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-slate text-[10px]">{cycleKg.toFixed(1)} kg</span>
          <span className="text-slate text-[10px]">{next.kg} kg</span>
        </div>
      </div>

      {/* Milestone cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {MILESTONES.map((m, i) => {
          const done = i < milestoneIdx
          const active = i === milestoneIdx
          return (
            <div
              key={m.kg}
              className="rounded-xl px-3 py-2.5 flex flex-col gap-0.5 transition-all"
              style={{
                background: done
                  ? 'rgba(0,212,255,0.10)'
                  : active
                  ? 'rgba(0,212,255,0.06)'
                  : 'rgba(255,255,255,0.03)',
                border: active
                  ? '1px solid rgba(0,212,255,0.35)'
                  : done
                  ? '1px solid rgba(0,212,255,0.15)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span className="text-base leading-none">{TIER_ICONS[i]}</span>
              <span
                className="text-[11px] font-semibold mt-1"
                style={{ color: done || active ? 'rgb(0,212,255)' : 'rgba(138,149,168,0.6)' }}
              >
                {m.label}
              </span>
              <span
                className="text-[10px] font-medium"
                style={{ color: done || active ? 'rgba(244,247,252,0.8)' : 'rgba(138,149,168,0.4)' }}
              >
                {m.kg} kg · {m.pct}%
              </span>
              {done && (
                <span className="text-[9px] text-status-green font-semibold mt-0.5">✓ Obtenido</span>
              )}
              {active && (
                <span className="text-[9px] text-cyan font-semibold mt-0.5">← Siguiente</span>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-slate text-[10px] mt-3.5">
        Solo cuentan pedidos <span className="text-ghost">Entregados</span>. Al cruzar cada meta, ese pedido recibe el descuento. El ciclo se reinicia al llegar a Oro.
      </p>
    </div>
  )
}
