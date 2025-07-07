'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse'
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = 'md', variant = 'default', ...props }, ref) => {
    const sizes = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
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

export function LoadingDots() {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
    </div>
  )
}

export function LoadingPulse() {
  return (
    <div className="flex space-x-2">
      <div className="w-3 h-3 rounded-full animate-pulse" style={{
        background: 'linear-gradient(to right, #3b82f6, #06b6d4)'
      }}></div>
      <div className="w-3 h-3 rounded-full animate-pulse" style={{
        background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
        animationDelay: '0.2s'
      }}></div>
      <div className="w-3 h-3 rounded-full animate-pulse" style={{
        background: 'linear-gradient(to right, #10b981, #059669)',
        animationDelay: '0.4s'
      }}></div>
    </div>
  )
}

export function LoadingSpinnerInfinity({ className = '', size = 'md' }: { className?: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* SVG Container */}
      <svg
        viewBox="0 0 100 50"
        preserveAspectRatio="xMidYMid"
        className="w-full h-full"
      >
        {/* Left Path (Red) */}
        <path
          d="M25,25 C25,15 35,15 45,25 C55,35 65,35 75,25"
          className="stroke-[4] stroke-red-500/0 fill-none animate-infinity-left"
          strokeLinecap="round"
        />
        
        {/* Right Path (Blue) */}
        <path
          d="M75,25 C75,35 65,35 55,25 C45,15 35,15 25,25"
          className="stroke-[4] stroke-blue-500/0 fill-none animate-infinity-right"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
