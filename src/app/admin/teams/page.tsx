import { TeamsManagement } from '@/components/admin/TeamsManagement'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Teams Management - Admin',
  description: 'Manage teams and their submissions',
}

async function getTeams() {
  try {
    const teams = await db.team.findMany({
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        projectIdea: {
          select: {
            id: true,
            title: true,
            description: true,
            techStack: true,
            status: true,
            isDraft: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform the data to match the TeamsManagement component interface
    const transformedTeams = teams.map(team => ({
      ...team,
      submission: team.projectIdea ? {
        id: team.projectIdea.id,
        projectName: team.projectIdea.title,
        theme: team.projectIdea.description,
        status: team.projectIdea.status,
        isDraft: team.projectIdea.isDraft,
        createdAt: team.projectIdea.createdAt,
      } : null
    }))

    return transformedTeams
  } catch (error) {
    console.error('Error fetching teams:', error)
    return []
  }
}

export default async function AdminTeamsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN') {
    redirect('/dashboard')
  }

  const teams = await getTeams()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teams Management</h1>
          <p className="mt-2 text-gray-600">
            Manage registered teams and their project submissions
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Total Teams: <span className="font-semibold text-gray-900">{teams.length}</span>
          </div>
        </div>
      </div>

      <TeamsManagement teams={teams} />
    </div>
  )
}
