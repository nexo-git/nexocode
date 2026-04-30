import type { NexoOrder, OrderStatus } from '@/types/casillero'
import { getAuthToken } from '@/lib/auth'

export interface OrderUpdate {
  status?: OrderStatus
  peso?: number
  totalPagado?: number
  trackingNumber?: string
  description?: string
}

const API = process.env.NEXT_PUBLIC_ADMIN_API_URL ?? ''

async function authHeaders(): Promise<HeadersInit> {
  const token = await getAuthToken()
  return { 'Authorization': token, 'Content-Type': 'application/json' }
}

export async function getMyOrders(): Promise<NexoOrder[]> {
  const headers = await authHeaders()
  const res = await fetch(`${API}/orders`, { headers })
  if (!res.ok) return []
  return res.json()
}

export async function addOrder(data: {
  trackingNumber: string
  description: string
  deliveryProvince?: string
  deliveryCanton?: string
  deliveryDistrict?: string
  deliverySenas?: string
}): Promise<{ order: NexoOrder } | { error: string }> {
  try {
    const headers = await authHeaders()
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json()
      return { error: err.error || 'Error al agregar el pedido.' }
    }
    const order = await res.json()
    return { order }
  } catch {
    return { error: 'Error de conexión.' }
  }
}

export async function getAllOrders(): Promise<NexoOrder[]> {
  const headers = await authHeaders()
  const res = await fetch(`${API}/admin/orders`, { headers })
  if (!res.ok) return []
  return res.json()
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
  return updateOrder(orderId, { status })
}

export interface AdminOrderCreate {
  userId: string
  userName: string
  userEmail: string
  trackingNumber: string
  description?: string
}

export async function createOrderAdmin(data: AdminOrderCreate): Promise<{ order: NexoOrder } | { error: string }> {
  try {
    const headers = await authHeaders()
    const res = await fetch(`${API}/admin/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json()
      return { error: err.error || 'Error al crear el pedido.' }
    }
    const order = await res.json()
    return { order }
  } catch {
    return { error: 'Error de conexión.' }
  }
}

export async function deleteOrder(orderId: string): Promise<boolean> {
  try {
    const headers = await authHeaders()
    const res = await fetch(`${API}/admin/orders/${orderId}`, { method: 'DELETE', headers })
    return res.ok
  } catch {
    return false
  }
}

export async function updateOrder(orderId: string, data: OrderUpdate): Promise<boolean> {
  try {
    const headers = await authHeaders()
    const res = await fetch(`${API}/admin/orders/${orderId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    return res.ok
  } catch {
    return false
  }
}
