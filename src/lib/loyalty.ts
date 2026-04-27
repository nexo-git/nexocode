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

  const delivered = orders
    .filter((o) => o.status === 'entregado' && o.peso != null)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  let cycleKg = 0
  let milestoneIdx = 0

  for (const order of delivered) {
    cycleKg += order.peso!

    if (milestoneIdx < MILESTONES.length && cycleKg >= MILESTONES[milestoneIdx].kg) {
      discountMap.set(order.orderId, MILESTONES[milestoneIdx].pct)
      milestoneIdx++

      // Ciclo completo — resetear
      if (milestoneIdx >= MILESTONES.length) {
        cycleKg -= 50
        milestoneIdx = 0
      }
    }
  }

  return { discountMap, cycleKg, milestoneIdx }
}
