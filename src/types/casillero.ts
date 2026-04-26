export type UserTipo = 'persona' | 'empresa'
export type OrderStatus = 'en_ruta' | 'atascado' | 'entregado'

export interface NexoOrder {
  orderId: string
  userId: string
  userName: string
  userEmail: string
  trackingNumber: string
  description: string
  startDate: string
  status: OrderStatus
  updatedAt: string
}

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
