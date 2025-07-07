'use client'

import { Button } from '@/components/ui/Button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const errorMessages: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: 'Server Configuration Error',
    description: 'There is a problem with the server configuration. Please contact support.'
  },
  AccessDenied: {
    title: 'Access Denied',
    description: 'You do not have permission to sign in. Please contact an administrator.'
  },
  Verification: {
    title: 'Verification Error',
    description: 'The verification token has expired or is invalid. Please try signing in again.'
  },
  OAuthSignin: {
    title: 'OAuth Sign-in Error',
    description: 'There was a problem connecting to the authentication provider. This might be due to network issues or server problems.'
  },
  OAuthCallback: {
    title: 'OAuth Callback Error', 
    description: 'There was an error processing the authentication response. Please try again.'
  },
  OAuthCreateAccount: {
    title: 'Account Creation Error',
    description: 'Unable to create your account. Please try again or contact support.'
  },
  EmailCreateAccount: {
    title: 'Email Account Error',
    description: 'Unable to create an account with this email address.'
  },
  Callback: {
    title: 'Callback Error',
    description: 'There was an error in the authentication callback. Please try signing in again.'
  },
  OAuthAccountNotLinked: {
    title: 'Account Not Linked',
    description: 'This account is already associated with another sign-in method.'
  },
  EmailSignin: {
    title: 'Email Sign-in Error',
    description: 'Unable to send sign-in email. Please check your email address.'
  },
  CredentialsSignin: {
    title: 'Invalid Credentials',
    description: 'The credentials you provided are incorrect. Please try again.'
  },
  SessionRequired: {
    title: 'Session Required',
    description: 'You must be signed in to access this page.'
  },
  Default: {
    title: 'Authentication Error',
    description: 'An unexpected error occurred during authentication. Please try again.'
  }
}

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || 'Default'

  const errorInfo = errorMessages[error] || errorMessages.Default

  const handleRetry = () => {
    router.push('/auth/signin')
  }

  const handleHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{
          background: 'linear-gradient(to right, #ef4444, #f97316)'
        }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20" style={{
          background: 'linear-gradient(to right, #8b5cf6, #ec4899)'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="glass-card backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-red-400/30" style={{
            background: 'linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))'
          }}>
            <AlertTriangle className="h-10 w-10 text-red-400" />
          </div>

          {/* Error Content */}
          <h1 className="text-3xl font-bold text-white mb-4">{errorInfo.title}</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {errorInfo.description}
          </p>

          {/* Error Code */}
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-300 text-sm font-mono">
              Error Code: {error}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleRetry}
              className="w-full flex items-center justify-center gap-3 py-4 text-lg font-semibold"
              style={{
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)'
              }}
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </Button>

            <Button
              onClick={handleHome}
              variant="outline"
              className="w-full flex items-center justify-center gap-3 py-4 text-lg font-semibold"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">
              If this problem persists, please contact support with the error code above.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
