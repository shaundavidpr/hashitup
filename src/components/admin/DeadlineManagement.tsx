'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Clock, Plus, Save, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeadlineManagementProps {
  currentUser: {
    id: string
    role: string
  }
  deadlines: Array<{
    id: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
  }>
}

export function DeadlineManagement({ currentUser, deadlines }: DeadlineManagementProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [newDeadline, setNewDeadline] = useState({
    name: '',
    startDate: '',
    endDate: '',
  })

  const handleAddDeadline = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDeadline.name || !newDeadline.startDate || !newDeadline.endDate) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/deadlines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDeadline)
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add deadline')
      }

      toast.success('Deadline added successfully')
      setNewDeadline({ name: '', startDate: '', endDate: '' })
      // Refresh the page to update the deadlines list
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add deadline')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateDeadline = async (id: string, isActive: boolean) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/deadlines/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update deadline')
      }

      toast.success('Deadline updated successfully')
      // Refresh the page to update the deadlines list
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update deadline')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteDeadline = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deadline?')) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/deadlines/${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete deadline')
      }

      toast.success('Deadline deleted successfully')
      // Refresh the page to update the deadlines list
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete deadline')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Add New Deadline Form */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Deadline</h2>
        <form onSubmit={handleAddDeadline} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Deadline Name"
              value={newDeadline.name}
              onChange={(e) => setNewDeadline(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              type="datetime-local"
              value={newDeadline.startDate}
              onChange={(e) => setNewDeadline(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
            <Input
              type="datetime-local"
              value={newDeadline.endDate}
              onChange={(e) => setNewDeadline(prev => ({ ...prev, endDate: e.target.value }))}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Deadline
          </Button>
        </form>
      </Card>

      {/* Deadlines List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Current Deadlines</h2>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-900"
            >
              <div className="flex items-center space-x-4">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">{deadline.title}</p>
                  <p className="text-sm text-slate-400">
                    {new Date(deadline.startDate).toLocaleString()} - {new Date(deadline.endDate).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {(() => {
                  const now = new Date()
                  const isActive = now >= deadline.startDate && now <= deadline.endDate
                  return (
                    <Button
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      disabled={true}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isActive ? 'Active' : 'Inactive'}
                    </Button>
                  )
                })()}

                {currentUser.role === 'SUPERADMIN' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDeadline(deadline.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 