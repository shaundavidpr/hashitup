'use client'

import { Button } from '@/components/ui/Button'
import { Loader2, LogOut } from 'lucide-react'
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignOut() {
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession()
      setSession(currentSession)
      
      // If no session, redirect to home
      if (!currentSession) {
        router.push('/')
      }
    }
    checkSession()
  }, [router])

  const handleSignOut = async () => {
    try {
      setLoading(true)
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Sign out error:', error)
      // Force redirect even if sign out fails
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6)'
        }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20" style={{
          background: 'linear-gradient(to right, #ec4899, #8b5cf6)'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{
              background: 'linear-gradient(to right, #ef4444, #dc2626)'
            }}>
              <LogOut className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Sign Out</h1>
            <p className="text-gray-300">Are you sure you want to sign out of CodeNChip?</p>
          </div>

          {/* User Info */}
          {session?.user && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                {session.user.image && (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || 'User'} 
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="text-white font-medium">{session.user.name}</p>
                  <p className="text-gray-400 text-sm">{session.user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 text-lg font-semibold"
              style={{
                background: loading 
                  ? 'linear-gradient(to right, #6b7280, #9ca3af)' 
                  : 'linear-gradient(to right, #ef4444, #dc2626)',
                color: '#ffffff'
              }}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}
              {loading ? 'Signing out...' : 'Sign Out'}
            </Button>

            <Button
              onClick={() => router.push('/')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 text-lg font-semibold"
              style={{
                background: 'linear-gradient(to right, #6b7280, #9ca3af)',
                color: '#ffffff'
              }}
            >
              Cancel
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-sm text-gray-400">
              You'll be redirected to the home page after signing out.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
