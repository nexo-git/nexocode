import type { NexoOrder } from '@/types/casillero'

export const MILESTONES = [
  { kg: 10, pct: 3, label: 'Bronce' },
  { kg: 25, pct: 5, label: 'Plata'  },
  { kg: 50, pct: 7, label: 'Oro'    },
] as const

export interface LoyaltyResult {
  discountMap: Map<string, number>  // orderId → % de descuento ganado
  cycleKg: number                   // kg acumulados en el ciclo actual
  milestoneIdx: number              // índice del próximo milestone (0=Bronce,1=Plata,2=Oro)
}

export const BILLABLE_STATUSES = ['bodega_cr', 'pendiente_pago', 'pagado_en_ruta', 'entregado']
// Ya cobrados: su descuento queda congelado con lo que se pagó
const PAID_STATUSES = ['pagado_en_ruta', 'entregado']

// Misma regla que recalcLoyalty en infrastructure/nexo-stack.ts: los kg cuentan desde Bodega CR,
// el descuento va al pedido que alcanza o supera un hito y después de Oro el ciclo vuelve a 0.
// La barra usa el mismo ciclo, así que muestra exactamente lo que se cobra.
export function calculateLoyalty(orders: NexoOrder[]): LoyaltyResult {
  const discountMap = new Map<string, number>()

  const billable = orders
    .filter((o) => BILLABLE_STATUSES.includes(o.status) && o.peso != null)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  let cycleKg = 0
  let milestoneIdx = 0
  for (const order of billable) {
    cycleKg += order.peso!
    let lastDiscount: number | null = null
    while (milestoneIdx < MILESTONES.length && cycleKg >= MILESTONES[milestoneIdx].kg) {
      lastDiscount = MILESTONES[milestoneIdx].pct
      milestoneIdx++
      if (milestoneIdx >= MILESTONES.length) {
        cycleKg = 0
        milestoneIdx = 0
        break
      }
    }
    if (lastDiscount !== null) discountMap.set(order.orderId, lastDiscount)
  }

  return { discountMap, cycleKg, milestoneIdx }
}

export interface OrderAmount {
  base: number   // USD antes del descuento
  pct: number    // % Nexo Fiel aplicado (0 si no hay)
  final: number  // USD a cobrar
}

// Monto a cobrar de un pedido. Pedidos no pagados: descuento en vivo con calculateLoyalty (pct),
// así un cambio de peso o estado se refleja al instante; el backend guarda lo mismo con la misma regla.
// Pedidos ya pagados: lo que guardó el backend, que es lo que se cobró.
export function orderAmount(order: NexoOrder, livePct?: number): OrderAmount | null {
  const base = order.totalPagado ?? order.totalBase
  if (base == null) return null
  const frozen = PAID_STATUSES.includes(order.status) && order.discountPct != null
  const pct = frozen ? order.discountPct! : (livePct ?? 0)
  const final = frozen && order.totalFinal != null && order.totalBase === base
    ? order.totalFinal
    : Math.round(base * (1 - pct / 100) * 100) / 100
  return { base, pct, final }
}
