'use client'

import { Card } from '@/components/ui/Card'
import { Trophy, Star, Clock, CheckCircle, Sparkles } from 'lucide-react'

interface ProjectResultsProps {
  projectIdea: {
    id: string
    title: string
    status: string
    isDraft: boolean
  } | null
}

export function ProjectResults({ projectIdea }: ProjectResultsProps) {
  if (!projectIdea || projectIdea.isDraft) {
    return null
  }

  const getResultsContent = () => {
    switch (projectIdea.status) {
      case 'ACCEPTED':
        return {
          icon: <Trophy className="h-8 w-8 text-yellow-500" />,
          title: '🎉 Congratulations! Your Team Has Been Accepted!',
          message: `We're thrilled to inform you that your project "${projectIdea.title}" has been accepted for the hackathon! Your innovative idea impressed our judges.`,
          bgColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          borderColor: 'border-yellow-400',
          textColor: 'text-yellow-900',
          nextSteps: [
            'Check your email for detailed instructions and event schedule',
            'Join our communication channels for team coordination',
            'Prepare your development environment and tools',
            'Get ready to build something amazing!'
          ]
        }
      
      case 'WAITLIST':
        return {
          icon: <Star className="h-8 w-8 text-yellow-600" />,
          title: '⭐ You\'re on the Waitlist!',
          message: `Thank you for your excellent submission! Your project "${projectIdea.title}" has been waitlisted. We'll notify you immediately if a spot becomes available.`,
          bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100',
          borderColor: 'border-yellow-300',
          textColor: 'text-yellow-800',
          nextSteps: [
            'Keep an eye on your email for updates',
            'Continue refining your project idea',
            'Stay connected with our community',
            'We appreciate your interest and will keep you posted!'
          ]
        }
      
      case 'REJECTED':
        return {
          icon: <Clock className="h-8 w-8 text-gray-600" />,
          title: 'Thank You for Your Submission',
          message: `We appreciate your interest in our hackathon. While your project "${projectIdea.title}" wasn't selected this time, we encourage you to keep building and apply for future events.`,
          bgColor: 'bg-gradient-to-r from-gray-100 to-gray-200',
          borderColor: 'border-gray-300',
          textColor: 'text-gray-700',
          nextSteps: [
            'Don\'t give up! Keep developing your skills',
            'Join our community for learning opportunities',
            'Look out for future hackathons and events',
            'Consider this feedback for your next submission'
          ]
        }
      
      case 'PENDING':
        return {
          icon: <Clock className="h-8 w-8 text-blue-600" />,
          title: 'Evaluation in Progress',
          message: `Your project "${projectIdea.title}" is currently being reviewed by our judges. Results will be announced soon!`,
          bgColor: 'bg-gradient-to-r from-blue-100 to-indigo-100',
          borderColor: 'border-blue-300',
          textColor: 'text-blue-800',
          nextSteps: [
            'Results will be announced soon',
            'Keep an eye on your email and dashboard',
            'Use this time to prepare for the event',
            'Thank you for your patience!'
          ]
        }
      
      default:
        return null
    }
  }

  const results = getResultsContent()
  if (!results) return null

  return (
    <Card className={`p-6 ${results.bgColor} ${results.borderColor} border-2 mb-8 overflow-hidden relative`}>
      {/* Decorative elements for accepted teams */}
      {projectIdea.status === 'ACCEPTED' && (
        <div className="absolute top-0 right-0 p-4">
          <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          {results.icon}
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${results.textColor} mb-2`}>
              {results.title}
            </h3>
            <p className={`${results.textColor} leading-relaxed`}>
              {results.message}
            </p>
          </div>
        </div>

        <div className={`border-t border-opacity-30 pt-4 ${results.textColor.replace('text-', 'border-')}`}>
          <h4 className={`font-semibold ${results.textColor} mb-2`}>Next Steps:</h4>
          <ul className="space-y-1">
            {results.nextSteps.map((step, index) => (
              <li key={index} className={`flex items-start space-x-2 ${results.textColor}`}>
                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
