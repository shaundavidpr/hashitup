'use client'

import { Button } from '@/components/ui/Button'
import { Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface TeamMember {
  name: string
  email: string
  phone: string
}

export function TeamCreationForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [teamData, setTeamData] = useState({
    name: '',
    collegeName: '',
    university: '',
    address: '',
    state: '',
    numberOfMembers: 2,
  })
  const [members, setMembers] = useState<TeamMember[]>([
    { name: '', email: '', phone: '' },
  ])

  const handleAddMember = () => {
    if (members.length < 3) {
      setMembers([...members, { name: '', email: '', phone: '' }])
      setTeamData({ ...teamData, numberOfMembers: members.length + 1 })
    }
  }

  const handleRemoveMember = (index: number) => {
    if (members.length > 1) {
      const newMembers = members.filter((_, i) => i !== index)
      setMembers(newMembers)
      setTeamData({ ...teamData, numberOfMembers: newMembers.length })
    }
  }

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...members]
    newMembers[index][field] = value
    setMembers(newMembers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...teamData,
          members: members.filter(member => member.name && member.email),
        }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create team')
      }
    } catch (error) {
      console.error('Error creating team:', error)
      alert('Failed to create team')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Team Name *
          </label>
          <input
            type="text"
            required
            value={teamData.name}
            onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter team name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            College Name *
          </label>
          <input
            type="text"
            required
            value={teamData.collegeName}
            onChange={(e) => setTeamData({ ...teamData, collegeName: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter college name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            University *
          </label>
          <input
            type="text"
            required
            value={teamData.university}
            onChange={(e) => setTeamData({ ...teamData, university: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter university name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            State *
          </label>
          <input
            type="text"
            required
            value={teamData.state}
            onChange={(e) => setTeamData({ ...teamData, state: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter state"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Address *
        </label>
        <textarea
          required
          value={teamData.address}
          onChange={(e) => setTeamData({ ...teamData, address: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Enter complete address"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-slate-200">
            Team Members ({members.length})
          </h3>
          <Button
            type="button"
            onClick={handleAddMember}
            disabled={members.length >= 4}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        <div className="space-y-4">
          {members.map((member, index) => (
            <div key={index} className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-slate-200">Member {index + 1}</h4>
                {members.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                  className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={member.phone}
                  onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                  className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating Team...' : 'Create Team'}
        </Button>
      </div>
    </form>
  )
} 