'use client'

import { ReactNode, useState, useEffect } from 'react'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface SessionProviderProps {
  children: ReactNode
  /**
   * If set to true, a loading spinner will be shown until the session is loaded
   * @default true
   */
  showLoadingState?: boolean
  /**
   * Controls if the session is refetched when the window is focused
   * @default true
   */
  refetchOnWindowFocus?: boolean
}

/**
 * SessionProvider wraps the app with NextAuth SessionProvider
 * to make session data available throughout the application
 * 
 * @example
 * // In layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <SessionProvider>
 *       {children}
 *     </SessionProvider>
 *   )
 * }
 */
export function SessionProvider({ 
  children, 
  showLoadingState = true,
  refetchOnWindowFocus = true 
}: SessionProviderProps) {
  const [isClient, setIsClient] = useState(false)
  
  // Handle hydration mismatch by only rendering after client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient && showLoadingState) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-slate-900/90 backdrop-blur-sm z-50">
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="backdrop-blur-sm bg-slate-800/50 rounded-xl border border-slate-700/50 p-8 shadow-lg relative">
            <div className="flex flex-col items-center">
              <LoadingSpinner 
                variant="gradient" 
                size="xl" 
                className="mb-4"
              />
              <p className="text-slate-300 text-sm">Loading your session...</p>
              <div className="mt-3 h-1 w-24 bg-slate-700 rounded overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 w-1/2 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <NextAuthSessionProvider refetchOnWindowFocus={refetchOnWindowFocus}>
      {children}
    </NextAuthSessionProvider>
  )
}