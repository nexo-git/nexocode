import Badge from '@/components/ui/Badge'
import type { PackageStatus } from '@/types/tracking'
import { STATUS_LABELS } from '@/lib/constants'

interface StatusBadgeProps {
  status: PackageStatus
  pulse?: boolean
  className?: string
}

const statusToBadge: Record<PackageStatus, 'delivered' | 'transit' | 'customs' | 'delivery' | 'processing' | 'alert'> = {
  delivered:        'delivered',
  in_transit:       'transit',
  customs:          'customs',
  out_for_delivery: 'delivery',
  processing:       'processing',
  alert:            'alert',
}

export default function StatusBadge({ status, pulse, className }: StatusBadgeProps) {
  return (
    <Badge
      status={statusToBadge[status]}
      label={STATUS_LABELS[status] ?? status}
      pulse={pulse ?? status === 'in_transit'}
      className={className}
    />
  )
}
