'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface ProjectIdeaManagementProps {
  currentUser: {
    id: string
    role: string
  }
  projectIdeas: Array<{
    id: string
    title: string
    description: string
    techStack: string
    problemStatement: string
    solution: string
    status: string
    feedback?: string | null
    team: {
      name: string
      collegeName: string
      leader: {
        name: string | null
        email: string | null
      }
    }
  }>
}

export function ProjectIdeaManagement({ currentUser, projectIdeas }: ProjectIdeaManagementProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({})

  const handleUpdateStatus = async (id: string, status: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status,
          feedback: feedback[id] || undefined
        })
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status')
      }

      toast.success('Status updated successfully')
      // Refresh the page to update the list
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update status')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Project Ideas</h2>
        <div className="space-y-6">
          {projectIdeas.map((idea) => (
            <div
              key={idea.id}
              className="p-6 rounded-lg bg-slate-900 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{idea.title}</h3>
                  <p className="text-sm text-slate-400">
                    {idea.team.name} - {idea.team.collegeName}
                  </p>
                  <p className="text-sm text-slate-500">
                    Team Lead: {idea.team.leader.name || idea.team.leader.email}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {idea.status === 'PENDING' && (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                  {idea.status === 'ACCEPTED' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {idea.status === 'REJECTED' && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-sm font-medium">{idea.status}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-slate-300">Problem Statement</h4>
                  <p className="text-sm text-slate-400">{idea.problemStatement}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-300">Solution</h4>
                  <p className="text-sm text-slate-400">{idea.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-300">Tech Stack</h4>
                  <p className="text-sm text-slate-400">{idea.techStack}</p>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-2">
                <textarea
                  className="w-full p-2 rounded bg-slate-800 text-white text-sm"
                  placeholder="Add feedback..."
                  value={feedback[idea.id] || idea.feedback || ''}
                  onChange={(e) => setFeedback(prev => ({ ...prev, [idea.id]: e.target.value }))}
                  rows={2}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                {idea.status === 'PENDING' && (
                  <>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleUpdateStatus(idea.id, 'REJECTED')}
                      disabled={isLoading}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(idea.id, 'WAITLIST')}
                      disabled={isLoading}
                    >
                      Waitlist
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(idea.id, 'ACCEPTED')}
                      disabled={isLoading}
                    >
                      Accept
                    </Button>
                  </>
                )}
                {idea.status !== 'PENDING' && currentUser.role === 'SUPERADMIN' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(idea.id, 'PENDING')}
                    disabled={isLoading}
                  >
                    Reset Status
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