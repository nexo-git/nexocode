import type { Metadata, Viewport } from 'next'

// Manifest solo en /admin: habilita la app Android de administración (TWA)
// sin ofrecerle "instalar app" a los clientes en el sitio público.
export const metadata: Metadata = {
  title: 'nexo Admin',
  manifest: '/admin.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
