'use client'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { User, Users, GraduationCap, MapPin, Phone, Mail } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  email: string
  phone?: string
}

interface Team {
  id: string
  name: string
  collegeName: string
  university: string
  address: string
  state: string
  numberOfMembers: number
  createdAt: string
  leader: {
    name: string
    email: string
    phone?: string
  }
  members: TeamMember[]
}

interface TeamMemberViewProps {
  team: Team
  isLeader: boolean
}

export default function TeamMemberView({ team, isLeader }: TeamMemberViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{team.name}</h1>
          <p className="text-slate-400 mt-1">
            {isLeader ? 'You are the team leader' : 'Team member view'}
          </p>
        </div>
        <Badge variant={isLeader ? 'default' : 'outline'}>
          {isLeader ? 'Leader' : 'Member'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Information */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-100">Team Information</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-sm text-slate-400">College</p>
                <p className="text-slate-200">{team.collegeName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <GraduationCap className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-sm text-slate-400">University</p>
                <p className="text-slate-200">{team.university}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-sm text-slate-400">Location</p>
                <p className="text-slate-200">{team.address}, {team.state}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-sm text-slate-400">Team Size</p>
                <p className="text-slate-200">{team.numberOfMembers} members</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Team Members */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-semibold text-slate-100">Team Members</h2>
          </div>
          
          <div className="space-y-4">
            {/* Team Leader */}
            <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">Team Leader</span>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-slate-100">{team.leader.name}</p>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Mail className="h-3 w-3" />
                  <span>{team.leader.email}</span>
                </div>
                {team.leader.phone && (
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone className="h-3 w-3" />
                    <span>{team.leader.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Team Members */}
            {team.members.length > 0 ? (
              team.members.map((member, index) => (
                <div key={member.id} className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Member {index + 1}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-slate-100">{member.name}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Mail className="h-3 w-3" />
                      <span>{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Phone className="h-3 w-3" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-slate-400">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No additional members yet</p>
                {isLeader && (
                  <p className="text-sm mt-1">Members will appear here when they sign in</p>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Member Login Instructions */}
      {isLeader && (
        <Card className="p-6 bg-blue-900/20 border-blue-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-100">Member Login Instructions</h3>
          </div>
          <div className="space-y-2 text-blue-200">
            <p>Share these instructions with your team members:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Go to the website and click &quot;Sign In&quot;</li>
              <li>Sign in with Google using the email address you provided</li>
              <li>They will automatically be added to your team</li>
              <li>They can then access the team dashboard and submit project ideas</li>
            </ol>
          </div>
        </Card>
      )}
    </div>
  )
}
