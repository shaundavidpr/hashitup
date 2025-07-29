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
    <div className="space-y-6">
      {/* Registration Status Display */}
      {checkingStatus ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-400 animate-spin" />
            <span className="text-slate-300">Checking registration status...</span>
          </div>
        </div>
      ) : !registrationStatus.isOpen ? (
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div>
              <h3 className="text-red-200 font-medium">Registration Closed</h3>
              <p className="text-red-300 text-sm mt-1">
                {registrationStatus.message || 'Team registration is currently closed. Please contact the administrators for more information.'}
              </p>
            </div>
          </div>
        </div>
      ) : registrationStatus.message && registrationStatus.endDate ? (
        <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-yellow-400" />
            <div>
              <h3 className="text-yellow-200 font-medium">Registration Deadline</h3>
              <p className="text-yellow-300 text-sm mt-1">
                {registrationStatus.message}
              </p>
            </div>
          </div>
        </div>
      ) : null}

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
            Your Phone Number *
          </label>
          <input
            type="tel"
            required
            value={teamData.leaderPhone}
            onChange={(e) => setTeamData({ ...teamData, leaderPhone: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter your phone number"
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

        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
          <p className="text-sm text-blue-200">
            <strong>💡 How member login works:</strong> After you create the team, your members can sign in 
            using Google with the email addresses you provide below. They will automatically be added to your team.
          </p>
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
        <Button 
          type="submit" 
          disabled={loading || !registrationStatus.isOpen}
          className={!registrationStatus.isOpen ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {loading ? 'Creating Team...' : 'Create Team'}
        </Button>
      </div>
    </form>
    </div>
  )
} 