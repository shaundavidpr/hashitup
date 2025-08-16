'use client'

import { Button } from '@/components/ui/Button'
import { Plus, Trash2, AlertCircle, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface TeamMember {
  name: string
  email: string
  phone: string
}

interface RegistrationStatus {
  isOpen: boolean
  message?: string
  endDate?: string
}

export function TeamCreationForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>({ isOpen: true })
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [teamData, setTeamData] = useState({
    name: '',
    collegeName: '',
    university: '',
    address: '',
    state: '',
    leaderPhone: '',
    numberOfMembers: 2,
  })
  const [members, setMembers] = useState<TeamMember[]>([
    { name: '', email: '', phone: '' },
  ])

  // Check registration status on component mount
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const response = await fetch('/api/admin/registration-settings', {
          method: 'HEAD'
        })
        
        if (response.status === 423) {
          // Registration is closed
          setRegistrationStatus({ 
            isOpen: false, 
            message: 'Team registration is currently closed.' 
          })
        } else if (response.status === 200) {
          // Registration is open, get details
          const settingsResponse = await fetch('/api/admin/registration-settings')
          if (settingsResponse.ok) {
            const { settings } = await settingsResponse.json()
            if (settings?.registrationEndDate) {
              setRegistrationStatus({
                isOpen: true,
                endDate: settings.registrationEndDate,
                message: `Registration closes on ${new Date(settings.registrationEndDate).toLocaleString()}`
              })
            } else {
              setRegistrationStatus({ isOpen: true })
            }
          }
        }
      } catch (error) {
        console.error('Error checking registration status:', error)
        // Default to open on error, but show warning
        setRegistrationStatus({ 
          isOpen: true, 
          message: 'Unable to verify registration status. Please try again if you encounter issues.' 
        })
      } finally {
        setCheckingStatus(false)
      }
    }

    checkRegistrationStatus()
  }, [])

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
    
    // Double-check registration status before submitting
    if (!registrationStatus.isOpen) {
      alert('Team registration is currently closed.')
      return
    }
    
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
        if (response.status === 423) {
          // Registration closed
          setRegistrationStatus({ isOpen: false, message: error.error })
        }
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
    <form onSubmit={handleSubmit} className="space-y-8 backdrop-blur-sm bg-slate-900/40 rounded-xl border border-slate-700/50 shadow-lg p-6 relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block">
          Create Your Team
        </h2>
        
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
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
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
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
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
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
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
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="Enter state"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Address *
          </label>
          <textarea
            required
            value={teamData.address}
            onChange={(e) => setTeamData({ ...teamData, address: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
            placeholder="Enter complete address"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">
            Team Members <span className="text-cyan-400">({members.length})</span>
          </h3>
          <Button
            type="button"
            onClick={handleAddMember}
            disabled={members.length >= 4}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-slate-600 text-cyan-400 hover:bg-slate-800/70 hover:text-cyan-300 hover:border-cyan-500/50 transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
          <p className="text-sm text-blue-200">
            <strong>💡 How member login works:</strong> After you create the team, your members can sign in 
            using Google with the email addresses you provide below. They will automatically be added to your team.
          </p>
        </div>

        <div className="space-y-4">
          {members.map((member, index) => (
            <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-5 transition-all duration-300 hover:border-slate-600/70 group relative">
              {/* Subtle highlight effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-cyan-400/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              
              <div className="flex justify-between items-center mb-4 relative">
                <h4 className="font-semibold text-slate-200">
                  {index === 0 ? (
                    <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Team Leader</span>
                  ) : (
                    <span>Member {index + 1}</span>
                  )}
                </h4>
                {members.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full p-1.5"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                  className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={member.phone}
                  onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                  className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 hover:from-pink-600 hover:via-cyan-500 hover:to-blue-600 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-cyan-500/25"
        >
          {loading ? 'Creating Team...' : 'Create Team'}
        </Button>
      </div>
    </form>
    </div>
  )
}