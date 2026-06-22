'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function SiteChrome() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return (
    <>
      <Navbar />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
