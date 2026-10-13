import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

// La página es 'use client' y no puede exportar metadata: va en este layout de servidor
export const metadata: Metadata = pageMetadata({
  title: 'Iniciar sesión',
  path: '/login',
  noindex: true,
})

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
