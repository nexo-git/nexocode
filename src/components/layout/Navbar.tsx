'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ArrowRight, LogIn, Package2, LogOut, User, Settings, Sun, Moon, MapPin } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { getCurrentUser, logoutUser } from '@/lib/casillero'
import { useTheme } from '@/components/ThemeProvider'
import type { NexoUser } from '@/types/casillero'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState<NexoUser | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reload auth state on every route change
  useEffect(() => {
    getCurrentUser().then(setUser)
    setMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    router.push('/')
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || menuOpen
          ? 'bg-space-black/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={theme === 'dark' ? '/POSITIVO.png' : '/NEXO.png'} alt="nexo" width={100} height={36} className="object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-cyan',
                pathname === link.href ? 'text-cyan' : 'text-slate',
              )}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/pedidos"
              className={cn(
                'text-sm font-medium transition-colors hover:text-cyan',
                pathname === '/pedidos' ? 'text-cyan' : 'text-slate',
              )}
            >
              Tus pedidos
            </Link>
          )}
        </nav>

        {/* CTA — desktop */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Cambiar tema"
            className="p-2 rounded-lg text-slate hover:text-ghost hover:bg-white/5 transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {user ? (
            <>
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center">
                    <User size={12} className="text-cyan" />
                  </div>
                  <span className="text-sm text-ghost font-medium">{user.nombre}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-midnight border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    <Link
                      href="/casillero"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate hover:text-ghost hover:bg-white/5 transition-colors"
                    >
                      <Package2 size={15} /> Mi casillero
                    </Link>
                    <Link
                      href="/direccion"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate hover:text-ghost hover:bg-white/5 transition-colors"
                    >
                      <MapPin size={15} /> Dirección CR
                    </Link>
                    <Link
                      href="/cuenta"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate hover:text-ghost hover:bg-white/5 transition-colors"
                    >
                      <Settings size={15} /> Cuenta
                    </Link>
                    <div className="border-t border-white/5" />
                    <button
                      onClick={() => { setUserMenuOpen(false); handleLogout() }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-slate hover:text-status-red hover:bg-status-red/5 transition-colors"
                    >
                      <LogOut size={15} /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" icon={<LogIn size={14} />}>
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/cotizar">
                <Button size="sm" icon={<ArrowRight size={14} />}>
                  Cotizá tu envío
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-slate hover:text-ghost transition-colors"
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-space-black/98">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {/* User greeting */}
            {user && (
              <div className="flex items-center gap-2.5 px-3 py-3 mb-1 border-b border-white/5">
                <div className="w-7 h-7 rounded-full bg-cyan/20 flex items-center justify-center">
                  <User size={14} className="text-cyan" />
                </div>
                <div>
                  <p className="text-ghost text-sm font-medium">{user.nombre} {user.apellido}</p>
                  <p className="text-slate text-xs">{user.email}</p>
                </div>
              </div>
            )}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-midnight hover:text-ghost',
                  pathname === link.href ? 'text-cyan bg-midnight' : 'text-slate',
                )}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/pedidos"
                  className={cn(
                    'px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-midnight hover:text-ghost',
                    pathname === '/pedidos' ? 'text-cyan bg-midnight' : 'text-slate',
                  )}
                >
                  Tus pedidos
                </Link>
                <Link href="/casillero" className="mt-2">
                  <Button variant="secondary" size="md" className="w-full" icon={<Package2 size={14} />}>
                    Mi casillero
                  </Button>
                </Link>
                <Link href="/direccion" className="mt-1">
                  <Button variant="ghost" size="md" className="w-full text-slate" icon={<MapPin size={14} />}>
                    Dirección CR
                  </Button>
                </Link>
                <Link href="/cuenta" className="mt-1">
                  <Button variant="ghost" size="md" className="w-full text-slate" icon={<Settings size={14} />}>
                    Cuenta
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full mt-1 text-slate"
                  icon={<LogOut size={14} />}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="mt-2">
                  <Button variant="secondary" size="md" className="w-full" icon={<LogIn size={14} />}>
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/casillero" className="mt-1">
                  <Button size="md" className="w-full" icon={<Package2 size={14} />}>
                    Abrir casillero
                  </Button>
                </Link>
                <a href="https://postal.ninja/es" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="md" className="w-full" icon={<ArrowRight size={14} />} iconPosition="right">
                    Rastrear paquete
                  </Button>
                </a>
              </>
            )}

            {/* Theme toggle — mobile */}
            <button
              onClick={toggle}
              className="mt-2 flex items-center gap-2.5 px-3 py-3 rounded-lg text-sm font-medium text-slate hover:text-ghost hover:bg-midnight transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
