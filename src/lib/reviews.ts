import type { NexoReview } from '@/types/casillero'
import { getAuthToken } from '@/lib/auth'

const API = process.env.NEXT_PUBLIC_ADMIN_API_URL ?? ''

export async function getReviews(): Promise<NexoReview[]> {
  try {
    const res = await fetch(`${API}/reviews`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function createReview(data: {
  rating: number
  comment: string
}): Promise<{ review: NexoReview } | { error: string }> {
  try {
    const token = await getAuthToken()
    const res = await fetch(`${API}/reviews`, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json()
      return { error: err.error || 'Error al enviar la reseña.' }
    }
    const review = await res.json()
    return { review }
  } catch {
    return { error: 'Error de conexión.' }
  }
}
