import { AdminManagement } from '@/components/admin/AdminManagement'
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
      addedByAdmin: {
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

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Admin Management</h1>
          <p className="text-slate-400 text-lg">
            Manage administrators and their permissions
          </p>
        </div>

        <AdminManagement 
          currentUser={session.user}
          admins={admins}
        />
      </div>
    </div>
  )
} 