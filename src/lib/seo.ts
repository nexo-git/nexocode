import type { Metadata } from 'next'

export const SITE_URL = 'https://www.nexocourier.com'
export const SITE_NAME = 'nexo Courier'

export const HOME_TITLE = 'Casillero en USA y courier a Costa Rica | nexo Guápiles'
export const HOME_DESCRIPTION =
  'Abrí tu casillero gratis en Estados Unidos y traé tus compras a Costa Rica por $14 el kilo. Desde Guápiles, con entrega gratis en Guápiles Centro.'

interface PageSeo {
  title: string
  description?: string
  path: string
  absoluteTitle?: boolean  // true = no aplicar la plantilla "%s | nexo Courier" (home)
  noindex?: boolean        // páginas sin valor en Google (login, contraseñas)
}

// Metadata de una página pública. El openGraph va completo en cada página porque
// Next reemplaza el del layout en vez de combinarlo: sin esto, al compartir un link
// siempre saldría el título del home.
export function pageMetadata({ title, description, path, absoluteTitle, noindex }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    ...(description && { description }),
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      ...(description && { description }),
      url: path,
      siteName: SITE_NAME,
      locale: 'es_CR',
      type: 'website',
    },
    ...(noindex && { robots: { index: false, follow: false } }),
  }
}
