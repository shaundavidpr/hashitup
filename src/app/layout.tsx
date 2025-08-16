import { Background } from '@/components/Background'
import { Navigation } from '@/components/Navigation'
import { SessionProvider } from '@/components/SessionProvider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true
})

export const metadata: Metadata = {
  title: 'Hash 2K25 - National Hackathon Platform',
  description: "Join India's most innovative hackathon platform. Create solutions that matter.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={cn(
        inter.className,
        'min-h-screen bg-[color:var(--color-slate-950)] antialiased selection:bg-[color:var(--color-blue-500)]/90 selection:text-white'
      )}>
        <Background />
        <SessionProvider>
          <Navigation />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
