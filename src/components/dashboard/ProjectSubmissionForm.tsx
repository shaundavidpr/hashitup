'use client'

import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type ProjectTheme = 'AI_ML' | 'WEB_DEVELOPMENT' | 'MOBILE_DEVELOPMENT' | 'BLOCKCHAIN' | 'IOT' | 'CYBERSECURITY' | 'DATA_SCIENCE' | 'GAME_DEVELOPMENT' | 'AR_VR' | 'FINTECH' | 'HEALTHTECH' | 'EDTECH' | 'SUSTAINABLE_TECH' | 'SOCIAL_IMPACT' | 'HARDWARE' | 'OTHER'
type ProjectType = 'SOFTWARE' | 'HARDWARE' | 'BOTH'

interface ProjectSubmissionFormProps {
  teamId: string
}
 
export function ProjectSubmissionForm({ teamId }: ProjectSubmissionFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    theme: '' as ProjectTheme,
    projectName: '',
    type: '' as ProjectType,
    ideology: '',
    methodology: '',
    guideName: '',
    guidePhone: '',
    guideEmail: '',
  })

  const themes = [
    { value: 'AI_ML', label: 'AI/ML' },
    { value: 'WEB_DEVELOPMENT', label: 'Web Development' },
    { value: 'MOBILE_DEVELOPMENT', label: 'Mobile Development' },
    { value: 'BLOCKCHAIN', label: 'Blockchain' },
    { value: 'IOT', label: 'IoT' },
    { value: 'CYBERSECURITY', label: 'Cybersecurity' },
    { value: 'DATA_SCIENCE', label: 'Data Science' },
    { value: 'GAME_DEVELOPMENT', label: 'Game Development' },
    { value: 'AR_VR', label: 'AR/VR' },
    { value: 'FINTECH', label: 'FinTech' },
    { value: 'HEALTHTECH', label: 'HealthTech' },
    { value: 'EDTECH', label: 'EdTech' },
    { value: 'SUSTAINABLE_TECH', label: 'Sustainable Tech' },
    { value: 'SOCIAL_IMPACT', label: 'Social Impact' },
    { value: 'HARDWARE', label: 'Hardware' },
    { value: 'OTHER', label: 'Other' },
  ]

  const projectTypes = [
    { value: 'SOFTWARE', label: 'Software' },
    { value: 'HARDWARE', label: 'Hardware' },
    { value: 'BOTH', label: 'Both' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId,
          ...formData,
        }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to submit project')
      }
    } catch (error) {
      console.error('Error submitting project:', error)
      alert('Failed to submit project')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 backdrop-blur-sm bg-slate-900/40 rounded-xl border border-slate-700/50 shadow-lg p-6 relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block">
          Project Submission
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Theme *
            </label>
            <select
              required
              value={formData.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200"
            >
              <option value="" className="bg-slate-800 text-slate-300">Select a theme</option>
              {themes.map((theme) => (
                <option key={theme.value} value={theme.value} className="bg-slate-800 text-white">
                  {theme.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Type *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200"
            >
              <option value="" className="bg-slate-800 text-slate-300">Select project type</option>
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value} className="bg-slate-800 text-white">
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            required
            value={formData.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
            placeholder="Enter your project name"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Ideology *
          </label>
          <textarea
            required
            value={formData.ideology}
            onChange={(e) => handleChange('ideology', e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
            placeholder="Describe your project ideology, problem statement, and objectives"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Methodology *
          </label>
          <textarea
            required
            value={formData.methodology}
            onChange={(e) => handleChange('methodology', e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
            placeholder="Describe your implementation methodology, technologies used, and approach"
          />
        </div>
      </div>

      <div className="border-t border-slate-700/50 pt-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-2 inline-block"></span>
          Guide Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Guide Name *
            </label>
            <input
              type="text"
              required
              value={formData.guideName}
              onChange={(e) => handleChange('guideName', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="Enter guide's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Guide Phone *
            </label>
            <input
              type="tel"
              required
              value={formData.guidePhone}
              onChange={(e) => handleChange('guidePhone', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="Enter guide's phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Guide Email *
            </label>
            <input
              type="email"
              required
              value={formData.guideEmail}
              onChange={(e) => handleChange('guideEmail', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 text-white transition-all duration-200 placeholder-slate-500"
              placeholder="Enter guide's email"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/30 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-5">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="font-medium text-yellow-400 mb-1">Important Note</h4>
            <p className="text-sm text-yellow-300/80">
              Once you submit your project, you cannot make any changes to the project details or team information. 
              Please review all information carefully before submitting.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 hover:from-pink-600 hover:via-cyan-500 hover:to-blue-600 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-cyan-500/25"
        >
          {loading ? 'Submitting...' : 'Submit Project'}
        </Button>
      </div>
    </form>
  )
}