import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

// La página es 'use client' y no puede exportar metadata: va en este layout de servidor
export const metadata: Metadata = pageMetadata({
  title: 'Reseñas de clientes',
  description: 'Lo que dicen los clientes que ya traen sus compras de Estados Unidos a Costa Rica con nexo.',
  path: '/resenas',
})

export default function ResenasLayout({ children }: { children: React.ReactNode }) {
  return children
}
