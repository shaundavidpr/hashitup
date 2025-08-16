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
    <div className="space-y-8">
      <Card variant="glass" className="p-8 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 border-white/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-pink-500/5 transition-all duration-300 relative overflow-hidden group">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/5 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-xl"></div>
        
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">{team.name}</h2>
            <p className="text-gray-400">
              {isLeader ? 'Team Leader' : 'Team Member'} • {team.collegeName}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            <Users className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-gray-300">{team.numberOfMembers} Members</span>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-cyan-500 transform -translate-x-full transition-transform duration-700 group-hover:translate-x-full"></div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">University</h3>
            <p className="text-gray-200 group-hover:text-white transition-colors duration-300">{team.university}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-cyan-500 transform -translate-x-full transition-transform duration-700 group-hover:translate-x-full"></div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">State</h3>
            <p className="text-gray-200 group-hover:text-white transition-colors duration-300">{team.state}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-cyan-500 transform -translate-x-full transition-transform duration-700 group-hover:translate-x-full"></div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Address</h3>
            <p className="text-gray-200 group-hover:text-white transition-colors duration-300">{team.address}</p>
          </div>
        </div>
      </Card>

      {/* Team Members Section */}
      <Card variant="glass" className="p-8 bg-gradient-to-br from-pink-500/5 to-cyan-500/5 border-white/10 backdrop-blur-sm rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 blur-3xl rounded-full"></div>
        
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Team Members</h2>
        <div className="space-y-5">
          {members.map((member) => (
            <div key={member.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
              {editingMemberId === member.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={editForm?.name || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-500 transition-all duration-300"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={editForm?.email || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, email: e.target.value } : null)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-500 transition-all duration-300"
                      placeholder="Email"
                    />
                    <input
                      type="tel"
                      value={editForm?.phone || ''}
                      onChange={(e) => setEditForm(prev => prev ? { ...prev, phone: e.target.value } : null)}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-500 transition-all duration-300"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-red-400 transition-all duration-300 hover:-translate-y-0.5 flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSave(member.id)}
                      className="bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl px-4 py-2 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/20 flex items-center relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{member.name}</h3>
                    <div className="text-sm text-gray-400 mt-1">
                      <p>{member.email}</p>
                      <p>{member.phone}</p>
                    </div>
                  </div>
                  {isLeader && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(member)}
                      className="text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:-translate-y-0.5 transform"
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