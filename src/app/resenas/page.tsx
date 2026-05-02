'use client'

import { useEffect, useState } from 'react'
import { Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getReviews } from '@/lib/reviews'
import type { NexoReview } from '@/types/casillero'

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
  const date = new Date(review.createdAt).toLocaleDateString('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
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

export default function ResenasPage() {
  const [reviews, setReviews] = useState<NexoReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate hover:text-ghost text-sm transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>

        <div className="mb-10">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Reseñas</p>
          <h1 className="text-4xl font-bold text-ghost mb-2">Lo que dicen nuestros clientes</h1>
          <p className="text-slate">
            {loading ? '...' : `${reviews.length} reseña${reviews.length !== 1 ? 's' : ''} de personas que recibieron sus paquetes con Nexo.`}
          </p>
        </div>

        <div className="space-y-4">
          {loading
            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            : reviews.length > 0
              ? reviews.map((r) => <ReviewCard key={r.reviewId} review={r} />)
              : (
                <div className="text-center py-20 text-slate">
                  Aún no hay reseñas. ¡Sé el primero en dejar una desde tu historial de pedidos.
                </div>
              )
          }
        </div>

      </div>
    </div>
  )
}
