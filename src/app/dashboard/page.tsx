import { ProjectIdeaForm } from '@/components/dashboard/ProjectIdeaForm'
import { ProjectResults } from '@/components/dashboard/ProjectResults'
// import { RulesAndRegulations } from '@/components/RulesAndRegulations'
import { TeamCreationForm } from '@/components/dashboard/TeamCreationForm'

import { DashboardBackground } from '@/components/dashboard/DashboardBackground'
import { Card } from '@/components/ui/Card'
import TeamMemberView from '@/components/dashboard/TeamMemberView'
import { User } from '@/generated/prisma'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { areResultsPublished } from '@/lib/results'
import { 
  Users,
  Zap,
  Award,
  Star,
  TrendingUp,
  Clock,
  Lightbulb,
  Rocket,
  Target,
  Calendar,
  Edit,
  CheckCircle,
  Heart
} from 'lucide-react'
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
    gap: 1.5rem;
    animation: slideInUp 0.8s ease-out forwards;
  }

  .dashboard-section {
    animation: fadeInScale 0.6s ease-out forwards;
    animation-fill-mode: both;
  }

  /* Enhanced mobile optimizations */
  @media (max-width: 768px) {
    .dashboard-grid {
      gap: 1rem;
    }
    
    .interactive-card {
      transform: none !important;
    }
    
    .interactive-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
    }
    
    .glassmorphism {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    
    .animate-float {
      animation: none;
    }
    
    .animate-float-slow {
      animation: none;
    }
    
    /* Better text scaling on mobile */
    .text-responsive-xl {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
    
    .text-responsive-2xl {
      font-size: 1.5rem;
      line-height: 2rem;
    }
    
    .text-responsive-3xl {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
  
  @media (max-width: 640px) {
    .dashboard-grid {
      gap: 0.75rem;
    }
    
    .interactive-card {
      transform: none !important;
    }
    
    .interactive-card:hover {
      transform: none !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    }
    
    .glassmorphism {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Smaller text on very small screens */
    .text-responsive-xl {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
    
    .text-responsive-2xl {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
    
    .text-responsive-3xl {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
  
  @media (max-width: 480px) {
    .dashboard-grid {
      gap: 0.5rem;
    }
    
    /* Ensure no transforms on very small screens */
    .interactive-card,
    .interactive-card:hover {
      transform: none !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
    }
    
    /* Even smaller text for tiny screens */
    .text-responsive-xl {
      font-size: 1rem;
      line-height: 1.5rem;
    }
    
    .text-responsive-2xl {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
    
    .text-responsive-3xl {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
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
        <div className="min-h-screen text-white py-4 sm:py-8 lg:py-20 overflow-hidden">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 relative">
            <div className="mb-6 sm:mb-8 lg:mb-10 animate-slide-up">
              <h1 className="text-responsive-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                Welcome, {session.user.name}
              </h1>
              <p className="text-slate-400 text-sm sm:text-lg lg:text-xl leading-relaxed">
                Our database is currently unreachable. Please check your DATABASE_URL or try again shortly.
              </p>
            </div>
            <Card variant="glass" className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-amber-500/10 to-red-500/10 border-amber-500/20 interactive-card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-2xl bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-responsive-xl sm:text-xl lg:text-2xl font-semibold mb-2 text-white">Service Temporarily Unavailable</h2>
                  <p className="text-amber-200 text-sm sm:text-base">Database connection issue detected</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-base">
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
        <div className="min-h-screen text-white py-4 sm:py-8 lg:py-20 overflow-hidden">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 relative">
            {/* Decorative elements - Hidden on mobile for performance */}
            <div className="hidden md:block absolute -top-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl -z-10"></div>
            <div className="hidden md:block absolute -bottom-32 -left-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"></div>
            
            {/* Floating icons - Hidden on mobile */}
            <div className="hidden lg:block absolute top-0 right-0 text-pink-500/20 animate-float-slow">
              <Users size={80} />
            </div>
            <div className="hidden lg:block absolute bottom-10 left-0 text-cyan-500/20 animate-float">
              <Star size={60} />
            </div>
            
            <div className="mb-6 sm:mb-8 lg:mb-12 animate-slide-up">
              <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 mb-3 sm:mb-4 lg:mb-6 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-white/20 backdrop-blur-sm">
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1.5 sm:mr-2 text-cyan-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Get Started</span>
              </div>
              <h1 className="text-responsive-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-float leading-tight">
                Welcome, {session.user.name}!
              </h1>
              <p className="text-slate-400 text-sm sm:text-lg md:text-xl lg:text-2xl animate-pulse-slow max-w-2xl leading-relaxed">
                Let's build your dream team and create something amazing together.
              </p>
            </div>
            
            <div className="glassmorphism rounded-lg sm:rounded-2xl lg:rounded-3xl p-2 mb-6 sm:mb-8 lg:mb-12 animate-fade-scale" style={{animationDelay: '0.3s'}}>
              <TeamCreationForm />
            </div>
            
            {/* Enhanced tips section */}
            <div className="glassmorphism rounded-lg sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 animate-fade-scale" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h3 className="text-responsive-xl sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Tips for Success
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {[
                  { tip: "Choose team members with complementary skills", icon: Users },
                  { tip: "Consider adding both technical and design focused members", icon: Target },
                  { tip: "Review the hackathon timeline before starting", icon: Calendar }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-pink-400 flex-shrink-0" />
                    <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item.tip}</span>
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
      <div className="min-h-screen text-white py-3 sm:py-6 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative">
          {/* Decorative elements - Hidden on mobile for performance */}
          {/* Hide decorative blobs on mobile for performance and clarity */}
          <div className="hidden md:block absolute -top-40 -right-40 w-40 h-40 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl -z-10"></div>
          <div className="hidden md:block absolute top-1/3 -left-40 w-40 h-40 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl -z-10"></div>
          <div className="hidden md:block absolute bottom-20 right-20 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl -z-10"></div>
          
          {/* Enhanced Header */}
          <div className="mb-6 sm:mb-10 lg:mb-16 relative animate-slide-up">
            {/* Status badge */}
            <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 mb-3 sm:mb-4 lg:mb-6 rounded-full bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 backdrop-saturate">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-green-400 mr-1.5 sm:mr-2 lg:mr-3 animate-pulse flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-green-300 font-medium whitespace-nowrap">
                {['ADMIN', 'SUPERADMIN'].includes(user?.role || '') ? 'Admin Access' : 'Online'}
              </span>
            </div>
            
            <h1 className="text-responsive-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 lg:mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-float leading-tight break-words">
              Welcome back, {session.user.name}
            </h1>
            <p className="text-slate-400 text-xs sm:text-lg md:text-xl lg:text-2xl max-w-3xl animate-pulse-slow leading-relaxed">
              {['ADMIN', 'SUPERADMIN'].includes(user?.role || '') 
                ? 'Manage teams and monitor hackathon progress with your admin dashboard'
                : 'Track your hackathon progress, manage your team, and create something amazing'}
            </p>
            
            {/* Enhanced quick actions */}
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-6 lg:mt-8">
              <button className="group px-4 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-pink-500/80 to-purple-500/80 text-white font-medium flex items-center hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 text-xs sm:text-sm lg:text-base min-w-[44px] min-h-[44px]">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1.5 sm:mr-2 group-hover:rotate-12 transition-transform flex-shrink-0" />
                <span className="whitespace-nowrap">Quick Start</span>
              </button>
              <button className="group px-4 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg sm:rounded-xl glassmorphism text-white font-medium flex items-center hover:-translate-y-1 transition-all duration-300 hover:bg-white/10 text-xs sm:text-sm lg:text-base min-w-[44px] min-h-[44px]">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="whitespace-nowrap">Rules</span>
              </button>
              <button className="group px-4 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-lg sm:rounded-xl glassmorphism text-white font-medium flex items-center hover:-translate-y-1 transition-all duration-300 hover:bg-white/10 text-xs sm:text-sm lg:text-base min-w-[44px] min-h-[44px]">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="whitespace-nowrap">Leaderboard</span>
              </button>
            </div>
          </div>
        
        {/* Team Overview */}
        {team && (
          <div className="mb-6 sm:mb-12 lg:mb-16 dashboard-section" style={{animationDelay: '0.4s'}}>
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

        {/* Project Results - Show evaluation results if project is submitted */}
        {team?.projectIdea && (
          <div className="mb-6 sm:mb-12 lg:mb-16 dashboard-section" style={{animationDelay: '1.2s'}}>
            <ProjectResults 
              projectIdea={team.projectIdea} 
              resultsPublished={resultsPublished}
            />
          </div>
        )}

        {/* Project Idea Form */}
        {team && (
          <div className="mb-6 sm:mb-12 lg:mb-16 dashboard-section" style={{animationDelay: '1.4s'}}>
            <ProjectIdeaForm 
              teamId={team.id}
              existingIdea={team.projectIdea || undefined}
            />
          </div>
        )}

        {/* Enhanced Project Status Card */}
        {team?.projectIdea && (
          <Card variant="glass" className="p-3 sm:p-6 lg:p-8 glassmorphism border-blue-500/30 mb-6 sm:mb-12 lg:mb-16 interactive-card dashboard-section" style={{animationDelay: '1.6s'}}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-2xl flex items-center justify-center ${
                  team.projectIdea.isDraft 
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                }`}>
                  {team.projectIdea.isDraft ? <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" /> : <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />}
                </div>
                <div>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2 text-white">Project Status</h3>
                  <p className="text-slate-400 text-xs sm:text-base">
                    {team.projectIdea.isDraft 
                      ? "Your project idea is saved as a draft and can be edited by team members." 
                      : "Your project idea has been submitted and cannot be edited."
                    }
                  </p>
                </div>
              </div>
              <div className={`px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-xs sm:text-base lg:text-lg font-semibold border-2 flex items-center gap-2 ${
                team.projectIdea.isDraft
                  ? 'bg-yellow-900/30 text-yellow-300 border-yellow-500/50'
                  : 'bg-green-900/30 text-green-300 border-green-500/50'
              }`}>
                {team.projectIdea.isDraft ? (
                  <>
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Draft</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Submitted</span>
                  </>
                )}
              </div>
            </div>
            {team.projectIdea.isDraft && (
              <div className="mt-3 sm:mt-6 p-2 sm:p-4 glassmorphism border border-blue-500/30 rounded-lg sm:rounded-xl">
                <p className="text-blue-300 flex items-start sm:items-center gap-2 text-xs sm:text-base">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span><strong>Tip:</strong> All team members can view and edit the draft. Once you submit the project, no further changes will be allowed.</span>
                </p>
              </div>
            )}
          </Card>
        )}
        
        {/* Enhanced Footer */}
        <div className="pt-6 sm:pt-10 pb-4 sm:pb-8 border-t border-white/10 mt-6 sm:mt-12 lg:mt-16 dashboard-section" style={{animationDelay: '2.2s'}}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-500 mb-1 text-xs sm:text-base">
                © 2025 HASHITUP Hackathon Platform. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-1 sm:space-x-4">
                <span className="text-xs sm:text-sm text-slate-600">Made with</span>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 fill-current" />
                <span className="text-xs sm:text-sm text-slate-600">by the HASHITUP Team</span>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-4 mt-2 md:mt-0">
              <button className="glassmorphism px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-white/20 text-xs sm:text-sm text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300 min-w-[44px] min-h-[44px]">
                Privacy Policy
              </button>
              <button className="glassmorphism px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-white/20 text-xs sm:text-sm text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300 min-w-[44px] min-h-[44px]">
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