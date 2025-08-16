import { ProjectIdeaForm } from '@/components/dashboard/ProjectIdeaForm'
import { ProjectResults } from '@/components/dashboard/ProjectResults'
import { RulesAndRegulations } from '@/components/RulesAndRegulations'
import { TeamCreationForm } from '@/components/dashboard/TeamCreationForm'
import { TeamOverview } from '@/components/dashboard/TeamOverview'
import { DashboardBackground } from '@/components/dashboard/DashboardBackground'
import { Card } from '@/components/ui/Card'
import TeamMemberView from '@/components/dashboard/TeamMemberView'
import { User } from '@/generated/prisma'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { areResultsPublished } from '@/lib/results'
import { Code, FileCode, GitBranch, Users, ChevronRight, Zap, Award, Star } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// Add keyframe animations for enhanced visual effects
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
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
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
          <div className="container-custom max-w-2xl relative">
            <div className="mb-10">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Welcome, {session.user.name}
              </h1>
              <p className="text-slate-400">
                Our database is currently unreachable. Please check your DATABASE_URL or try again shortly.
              </p>
            </div>
            <Card variant="glass" className="p-6 bg-gradient-to-br from-amber-500/10 to-red-500/10 border-amber-500/20">
              <h2 className="text-xl font-semibold mb-2">Service temporarily unavailable</h2>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
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
          <div className="container-custom max-w-2xl relative">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl -z-10"></div>
            <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"></div>
            
            {/* Floating icons */}
            <div className="absolute top-0 right-0 text-pink-500/20 animate-float-slow">
              <Users size={80} />
            </div>
            <div className="absolute bottom-10 left-0 text-cyan-500/20 animate-float">
              <Star size={60} />
            </div>
            
            <div className="mb-12">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-white/10 backdrop-saturate">
                Get Started
              </span>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-float">
                Welcome, {session.user.name}!
              </h1>
              <p className="text-slate-400 text-xl animate-pulse-slow max-w-lg">
                Let's build your dream team and create something amazing together.
              </p>
            </div>
            
            <div className="glassmorphism rounded-2xl p-1">
              <TeamCreationForm />
            </div>
            
            {/* Tips section */}
            <div className="mt-12 p-6 rounded-2xl glassmorphism">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-cyan-400" />
                <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Tips for Success
                </span>
              </h3>
              <ul className="space-y-3">
                {[
                  "Choose team members with complementary skills",
                  "Consider adding both technical and design focused members",
                  "Review the hackathon timeline before starting"
                ].map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <ChevronRight className="w-4 h-4 mt-1 mr-2 text-pink-400" />
                    <span className="text-slate-300 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  const team = user?.leadingTeam || user?.memberOfTeam
  const isLeader = !!user?.leadingTeam

  // For users with teams or admins, show the dashboard
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />
      <DashboardBackground />
      <div className="min-h-screen text-white py-20 overflow-hidden">
        <div className="container-custom relative">
          {/* Decorative elements */}
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl -z-10"></div>
          <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl -z-10"></div>
          
          {/* Header */}
          <div className="mb-12 relative">
            {/* Status badge */}
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 backdrop-saturate">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <span className="text-xs text-green-300 font-medium">
                {['ADMIN', 'SUPERADMIN'].includes(user?.role || '') ? 'Admin Access' : 'Online'}
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-float">
              Welcome back, {session.user.name}
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl animate-pulse-slow">
              {['ADMIN', 'SUPERADMIN'].includes(user?.role || '') 
                ? 'Manage teams and monitor hackathon progress with your admin dashboard'
                : 'Track your hackathon progress, manage your team, and create something amazing'}
            </p>
            
            {/* Quick actions */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500/80 to-purple-500/80 text-white text-sm font-medium flex items-center hover:translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                <Zap className="w-4 h-4 mr-2" />
                Quick Start Guide
              </button>
              <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center hover:translate-y-1 transition-all duration-300 hover:bg-white/10">
                <Award className="w-4 h-4 mr-2" />
                Hackathon Rules
              </button>
            </div>
          </div>

        {/* Team Overview */}
        {team && (
          <div className="mb-12">
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

        {/* Rules and Regulations Section */}
        <div className="mb-12">
          <RulesAndRegulations />
        </div>

        {/* Project Results - Show evaluation results if project is submitted */}
        {team?.projectIdea && (
          <ProjectResults 
            projectIdea={team.projectIdea} 
            resultsPublished={resultsPublished}
          />
        )}

        {/* Project Idea Form */}
        {team && (
          <div className="mb-12">
            <ProjectIdeaForm 
              teamId={team.id}
              existingIdea={team.projectIdea || undefined}
            />
          </div>
        )}

        {/* Project Status Card */}
        {team?.projectIdea && (
          <Card variant="glass" className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Project Status</h3>
                <p className="text-slate-400">
                  {team.projectIdea.isDraft 
                    ? "Your project idea is saved as a draft and can be edited by team members." 
                    : "Your project idea has been submitted and cannot be edited."
                  }
                </p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                team.projectIdea.isDraft
                  ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30'
                  : 'bg-green-900/30 text-green-300 border border-green-500/30'
              }`}>
                {team.projectIdea.isDraft ? 'Draft' : 'Submitted'}
              </div>
            </div>
            {team.projectIdea.isDraft && (
              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-300">
                  💡 <strong>Tip:</strong> All team members can view and edit the draft. Once you submit the project, no further changes will be allowed.
                </p>
              </div>
            )}
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: 'Team Members',
              value: team?.numberOfMembers.toString() || '0',
              subtitle: 'Active participants',
              icon: Users,
              color: 'from-blue-500/20 to-blue-600/20',
              border: 'border-blue-500/20',
              iconColor: 'from-blue-400 to-blue-600',
              glow: 'glow-blue'
            },
            {
              title: 'Code Commits',
              value: '156',
              subtitle: 'Last 7 days',
              icon: GitBranch,
              color: 'from-purple-500/20 to-purple-600/20',
              border: 'border-purple-500/20',
              iconColor: 'from-purple-400 to-purple-600',
              glow: ''
            },
            {
              title: 'Files Changed',
              value: '38',
              subtitle: 'Across 4 repos',
              icon: FileCode,
              color: 'from-emerald-500/20 to-emerald-600/20',
              border: 'border-emerald-500/20',
              iconColor: 'from-emerald-400 to-emerald-600',
              glow: ''
            },
            {
              title: 'Lines of Code',
              value: '2.4k',
              subtitle: 'Net additions',
              icon: Code,
              color: 'from-orange-500/20 to-orange-600/20',
              border: 'border-orange-500/20',
              iconColor: 'from-orange-400 to-orange-600',
              glow: ''
            }
          ].map((stat, index) => (
            <Card
              key={index}
              variant="glass"
              className={`p-6 bg-gradient-to-br backdrop-saturate border ${stat.border} transition-all duration-500 hover:scale-105 hover:${stat.glow} ${stat.color}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.iconColor} flex items-center justify-center p-[2px]`}>
                  <div className="w-full h-full rounded-xl bg-black/40 backdrop-blur-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white animate-float" />
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 opacity-70">{stat.title}</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.subtitle}</div>
                </div>
              </div>
              
              {/* Animated bar at the bottom */}
              <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.iconColor} rounded-full animate-pulse-slow`} style={{ width: '60%' }}></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Status */}
          <Card variant="glass" className="lg:col-span-2 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-saturate transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Project Status</h2>
              <div className="flex items-center space-x-1 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-xs text-blue-300">Live Updates</span>
              </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white">Overall Completion</span>
                </div>
                <span className="text-sm font-bold text-blue-300">66%</span>
              </div>
              <div className="h-3 bg-black/30 backdrop-blur-md rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full animate-pulse-slow"
                  style={{ width: '66%' }}
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
                <div key={index} className="transition-all duration-300 hover:translate-x-1">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">{task.icon}</span>
                      <span className="text-slate-300">{task.name}</span>
                    </div>
                    <span className="text-slate-400 bg-black/30 px-2 py-0.5 rounded-md text-xs font-medium">{task.progress}%</span>
                  </div>
                  <div className="h-2 bg-black/30 backdrop-blur-md rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full bg-gradient-to-r ${task.color} rounded-full animate-pulse-slow`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Team Activity */}
          <Card variant="glass" className="p-8 bg-gradient-to-br from-slate-500/10 to-slate-600/10 border-slate-500/20 backdrop-saturate transition-all duration-500 hover:shadow-lg hover:shadow-slate-500/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">Team Activity</h2>
              <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">View all</button>
            </div>
            
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/5 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {['S', 'M', 'A', 'J'].map((initial, i) => (
                    <div key={i} 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium p-[2px] bg-gradient-to-br from-pink-500 to-cyan-500"
                      style={{ zIndex: 4 - i }}>
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        {initial}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center bg-white/5 rounded-full px-3 py-1">
                  <span className="text-xs text-slate-300">4 active members</span>
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
                  icon: '🚀'
                },
                { 
                  user: 'Mike', 
                  action: 'updated README', 
                  time: '4h ago',
                  detail: 'Documentation changes',
                  icon: '📝'
                },
                { 
                  user: 'Anna', 
                  action: 'merged PR #42', 
                  time: '6h ago',
                  detail: 'Feature: User Authentication',
                  icon: '🔄'
                },
                { 
                  user: 'John', 
                  action: 'deployed to staging', 
                  time: '8h ago',
                  detail: 'v0.8.2-beta',
                  icon: '🚢'
                }
              ].map((activity, index) => (
                <div key={index} 
                  className="flex items-center gap-4 p-3 transition-all duration-300 hover:translate-x-1 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center text-sm font-medium p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      {activity.user[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium bg-gradient-to-r from-pink-300 to-cyan-300 bg-clip-text text-transparent">{activity.user}</span>
                        <span className="text-slate-400"> {activity.action}</span>
                      </div>
                      <span className="text-xs bg-black/30 px-2 py-1 rounded-md text-slate-400">{activity.time}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="mr-1">{activity.icon}</span>
                      <span className="text-xs text-slate-500">{activity.detail}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Additional Section: Upcoming Deadlines */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Upcoming Deadlines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Project Idea Submission',
                date: 'Aug 20, 2025',
                timeLeft: '4 days left',
                status: 'In Progress',
                statusColor: 'bg-amber-400'
              },
              {
                title: 'Mid-Point Check-In',
                date: 'Aug 25, 2025',
                timeLeft: '9 days left',
                status: 'Upcoming',
                statusColor: 'bg-cyan-400'
              },
              {
                title: 'Final Submission',
                date: 'Sep 10, 2025',
                timeLeft: '25 days left',
                status: 'Upcoming',
                statusColor: 'bg-cyan-400'
              }
            ].map((deadline, index) => (
              <div key={index} className="bg-black/20 border border-white/10 rounded-xl p-4 backdrop-saturate hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-white">{deadline.title}</div>
                  <div className={`w-2 h-2 rounded-full ${deadline.statusColor}`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">{deadline.date}</div>
                  <div className="text-xs font-medium text-pink-300">{deadline.timeLeft}</div>
                </div>
                <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full" 
                    style={{ width: deadline.status === 'In Progress' ? '65%' : '0%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Additional Section: Quick Links */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Documentation', icon: '📄' },
              { name: 'Resources', icon: '📚' },
              { name: 'Support', icon: '🛟' },
              { name: 'Community', icon: '👥' }
            ].map((link, index) => (
              <button key={index} className="flex items-center gap-3 p-4 bg-black/20 border border-white/10 rounded-xl backdrop-saturate hover:bg-white/5 transition-all duration-300">
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm font-medium text-white">{link.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Footer with credits */}
        <div className="pt-10 pb-6 border-t border-white/5 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © 2025 CodeNChip Hackathon Platform. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-slate-600">Made with</span>
              <span className="text-xs bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">❤️</span>
              <span className="text-xs text-slate-600">by the CodeNChip Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}