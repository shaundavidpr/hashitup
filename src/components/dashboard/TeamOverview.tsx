'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pencil, Save, Users, X } from 'lucide-react'
import { useState } from 'react'

type TeamMember = {
  id: string
  name: string | null
  email: string | null
  phone: string | null
}

type TeamWithMembers = {
  id: string
  name: string
  collegeName: string
  university: string
  address: string
  state: string
  numberOfMembers: number
  members: TeamMember[]
  projectIdea: {
    id: string
    title: string
    description: string
    techStack: string
    problemStatement: string
    solution: string
  } | null
}

interface TeamOverviewProps {
  team: TeamWithMembers
  isLeader: boolean
}

export function TeamOverview({ team, isLeader }: TeamOverviewProps) {
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [members, setMembers] = useState<TeamMember[]>(team.members)
  const [editForm, setEditForm] = useState<TeamMember | null>(null)

  const handleEdit = (member: TeamMember) => {
    setEditingMemberId(member.id)
    setEditForm({ ...member })
  }

  const handleCancel = () => {
    setEditingMemberId(null)
    setEditForm(null)
  }

  const handleSave = async (memberId: string) => {
    if (!editForm) return

    try {
      const response = await fetch(`/api/teams/${team.id}/members/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        setMembers(members.map(m => m.id === memberId ? editForm : m))
        setEditingMemberId(null)
        setEditForm(null)
      } else {
        alert('Failed to update member')
      }
    } catch (error) {
      console.error('Error updating member:', error)
      alert('Failed to update member')
    }
  }

  return (
    <div className="space-y-6">
      <Card variant="glass" className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{team.name}</h2>
            <p className="text-slate-400">
              {isLeader ? 'Team Leader' : 'Team Member'} • {team.collegeName}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">{team.numberOfMembers} Members</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-1">University</h3>
            <p className="text-slate-200">{team.university}</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-1">State</h3>
            <p className="text-slate-200">{team.state}</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-1">Address</h3>
            <p className="text-slate-200">{team.address}</p>
          </div>
        </div>
      </Card>

      {/* Team Members Section */}
      <Card variant="glass" className="p-6 bg-gradient-to-br from-slate-500/10 to-slate-600/10 border-slate-500/20">
        <h2 className="text-2xl font-bold mb-6">Team Members</h2>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="bg-slate-800/30 rounded-lg p-4">
              {editingMemberId === member.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={editForm?.name || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={editForm?.email || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, email: e.target.value } : null)}
                      className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Email"
                    />
                    <input
                      type="tel"
                      value={editForm?.phone || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, phone: e.target.value } : null)}
                      className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSave(member.id)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-200">{member.name}</h3>
                    <div className="text-sm text-slate-400 mt-1">
                      <p>{member.email}</p>
                      <p>{member.phone}</p>
                    </div>
                  </div>
                  {isLeader && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(member)}
                      className="text-slate-400 hover:text-slate-300"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 