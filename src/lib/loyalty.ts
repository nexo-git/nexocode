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

export function calculateLoyalty(orders: NexoOrder[]): LoyaltyResult {
  const discountMap = new Map<string, number>()
  const BILLABLE = ['bodega_cr', 'pendiente_pago', 'pagado_en_ruta', 'entregado']

  const billable = orders
    .filter((o) => BILLABLE.includes(o.status) && o.peso != null)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  // Descuentos: todos los estados BILLABLE, reset a 0 al completar ciclo
  let discCycleKg = 0
  let discMilestoneIdx = 0
  for (const order of billable) {
    discCycleKg += order.peso!
    let lastDiscount: number | null = null
    while (discMilestoneIdx < MILESTONES.length && discCycleKg >= MILESTONES[discMilestoneIdx].kg) {
      lastDiscount = MILESTONES[discMilestoneIdx].pct
      discMilestoneIdx++
      if (discMilestoneIdx >= MILESTONES.length) {
        discCycleKg = 0
        discMilestoneIdx = 0
        break
      }
    }
    if (lastDiscount !== null) discountMap.set(order.orderId, lastDiscount)
  }

  // Barra visual: acumula todos los estados BILLABLE, pero solo resetea al marcar entregado
  let cycleKg = 0
  let milestoneIdx = 0
  for (const order of billable) {
    cycleKg += order.peso!
    if (order.status === 'entregado') {
      while (milestoneIdx < MILESTONES.length && cycleKg >= MILESTONES[milestoneIdx].kg) {
        milestoneIdx++
        if (milestoneIdx >= MILESTONES.length) {
          cycleKg = 0
          milestoneIdx = 0
          break
        }
      }
    }
  }

  return { discountMap, cycleKg, milestoneIdx }
}

export interface OrderAmount {
  base: number   // USD antes del descuento
  pct: number    // % Nexo Fiel aplicado (0 si no hay)
  final: number  // USD a cobrar
}

// Monto a cobrar de un pedido. Si el backend ya guardó el descuento (al pasar a Bodega CR),
// manda ese: es el mismo que va en el correo. Si no, se estima con calculateLoyalty.
export function orderAmount(order: NexoOrder, estimatedPct?: number): OrderAmount | null {
  const base = order.totalPagado ?? order.totalBase
  if (base == null) return null
  const pct = order.discountPct ?? estimatedPct ?? 0
  // Si el admin corrigió el peso después de Bodega CR, totalFinal quedó viejo: recalcular
  const final = order.totalFinal != null && order.totalBase === base
    ? order.totalFinal
    : Math.round(base * (1 - pct / 100) * 100) / 100
  return { base, pct, final }
}
