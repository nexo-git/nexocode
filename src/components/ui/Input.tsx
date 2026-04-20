import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ghost/80">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate',
              'focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-10',
              error && 'border-status-red/60 focus:border-status-red/80 focus:ring-status-red/20',
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-status-red">{error}</p>}
        {!error && hint && <p className="text-xs text-slate">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
