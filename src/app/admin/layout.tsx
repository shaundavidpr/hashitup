import { AdminHeader } from '@/components/admin/AdminHeader'
import { authOptions } from '@/lib/auth'
import { Crown, LayoutDashboard, Shield, Users } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader user={session.user} />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white h-[calc(100vh-4rem)] shadow-sm">
          <nav className="p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              href="/admin/teams"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Users className="w-5 h-5" />
              <span>Teams</span>
            </Link>
            
            <Link
              href="/admin/manage"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {session.user.role === 'SUPERADMIN' ? (
                <Crown className="w-5 h-5" />
              ) : (
                <Shield className="w-5 h-5" />
              )}
              <span>Manage Admins</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 