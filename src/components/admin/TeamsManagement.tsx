'use client'

import { Button } from '@/components/ui/Button'
import { Eye, Mail, Users } from 'lucide-react'
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
  }
  members: {
    id: string
    name: string | null
    email: string | null
  }[]
  submission?: {
    id: string
    projectName: string
    theme: string
    status: string
    createdAt: Date
  } | null
}

interface TeamsManagementProps {
  teams: Team[]
}

export function TeamsManagement({ teams }: TeamsManagementProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leader.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SELECTED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'WAITING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Teams Management</h2>
          <div className="flex items-center space-x-4">
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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(team.submission.status)}`}>
                          {team.submission.status}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No submission</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(team.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      onClick={() => setSelectedTeam(team)}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
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
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{selectedTeam.leader.name} ({selectedTeam.leader.email})</span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Team Members</h5>
                    <div className="space-y-1">
                      {selectedTeam.members.map((member) => (
                        <div key={member.id} className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{member.name} ({member.email})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedTeam.submission && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Project Submission</h5>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium">{selectedTeam.submission.projectName}</p>
                        <p className="text-sm text-gray-500">Theme: {selectedTeam.submission.theme}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTeam.submission.status)}`}>
                          {selectedTeam.submission.status}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                    <p className="text-sm text-gray-600">{selectedTeam.address}</p>
                    <p className="text-sm text-gray-600">{selectedTeam.state}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 