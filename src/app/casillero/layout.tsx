import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

// La página es 'use client' y no puede exportar metadata: va en este layout de servidor
export const metadata: Metadata = pageMetadata({
  title: 'Casillero gratis en USA desde Guápiles',
  description: 'Abrí tu casillero gratis en 1 minuto y recibí tu dirección en Los Ángeles para comprar en tiendas de Estados Unidos y traerlo a Costa Rica.',
  path: '/casillero',
})

export default function CasilleroLayout({ children }: { children: React.ReactNode }) {
  return children
}
