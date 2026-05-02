import { getAuthToken } from '@/lib/auth'

const API = process.env.NEXT_PUBLIC_ADMIN_API_URL ?? ''

export async function createPaymentSession(
  orderId: string
): Promise<{ checkoutUrl: string } | { error: string }> {
  try {
    const token = await getAuthToken()
    const res = await fetch(`${API}/payments/create`, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    })
    if (!res.ok) {
      const err = await res.json()
      return { error: err.error || 'Error al iniciar el pago.' }
    }
    return res.json()
  } catch {
    return { error: 'Error de conexión.' }
  }
}
