import { Calendar, CheckCircle, Clock, Mail, Phone, User, XCircle } from 'lucide-react'

type Status = 'WAITING' | 'SELECTED' | 'REJECTED'

interface SubmissionStatusProps {
  submission: {
    id: string
    projectName: string
    theme: string
    type: string
    ideology: string
    methodology: string
    guideName: string
    guidePhone: string
    guideEmail: string
    status: Status
    createdAt: Date
    updatedAt: Date
  }
  isLeader: boolean
}

export function SubmissionStatus({ 
  submission, 
  isLeader: _isLeader 
}: SubmissionStatusProps) {
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'WAITING':
        return <Clock className="h-6 w-6 text-yellow-600" />
      case 'SELECTED':
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case 'REJECTED':
        return <XCircle className="h-6 w-6 text-red-600" />
      default:
        return <Clock className="h-6 w-6 text-gray-600" />
    }
  }

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'WAITING':
        return 'bg-yellow-100 text-yellow-800'
      case 'SELECTED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusMessage = (status: Status) => {
    switch (status) {
      case 'WAITING':
        return 'Your project submission is under review. We will notify you once the evaluation is complete.'
      case 'SELECTED':
        return 'Congratulations! Your project has been selected for the next round. Check your email for further instructions.'
      case 'REJECTED':
        return 'Thank you for your submission. Unfortunately, your project was not selected this time. Keep innovating!'
      default:
        return 'Status unknown'
    }
  }

  const formatTheme = (theme: string) => {
    return theme.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Project Submission</h2>
          <div className="flex items-center space-x-2">
            {getStatusIcon(submission.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
              {submission.status}
            </span>
          </div>
        </div>

        {/* Status Message */}
        <div className={`rounded-lg p-4 mb-6 ${
          submission.status === 'WAITING' ? 'bg-yellow-50' :
          submission.status === 'SELECTED' ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <p className={`text-sm ${
            submission.status === 'WAITING' ? 'text-yellow-800' :
            submission.status === 'SELECTED' ? 'text-green-800' : 'text-red-800'
          }`}>
            {getStatusMessage(submission.status)}
          </p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Project Name</p>
                  <p className="text-gray-900">{submission.projectName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Theme</p>
                  <p className="text-gray-900">{formatTheme(submission.theme)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Project Type</p>
                  <p className="text-gray-900">{submission.type}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Guide Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{submission.guideName}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{submission.guidePhone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{submission.guideEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Project Ideology</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{submission.ideology}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Methodology</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{submission.methodology}</p>
            </div>
          </div>
        </div>

        {/* Submission Timeline */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Submission Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Submitted</p>
                <p className="text-sm text-gray-500">
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {submission.updatedAt.getTime() !== submission.createdAt.getTime() && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-sm text-gray-500">
                    {new Date(submission.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Project details cannot be modified after submission</li>
            <li>• You will be notified via email about any status updates</li>
            <li>• Keep checking this dashboard for real-time status updates</li>
            {submission.status === 'SELECTED' && (
              <li>• Check your email for next round instructions and deadlines</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
} 