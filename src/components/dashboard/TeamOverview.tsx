import { Calendar, Mail, MapPin, Phone, School, Users } from 'lucide-react'

interface TeamOverviewProps {
  team: {
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
  }
  teamMembers: {
    id: string
    name: string
    email: string
    phone: string
  }[]
  isLeader: boolean
  user: {
    id: string
    name?: string | null
    email?: string | null
  }
}

export function TeamOverview({ team, teamMembers, isLeader, user }: TeamOverviewProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{team.name}</h2>
          {isLeader && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Team Leader
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <School className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{team.collegeName}</p>
                <p className="text-sm text-gray-500">{team.university}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-900">{team.address}</p>
                <p className="text-sm text-gray-500">{team.state}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {team.numberOfMembers} Members
                </p>
                <p className="text-sm text-gray-500">Including team leader</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Created on {new Date(team.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">Team registration date</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Leader</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {team.leader.name}
                  </p>
                  <p className="text-xs text-gray-500">{team.leader.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Members</h3>
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {member.name}
                    </h4>
                    <span className="text-xs text-gray-500">
                      Member {index + 1}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {member.phone}
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="mt-3 flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">
                      Not registered yet
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No team members added yet</p>
              {isLeader && (
                <p className="text-sm mt-2">
                  Team members will appear here once they register using the emails you provided.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Important Notes</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All team members must register using Google Auth with the emails you provided</li>
            <li>• Only team leaders can submit project details</li>
            <li>• Team information cannot be changed after project submission</li>
            <li>• Make sure all member emails are correct before submission</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 