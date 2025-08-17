import { ProjectIdeaForm } from '@/components/dashboard/ProjectIdeaForm'
import { ProjectResults } from '@/components/dashboard/ProjectResults'
import { RulesAndRegulations } from '@/components/RulesAndRegulations'
import { TeamCreationForm } from '@/components/dashboard/TeamCreationForm'

import { DashboardBackground } from '@/components/dashboard/DashboardBackground'
import { Card } from '@/components/ui/Card'
import TeamMemberView from '@/components/dashboard/TeamMemberView'
import { User } from '@/generated/prisma'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { areResultsPublished } from '@/lib/results'
import { Code, FileCode, GitBranch, Users, Zap, Award, Star, TrendingUp, Clock, Target, Lightbulb, Rocket, Calendar } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// Enhanced keyframe animations for dashboard
const styleTag = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes floatSlow {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  
  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 0.8; }
    100% { opacity: 0.5; }
  }
  
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes shimmer {
    0% { background-position: -468px 0; }
    100% { background-position: 468px 0; }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes slideInUp {
    0% { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes fadeInScale {
    0% { 
      opacity: 0; 
      transform: scale(0.95); 
    }
    100% { 
      opacity: 1; 
      transform: scale(1); 
    }
  }

  @keyframes progressBar {
    0% { width: 0%; }
    100% { width: var(--progress); }
  }
  
  .gradient-border {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
  }
  
  .gradient-border::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 1.1rem;
    background: linear-gradient(45deg, #ec4899, #06b6d4, #ec4899);
    background-size: 200% 200%;
    animation: gradientFlow 3s linear infinite;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .gradient-border:hover::before {
    opacity: 1;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: floatSlow 8s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 4s ease-in-out infinite;
  }
  
  .animate-shimmer {
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .animate-spin-slow {
    animation: spin 8s linear infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce 2s ease-in-out infinite;
  }

  .animate-slide-up {
    animation: slideInUp 0.6s ease-out forwards;
  }

  .animate-fade-scale {
    animation: fadeInScale 0.5s ease-out forwards;
  }

  .animate-progress {
    animation: progressBar 1.5s ease-out forwards;
  }
  
  .backdrop-saturate {
    backdrop-filter: saturate(180%) blur(14px);
  }
  
  .glow {
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
  }
  
  .glow-cyan {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
  }
  
  .glow-blue {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
  }
  
  .glassmorphism {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }

  .interactive-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }

  .interactive-card:hover {
    transform: translateY(-8px) rotateX(2deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .dashboard-grid {
    display: grid;
    gap: 2rem;
    animation: slideInUp 0.8s ease-out forwards;
  }

  .dashboard-section {
    animation: fadeInScale 0.6s ease-out forwards;
    animation-fill-mode: both;
  }
`;

type UserWithTeam = User & {
  leadingTeam: {
    id: string
    name: string
    collegeName: string
    university: string
    address: string
    state: string
    numberOfMembers: number
    createdAt: Date
    leader: {
      id: string
      name: string | null
      email: string | null
      phone: string | null
    }
    members: {
      id: string
      name: string | null
      email: string | null
      phone: string | null
    }[]
    projectIdea: {
      id: string
      title: string
      description: string
      techStack: string
      problemStatement: string
      solution: string
      status: string
      isDraft: boolean
    } | null
  } | null
  memberOfTeam: {
    id: string
    name: string
    collegeName: string
    university: string
    address: string
    state: string
    numberOfMembers: number
    createdAt: Date
    leader: {
      id: string
      name: string | null
      email: string | null
      phone: string | null
    }
    members: {
      id: string
      name: string | null
      email: string | null
      phone: string | null
    }[]
    projectIdea: {
      id: string
      title: string
      description: string
      techStack: string
      problemStatement: string
      solution: string
      status: string
      isDraft: boolean
    } | null
  } | null
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  // Get user with team information
  let user: UserWithTeam | null = null
  let dbUnavailable = false
  try {
    user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        leadingTeam: {
          include: {
            members: true,
            projectIdea: {
              select: {
                id: true,
                title: true,
                description: true,
                techStack: true,
                problemStatement: true,
                solution: true,
                status: true,
                isDraft: true
              }
            },
            leader: true
          }
        },
        memberOfTeam: {
          include: {
            members: true,
            projectIdea: {
              select: {
                id: true,
                title: true,
                description: true,
                techStack: true,
                problemStatement: true,
                solution: true,
                status: true,
                isDraft: true
              }
            },
            leader: true
          }
        }
      }
    }) as UserWithTeam | null
  } catch (err) {
    console.error('Database unavailable:', err)
    dbUnavailable = true
  }

  // Check if results have been published
  const resultsPublished = await areResultsPublished()

  // If DB is unavailable, render a graceful fallback
  if (dbUnavailable) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: styleTag }} />
        <DashboardBackground />
        <div className="min-h-screen text-white py-20 overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 relative">
            <div className="mb-10 animate-slide-up">
              <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Welcome, {session.user.name}
              </h1>
              <p className="text-slate-400 text-xl">
                Our database is currently unreachable. Please check your DATABASE_URL or try again shortly.
              </p>
            </div>
            <Card variant="glass" className="p-8 bg-gradient-to-br from-amber-500/10 to-red-500/10 border-amber-500/20 interactive-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-white">Service Temporarily Unavailable</h2>
                  <p className="text-amber-200">Database connection issue detected</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Ensure your Postgres server is running and accessible.</li>
                <li>Verify DATABASE_URL (and DIRECT_URL) in your environment.</li>
                <li>If using a remote DB, confirm network access from this machine.</li>
              </ul>
            </Card>
          </div>
        </div>
      </>
    )
  }

  // If user has no team and is not an admin/superadmin, show team creation form
  if (!user?.leadingTeam && !user?.memberOfTeam && !['ADMIN', 'SUPERADMIN'].includes(user?.role || '')) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: styleTag }} />
        <DashboardBackground />
        <div className="min-h-screen text-white py-20 overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 relative">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl -z-10"></div>
            <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"></div>
            
            {/* Floating icons */}
            <div className="absolute top-0 right-0 text-pink-500/20 animate-float-slow">
              <Users size={80} />
            </div>
            <div className="absolute bottom-10 left-0 text-cyan-500/20 animate-float">
              <Star size={60} />
            </div>
            
            <div className="mb-12 animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-white/20 backdrop-blur-sm">
                <Rocket className="w-5 h-5 mr-2 text-cyan-400" />
                <span className="text-sm font-medium">Get Started</span>
              </div>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-float">
                Welcome, {session.user.name}!
              </h1>
              <p className="text-slate-400 text-2xl animate-pulse-slow max-w-2xl">
                Let's build your dream team and create something amazing together.
              </p>
            </div>
            
            <div className="glassmorphism rounded-3xl p-2 mb-12 animate-fade-scale" style={{animationDelay: '0.3s'}}>
              <TeamCreationForm />
            </div>
            
            {/* Enhanced tips section */}
            <div className="glassmorphism rounded-3xl p-8 animate-fade-scale" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Tips for Success
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { tip: "Choose team members with complementary skills", icon: Users },
                  { tip: "Consider adding both technical and design focused members", icon: Target },
                  { tip: "Review the hackathon timeline before starting", icon: Calendar }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <item.icon className="w-5 h-5 mt-1 text-pink-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item.tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const team = user?.leadingTeam || user?.memberOfTeam
  const isLeader = !!user?.leadingTeam

  // For users with teams or admins, show the enhanced dashboard
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />
      <DashboardBackground />
      <div className="min-h-screen text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Decorative elements */}
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl -z-10"></div>
          <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl -z-10"></div>
          
          {/* Enhanced Header */}
          <div className="mb-16 relative animate-slide-up">
            {/* Status badge */}
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 backdrop-saturate">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-3 animate-pulse"></div>
              <span className="text-sm text-green-300 font-medium">
                {['ADMIN', 'SUPERADMIN'].includes(user?.role || '') ? 'Admin Access' : 'Online'}
              </span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-float">
              Welcome back, {session.user.name}
            </h1>
            <p className="text-slate-400 text-2xl max-w-3xl animate-pulse-slow">
              {['ADMIN', 'SUPERADMIN'].includes(user?.role || '') 
                ? 'Manage teams and monitor hackathon progress with your admin dashboard'
                : 'Track your hackathon progress, manage your team, and create something amazing'}
            </p>
            
            {/* Enhanced quick actions */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="group px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500/80 to-purple-500/80 text-white font-medium flex items-center hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30">
                <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Quick Start Guide
              </button>
              <button className="group px-6 py-3 rounded-xl glassmorphism text-white font-medium flex items-center hover:-translate-y-1 transition-all duration-300 hover:bg-white/10">
                <Award className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Hackathon Rules
              </button>
              <button className="group px-6 py-3 rounded-xl glassmorphism text-white font-medium flex items-center hover:-translate-y-1 transition-all duration-300 hover:bg-white/10">
                <TrendingUp className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Leaderboard
              </button>
            </div>
          </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 dashboard-grid">
          {[
            {
              title: 'Team Members',
              value: team?.numberOfMembers.toString() || '0',
              subtitle: 'Active participants',
              icon: Users,
              color: 'from-blue-500/20 to-blue-600/20',
              border: 'border-blue-500/30',
              iconColor: 'from-blue-400 to-blue-600',
              glow: 'glow-blue',
              progress: 80
            },
            {
              title: 'Code Commits',
              value: '156',
              subtitle: 'Last 7 days',
              icon: GitBranch,
              color: 'from-purple-500/20 to-purple-600/20',
              border: 'border-purple-500/30',
              iconColor: 'from-purple-400 to-purple-600',
              glow: '',
              progress: 65
            },
            {
              title: 'Files Changed',
              value: '38',
              subtitle: 'Across 4 repos',
              icon: FileCode,
              color: 'from-emerald-500/20 to-emerald-600/20',
              border: 'border-emerald-500/30',
              iconColor: 'from-emerald-400 to-emerald-600',
              glow: '',
              progress: 90
            },
            {
              title: 'Lines of Code',
              value: '2.4k',
              subtitle: 'Net additions',
              icon: Code,
              color: 'from-orange-500/20 to-orange-600/20',
              border: 'border-orange-500/30',
              iconColor: 'from-orange-400 to-orange-600',
              glow: '',
              progress: 45
            }
          ].map((stat, index) => (
            <Card
              key={index}
              variant="glass"
              className={`p-6 glassmorphism border ${stat.border} interactive-card dashboard-section ${stat.color}`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.iconColor} flex items-center justify-center p-[2px]`}>
                  <div className="w-full h-full rounded-xl bg-black/40 backdrop-blur-lg flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-white animate-float" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 opacity-70">{stat.title}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.subtitle}</div>
                </div>
              </div>
              
              {/* Enhanced animated progress bar */}
              <div className="h-2 bg-black/30 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.iconColor} rounded-full animate-progress`}
                  style={{ '--progress': `${stat.progress}%` } as React.CSSProperties}
                />
              </div>
              <div className="text-xs text-slate-400 mt-2 text-right">{stat.progress}%</div>
            </Card>
          ))}
        </div>

        {/* Team Overview */}
        {team && (
          <div className="mb-16 dashboard-section" style={{animationDelay: '0.4s'}}>
            <TeamMemberView 
              team={{
                id: team.id,
                name: team.name,
                collegeName: team.collegeName,
                university: team.university,
                address: team.address,
                state: team.state,
                numberOfMembers: team.numberOfMembers,
                createdAt: team.createdAt.toISOString(),
                leader: {
                  name: team.leader.name || 'Unknown',
                  email: team.leader.email || '',
                  phone: team.leader.phone || undefined
                },
                members: team.members.map(member => ({
                  id: member.id,
                  name: member.name || 'Unknown',
                  email: member.email || '',
                  phone: member.phone || undefined
                }))
              }}
              isLeader={isLeader} 
            />
          </div>
        )}

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
          {/* Project Status - Enhanced */}
          <Card variant="glass" className="xl:col-span-2 p-8 glassmorphism border-blue-500/30 interactive-card dashboard-section" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Project Progress</h2>
                  <p className="text-slate-400">Real-time development tracking</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 glassmorphism rounded-full border border-white/20">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-sm text-blue-300 font-medium">Live Updates</span>
              </div>
            </div>
            
            <div className="glassmorphism rounded-2xl p-6 border border-white/10 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white">Overall Completion</span>
                </div>
                <span className="text-lg font-bold text-blue-300">66%</span>
              </div>
              <div className="h-4 bg-black/40 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full animate-progress"
                  style={{ '--progress': '66%' } as React.CSSProperties}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { name: 'Frontend Development', progress: 75, icon: '🎨', color: 'from-pink-500 to-purple-500' },
                { name: 'Backend API', progress: 60, icon: '⚙️', color: 'from-blue-500 to-cyan-500' },
                { name: 'Database Design', progress: 90, icon: '🗄️', color: 'from-cyan-500 to-emerald-500' },
                { name: 'Testing', progress: 40, icon: '🧪', color: 'from-amber-500 to-orange-500' }
              ].map((task, index) => (
                <div key={index} className="group p-4 rounded-xl glassmorphism border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-x-2">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{task.icon}</span>
                      <span className="text-slate-300 font-medium">{task.name}</span>
                    </div>
                    <span className="text-slate-400 bg-black/40 px-3 py-1 rounded-full text-sm font-medium">{task.progress}%</span>
                  </div>
                  <div className="h-3 bg-black/40 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
                    <div 
                      className={`h-full bg-gradient-to-r ${task.color} rounded-full animate-progress`}
                      style={{ '--progress': `${task.progress}%`, animationDelay: `${index * 0.2}s` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Enhanced Team Activity */}
          <Card variant="glass" className="p-8 glassmorphism border-slate-500/30 interactive-card dashboard-section" style={{animationDelay: '0.8s'}}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-slate-400 to-slate-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">Team Activity</h2>
                  <p className="text-slate-400 text-sm">Recent updates</p>
                </div>
              </div>
              <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">View all</button>
            </div>
            
            <div className="glassmorphism rounded-2xl p-4 border border-white/10 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                  {['S', 'M', 'A', 'J'].map((initial, i) => (
                    <div key={i} 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium p-[2px] bg-gradient-to-br from-pink-500 to-cyan-500 ring-2 ring-black"
                      style={{ zIndex: 4 - i }}>
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        {initial}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center glassmorphism rounded-full px-3 py-1 border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                  <span className="text-xs text-slate-300 font-medium">4 active</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  user: 'Sarah', 
                  action: 'pushed to main', 
                  time: '2h ago',
                  detail: '14 new commits',
                  icon: '🚀',
                  color: 'from-pink-500 to-rose-500'
                },
                { 
                  user: 'Mike', 
                  action: 'updated README', 
                  time: '4h ago',
                  detail: 'Documentation changes',
                  icon: '📝',
                  color: 'from-blue-500 to-cyan-500'
                },
                { 
                  user: 'Anna', 
                  action: 'merged PR #42', 
                  time: '6h ago',
                  detail: 'Feature: User Authentication',
                  icon: '🔄',
                  color: 'from-emerald-500 to-green-500'
                },
                { 
                  user: 'John', 
                  action: 'deployed to staging', 
                  time: '8h ago',
                  detail: 'v0.8.2-beta',
                  icon: '🚢',
                  color: 'from-purple-500 to-indigo-500'
                }
              ].map((activity, index) => (
                <div key={index} 
                  className="group flex items-center gap-4 p-4 transition-all duration-300 hover:translate-x-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${activity.color} flex items-center justify-center text-sm font-medium p-[2px]`}>
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      {activity.user[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold bg-gradient-to-r from-pink-300 to-cyan-300 bg-clip-text text-transparent">{activity.user}</span>
                        <span className="text-slate-400"> {activity.action}</span>
                      </div>
                      <span className="text-xs glassmorphism px-2 py-1 rounded-md text-slate-400 border border-white/10">{activity.time}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="mr-2">{activity.icon}</span>
                      <span className="text-xs text-slate-500">{activity.detail}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Rules and Regulations Section */}
        <div className="mb-16 dashboard-section" style={{animationDelay: '1s'}}>
          <RulesAndRegulations />
        </div>

        {/* Project Results - Show evaluation results if project is submitted */}
        {team?.projectIdea && (
          <div className="mb-16 dashboard-section" style={{animationDelay: '1.2s'}}>
            <ProjectResults 
              projectIdea={team.projectIdea} 
              resultsPublished={resultsPublished}
            />
          </div>
        )}

        {/* Project Idea Form */}
        {team && (
          <div className="mb-16 dashboard-section" style={{animationDelay: '1.4s'}}>
            <ProjectIdeaForm 
              teamId={team.id}
              existingIdea={team.projectIdea || undefined}
            />
          </div>
        )}

        {/* Enhanced Project Status Card */}
        {team?.projectIdea && (
          <Card variant="glass" className="p-8 glassmorphism border-blue-500/30 mb-16 interactive-card dashboard-section" style={{animationDelay: '1.6s'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  team.projectIdea.isDraft 
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                }`}>
                  {team.projectIdea.isDraft ? <Clock className="w-8 h-8 text-white" /> : <Award className="w-8 h-8 text-white" />}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">Project Status</h3>
                  <p className="text-slate-400">
                    {team.projectIdea.isDraft 
                      ? "Your project idea is saved as a draft and can be edited by team members." 
                      : "Your project idea has been submitted and cannot be edited."
                    }
                  </p>
                </div>
              </div>
              <div className={`px-6 py-3 rounded-full text-lg font-semibold border-2 ${
                team.projectIdea.isDraft
                  ? 'bg-yellow-900/30 text-yellow-300 border-yellow-500/50'
                  : 'bg-green-900/30 text-green-300 border-green-500/50'
              }`}>
                {team.projectIdea.isDraft ? '📝 Draft' : '✅ Submitted'}
              </div>
            </div>
            {team.projectIdea.isDraft && (
              <div className="mt-6 p-4 glassmorphism border border-blue-500/30 rounded-xl">
                <p className="text-blue-300 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  <strong>Tip:</strong> All team members can view and edit the draft. Once you submit the project, no further changes will be allowed.
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Enhanced Upcoming Deadlines */}
        <div className="mb-16 dashboard-section" style={{animationDelay: '1.8s'}}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-400 to-cyan-400 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Upcoming Deadlines
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Project Idea Submission',
                date: 'Aug 20, 2025',
                timeLeft: '4 days left',
                status: 'In Progress',
                statusColor: 'bg-amber-400',
                progress: 65
              },
              {
                title: 'Mid-Point Check-In',
                date: 'Aug 25, 2025',
                timeLeft: '9 days left',
                status: 'Upcoming',
                statusColor: 'bg-cyan-400',
                progress: 0
              },
              {
                title: 'Final Submission',
                date: 'Sep 10, 2025',
                timeLeft: '25 days left',
                status: 'Upcoming',
                statusColor: 'bg-cyan-400',
                progress: 0
              }
            ].map((deadline, index) => (
              <div key={index} className="glassmorphism border border-white/20 rounded-2xl p-6 interactive-card hover:border-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold text-white">{deadline.title}</div>
                  <div className={`w-4 h-4 rounded-full ${deadline.statusColor} animate-pulse`}></div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-slate-400">{deadline.date}</div>
                  <div className="text-sm font-semibold text-pink-300">{deadline.timeLeft}</div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full animate-progress" 
                    style={{ '--progress': `${deadline.progress}%`, animationDelay: `${index * 0.2}s` } as React.CSSProperties}
                  />
                </div>
                <div className="text-xs text-slate-500">{deadline.progress}% complete</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Quick Links */}
        <div className="mb-16 dashboard-section" style={{animationDelay: '2s'}}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Documentation', icon: '📄', color: 'from-blue-500 to-cyan-500' },
              { name: 'Resources', icon: '📚', color: 'from-emerald-500 to-green-500' },
              { name: 'Support', icon: '🛟', color: 'from-orange-500 to-red-500' },
              { name: 'Community', icon: '👥', color: 'from-purple-500 to-pink-500' }
            ].map((link, index) => (
              <button 
                key={index} 
                className={`group flex items-center gap-4 p-6 glassmorphism border border-white/20 rounded-2xl interactive-card hover:border-white/30 transition-all duration-300 bg-gradient-to-br ${link.color}/10`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                <span className="text-lg font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {link.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Enhanced Footer */}
        <div className="pt-12 pb-8 border-t border-white/10 mt-16 dashboard-section" style={{animationDelay: '2.2s'}}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-500 mb-2">
                © 2025 Hash 2K25 Hackathon Platform. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <span className="text-sm text-slate-600">Made with</span>
                <span className="text-lg bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">❤️</span>
                <span className="text-sm text-slate-600">by the Hash 2K25 Team</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="glassmorphism px-4 py-2 rounded-lg border border-white/20 text-sm text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300">
                Privacy Policy
              </button>
              <button className="glassmorphism px-4 py-2 rounded-lg border border-white/20 text-sm text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}