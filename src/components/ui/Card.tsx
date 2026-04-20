import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'highlighted' | 'glass'
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantClasses = {
  default:     'bg-midnight border border-white/5',
  highlighted: 'bg-midnight border border-cyan/30 shadow-cyan-glow',
  glass:       'bg-white/5 backdrop-blur-sm border border-white/10',
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({ children, variant = 'default', padding = 'md', className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl shadow-card',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  )
}
