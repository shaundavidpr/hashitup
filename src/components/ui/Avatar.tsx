import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'default' | 'ring' | 'glow'
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = 'md', variant = 'default', ...props }, ref) => {
    const baseStyles = 'relative flex shrink-0 overflow-hidden rounded-full'
    
    const sizes = {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
      '2xl': 'h-20 w-20',
    }

    const variants = {
      default: '',
      ring: 'ring-2 ring-white/20 ring-offset-2 ring-offset-transparent',
      glow: 'ring-2 ring-primary-500/50 shadow-glow',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      />
    )
  }
)

Avatar.displayName = 'Avatar'

const AvatarImage = forwardRef<HTMLImageElement, HTMLAttributes<HTMLImageElement> & { src?: string; alt?: string }>(
  ({ className, src, alt, ...props }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  )
)

AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-600 to-accent-600 text-white font-medium',
        className
      )}
      {...props}
    />
  )
)

AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarFallback, AvatarImage }
