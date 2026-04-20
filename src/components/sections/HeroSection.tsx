import { ArrowRight, ExternalLink } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-space-black">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center pt-24 pb-16">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 text-cyan text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping-slow" />
          USA → Costa Rica
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-ghost leading-tight mb-6 tracking-tight">
          Tu puente entre{' '}
          <span className="gradient-text">dos mundos.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate max-w-2xl mx-auto mb-10 leading-relaxed">
          Comprá en cualquier tienda de USA y recibilo en tu puerta en Costa Rica.
          Sin sorpresas en el precio.
        </p>

        {/* Main CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link href="/cotizar">
            <Button size="md" icon={<ArrowRight size={16} />} iconPosition="right">
              Cotizá tu envío
            </Button>
          </Link>
          <a
            href="https://wa.me/50661132863?text=Hola%20nexo%2C%20quiero%20más%20información"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="md">
              Hablar por WhatsApp
            </Button>
          </a>
        </div>

        {/* Tracking recommendation */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-midnight/50 text-sm">
          <span className="text-slate">¿Querés rastrear tu paquete?</span>
          <a
            href="https://postal.ninja/es"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-cyan hover:text-cyan/80 font-medium transition-colors"
          >
            Usá postal.ninja <ExternalLink size={13} />
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate">
          <span className="flex items-center gap-1.5">
            <span className="text-status-green">✓</span> Sin costos ocultos
          </span>
          <span className="text-white/10">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-status-green">✓</span> Atención 24/7
          </span>
          <span className="text-white/10">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-status-green">✓</span> Entrega a todo el país
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-black to-transparent pointer-events-none" />
    </section>
  )
}
