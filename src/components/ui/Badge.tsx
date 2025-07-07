import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'colored' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  glow = false,
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900'
  
  const variantStyles = {
    default: 'border border-transparent bg-slate-900/30 text-slate-100 backdrop-blur-xl',
    glass: 'border border-white/20 bg-white/10 text-white backdrop-blur-xl',
    colored: 'border border-blue-500/20 bg-blue-500/10 text-blue-400 backdrop-blur-xl',
    outline: 'border border-slate-200/20 text-slate-100'
  }

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full',
    md: 'text-sm px-3 py-1 rounded-full',
    lg: 'text-base px-4 py-1.5 rounded-full'
  }

  const glowStyles = glow ? 'shadow-[0_0_20px_rgba(59,130,246,0.15)]' : ''

  return (
    <div className={cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      glowStyles,
      className
    )}>
      {children}
    </div>
  )
}
