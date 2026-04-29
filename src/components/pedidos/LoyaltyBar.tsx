'use client'

import type { NexoOrder } from '@/types/casillero'
import { calculateLoyalty, MILESTONES } from '@/lib/loyalty'

const BRAND   = '#C97B3A'
const GREEN   = '#16a34a'
const COLORS  = ['#C97B3A', '#6B7280', '#D4A200'] // bronce, plata, oro

const BAR_H      = 220   // total container height px
const PAD_TOP    = 32    // space above top milestone
const PAD_BOT    = 12    // space below bottom milestone
const EFF_H      = BAR_H - PAD_TOP - PAD_BOT  // 176px usable

const TRACK_CENTER = 10  // px from left edge of relative container

function milestoneBottom(kg: number) {
  return PAD_BOT + (kg / 50) * EFF_H
}

export default function LoyaltyBar({ orders }: { orders: NexoOrder[] }) {
  const { cycleKg, milestoneIdx } = calculateLoyalty(orders)
  const totalHistoricalKg = orders
    .filter(o => o.status === 'entregado' && o.peso != null)
    .reduce((sum, o) => sum + o.peso!, 0)
  const next          = MILESTONES[milestoneIdx]
  const activeDiscount = milestoneIdx > 0 ? MILESTONES[milestoneIdx - 1].pct : null
  const fillPx         = Math.min(cycleKg / 50, 1) * EFF_H
  const kgToNext       = (next.kg - cycleKg).toFixed(1)

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-midnight p-5 dark:border-white/10">

      {/* Header */}
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: BRAND }}>
        Nexo Fiel
      </p>

      {/* Active discount badge */}
      {activeDiscount ? (
        <div className="rounded-xl px-4 py-3 mb-3 text-center"
             style={{ background: 'rgba(201,123,58,0.12)', border: '1px solid rgba(201,123,58,0.25)' }}>
          <p className="text-xs text-slate">Descuento activo</p>
          <p className="text-4xl font-bold leading-tight" style={{ color: BRAND }}>{activeDiscount}%</p>
          <p className="text-xs" style={{ color: BRAND }}>descuento</p>
        </div>
      ) : (
        <p className="text-ghost font-semibold text-sm mb-3 leading-snug">
          ¡Empezá a acumular<br />con tu primer envío!
        </p>
      )}

      {/* kg to next */}
      {cycleKg < 50 && (
        <p className="text-sm text-slate mb-4">
          {kgToNext} kg más →{' '}
          <span className="font-semibold" style={{ color: BRAND }}>{next.pct}% off</span>
        </p>
      )}

      {/* Vertical bar */}
      <div className="relative" style={{ height: BAR_H }}>

        {/* Track background */}
        <div className="absolute rounded-full"
             style={{
               left: TRACK_CENTER - 2,
               bottom: PAD_BOT,
               width: 4,
               height: EFF_H,
               background: 'rgba(0,0,0,0.08)',
             }} />

        {/* Fill */}
        <div className="absolute rounded-full transition-all duration-700"
             style={{
               left: TRACK_CENTER - 2,
               bottom: PAD_BOT,
               width: 4,
               height: fillPx,
               background: BRAND,
             }} />

        {/* Progress dot */}
        {cycleKg > 0 && (
          <div className="absolute rounded-full"
               style={{
                 left: TRACK_CENTER - 8,
                 bottom: PAD_BOT + fillPx - 8,
                 width: 16,
                 height: 16,
                 background: BRAND,
                 border: '2.5px solid white',
                 boxShadow: '0 2px 8px rgba(201,123,58,0.45)',
                 zIndex: 10,
               }}>
            {/* kg tooltip */}
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[9px] font-bold whitespace-nowrap rounded-md px-1.5 py-0.5"
                  style={{ background: '#29261b', color: '#fff' }}>
              {cycleKg.toFixed(1)} kg
            </span>
          </div>
        )}

        {/* Milestones */}
        {MILESTONES.map((m, i) => {
          const done   = i < milestoneIdx
          const active = i === milestoneIdx
          const color  = done ? GREEN : (active ? COLORS[i] : 'rgba(0,0,0,0.18)')
          const tcol   = done ? GREEN : (active ? COLORS[i] : '#9CA3AF')
          const yBot   = milestoneBottom(m.kg)

          return (
            <div key={m.kg}>
              {/* Dot on track */}
              <div className="absolute rounded-full"
                   style={{
                     left: TRACK_CENTER - 5,
                     bottom: yBot - 5,
                     width: 10,
                     height: 10,
                     background: color,
                     border: '2px solid white',
                     zIndex: 5,
                   }} />

              {/* Label to the right */}
              <div className="absolute"
                   style={{ left: TRACK_CENTER + 14, bottom: yBot - 18 }}>
                <p className="text-[9px] font-bold tracking-widest uppercase leading-none" style={{ color: tcol }}>
                  {m.label}
                </p>
                <p className="text-base font-bold text-ghost leading-snug">{m.kg} kg</p>
                <p className="text-[10px] leading-none" style={{ color: tcol }}>{m.pct}% off</p>
              </div>
            </div>
          )
        })}

        {/* Total histórico — esquina superior derecha */}
        <div className="absolute rounded-xl px-3 py-2 text-center"
             style={{ top: 0, right: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-[9px] font-bold tracking-widest uppercase text-slate">Total</p>
          <p className="text-xl font-bold text-ghost leading-tight">{totalHistoricalKg.toFixed(1)}</p>
          <p className="text-[9px] text-slate">kg histórico</p>
        </div>

      </div>

      <p className="text-slate text-[10px] mt-1">
        ⓘ Solo cuentan pedidos <span className="text-ghost font-semibold">Entregados</span>. El descuento aplica al alcanzar un hito.
      </p>
    </div>
  )
}
