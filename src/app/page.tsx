import { LoginButton } from '@/components/LoginButton'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { authOptions } from '@/lib/auth'
import {
    Calendar,
    Gem, Rocket, Sparkles, Target, Trophy,
    Zap
} from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  let session = null
  
  try {
    session = await getServerSession(authOptions)
    
    if (session) {
      if (['ADMIN', 'SUPERADMIN'].includes(session.user.role)) {
        redirect('/admin')
      }
      redirect('/dashboard')
    }
  } catch (error) {
    console.error('Auth error:', error)
    // Continue to render the page if auth fails
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Clean Header with Animation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/60 border-b border-slate-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-all duration-300 animate-pulse-slow">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Code</span>
                  <span className="text-white">NChip</span>
                </h1>
              </div>
            </Link>
            
            <div className="flex items-center gap-6">
              {session ? (
                <Link href="/dashboard">
                  <Button variant="default" size="lg" className="px-6 hover:scale-105 transition-transform duration-300">Dashboard</Button>
                </Link>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Bento Grid with Red Theme */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[320px]">
          
          {/* Hero Section with New Tagline */}
          <div className="lg:col-span-2 lg:row-span-2">
            <Card variant="glass" className="h-full p-16 relative overflow-hidden bg-gradient-to-br from-red-500/10 to-orange-600/10 border-red-500/20 group hover:border-red-500/40 transition-all duration-500">
              {/* Animated Spark Elements */}
              <div className="absolute top-12 right-12 w-32 h-32 bg-gradient-to-br from-red-400/30 to-orange-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl animate-float"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="mb-12 transform transition-all duration-500 group-hover:translate-y-[-8px]">
                  <Badge variant="glass" className="mb-8 text-base font-medium animate-fade-in">
                    <Sparkles className="w-5 h-5 mr-3 text-red-400" />
                    National Hackathon Platform
                  </Badge>
                  
                  <h1 className="text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
                    <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      Crack the code.
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      Spark the chip.
                    </span>
                  </h1>
                  
                  <p className="text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
                    Join India's most innovative hackathon. 
                    <br />Create solutions that matter.
                  </p>
                </div>
                
                <div className="animate-fade-in-up delay-300">
                  <LoginButton />
                </div>
              </div>
            </Card>
          </div>

          {/* Live Stats with Animation */}
          <div>
            <Card variant="glass" className="h-full p-12 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20 relative group hover:border-red-500/40 transition-all duration-500">
              <div className="absolute top-6 right-6 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
              
              <div className="text-center h-full flex flex-col justify-center transform transition-all duration-500 group-hover:translate-y-[-8px]">
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-red-400 mb-2 animate-count-up">2,547</div>
                  <div className="text-slate-400 text-lg">Teams Joined</div>
                </div>
                
                <div className="text-xs text-red-300 uppercase tracking-wide font-medium">
                  Live Updates
                </div>
              </div>
            </Card>
          </div>

          {/* Prize Pool with Glow */}
          <div>
            <Card variant="glass" className="h-full p-12 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 group hover:border-orange-500/40 transition-all duration-500">
              <div className="text-center h-full flex flex-col justify-center transform transition-all duration-500 group-hover:translate-y-[-8px]">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Gem className="w-10 h-10 text-white animate-pulse" />
                </div>
                
                <div className="mb-6">
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 animate-pulse-slow">
                    ₹5L
                  </div>
                  <div className="text-slate-400 text-lg">Prize Pool</div>
                </div>
                
                <div className="text-xs text-orange-300 uppercase tracking-wide font-medium">
                  Total Rewards
                </div>
              </div>
            </Card>
          </div>

          {/* Timeline with Hover Effects */}
          <div className="lg:col-span-2">
            <Card variant="glass" className="h-full p-12 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20 group hover:border-red-500/40 transition-all duration-500">
              <div className="flex items-center justify-between h-full">
                
                <div className="text-center group/item">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover/item:scale-110 transition-transform duration-300">
                    <Calendar className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-xl font-bold mb-2">Registration</div>
                  <div className="text-slate-400">July 15, 2025</div>
                </div>
                
                <div className="text-center group/item">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover/item:scale-110 transition-transform duration-300">
                    <Rocket className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-xl font-bold mb-2">Hackathon</div>
                  <div className="text-slate-400">Aug 15-20</div>
                </div>
                
                <div className="text-center group/item">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover/item:scale-110 transition-transform duration-300">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-xl font-bold mb-2">Results</div>
                  <div className="text-slate-400">Aug 25</div>
                </div>
                
              </div>
            </Card>
          </div>

          {/* Platform Feature with Spark */}
          <div>
            <Card variant="glass" className="h-full p-12 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 group hover:border-orange-500/40 transition-all duration-500">
              <div className="text-center h-full flex flex-col justify-center transform transition-all duration-500 group-hover:translate-y-[-8px]">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                
                <div className="mb-6">
                  <div className="text-2xl font-bold mb-3">Secure Platform</div>
                  <div className="text-slate-400 text-base leading-relaxed">
                    Enterprise-grade security for your innovations
                  </div>
                </div>
              </div>
            </Card>
          </div>

        </div>

        {/* Enhanced Call to Action */}
        <div className="mt-20">
          <Card variant="glass" className="p-20 bg-gradient-to-r from-red-500/5 to-orange-500/5 border-red-500/10 group hover:border-red-500/20 transition-all duration-500">
            <div className="text-center max-w-4xl mx-auto transform transition-all duration-500 group-hover:translate-y-[-8px]">
              <h2 className="text-5xl font-bold mb-8">
                Ready to 
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"> Innovate</span>?
              </h2>
              <p className="text-2xl text-slate-300 mb-12 leading-relaxed">
                Join thousands of developers building tomorrow's solutions
              </p>
              <div className="flex gap-8 justify-center">
                <LoginButton />
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 rounded-xl border-red-500/20 hover:border-red-500/40 hover:scale-105 transition-all duration-300">
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
