import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

interface CtaBannerSectionProps {
  heading: string
  subtext: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CtaBannerSection({
  heading,
  subtext,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: CtaBannerSectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <div className="relative border border-cyan/20 rounded-3xl p-10 md:p-14 overflow-hidden shadow-cyan-glow-lg">
          {/* Inner gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan/8 via-cyan/3 to-transparent pointer-events-none rounded-3xl" />
          {/* Corner glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-ghost mb-4 leading-tight">
              {heading}
            </h2>
            <p className="text-slate text-lg mb-8 max-w-xl mx-auto">{subtext}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href={ctaHref}>
                <Button size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
                  {ctaLabel}
                </Button>
              </Link>
              {secondaryLabel && secondaryHref && (
                secondaryHref.startsWith('http') ? (
                  <a href={secondaryHref} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="lg">
                      {secondaryLabel}
                    </Button>
                  </a>
                ) : (
                  <Link href={secondaryHref}>
                    <Button variant="secondary" size="lg">
                      {secondaryLabel}
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
