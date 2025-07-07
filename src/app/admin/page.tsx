import { Card } from '@/components/ui/Card'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { Award, Flag, Target, Users } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// Define Role enum locally
enum Role {
  ADMIN = 'ADMIN',
  LEADER = 'LEADER',
  MEMBER = 'MEMBER'
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== Role.ADMIN) {
    redirect('/dashboard')
  }

  // Get statistics
  const [
    totalTeams,
    totalUsers,
    totalSubmissions,
    selectedSubmissions,
    rejectedSubmissions,
    waitingSubmissions,
  ] = await Promise.all([
    db.team.count(),
    db.user.count({
      where: {
        role: { in: [Role.LEADER, Role.MEMBER] }
      }
    }),
    db.projectSubmission.count(),
    db.projectSubmission.count({
      where: { status: 'SELECTED' }
    }),
    db.projectSubmission.count({
      where: { status: 'REJECTED' }
    }),
    db.projectSubmission.count({
      where: { status: 'WAITING' }
    }),
  ])

  // Get teams with their details
  const teams = await db.team.findMany({
    include: {
      leader: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      members: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      submission: {
        select: {
          id: true,
          projectName: true,
          theme: true,
          status: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Get submissions with team details
  const submissions = await db.projectSubmission.findMany({
    include: {
      team: {
        include: {
          leader: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          members: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const stats = {
    totalTeams,
    totalUsers,
    totalSubmissions,
    selectedSubmissions,
    rejectedSubmissions,
    waitingSubmissions,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-slate-400 text-lg">
            Manage teams, submissions, and platform statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: 'Total Teams',
              value: totalTeams.toString(),
              icon: Users,
              color: 'from-blue-500/20 to-blue-600/20 border-blue-500/20',
              iconColor: 'from-blue-400 to-blue-600'
            },
            {
              title: 'Submissions',
              value: totalSubmissions.toString(),
              icon: Flag,
              color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/20',
              iconColor: 'from-emerald-400 to-emerald-600'
            },
            {
              title: 'Active Projects',
              value: '82',
              icon: Target,
              color: 'from-purple-500/20 to-purple-600/20 border-purple-500/20',
              iconColor: 'from-purple-400 to-purple-600'
            },
            {
              title: 'Finalists',
              value: '12',
              icon: Award,
              color: 'from-amber-500/20 to-amber-600/20 border-amber-500/20',
              iconColor: 'from-amber-400 to-amber-600'
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
          {/* Submission Stats */}
          <Card variant="glass" className="lg:col-span-2 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <h2 className="text-2xl font-bold mb-6">Submission Statistics</h2>
            <div className="space-y-6">
              {[
                { category: 'Web Development', count: selectedSubmissions, total: totalSubmissions },
                { category: 'Mobile Apps', count: 28, total: totalSubmissions },
                { category: 'AI/ML', count: 15, total: totalSubmissions },
                { category: 'Blockchain', count: 8, total: totalSubmissions }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">{stat.category}</span>
                    <span className="text-slate-400">{Math.round((stat.count / stat.total) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(stat.count / stat.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card variant="glass" className="p-8 bg-gradient-to-br from-slate-500/10 to-slate-600/10 border-slate-500/20">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[
                { team: 'Team Alpha', action: 'submitted project', time: '2h ago' },
                { team: 'Team Beta', action: 'updated submission', time: '4h ago' },
                { team: 'Team Gamma', action: 'registered', time: '6h ago' },
                { team: 'Team Delta', action: 'completed profile', time: '8h ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-sm font-medium">
                    {activity.team[5]}
                  </div>
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-slate-200">{activity.team}</span>
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