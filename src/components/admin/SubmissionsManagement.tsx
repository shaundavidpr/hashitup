'use client'

import { Button } from '@/components/ui/Button'
import { CheckCircle, Clock, Eye, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Submission {
  id: string
  projectName: string
  theme: string
  type: string
  ideology: string
  methodology: string
  guideName: string
  guidePhone: string
  guideEmail: string
  status: string
  createdAt: Date
  updatedAt: Date
  team: {
    id: string
    name: string
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
}

interface SubmissionsManagementProps {
  submissions: Submission[]
}

export function SubmissionsManagement({ submissions }: SubmissionsManagementProps) {
  const router = useRouter()
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState<string | null>(null)

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.team.leader.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SELECTED':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'WAITING':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const handleStatusUpdate = async (submissionId: string, newStatus: string) => {
    setLoading(submissionId)
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    } finally {
      setLoading(null)
    }
  }

  const formatTheme = (theme: string) => {
    return theme.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Submissions Management</h2>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="WAITING">Waiting</option>
              <option value="SELECTED">Selected</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500">
              {filteredSubmissions.length} of {submissions.length} submissions
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Theme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{submission.projectName}</div>
                      <div className="text-sm text-gray-500">{submission.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{submission.team.name}</div>
                      <div className="text-sm text-gray-500">{submission.team.leader.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatTheme(submission.theme)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(submission.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setSelectedSubmission(submission)}
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      {submission.status === 'WAITING' && (
                        <div className="flex items-center space-x-1">
                          <Button
                            onClick={() => handleStatusUpdate(submission.id, 'SELECTED')}
                            disabled={loading === submission.id}
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            {loading === submission.id ? '...' : 'Select'}
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(submission.id, 'REJECTED')}
                            disabled={loading === submission.id}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            {loading === submission.id ? '...' : 'Reject'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submission Details Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white max-h-96 overflow-y-auto">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Submission Details</h3>
                  <Button
                    onClick={() => setSelectedSubmission(null)}
                    variant="ghost"
                    size="sm"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedSubmission.projectName}</h4>
                    <p className="text-sm text-gray-500">Team: {selectedSubmission.team.name}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Theme</h5>
                      <p className="text-sm text-gray-600">{formatTheme(selectedSubmission.theme)}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Type</h5>
                      <p className="text-sm text-gray-600">{selectedSubmission.type}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Ideology</h5>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedSubmission.ideology}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Methodology</h5>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedSubmission.methodology}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Guide Information</h5>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm"><strong>Name:</strong> {selectedSubmission.guideName}</p>
                      <p className="text-sm"><strong>Phone:</strong> {selectedSubmission.guidePhone}</p>
                      <p className="text-sm"><strong>Email:</strong> {selectedSubmission.guideEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                        {selectedSubmission.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Submitted: {new Date(selectedSubmission.createdAt).toLocaleString()}
                    </div>
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