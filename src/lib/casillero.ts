import {
  signUp,
  signIn,
  signOut,
  confirmSignUp,
  resendSignUpCode,
  getCurrentUser as getAmplifyUser,
  fetchUserAttributes,
  updateUserAttributes,
  deleteUser,
  type SignUpInput,
} from 'aws-amplify/auth'
import type { NexoUser, RegisterData } from '@/types/casillero'
import { NEXO_WAREHOUSE_ADDRESS, NEXO_WAREHOUSE_PHONE } from '@/lib/constants'

export async function registerUser(data: RegisterData): Promise<{ needsConfirmation: true; email: string } | { error: string }> {
  try {
    await signUp({
      username: data.email.toLowerCase().trim(),
      password: data.password,
      options: {
        userAttributes: {
          email: data.email.toLowerCase().trim(),
          given_name: data.nombre.trim(),
          family_name: data.apellido?.trim() ?? '',
          phone_number: data.movil.trim() ? undefined : undefined,
          'custom:tipo': data.tipo,
          'custom:movil': data.movil.trim(),
          'custom:telefono': data.telefono?.trim() ?? '',
        },
      },
    } as SignUpInput)
    return { needsConfirmation: true, email: data.email.toLowerCase().trim() }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al registrar la cuenta.'
    if (message.includes('UsernameExistsException') || message.includes('already exists')) {
      return { error: 'Ya existe una cuenta con ese correo electrónico.' }
    }
    return { error: message }
  }
}

export async function confirmAndLogin(email: string, password: string, code: string): Promise<{ user: NexoUser } | { error: string }> {
  try {
    await confirmSignUp({ username: email, confirmationCode: code })
    await signIn({ username: email, password })
    const user = await getCurrentUser()
    if (!user) return { error: 'Error al iniciar sesión.' }
    return { user }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al confirmar el código.'
    if (message.includes('CodeMismatchException') || message.includes('Invalid verification code')) {
      return { error: 'Código incorrecto. Revisá tu correo e intentá de nuevo.' }
    }
    if (message.includes('ExpiredCodeException')) {
      return { error: 'El código expiró. Solicitá uno nuevo.' }
    }
    return { error: message }
  }
}

export async function resendCode(email: string): Promise<{ success: true } | { error: string }> {
  try {
    await resendSignUpCode({ username: email })
    return { success: true }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Error al reenviar el código.' }
  }
}

export async function loginUser(email: string, password: string): Promise<{ user: NexoUser } | { error: string }> {
  try {
    await signIn({ username: email.toLowerCase().trim(), password })
    const user = await getCurrentUser()
    if (!user) return { error: 'Error al obtener la sesión.' }
    return { user }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al iniciar sesión.'
    if (message.includes('NotAuthorizedException') || message.includes('Incorrect')) {
      return { error: 'Correo o contraseña incorrectos.' }
    }
    if (message.includes('UserNotConfirmedException')) {
      return { error: 'Tu cuenta no ha sido verificada. Revisá tu correo.' }
    }
    return { error: message }
  }
}

export async function getCurrentUser(): Promise<NexoUser | null> {
  try {
    await getAmplifyUser()
    const attrs = await fetchUserAttributes()
    return {
      id: attrs.sub ?? '',
      nombre: attrs.given_name ?? '',
      apellido: attrs.family_name ?? '',
      tipo: (attrs['custom:tipo'] as 'persona' | 'empresa') ?? 'persona',
      email: attrs.email ?? '',
      movil: attrs['custom:movil'] ?? '',
      telefono: attrs['custom:telefono'] ?? '',
      createdAt: '',
    }
  } catch {
    return null
  }
}

export async function updateCurrentUser(data: Partial<Pick<NexoUser, 'nombre' | 'apellido' | 'movil' | 'telefono'>>): Promise<{ success: true } | { error: string }> {
  try {
    const attrs: Record<string, string> = {}
    if (data.nombre) attrs.given_name = data.nombre
    if (data.apellido !== undefined) attrs.family_name = data.apellido
    if (data.movil) attrs['custom:movil'] = data.movil
    if (data.telefono !== undefined) attrs['custom:telefono'] = data.telefono
    await updateUserAttributes({ userAttributes: attrs })
    return { success: true }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Error al actualizar.' }
  }
}

export async function deleteCurrentUser(): Promise<{ success: true } | { error: string }> {
  try {
    await deleteUser()
    return { success: true }
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : 'Error al eliminar la cuenta.' }
  }
}

export async function logoutUser(): Promise<void> {
  await signOut()
}

export function generateAddress(nombre: string, apellido = ''): string {
  const fullName = apellido
    ? `${nombre.toUpperCase()} ${apellido.toUpperCase()} - NEXO`
    : `${nombre.toUpperCase()} - NEXO`
  return `${fullName}\n${NEXO_WAREHOUSE_ADDRESS}\nEstados Unidos\nNúmero de teléfono: ${NEXO_WAREHOUSE_PHONE}`
}
