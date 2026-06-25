export function isAdminJwt(authHeader: string | null): boolean {
  if (!authHeader) return false
  try {
    const payload = JSON.parse(atob(authHeader.split('.')[1]))
    const groups: string[] = payload['cognito:groups'] ?? []
    return groups.includes('admin')
  } catch {
    return false
  }
}
