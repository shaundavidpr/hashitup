'use client'

import { Button } from '@/components/ui/Button'
import { CheckCircle, Mail, Send, XCircle } from 'lucide-react'
import { useState } from 'react'

export function BulkEmailForm() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    targetGroup: '',
    customEmails: '',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    totalRecipients?: number
    successful?: number
    failed?: number
  } | null>(null)

  const targetGroups = [
    { value: 'all_leaders', label: 'All Team Leaders' },
    { value: 'all_members', label: 'All Participants' },
    { value: 'selected_teams', label: 'Selected Teams' },
    { value: 'rejected_teams', label: 'Rejected Teams' },
    { value: 'waiting_teams', label: 'Teams Waiting for Review' },
    { value: 'teams_without_submission', label: 'Teams Without Submission' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const customEmails = formData.customEmails
        .split(',')
        .map(email => email.trim())
        .filter(email => email && email.includes('@'))

      const response = await fetch('/api/admin/bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: formData.subject,
          message: formData.message,
          targetGroup: formData.targetGroup,
          customEmails: customEmails.length > 0 ? customEmails : undefined,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          totalRecipients: data.totalRecipients,
          successful: data.successful,
          failed: data.failed,
        })
        // Reset form on success
        setFormData({
          subject: '',
          message: '',
          targetGroup: '',
          customEmails: '',
        })
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to send bulk email',
        })
      }
    } catch (error) {
      console.error('Error sending bulk email:', error)
      setResult({
        success: false,
        message: 'Failed to send bulk email. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-6">
          <Mail className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Bulk Email System</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Group *
              </label>
              <select
                required
                value={formData.targetGroup}
                onChange={(e) => handleChange('targetGroup', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select target group</option>
                {targetGroups.map((group) => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Emails (Optional)
              </label>
              <input
                type="text"
                value={formData.customEmails}
                onChange={(e) => handleChange('customEmails', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email1@example.com, email2@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple emails with commas
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message. You can use HTML formatting."
            />
            <p className="text-xs text-gray-500 mt-1">
              HTML formatting is supported (e.g., &lt;strong&gt;, &lt;br&gt;, etc.)
            </p>
          </div>

          {/* Email Preview */}
          {formData.subject && formData.message && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Email Preview</h4>
              <div className="border border-gray-200 rounded bg-white p-4">
                <div className="mb-2">
                  <strong>Subject:</strong> {formData.subject}
                </div>
                <div className="border-t pt-2">
                  <div dangerouslySetInnerHTML={{ __html: formData.message }} />
                </div>
              </div>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className={`rounded-lg p-4 ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mr-2" />
                )}
                <div>
                  <p className={`text-sm font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                  {result.success && result.totalRecipients && (
                    <div className="text-sm text-green-700 mt-1">
                      <p>Total Recipients: {result.totalRecipients}</p>
                      <p>Successfully Sent: {result.successful}</p>
                      <p>Failed: {result.failed}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Bulk Email
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Email Templates */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Welcome Template</h4>
              <p className="text-sm text-gray-600 mb-3">
                Welcome email for new team registrations
              </p>
              <Button
                onClick={() => {
                  setFormData({
                    ...formData,
                    subject: 'Welcome to CodeNChip Hackathon!',
                    message: `<h2>Welcome to CodeNChip Hackathon!</h2>
<p>Dear Team Leader,</p>
<p>Your team has been successfully registered for the CodeNChip National Hackathon.</p>
<p>Next steps:</p>
<ul>
  <li>Complete your project submission</li>
  <li>Ensure all team members are registered</li>
  <li>Prepare for the hackathon event</li>
</ul>
<p>Best regards,<br>CodeNChip Team</p>`,
                  })
                }}
                variant="outline"
                size="sm"
              >
                Use Template
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Status Update Template</h4>
              <p className="text-sm text-gray-600 mb-3">
                Template for project status updates
              </p>
              <Button
                onClick={() => {
                  setFormData({
                    ...formData,
                    subject: 'Project Status Update - CodeNChip Hackathon',
                    message: `<h2>Project Status Update</h2>
<p>Dear Team,</p>
<p>Your project submission has been reviewed and the status has been updated.</p>
<p>Please check your dashboard for the latest status and any additional instructions.</p>
<p>If you have any questions, please don't hesitate to contact us.</p>
<p>Best regards,<br>CodeNChip Team</p>`,
                  })
                }}
                variant="outline"
                size="sm"
              >
                Use Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 