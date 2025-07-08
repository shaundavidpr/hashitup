import { ProjectIdeaForm } from '@/components/dashboard/ProjectIdeaForm'
import { TeamCreationForm } from '@/components/dashboard/TeamCreationForm'
import { TeamOverview } from '@/components/dashboard/TeamOverview'
import { Card } from '@/components/ui/Card'
import { User } from '@/generated/prisma'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { Code, FileCode, GitBranch, Users } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

type UserWithTeam = User & {
  leadingTeam: {
    id: string
    name: string
    collegeName: string
    university: string
    address: string
    state: string
    numberOfMembers: number
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
    } | null
  } | null
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  // Get user with team information
  const user = await db.user.findUnique({
    where: { email: session.user.email! },
    include: {
      leadingTeam: {
        include: {
          members: true,
          projectIdea: true
        }
      },
      memberOfTeam: {
        include: {
          members: true,
          projectIdea: true
        }
      }
    }
  }) as UserWithTeam | null

  // If user has no team and is not an admin/superadmin, show team creation form
  if (!user?.leadingTeam && !user?.memberOfTeam && !['ADMIN', 'SUPERADMIN'].includes(user?.role || '')) {
    return (
      <div className="min-h-screen bg-slate-950 text-white py-20">
        <div className="container-custom max-w-2xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Welcome, {session.user.name}!
            </h1>
            <p className="text-slate-400 text-lg">
              Let's get started by creating your team
            </p>
          </div>
          <TeamCreationForm />
        </div>
      </div>
    )
  }

  const team = user?.leadingTeam || user?.memberOfTeam
  const isLeader = !!user?.leadingTeam

  // For users with teams or admins, show the dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {session.user.name}
          </h1>
          <p className="text-slate-400 text-lg">
            {['ADMIN', 'SUPERADMIN'].includes(user?.role || '') 
              ? 'Manage teams and monitor progress'
              : 'Track your hackathon progress and manage your team'}
          </p>
        </div>

        {/* Team Overview */}
        {team && (
          <div className="mb-12">
            <TeamOverview 
              team={team} 
              isLeader={isLeader} 
            />
          </div>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: 'Team Members',
              value: team?.numberOfMembers.toString() || '0',
              icon: Users,
              color: 'from-blue-500/20 to-blue-600/20 border-blue-500/20',
              iconColor: 'from-blue-400 to-blue-600'
            },
            {
              title: 'Code Commits',
              value: '156',
              icon: GitBranch,
              color: 'from-purple-500/20 to-purple-600/20 border-purple-500/20',
              iconColor: 'from-purple-400 to-purple-600'
            },
            {
              title: 'Files Changed',
              value: '38',
              icon: FileCode,
              color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/20',
              iconColor: 'from-emerald-400 to-emerald-600'
            },
            {
              title: 'Lines of Code',
              value: '2.4k',
              icon: Code,
              color: 'from-orange-500/20 to-orange-600/20 border-orange-500/20',
              iconColor: 'from-orange-400 to-orange-600'
            }
          ].map((stat, index) => (
            <Card
              key={index}
              variant="glass"
              className={`p-6 bg-gradient-to-br ${stat.color}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.iconColor} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">{stat.title}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Status */}
          <Card variant="glass" className="lg:col-span-2 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <h2 className="text-2xl font-bold mb-6">Project Status</h2>
            <div className="space-y-6">
              {[
                { name: 'Frontend Development', progress: 75 },
                { name: 'Backend API', progress: 60 },
                { name: 'Database Design', progress: 90 },
                { name: 'Testing', progress: 40 }
              ].map((task, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">{task.name}</span>
                    <span className="text-slate-400">{task.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Team Activity */}
          <Card variant="glass" className="p-8 bg-gradient-to-br from-slate-500/10 to-slate-600/10 border-slate-500/20">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[
                { user: 'Sarah', action: 'pushed to main', time: '2h ago' },
                { user: 'Mike', action: 'updated README', time: '4h ago' },
                { user: 'Anna', action: 'merged PR #42', time: '6h ago' },
                { user: 'John', action: 'deployed to staging', time: '8h ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-sm font-medium">
                    {activity.user[0]}
                  </div>
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-slate-200">{activity.user}</span>
                      <span className="text-slate-400"> {activity.action}</span>
                    </div>
                    <div className="text-xs text-slate-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 