import { fetchAuthSession } from 'aws-amplify/auth'
import type { NexoAddress } from '@/types/casillero'

const API = process.env.NEXT_PUBLIC_ADMIN_API_URL ?? ''

async function authHeaders(): Promise<HeadersInit> {
  const session = await fetchAuthSession()
  const token = session.tokens?.idToken?.toString() ?? ''
  return { Authorization: token, 'Content-Type': 'application/json' }
}

export async function getMyAddresses(): Promise<NexoAddress[]> {
  try {
    const headers = await authHeaders()
    const res = await fetch(`${API}/addresses`, { headers })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function createAddress(data: {
  province: string
  canton: string
  district: string
  senas: string
}): Promise<{ address: NexoAddress } | { error: string }> {
  try {
    const headers = await authHeaders()
    const res = await fetch(`${API}/addresses`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json()
      return { error: err.error || 'Error al crear la dirección.' }
    }
    const address = await res.json()
    return { address }
  } catch {
    return { error: 'Error de conexión.' }
  }
}

export async function updateAddress(
  addressId: string,
  data: Partial<{ province: string; canton: string; district: string; senas: string; isDefault: boolean }>
): Promise<boolean> {
  try {
    const headers = await authHeaders()
    const res = await fetch(`${API}/addresses/${addressId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function deleteAddress(addressId: string): Promise<boolean> {
  try {
    const headers = await authHeaders()
    const res = await fetch(`${API}/addresses/${addressId}`, {
      method: 'DELETE',
      headers,
    })
    return res.ok
  } catch {
    return false
  }
}
