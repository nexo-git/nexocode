import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AmplifyProvider from '@/components/AmplifyProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'nexo — Tu puente entre dos mundos',
  description: 'Courier y envíos USA → Costa Rica. Rastreo en tiempo real, precios claros, atención 24/7.',
  icons: {
    icon: '/XNEX0.png',
  },
  openGraph: {
    title: 'nexo — Tu puente entre dos mundos',
    description: 'Envíos USA → Costa Rica con transparencia total.',
    locale: 'es_CR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <AmplifyProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AmplifyProvider>
      </body>
    </html>
  )
}
