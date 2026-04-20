import Link from 'next/link'
import Image from 'next/image'
import { Camera, Globe, Briefcase, MessageCircle, Mail } from 'lucide-react'
import { NAV_LINKS, whatsappLink } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-midnight border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <Image src="/POSITIVO.png" alt="nexo" width={90} height={32} className="object-contain" />
            </Link>
            <p className="text-slate text-sm leading-relaxed max-w-xs">
              Tu puente entre dos mundos.<br />
              USA → Costa Rica.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="https://instagram.com/nexo.cr" target="_blank" rel="noopener noreferrer"
                className="text-slate hover:text-cyan transition-colors" aria-label="Instagram">
                <Camera size={18} />
              </a>
              <a href="https://facebook.com/nexo.cr" target="_blank" rel="noopener noreferrer"
                className="text-slate hover:text-cyan transition-colors" aria-label="Facebook">
                <Globe size={18} />
              </a>
              <a href="https://linkedin.com/company/nexo-cr" target="_blank" rel="noopener noreferrer"
                className="text-slate hover:text-cyan transition-colors" aria-label="LinkedIn">
                <Briefcase size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-ghost text-sm font-semibold mb-4">Navegación</p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate text-sm hover:text-cyan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://postal.ninja/es" target="_blank" rel="noopener noreferrer" className="text-slate text-sm hover:text-cyan transition-colors">
                  Rastrear paquete
                </a>
              </li>
              <li>
                <Link href="/casillero" className="text-slate text-sm hover:text-cyan transition-colors">
                  Mi casillero
                </Link>
              </li>
              <li>
                <Link href="/pedidos" className="text-slate text-sm hover:text-cyan transition-colors">
                  Tus pedidos
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate text-sm hover:text-cyan transition-colors">
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-ghost text-sm font-semibold mb-4">Contacto</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={whatsappLink('Hola nexo, quiero información sobre sus servicios.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-slate text-sm hover:text-cyan transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:nexxo.courier@gmail.com"
                  className="flex items-center gap-2.5 text-slate text-sm hover:text-cyan transition-colors"
                >
                  <Mail size={16} />
                  nexxo.courier@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate text-xs">
            © {new Date().getFullYear()} nexo CR. Todos los derechos reservados.
          </p>
          <p className="text-slate text-xs">
            Hecho con cariño en Costa Rica 🇨🇷
          </p>
        </div>
      </div>
    </footer>
  )
}
