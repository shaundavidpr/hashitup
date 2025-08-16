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
    <Card className="backdrop-blur-sm bg-slate-900/40 rounded-xl border border-slate-700/50 shadow-lg p-6 relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 p-0.5">
            <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Project Idea</h2>
            <p className="text-slate-400">Share your hackathon project idea</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="Enter a catchy title for your project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Problem Statement *
            </label>
            <textarea
              required
              value={formData.problemStatement}
              onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="What problem are you trying to solve?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Solution Description *
            </label>
            <textarea
              required
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="How does your solution address the problem?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Detailed Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="Provide a detailed description of your project, including features, architecture, and implementation details"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tech Stack *
            </label>
            <textarea
              required
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="List the technologies, frameworks, and tools you plan to use"
            /> 
          </div>

          <div className="flex justify-end pt-2">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 hover:from-pink-600 hover:via-cyan-500 hover:to-blue-600 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Project Idea'}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}