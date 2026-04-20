'use client'

import type { TrackingEvent, PackageStatus } from '@/types/tracking'
import { cn } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'

interface TrackingTimelineProps {
  events: TrackingEvent[]
}

const statusDotColor: Record<PackageStatus, string> = {
  delivered:        'bg-status-green border-status-green',
  in_transit:       'bg-status-yellow border-status-yellow',
  customs:          'bg-status-yellow border-status-yellow',
  out_for_delivery: 'bg-cyan border-cyan',
  processing:       'bg-slate border-slate',
  alert:            'bg-status-red border-status-red',
}

function formatDate(iso: string) {
  const date = new Date(iso)
  return date.toLocaleDateString('es-CR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <div className="space-y-0">
      {events.map((event, i) => {
        const isFirst = i === 0
        const isLast = i === events.length - 1
        return (
          <div key={event.id} className="flex gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-3 h-3 rounded-full border-2 shrink-0 mt-1',
                  statusDotColor[event.status],
                  isFirst && 'w-4 h-4 shadow-cyan-glow',
                )}
              />
              {!isLast && <div className="w-px flex-1 bg-white/10 my-1" />}
            </div>

            {/* Content */}
            <div className={cn('pb-6', isLast && 'pb-0')}>
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className={cn('text-sm font-semibold', isFirst ? 'text-ghost' : 'text-ghost/70')}>
                  {STATUS_LABELS[event.status] ?? event.status}
                </span>
              </div>
              <p className={cn('text-sm mb-1', isFirst ? 'text-ghost/80' : 'text-slate')}>
                {event.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-slate/70">
                <span>{event.location}</span>
                <span>·</span>
                <span>{formatDate(event.timestamp)}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
