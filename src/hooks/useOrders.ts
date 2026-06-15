'use client'

import { useEffect, useState } from 'react'
import { getMyOrders } from '@/lib/orders'
import type { NexoOrder } from '@/types/casillero'

export function useOrders() {
  const [orders, setOrders] = useState<NexoOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => setError('No se pudieron cargar los pedidos.'))
      .finally(() => setLoading(false))
  }, [])

  return { orders, loading, error, setOrders }
}
