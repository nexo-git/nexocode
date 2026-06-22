'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export function SiteHeader() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return <Navbar />
}

export function SiteFooter() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return (
    <>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
