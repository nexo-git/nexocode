export type PackageStatus =
  | 'processing'
  | 'in_transit'
  | 'customs'
  | 'out_for_delivery'
  | 'delivered'
  | 'alert'

export interface TrackingEvent {
  id: string
  timestamp: string
  location: string
  description: string
  status: PackageStatus
}

export interface TrackingResult {
  id: string
  status: PackageStatus
  estimatedDelivery: string
  recipient: string
  weight: number
  events: TrackingEvent[]
}
