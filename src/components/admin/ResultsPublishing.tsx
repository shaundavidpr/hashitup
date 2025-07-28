'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Trophy, Users, CheckCircle, Star, Megaphone } from 'lucide-react'
import { useState } from 'react'

interface ResultsPublishingProps {
  currentUser: {
    id: string
    name?: string | null
    email?: string | null
    role: string
  }
  stats: {
    acceptedTeams: number
    waitlistedTeams: number
    totalEvaluatedTeams: number
    totalTeams: number
  }
  latestPublication?: {
    id: string
    publishedAt: Date
    acceptedTeamsCount: number
    waitlistedTeamsCount: number
    totalNotifications: number
    publishedBy: {
      id: string
      name: string | null
      email: string | null
    }
  } | null
}

export function ResultsPublishing({ currentUser, stats, latestPublication }: ResultsPublishingProps) {
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishedAt, setPublishedAt] = useState<Date | null>(latestPublication?.publishedAt || null)

  const handlePublishResults = async () => {
    if (!confirm(
      `Are you sure you want to publish the results? This will:\n\n` +
      `• Send congratulation messages to ${stats.acceptedTeams} accepted teams\n` +
      `• Send waitlist notifications to ${stats.waitlistedTeams} waitlisted teams\n` +
      `• Make results visible on team dashboards\n\n` +
      `This action cannot be undone.`
    )) {
      return
    }

    setIsPublishing(true)
    try {
      const response = await fetch('/api/admin/publish-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publishedBy: currentUser.id
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setPublishedAt(new Date())
        alert(`Results published successfully! Notifications sent to ${data.notificationsSent} teams.`)
      } else {
        alert(`Failed to publish results: ${data.error}`)
      }
    } catch (error) {
      console.error('Error publishing results:', error)
      alert('Error publishing results')
    } finally {
      setIsPublishing(false)
    }
  }

  // Only super admins can publish results
  if (currentUser.role !== 'SUPERADMIN') {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <div className="flex items-center space-x-3">
          <Trophy className="h-6 w-6 text-red-600" />
          <div>
            <h3 className="font-semibold text-red-900">Results Publishing</h3>
            <p className="text-sm text-red-700">Only Super Admins can publish results.</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Trophy className="h-6 w-6 text-yellow-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Results Publishing</h3>
            <p className="text-sm text-gray-600">Publish evaluation results to teams</p>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalTeams}</div>
                <div className="text-xs text-gray-500">Total Teams</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.totalEvaluatedTeams}</div>
                <div className="text-xs text-blue-600">Evaluated</div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.acceptedTeams}</div>
                <div className="text-xs text-green-600">Accepted</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-900">{stats.waitlistedTeams}</div>
                <div className="text-xs text-yellow-600">Waitlisted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Publishing Action */}
        <div className="border-t pt-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ready to Publish Results?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Publishing results will make evaluation outcomes visible to teams on their dashboards. 
                This will send congratulation messages to accepted teams, waitlist notifications to waitlisted teams, 
                and make results visible on their dashboards.
              </p>
              
              {!publishedAt && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important:</strong> Teams can currently see their evaluation status internally, 
                    but results are not officially visible to them until you publish them here.
                  </p>
                </div>
              )}
            </div>

            {publishedAt ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <span className="font-medium block">
                      Results Published Successfully
                    </span>
                    <span className="text-sm text-green-700">
                      Published on {publishedAt.toLocaleString()} by {latestPublication?.publishedBy.name || 'Unknown'}
                    </span>
                  </div>
                </div>
                
                {latestPublication && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Publication Summary</h5>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Accepted:</span>
                        <span className="font-medium text-green-600 ml-1">{latestPublication.acceptedTeamsCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Waitlisted:</span>
                        <span className="font-medium text-yellow-600 ml-1">{latestPublication.waitlistedTeamsCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Notifications:</span>
                        <span className="font-medium text-blue-600 ml-1">{latestPublication.totalNotifications}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button
                  onClick={handlePublishResults}
                  disabled={isPublishing}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-3"
                >
                  <Megaphone className="h-5 w-5 mr-2" />
                  {isPublishing ? 'Publishing Results...' : 'Republish Results'}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handlePublishResults}
                disabled={isPublishing || stats.totalEvaluatedTeams === 0}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium px-6 py-3"
              >
                <Megaphone className="h-5 w-5 mr-2" />
                {isPublishing ? 'Publishing Results...' : 'Publish Results'}
              </Button>
            )}

            {stats.totalEvaluatedTeams === 0 && (
              <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                ⚠️ No teams have been evaluated yet. Complete evaluations before publishing results.
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
