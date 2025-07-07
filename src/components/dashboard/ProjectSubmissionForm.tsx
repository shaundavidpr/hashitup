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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Theme *
          </label>
          <select
            required
            value={formData.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a theme</option>
            {themes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Type *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Name *
        </label>
        <input
          type="text"
          required
          value={formData.projectName}
          onChange={(e) => handleChange('projectName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your project name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Ideology *
        </label>
        <textarea
          required
          value={formData.ideology}
          onChange={(e) => handleChange('ideology', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your project ideology, problem statement, and objectives"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Methodology *
        </label>
        <textarea
          required
          value={formData.methodology}
          onChange={(e) => handleChange('methodology', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your implementation methodology, technologies used, and approach"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Guide Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guide Name *
            </label>
            <input
              type="text"
              required
              value={formData.guideName}
              onChange={(e) => handleChange('guideName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter guide's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guide Phone *
            </label>
            <input
              type="tel"
              required
              value={formData.guidePhone}
              onChange={(e) => handleChange('guidePhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter guide's phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guide Email *
            </label>
            <input
              type="email"
              required
              value={formData.guideEmail}
              onChange={(e) => handleChange('guideEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter guide's email"
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Important Note</h4>
        <p className="text-sm text-yellow-800">
          Once you submit your project, you cannot make any changes to the project details or team information. 
          Please review all information carefully before submitting.
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Submit Project'}
        </Button>
      </div>
    </form>
  )
} 