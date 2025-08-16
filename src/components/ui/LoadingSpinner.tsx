'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'gradient'
}

/**
 * LoadingSpinner component for showing loading states
 * 
 * @example
 * // Default spinner
 * <LoadingSpinner />
 * 
 * // Gradient spinner (our design system style)
 * <LoadingSpinner variant="gradient" size="lg" />
 * 
 * // Dots spinner
 * <LoadingSpinner variant="dots" />
 */
const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = 'md', variant = 'default', ...props }, ref) => {
    const sizes = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    }

    // Gradient spinner that matches our design system
    if (variant === 'gradient') {
      return (
        <div
          ref={ref}
          className={cn('relative', sizes[size], className)}
          {...props}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 animate-spin"></div>
          <div className={cn(
            'absolute inset-[2px] bg-slate-900 rounded-full flex items-center justify-center',
            size === 'xs' && 'inset-[1px]'
          )}>
            <div className={cn(
              'rounded-full bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 animate-pulse',
              size === 'xs' && 'h-1 w-1',
              size === 'sm' && 'h-1.5 w-1.5',
              size === 'md' && 'h-2 w-2',
              size === 'lg' && 'h-2.5 w-2.5',
              size === 'xl' && 'h-3 w-3',
            )}></div>
          </div>
        </div>
      )
    }

    if (variant === 'dots') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-1', className)}
          {...props}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'bg-current rounded-full animate-pulse',
                size === 'xs' && 'h-1 w-1',
                size === 'sm' && 'h-1.5 w-1.5',
                size === 'md' && 'h-2 w-2',
                size === 'lg' && 'h-2.5 w-2.5',
                size === 'xl' && 'h-3 w-3',
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )
    }

    if (variant === 'pulse') {
      return (
        <div
          ref={ref}
          className={cn(
            'bg-current rounded-full animate-pulse',
            sizes[size],
            className
          )}
          {...props}
        />
      )
    }

    // Default spinner
    return (
      <div
        ref={ref}
        className={cn('animate-spin', sizes[size], className)}
        {...props}
      >
        <svg
          className="h-full w-full text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'

export { LoadingSpinner }

/**
 * Alternative loading spinner with an infinity-like animation
 * Matches our design system with gradient colors
 */
export function LoadingSpinnerInfinity({ className = '', size = 'md' }: { className?: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }
  
  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className="absolute w-full h-full rounded-full border-2 border-slate-700/50"></div>
      <div className="absolute w-full h-full rounded-full border-t-2 border-r-2 border-transparent border-l-2 animate-spin"
        style={{
          borderTopColor: 'rgb(236, 72, 153)', // pink-500
          borderLeftColor: 'rgb(59, 130, 246)', // blue-500
          animationDuration: '1s',
        }}
      ></div>
      <div className="absolute w-full h-full rounded-full border-b-2 border-r-2 border-l-2 border-transparent animate-spin"
        style={{
          borderBottomColor: 'rgb(6, 182, 212)', // cyan-500
          borderRightColor: 'transparent',
          animationDuration: '1.5s',
          animationDirection: 'reverse'
        }}
      ></div>
    </div>
  )
}
