import type { NexoUser, RegisterData } from '@/types/casillero'
import { NEXO_WAREHOUSE_ADDRESS, NEXO_WAREHOUSE_PHONE } from '@/lib/constants'

const USERS_KEY = 'nexo_users'
const SESSION_KEY = 'nexo_session'

function getUsers(): Record<string, NexoUser & { password: string }> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function saveUsers(users: Record<string, NexoUser & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser(data: RegisterData): { user: NexoUser } | { error: string } {
  const users = getUsers()
  const emailKey = data.email.toLowerCase().trim()

  if (users[emailKey]) {
    return { error: 'Ya existe una cuenta con ese correo electrónico.' }
  }

  const user: NexoUser & { password: string } = {
    id: `NX-${Date.now()}`,
    nombre: data.nombre.trim(),
    apellido: data.apellido?.trim() ?? '',
    tipo: data.tipo,
    email: emailKey,
    movil: data.movil.trim(),
    telefono: data.telefono.trim(),
    createdAt: new Date().toISOString(),
    password: data.password,
  }

  users[emailKey] = user
  saveUsers(users)

  // Start session
  const { password: _, ...safeUser } = user
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))

  return { user: safeUser }
}

export function loginUser(email: string, password: string): { user: NexoUser } | { error: string } {
  const users = getUsers()
  const emailKey = email.toLowerCase().trim()
  const found = users[emailKey]

  if (!found || found.password !== password) {
    return { error: 'Correo o contraseña incorrectos.' }
  }

  const { password: _, ...safeUser } = found
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
  return { user: safeUser }
}

export function getCurrentUser(): NexoUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as NexoUser) : null
  } catch {
    return null
  }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
}

export function generateAddress(nombre: string, apellido = ''): string {
  const fullName = apellido
    ? `${nombre.toUpperCase()} ${apellido.toUpperCase()} - NEXO`
    : `${nombre.toUpperCase()} - NEXO`
  return `${fullName}\n${NEXO_WAREHOUSE_ADDRESS}\nEstados Unidos\nNúmero de teléfono: ${NEXO_WAREHOUSE_PHONE}`
}
