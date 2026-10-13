import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SiteHeader, SiteFooter } from '@/components/layout/SiteChrome'
import AmplifyProvider from '@/components/AmplifyProvider'
import ThemeProvider from '@/components/ThemeProvider'
import { SITE_URL, SITE_NAME, HOME_TITLE, HOME_DESCRIPTION } from '@/lib/seo'

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  icons: {
    icon: '/XNEX0.png',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: SITE_NAME,
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
  description: 'Courier y envíos USA → Costa Rica con seguimiento de cada envío y precios claros.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Modo oscuro forzado temporalmente (ver FORCE_DARK_MODE en ThemeProvider.tsx) — evita el flash de tema claro antes de hidratar */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('dark')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AmplifyProvider>
          <ThemeProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </ThemeProvider>
        </AmplifyProvider>
      </body>
    </html>
  )
}
