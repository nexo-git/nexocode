import { fetchAuthSession } from 'aws-amplify/auth'

let cachedToken: { value: string; expiresAt: number } | null = null

export async function getAuthToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && now < cachedToken.expiresAt) return cachedToken.value
  const session = await fetchAuthSession()
  const value = session.tokens?.idToken?.toString() ?? ''
  cachedToken = { value, expiresAt: now + 55_000 }
  return value
}

export function clearAuthTokenCache(): void {
  cachedToken = null
}
