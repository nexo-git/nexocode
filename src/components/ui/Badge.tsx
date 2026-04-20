import { cn } from '@/lib/utils'

type BadgeStatus = 'delivered' | 'transit' | 'customs' | 'delivery' | 'processing' | 'alert' | 'neutral'

interface BadgeProps {
  status: BadgeStatus
  label: string
  pulse?: boolean
  className?: string
}

const statusConfig: Record<BadgeStatus, { dot: string; bg: string; text: string }> = {
  delivered:  { dot: 'bg-status-green',  bg: 'bg-status-green/10',  text: 'text-status-green' },
  transit:    { dot: 'bg-status-yellow', bg: 'bg-status-yellow/10', text: 'text-status-yellow' },
  customs:    { dot: 'bg-status-yellow', bg: 'bg-status-yellow/10', text: 'text-status-yellow' },
  delivery:   { dot: 'bg-cyan',          bg: 'bg-cyan/10',          text: 'text-cyan' },
  processing: { dot: 'bg-slate',         bg: 'bg-slate/10',         text: 'text-slate' },
  alert:      { dot: 'bg-status-red',    bg: 'bg-status-red/10',    text: 'text-status-red' },
  neutral:    { dot: 'bg-slate',         bg: 'bg-slate/10',         text: 'text-slate' },
}

export default function Badge({ status, label, pulse = false, className }: BadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
        config.bg,
        config.text,
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span className={cn('animate-ping-slow absolute inline-flex h-full w-full rounded-full opacity-75', config.dot)} />
        )}
        <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', config.dot)} />
      </span>
      {label}
    </span>
  )
}
