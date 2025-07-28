import { AdminManagement } from '@/components/admin/AdminManagement'
import { BulkEmailForm } from '@/components/admin/BulkEmailForm'
import { DeadlineManagement } from '@/components/admin/DeadlineManagement'
import { SubmissionsManagement } from '@/components/admin/SubmissionsManagement'
import { TeamsManagement } from '@/components/admin/TeamsManagement'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminManagePage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    redirect('/auth/signin')
  }

  // Only superadmin and admins can access this page
  if (session.user.role !== 'SUPERADMIN' && session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  // Get all admins
  const admins = await db.user.findMany({
    where: {
      role: { in: ['ADMIN', 'SUPERADMIN'] }
    },
    include: {
      addedBy: {
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

  // Get all deadlines
  const deadlines = await db.deadline.findMany({
    orderBy: {
      startDate: 'asc'
    }
  })

  // Get all submissions
  const submissions = await db.projectIdea.findMany({
    include: {
      team: {
        include: {
          leader: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          members: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Get all teams
  const teams = await db.team.findMany({
    include: {
      leader: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      members: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      projectIdea: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20">
      <div className="container-custom space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Admin Management</h1>
          <p className="text-slate-400 text-lg">
            Comprehensive admin control panel
          </p>
        </div>

        {/* Admin Management - Only visible to superadmin */}
        {session.user.role === 'SUPERADMIN' && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Admin Management</h2>
            <AdminManagement 
              currentUser={session.user}
              admins={admins}
            />
          </section>
        )}

        {/* Deadline Management */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Deadline Management</h2>
          <DeadlineManagement 
            currentUser={session.user}
            deadlines={deadlines}
          />
        </section>

        {/* Submissions Management */}
        {/* <section>
          <h2 className="text-2xl font-semibold mb-6">Submissions Management</h2>
          <SubmissionsManagement 
            submissions={submissions}
          />
        </section> */}

        {/* Teams Management */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Teams Management</h2>
          <TeamsManagement 
            teams={teams}
          />
        </section>

        {/* Bulk Email System */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Bulk Email System</h2>
          <BulkEmailForm />
        </section>
      </div>
    </div>
  )
} 