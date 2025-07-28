'use client'

import { Button } from '@/components/ui/Button'
import { Eye, Mail, Users, CheckCircle, XCircle, Clock, Star, Download, RotateCcw } from 'lucide-react'
import { useState } from 'react'

interface Team {
  id: string
  name: string
  collegeName: string
  university: string
  address: string
  state: string
  numberOfMembers: number
  createdAt: Date
  leader: {
    id: string
    name: string | null
    email: string | null
    phone?: string | null
  }
  members: {
    id: string
    name: string | null
    email: string | null
    phone?: string | null
  }[]
  submission?: {
    id: string
    projectName: string
    theme: string
    status: string
    isDraft: boolean
    createdAt: Date
  } | null
}

interface TeamsManagementProps {
  teams: Team[]
}

export function TeamsManagement({ teams }: TeamsManagementProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set())
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || 
      (team.submission?.status === filterStatus) ||
      (filterStatus === 'no-submission' && !team.submission) ||
      (filterStatus === 'draft' && team.submission?.isDraft) ||
      (filterStatus === 'submitted' && team.submission && !team.submission.isDraft)
    
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = () => {
    if (selectedTeams.size === filteredTeams.length) {
      setSelectedTeams(new Set())
    } else {
      setSelectedTeams(new Set(filteredTeams.map(team => team.id)))
    }
  }

  const handleSelectTeam = (teamId: string) => {
    const newSelected = new Set(selectedTeams)
    if (newSelected.has(teamId)) {
      newSelected.delete(teamId)
    } else {
      newSelected.add(teamId)
    }
    setSelectedTeams(newSelected)
  }

  const handleExport = (format: 'csv' | 'json') => {
    const url = `/api/admin/teams/export?format=${format}&status=${filterStatus}`
    window.open(url, '_blank')
  }

  const handleBulkStatusUpdate = async (status: string) => {
    if (selectedTeams.size === 0) return

    // Filter out teams with draft submissions
    const validTeamIds = Array.from(selectedTeams).filter(teamId => {
      const team = filteredTeams.find(t => t.id === teamId)
      return team?.submission && !team.submission.isDraft
    })

    if (validTeamIds.length === 0) {
      alert('No valid teams selected. Only teams with submitted (non-draft) ideas can be evaluated.')
      return
    }

    if (validTeamIds.length !== selectedTeams.size) {
      if (!confirm(`${selectedTeams.size - validTeamIds.length} team(s) with draft submissions will be skipped. Continue with ${validTeamIds.length} team(s)?`)) {
        return
      }
    }

    setIsUpdating(true)
    try {
      const promises = validTeamIds.map(teamId =>
        fetch(`/api/admin/teams/${teamId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        })
      )

      await Promise.all(promises)
      setSelectedTeams(new Set())
      window.location.reload()
    } catch (error) {
      console.error('Error updating team statuses:', error)
      alert('Error updating team statuses')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleStatusUpdate = async (teamId: string, status: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/teams/${teamId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        alert('Failed to update team status')
      }
    } catch (error) {
      console.error('Error updating team status:', error)
      alert('Error updating team status')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleResetStatus = async (teamId: string) => {
    if (!confirm('Are you sure you want to reset this team\'s evaluation status to PENDING?')) {
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/teams/${teamId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'PENDING' }),
      })

      if (response.ok) {
        window.location.reload()
      } else {
        alert('Failed to reset team status')
      }
    } catch (error) {
      console.error('Error resetting team status:', error)
      alert('Error resetting team status')
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
      case 'SELECTED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'WAITLIST':
      case 'WAITING':
        return 'bg-yellow-100 text-yellow-800'
      case 'PENDING':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-500">Total Teams</div>
            <div className="text-2xl font-bold text-gray-900">{teams.length}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-sm font-medium text-orange-600">Draft Ideas</div>
            <div className="text-2xl font-bold text-orange-900">
              {teams.filter(t => t.submission?.isDraft).length}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-sm font-medium text-blue-600">Pending</div>
            <div className="text-2xl font-bold text-blue-900">
              {teams.filter(t => t.submission && !t.submission.isDraft && t.submission.status === 'PENDING').length}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-sm font-medium text-green-600">Accepted</div>
            <div className="text-2xl font-bold text-green-900">
              {teams.filter(t => t.submission?.status === 'ACCEPTED').length}
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="text-sm font-medium text-yellow-600">Waitlisted</div>
            <div className="text-2xl font-bold text-yellow-900">
              {teams.filter(t => t.submission?.status === 'WAITLIST').length}
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <div className="text-sm font-medium text-red-600">Rejected</div>
            <div className="text-2xl font-bold text-red-900">
              {teams.filter(t => t.submission?.status === 'REJECTED').length}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Teams Management</h2>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => handleExport('csv')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft Ideas</option>
              <option value="submitted">Submitted Ideas</option>
              <option value="PENDING">Pending Review</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="WAITLIST">Waitlisted</option>
              <option value="REJECTED">Rejected</option>
              <option value="no-submission">No Submission</option>
            </select>
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500">
              {filteredTeams.length} of {teams.length} teams
            </span>
          </div>
        </div>

        {selectedTeams.size > 0 && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-900">
                {selectedTeams.size} team(s) selected
              </span>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleBulkStatusUpdate('ACCEPTED')}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={isUpdating}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept Selected
                </Button>
                <Button
                  onClick={() => handleBulkStatusUpdate('WAITLIST')}
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  disabled={isUpdating}
                >
                  <Star className="h-4 w-4 mr-1" />
                  Waitlist Selected
                </Button>
                <Button
                  onClick={() => handleBulkStatusUpdate('REJECTED')}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={isUpdating}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject Selected
                </Button>
                <Button
                  onClick={() => setSelectedTeams(new Set())}
                  variant="ghost"
                  size="sm"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedTeams.size === filteredTeams.length && filteredTeams.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  College
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedTeams.has(team.id)}
                      onChange={() => handleSelectTeam(team.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{team.name}</div>
                      <div className="text-sm text-gray-500">{team.state}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{team.leader.name}</div>
                      <div className="text-sm text-gray-500">{team.leader.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{team.collegeName}</div>
                      <div className="text-sm text-gray-500">{team.university}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{team.numberOfMembers}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {team.submission ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{team.submission.projectName}</div>
                        <div className="flex items-center space-x-2">
                          {team.submission.isDraft ? (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                              DRAFT
                            </span>
                          ) : (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(team.submission.status)}`}>
                              {team.submission.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No submission</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(team.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setSelectedTeam(team)}
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      
                      {team.submission && !team.submission.isDraft && (
                        <>
                          <Button
                            onClick={() => handleStatusUpdate(team.id, 'ACCEPTED')}
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 text-green-600 hover:text-green-700"
                            disabled={isUpdating}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Accept
                          </Button>
                          
                          <Button
                            onClick={() => handleStatusUpdate(team.id, 'WAITLIST')}
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
                            disabled={isUpdating}
                          >
                            <Star className="h-4 w-4" />
                            Waitlist
                          </Button>
                          
                          <Button
                            onClick={() => handleStatusUpdate(team.id, 'REJECTED')}
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 text-red-600 hover:text-red-700"
                            disabled={isUpdating}
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                          
                          {team.submission.status !== 'PENDING' && (
                            <Button
                              onClick={() => handleResetStatus(team.id)}
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                              disabled={isUpdating}
                            >
                              <RotateCcw className="h-4 w-4" />
                              Reset
                            </Button>
                          )}
                        </>
                      )}
                      
                      {team.submission?.isDraft && (
                        <span className="text-xs text-orange-600 italic">
                          Cannot evaluate draft
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Team Details Modal */}
        {selectedTeam && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Team Details</h3>
                  <Button
                    onClick={() => setSelectedTeam(null)}
                    variant="ghost"
                    size="sm"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedTeam.name}</h4>
                    <p className="text-sm text-gray-500">{selectedTeam.collegeName}, {selectedTeam.university}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Team Leader</h5>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">{selectedTeam.leader.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedTeam.leader.email}</span>
                        </div>
                        {selectedTeam.leader.phone && (
                          <div className="flex items-center space-x-2">
                            <span className="h-4 w-4 text-gray-400 text-xs">📞</span>
                            <span className="text-sm">{selectedTeam.leader.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Team Members ({selectedTeam.members.length})</h5>
                    <div className="space-y-2">
                      {selectedTeam.members.map((member, index) => (
                        <div key={member.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium">{member.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{member.email}</span>
                            </div>
                            {member.phone && (
                              <div className="flex items-center space-x-2">
                                <span className="h-4 w-4 text-gray-400 text-xs">📞</span>
                                <span className="text-sm">{member.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedTeam.submission && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Project Idea</h5>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium">{selectedTeam.submission.projectName}</p>
                        <p className="text-sm text-gray-500">Theme: {selectedTeam.submission.theme}</p>
                        <div className="mt-2">
                          {selectedTeam.submission.isDraft ? (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                              DRAFT - Cannot be evaluated
                            </span>
                          ) : (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTeam.submission.status)}`}>
                              {selectedTeam.submission.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                    <p className="text-sm text-gray-600">{selectedTeam.address}</p>
                    <p className="text-sm text-gray-600">{selectedTeam.state}</p>
                  </div>
                  
                  {selectedTeam.submission && !selectedTeam.submission.isDraft && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Admin Actions</h5>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => {
                            handleStatusUpdate(selectedTeam.id, 'ACCEPTED')
                            setSelectedTeam(null)
                          }}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={isUpdating}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept Team
                        </Button>
                        <Button
                          onClick={() => {
                            handleStatusUpdate(selectedTeam.id, 'WAITLIST')
                            setSelectedTeam(null)
                          }}
                          size="sm"
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                          disabled={isUpdating}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Waitlist
                        </Button>
                        <Button
                          onClick={() => {
                            handleStatusUpdate(selectedTeam.id, 'REJECTED')
                            setSelectedTeam(null)
                          }}
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          disabled={isUpdating}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject Team
                        </Button>
                        {selectedTeam.submission.status !== 'PENDING' && (
                          <Button
                            onClick={() => {
                              handleResetStatus(selectedTeam.id)
                              setSelectedTeam(null)
                            }}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isUpdating}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Reset Status
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 