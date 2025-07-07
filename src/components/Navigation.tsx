'use client'

import { LoginButton } from '@/components/LoginButton'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors',
                  'hover:bg-white/10'
                )}
              >
                Dashboard
              </Link>
              {session.user?.email?.includes('@admin') && (
                <Link
                  href="/admin"
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors',
                    'hover:bg-white/10'
                  )}
                >
                  Admin
                </Link>
              )}
            </>
          ) : null}
          <LoginButton />
        </div>
      </div>
    </nav>
  )
} 