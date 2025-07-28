'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Crown, Shield, Trash2, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface AdminManagementProps {
  currentUser: {
    id: string
    name?: string | null
    email?: string | null
    role: string
  }
  admins: Array<{
    id: string
    name: string | null
    email: string | null
    role: string
    addedBy: {
      id: string
      name: string | null
      email: string | null
    } | null
  }>
}

export function AdminManagement({ currentUser, admins }: AdminManagementProps) {
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAdminEmail) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newAdminEmail })
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add admin')
      }

      toast.success('Admin added successfully')
      setNewAdminEmail('')
      // Refresh the page to update the admin list
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add admin')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveAdmin = async (email: string) => {
    if (!confirm('Are you sure you want to remove this admin?')) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/manage?email=${encodeURIComponent(email)}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to remove admin')
      }

      toast.success('Admin removed successfully')
      // Refresh the page to update the admin list
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to remove admin')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Add New Admin Form */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
        <form onSubmit={handleAddAdmin} className="flex gap-4">
          <Input
            type="email"
            placeholder="Enter email address"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isLoading}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Admin
          </Button>
        </form>
      </Card>

      {/* Admin List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Current Administrators</h2>
        <div className="space-y-4">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-900"
            >
              <div className="flex items-center space-x-4">
                {admin.role === 'SUPERADMIN' ? (
                  <Crown className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Shield className="w-5 h-5 text-blue-500" />
                )}
                <div>
                  <p className="font-medium">{admin.name || admin.email}</p>
                  <p className="text-sm text-slate-400">{admin.email}</p>
                  {admin.addedBy && (
                    <p className="text-xs text-slate-500">
                      Added by {admin.addedBy.name || admin.addedBy.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Show remove button only if:
                  1. Current user is superadmin (can remove anyone except themselves)
                  2. Current user is admin who added this admin (can only remove admins they added)
                  3. Don't show remove button for superadmin */}
              {admin.role !== 'SUPERADMIN' &&
                (currentUser.role === 'SUPERADMIN' ||
                  (currentUser.role === 'ADMIN' &&
                    admin.addedBy?.id === currentUser.id)) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => admin.email && handleRemoveAdmin(admin.email)}
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 