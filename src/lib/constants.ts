export const WHATSAPP_NUMBER = '50661132863'

export const NEXO_WAREHOUSE_ADDRESS = 'KEBRA LOGISTICS 784 E 14TH PL\nLOS ANGELES, CA 90021-2118'
export const NEXO_WAREHOUSE_PHONE = '3238750520'

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export const NAV_LINKS = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Cotizar',       href: '/cotizar' },
  { label: 'Asistente',     href: '/asistente' },
  { label: 'Nosotros',      href: '/nosotros' },
]

export const CR_PROVINCES = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
]

export const US_ORIGIN_CITIES = [
  'Miami, FL',
  'Orlando, FL',
  'New York, NY',
  'Los Angeles, CA',
  'Houston, TX',
  'Chicago, IL',
]

export const STATUS_LABELS: Record<string, string> = {
  processing:       'Recibido',
  in_transit:       'En vuelo',
  customs:          'En aduana',
  out_for_delivery: 'En reparto',
  delivered:        'Entregado',
  alert:            'Alerta',
}
