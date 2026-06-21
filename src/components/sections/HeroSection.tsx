import { ArrowRight, Package2, Plane, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 text-cyan text-sm font-medium mb-8">
              <Package2 size={13} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping-slow shrink-0" />
              USA → Costa Rica
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-ghost leading-[1.05] mb-6 tracking-tight">
              Tu puente entre{' '}
              <span className="gradient-text">dos mundos.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate max-w-xl mb-10 leading-relaxed">
              Comprá en cualquier tienda de USA y recibilo en tu puerta en Costa Rica.
              Sin sorpresas en el precio.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/casillero">
                <Button size="lg" icon={<ArrowRight size={17} />} iconPosition="right">
                  Abrir casillero
                </Button>
              </Link>
              <Link href="/cotizar">
                <Button variant="secondary" size="lg">
                  Cotizá tu envío
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate mb-8">
              <span className="flex items-center gap-1.5">
                <span className="text-status-green font-bold">✓</span> Sin costos ocultos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-status-green font-bold">✓</span> Atención 24/7
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-status-green font-bold">✓</span> Entrega a todo el país
              </span>
            </div>

          </div>

          {/* Right: Floating tracking card */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="animate-float w-[340px]">
              <div className="bg-midnight/80 backdrop-blur-md border border-cyan/20 rounded-2xl p-6 shadow-cyan-glow">

                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-cyan text-sm tracking-widest uppercase">NX-2847</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-status-yellow/10 text-status-yellow border border-status-yellow/20">
                    <Plane size={10} className="rotate-45" /> En tránsito
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="text-center shrink-0">
                    <p className="text-ghost font-black text-base">MIA</p>
                    <p className="text-slate text-xs mt-0.5">Miami, FL</p>
                  </div>
                  <div className="flex-1 flex items-center gap-1.5">
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-cyan/50" />
                    <Plane size={15} className="text-cyan rotate-45 shrink-0" />
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan/50 to-cyan/20" />
                  </div>
                  <div className="text-center shrink-0">
                    <p className="text-ghost font-black text-base">SJO</p>
                    <p className="text-slate text-xs mt-0.5">San José, CR</p>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate">Progreso del envío</span>
                    <span className="text-cyan font-semibold">80%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="h-full w-4/5 bg-gradient-to-r from-cyan to-status-green rounded-full" />
                  </div>
                </div>

                <div className="rounded-xl px-4 py-3 flex items-start gap-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <MapPin size={13} className="text-cyan mt-0.5 shrink-0" />
                  <div>
                    <p className="text-ghost text-xs font-semibold">Aduana Costa Rica</p>
                    <p className="text-slate text-xs mt-0.5">Hoy, 10:24 AM · En proceso</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl px-3 py-2.5 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <p className="text-ghost font-bold text-sm">2.4 kg</p>
                    <p className="text-slate text-xs mt-0.5">Peso</p>
                  </div>
                  <div className="rounded-xl px-3 py-2.5 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <p className="text-ghost font-bold text-sm">2 días</p>
                    <p className="text-slate text-xs mt-0.5">Estimado</p>
                  </div>
                </div>

              </div>
              <p className="text-center text-xs mt-4" style={{ color: 'rgba(138,149,168,0.5)' }}>
                Rastreo en tiempo real incluido
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-space-black to-transparent pointer-events-none" />
    </section>
  )
}
