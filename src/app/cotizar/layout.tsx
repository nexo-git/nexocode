import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

// La página es 'use client' y no puede exportar metadata: va en este layout de servidor
export const metadata: Metadata = pageMetadata({
  title: 'Cotizador de envíos USA a Costa Rica · $14/kg',
  description: 'Calculá en 30 segundos cuánto cuesta traer tu paquete de Estados Unidos a Costa Rica. $14 por kilo de peso real, sin mínimo ni cargos ocultos.',
  path: '/cotizar',
})

export default function CotizarLayout({ children }: { children: React.ReactNode }) {
  return children
}
