'use client'

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

export function SubmissionStatus({ submission, isLeader }: SubmissionStatusProps) {
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'WAITING':
        return <Clock className="h-6 w-6 text-yellow-400" />
      case 'SELECTED':
        return <CheckCircle className="h-6 w-6 text-green-400" />
      case 'REJECTED':
        return <XCircle className="h-6 w-6 text-red-400" />
      default:
        return <Clock className="h-6 w-6 text-slate-400" />
    }
  }

  const getStatusGradient = (status: Status) => {
    switch (status) {
      case 'WAITING':
        return 'from-yellow-500/20 to-amber-600/20 text-yellow-300 border-yellow-400/30'
      case 'SELECTED':
        return 'from-green-500/20 to-emerald-600/20 text-green-300 border-green-400/30'
      case 'REJECTED':
        return 'from-red-500/20 to-rose-600/20 text-red-300 border-red-400/30'
      default:
        return 'from-slate-500/20 to-slate-600/20 text-slate-300 border-slate-400/30'
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
    <div className="backdrop-blur-sm bg-slate-900/40 rounded-xl border border-slate-700/50 shadow-lg relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="px-6 py-6 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Project Submission
          </h2>
          <div className="flex items-center space-x-3">
            {getStatusIcon(submission.status)}
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${getStatusGradient(submission.status)} backdrop-blur-sm border`}>
              {submission.status}
            </span>
          </div>
        </div>

        {/* Status Message */}
        <div className={`rounded-lg p-4 mb-6 bg-slate-800/30 border ${
          submission.status === 'WAITING' ? 'border-yellow-500/30' :
          submission.status === 'SELECTED' ? 'border-green-500/30' : 'border-red-500/30'
        } backdrop-blur-sm`}>
          <p className={`text-sm ${
            submission.status === 'WAITING' ? 'text-yellow-300' :
            submission.status === 'SELECTED' ? 'text-green-300' : 'text-red-300'
          }`}>
            {getStatusMessage(submission.status)}
          </p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-2 inline-block"></span>
                Project Information
              </h3>
              <div className="space-y-3 bg-slate-800/20 rounded-lg p-4 backdrop-blur-sm border border-slate-700/50">
                <div>
                  <p className="text-sm font-medium text-slate-400">Project Name</p>
                  <p className="text-white font-medium">{submission.projectName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Theme</p>
                  <p className="text-white">{formatTheme(submission.theme)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Project Type</p>
                  <p className="text-white">{submission.type}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-b from-pink-400 to-purple-500 rounded-full mr-2 inline-block"></span>
                Guide Information
              </h3>
              <div className="space-y-3 bg-slate-800/20 rounded-lg p-4 backdrop-blur-sm border border-slate-700/50">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-slate-700/50 mr-3">
                    <User className="h-4 w-4 text-pink-400" />
                  </div>
                  <span className="text-white">{submission.guideName}</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-slate-700/50 mr-3">
                    <Phone className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-white">{submission.guidePhone}</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-slate-700/50 mr-3">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white">{submission.guideEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full mr-2 inline-block"></span>
              Project Ideology
            </h3>
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-slate-300 whitespace-pre-wrap">{submission.ideology}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full mr-2 inline-block"></span>
              Methodology
            </h3>
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-slate-300 whitespace-pre-wrap">{submission.methodology}</p>
            </div>
          </div>
        </div>

        {/* Submission Timeline */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-2 inline-block"></span>
            Submission Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-center bg-slate-800/20 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
              <div className="p-2 rounded-full bg-slate-700/50 mr-3">
                <Calendar className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Submitted</p>
                <p className="text-sm text-slate-400">
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {submission.updatedAt.getTime() !== submission.createdAt.getTime() && (
              <div className="flex items-center bg-slate-800/20 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
                <div className="p-2 rounded-full bg-slate-700/50 mr-3">
                  <Calendar className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Last Updated</p>
                  <p className="text-sm text-slate-400">
                    {new Date(submission.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-blue-900/20 backdrop-blur-sm rounded-lg p-5 border border-blue-500/30">
          <h4 className="font-medium text-blue-300 mb-3 flex items-center">
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Information
          </h4>
          <ul className="text-sm text-blue-200 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Project details cannot be modified after submission
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              You will be notified via email about any status updates
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Keep checking this dashboard for real-time status updates
            </li>
            {submission.status === 'SELECTED' && (
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                Check your email for next round instructions and deadlines
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}