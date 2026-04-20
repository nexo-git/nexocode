import type { TrackingResult } from '@/types/tracking'

const MOCK_DATA: Record<string, TrackingResult> = {
  'NX-2024-CR-00847': {
    id: 'NX-2024-CR-00847',
    status: 'delivered',
    estimatedDelivery: '2024-12-10',
    recipient: 'Laura',
    weight: 2.3,
    events: [
      {
        id: '5',
        timestamp: '2024-12-10T14:30:00',
        location: 'Escazú, San José, CR',
        description: 'Paquete entregado exitosamente.',
        status: 'delivered',
      },
      {
        id: '4',
        timestamp: '2024-12-10T08:15:00',
        location: 'San José, CR',
        description: 'Paquete salió para entrega final.',
        status: 'out_for_delivery',
      },
      {
        id: '3',
        timestamp: '2024-12-09T10:00:00',
        location: 'Aduana CR — Aeropuerto Juan Santamaría',
        description: 'Paquete liberado de aduana.',
        status: 'customs',
      },
      {
        id: '2',
        timestamp: '2024-12-08T06:45:00',
        location: 'En tránsito — Vuelo Miami→SJO',
        description: 'Paquete en vuelo hacia Costa Rica.',
        status: 'in_transit',
      },
      {
        id: '1',
        timestamp: '2024-12-07T14:00:00',
        location: 'Miami, FL — Bodega Nexo',
        description: 'Paquete recibido y preparado para envío.',
        status: 'processing',
      },
    ],
  },
  'NX-2024-CR-01203': {
    id: 'NX-2024-CR-01203',
    status: 'in_transit',
    estimatedDelivery: '2024-12-15',
    recipient: 'Carlos',
    weight: 5.1,
    events: [
      {
        id: '2',
        timestamp: '2024-12-12T09:30:00',
        location: 'En tránsito — Vuelo Miami→SJO',
        description: 'Paquete en vuelo hacia Costa Rica.',
        status: 'in_transit',
      },
      {
        id: '1',
        timestamp: '2024-12-11T16:00:00',
        location: 'Miami, FL — Bodega Nexo',
        description: 'Paquete recibido y preparado para envío.',
        status: 'processing',
      },
    ],
  },
  'NX-2024-CR-00512': {
    id: 'NX-2024-CR-00512',
    status: 'customs',
    estimatedDelivery: '2024-12-13',
    recipient: 'María',
    weight: 1.0,
    events: [
      {
        id: '3',
        timestamp: '2024-12-12T11:00:00',
        location: 'Aduana CR — Aeropuerto Juan Santamaría',
        description: 'Paquete en revisión aduanera. Estimado: 1-2 días hábiles.',
        status: 'customs',
      },
      {
        id: '2',
        timestamp: '2024-12-11T07:00:00',
        location: 'En tránsito — Vuelo Miami→SJO',
        description: 'Paquete en vuelo hacia Costa Rica.',
        status: 'in_transit',
      },
      {
        id: '1',
        timestamp: '2024-12-10T13:00:00',
        location: 'Miami, FL — Bodega Nexo',
        description: 'Paquete recibido y preparado para envío.',
        status: 'processing',
      },
    ],
  },
}

export function getTracking(id: string): TrackingResult | null {
  const normalized = id.trim().toUpperCase()
  return MOCK_DATA[normalized] ?? null
}
