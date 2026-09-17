import type { Metadata, Viewport } from 'next'

// Manifest solo en /admin: habilita la app Android de administración (TWA)
// sin ofrecerle "instalar app" a los clientes en el sitio público.
export const metadata: Metadata = {
  title: 'nexo Admin',
  manifest: '/admin.webmanifest',
}

// Declarar un viewport propio hace que Next.js deje de agregar el default
// (width=device-width, initial-scale=1) — hay que repetirlo a mano o los
// breakpoints `md:` de Tailwind se activan mal dentro de la app instalada.
export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  width: 'device-width',
  initialScale: 1,
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
