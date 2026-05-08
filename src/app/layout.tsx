import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AmplifyProvider from '@/components/AmplifyProvider'
import ThemeProvider from '@/components/ThemeProvider'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'nexo',
  legalName: 'NexoCode LLC',
  url: 'https://www.nexocourier.com',
  logo: 'https://www.nexocourier.com/POSITIVO.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'English'],
    contactOption: 'TollFree',
  },
  areaServed: ['CR', 'US'],
  description: 'Courier y envíos USA → Costa Rica con rastreo en tiempo real y precios claros.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AmplifyProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </ThemeProvider>
        </AmplifyProvider>
      </body>
    </html>
  )
}
