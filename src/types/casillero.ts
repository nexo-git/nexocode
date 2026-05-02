export type UserTipo = 'persona' | 'empresa'
export type OrderStatus = 'en_ruta' | 'atascado_aduana' | 'bodega_cr' | 'pendiente_pago' | 'pagado_en_ruta' | 'entregado'

export interface NexoOrder {
  orderId: string
  userId: string
  userName: string
  userEmail: string
  trackingNumber: string
  description: string
  startDate: string
  status: OrderStatus
  peso?: number
  totalPagado?: number
  updatedAt: string
  deliveryProvince?: string
  deliveryCanton?: string
  deliveryDistrict?: string
  deliverySenas?: string
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

export interface NexoAddress {
  addressId: string
  userId: string
  province: string
  canton: string
  district: string
  senas: string
  isDefault: boolean
  createdAt: string
}

export interface NexoReview {
  reviewId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface RegisterData {
  tipo: UserTipo
  nombreCompleto: string
  movil: string
  telefono: string
  email: string
  emailConfirm: string
  password: string
  passwordConfirm: string
  terminos: boolean
}
