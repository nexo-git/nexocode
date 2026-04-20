export type UserTipo = 'persona' | 'empresa'

export interface NexoUser {
  id: string
  nombre: string
  apellido: string  // empty string for empresa
  tipo: UserTipo
  email: string
  movil: string
  telefono: string
  createdAt: string
}

export interface RegisterData {
  tipo: UserTipo
  nombre: string
  apellido?: string
  movil: string
  telefono: string
  email: string
  emailConfirm: string
  password: string
  passwordConfirm: string
  terminos: boolean
}
