'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FileText, Lightbulb, Save } from 'lucide-react'
import { useState } from 'react'

interface ProjectIdeaFormProps {
  teamId: string
  existingIdea?: {
    title: string
    description: string
    techStack: string
    problemStatement: string
    solution: string
    isDraft: boolean
  }
}

export function ProjectIdeaForm({ teamId, existingIdea }: ProjectIdeaFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: existingIdea?.title || '',
    description: existingIdea?.description || '',
    techStack: existingIdea?.techStack || '',
    problemStatement: existingIdea?.problemStatement || '',
    solution: existingIdea?.solution || '',
  })

  const isSubmitted = existingIdea && !existingIdea.isDraft

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault()
    
    // For submission (not draft), validate required fields
    if (!isDraft) {
      const requiredFields = ['title', 'problemStatement', 'solution', 'description', 'techStack']
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData].trim())
      
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
        return
      }
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/teams/${teamId}/project-idea`, {
        method: existingIdea ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, isDraft }),
      })

      if (response.ok) {
        const message = isDraft ? 'Draft saved successfully!' : 'Project idea submitted successfully!'
        alert(message)
        if (!isDraft) {
          window.location.reload() // Reload to show submitted state
        }
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save project idea')
      }
    } catch (error) {
      console.error('Error saving project idea:', error)
      alert('Failed to save project idea')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card variant="glass" className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Project Idea</h2>
          <p className="text-slate-400">Share your hackathon project idea</p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            disabled={isSubmitted}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter a catchy title for your project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Problem Statement *
          </label>
          <textarea
            disabled={isSubmitted}
            value={formData.problemStatement}
            onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="What problem are you trying to solve?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Solution Description *
          </label>
          <textarea
            disabled={isSubmitted}
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="How does your solution address the problem?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Detailed Description *
          </label>
          <textarea
            disabled={isSubmitted}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Provide a detailed description of your project, including features, architecture, and implementation details"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tech Stack *
          </label>
          <textarea
            disabled={isSubmitted}
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="List the technologies, frameworks, and tools you plan to use"
          />
        </div>

        {isSubmitted ? (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-400">
              <FileText className="w-5 h-5" />
              <span className="font-medium">Project Submitted</span>
            </div>
            <p className="text-sm text-green-300 mt-1">
              Your project idea has been submitted and cannot be edited.
            </p>
          </div>
        ) : (
          <div className="flex gap-3 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              disabled={loading}
              onClick={(e) => handleSubmit(e as any, true)}
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button type="submit" disabled={loading}>
              <FileText className="w-4 h-4 mr-2" />
              {loading ? 'Submitting...' : 'Submit Project'}
            </Button>
          </div>
        )}
      </form>
    </Card>
  )
} 