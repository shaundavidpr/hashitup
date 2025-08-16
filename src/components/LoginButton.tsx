'use client'

import { Button } from '@/components/ui/Button'
import { LogOut, User } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export function LoginButton() {
  const { data: session, status } = useSession()
  const [_isSigningIn, _setIsSigningIn] = useState(false)  // Unused - can be removed later
  const [_error, _setError] = useState<string | null>(null)  // Unused - can be removed later
  const [isLoading, setIsLoading] = useState(false)

  const _handleSignIn = async () => {  // Unused - can be removed later
    try {
      _setIsSigningIn(true)
      _setError(null)
      
      // Redirect to signin page
      window.location.href = `/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`
    } catch (error) {
      console.error('Sign in error:', error)
      _setError('Unable to sign in. Please try again.')
      _setIsSigningIn(false)
    }
  }

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { 
        callbackUrl: '/dashboard'
      })
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl h-10 w-36 animate-pulse px-3">
        <div className="w-6 h-6 rounded-full bg-slate-700 animate-pulse"></div>
        <div className="h-3 w-16 bg-slate-700 animate-pulse rounded"></div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-pink-500 shadow-lg shadow-pink-500/20">
            {session.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || 'User'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {session.user?.name?.split(' ')[0] || 'User'}
            </span>
            {session.user?.email && (
              <span className="text-xs text-gray-400">
                {session.user.email.split('@')[0]}
              </span>
            )}
          </div>
        </div>
        
        <Button
          onClick={() => signOut()}
          variant="destructive"
          size="sm"
          className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 text-sm font-medium text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="default"
      size="lg"
      onClick={handleLogin}
      isLoading={isLoading}
      className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-pink-500/30 px-6 py-2 text-sm font-medium rounded-xl relative overflow-hidden group"
    >
      <span className="relative z-10">{isLoading ? 'Signing in...' : 'Get Started'}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
    </Button>
  )
} 