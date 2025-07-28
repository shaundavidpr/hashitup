import { DeadlineManagement } from '@/components/admin/DeadlineManagement'
import { ProjectIdeaManagement } from '@/components/admin/ProjectIdeaManagement'
import { Card } from '@/components/ui/Card'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { Award, Flag, Target, Users } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// Define Role enum locally
enum Role {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
  LEADER = 'LEADER',
  MEMBER = 'MEMBER'
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== Role.ADMIN && session.user.role !== Role.SUPERADMIN) {
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
    db.projectIdea.count(),
    db.projectIdea.count({
      where: { status: 'ACCEPTED' }
    }),
    db.projectIdea.count({
      where: { status: 'REJECTED' }
    }),
    db.projectIdea.count({
      where: { status: 'WAITLIST' }
    }),
  ])

  // Get deadlines
  const deadlines = await db.deadline.findMany({
    orderBy: {
      startDate: 'asc'
    }
  })

  // Get project ideas
  const projectIdeas = await db.projectIdea.findMany({
    include: {
      team: {
        include: {
          leader: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      },
      submittedBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      updatedBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const _stats = {  // Stats not currently used
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
              title: 'Selected Teams',
              value: selectedSubmissions.toString(),
              icon: Target,
              color: 'from-purple-500/20 to-purple-600/20 border-purple-500/20',
              iconColor: 'from-purple-400 to-purple-600'
            },
            {
              title: 'Finalists',
              value: waitingSubmissions.toString(),
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

        {/* Deadline Management */}
        <div className="mb-12">
          <DeadlineManagement 
            currentUser={session.user}
            deadlines={deadlines}
          />
        </div>

        {/* Project Idea Management */}
        <div className="mb-12">
          <ProjectIdeaManagement 
            currentUser={session.user}
            projectIdeas={projectIdeas}
          />
        </div>
      </div>
    </div>
  )
} 