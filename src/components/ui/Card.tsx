import { cn } from '@/lib/utils'
import { forwardRef, HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'glass' | 'dark' | 'colored'
  glowEffect?: boolean
  hoverEffect?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', glowEffect = false, hoverEffect = false, ...props }, ref) => {
    const baseStyles = 'rounded-3xl border transition-all duration-300'
    
    const variantStyles = {
      default: 'bg-slate-900/20 border-slate-800/50 backdrop-blur-xl',
      glass: 'bg-white/5 border-white/10 backdrop-blur-xl',
      dark: 'bg-slate-950 border-slate-800/50',
      colored: 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-xl'
    }

    const glowStyles = glowEffect ? 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''
    const hoverStyles = hoverEffect ? 'hover:scale-[1.02] hover:border-white/20' : ''

    return (
      <div
        className={cn(
          baseStyles,
          variantStyles[variant],
          glowStyles,
          hoverStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-bold leading-none tracking-tight text-white', className)}
      {...props}
    />
  )
)

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }

