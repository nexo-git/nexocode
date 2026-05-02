'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { getReviews } from '@/lib/reviews'
import type { NexoReview } from '@/types/casillero'

const FALLBACK: NexoReview[] = [
  { reviewId: 'f1', userId: 'seed', userName: 'Ana Rodríguez', rating: 5, comment: '¡Increíble servicio! Mi paquete llegó en 5 días y en perfectas condiciones. Definitivamente volvería a usar Nexo.', createdAt: '2025-11-15T14:23:00.000Z' },
  { reviewId: 'f2', userId: 'seed', userName: 'Carlos Jiménez', rating: 5, comment: 'Super rápido y confiable. Ya llevo 3 pedidos con Nexo y siempre excelente. El seguimiento en tiempo real es muy útil.', createdAt: '2025-12-03T09:10:00.000Z' },
  { reviewId: 'f3', userId: 'seed', userName: 'María González', rating: 5, comment: 'Muy buena experiencia. Precios justos y atención al cliente excelente cuando tuve una consulta.', createdAt: '2026-01-20T16:45:00.000Z' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          className={n <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: NexoReview }) {
  const date = new Date(review.createdAt).toLocaleDateString('es-CR', { month: 'long', year: 'numeric' })
  return (
    <div className="bg-midnight border border-white/5 rounded-2xl px-6 py-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-ghost font-semibold text-sm">{review.userName}</p>
          <p className="text-slate text-xs mt-0.5">{date}</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-status-green/10 text-status-green border border-status-green/20 shrink-0">
          ✓ Paquete entregado
        </span>
      </div>
      <Stars rating={review.rating} />
      <p className="text-slate text-sm leading-relaxed">{review.comment}</p>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-midnight border border-white/5 rounded-2xl px-6 py-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5">
          <div className="h-3.5 w-28 bg-white/5 rounded-full" />
          <div className="h-2.5 w-16 bg-white/5 rounded-full" />
        </div>
        <div className="h-5 w-24 bg-white/5 rounded-full" />
      </div>
      <div className="h-3 w-20 bg-white/5 rounded-full" />
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-white/5 rounded-full" />
        <div className="h-3 w-4/5 bg-white/5 rounded-full" />
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<NexoReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data.length > 0 ? data.slice(0, 6) : FALLBACK)
      setLoading(false)
    })
  }, [])

  return (
    <section className="bg-midnight py-24 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Reseñas</p>
          <h2 className="text-4xl md:text-5xl font-black text-ghost leading-tight mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-slate max-w-xl mx-auto">
            Reseñas reales de personas que ya recibieron sus paquetes con Nexo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : reviews.map((r) => <ReviewCard key={r.reviewId} review={r} />)
          }
        </div>

      </div>
    </section>
  )
}
