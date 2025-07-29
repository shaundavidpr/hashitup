'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { toast } from 'sonner'

interface RegistrationSettings {
  id?: string
  registrationEndDate?: string
  isRegistrationOpen: boolean
}

interface RegistrationManagementProps {
  initialSettings?: RegistrationSettings
}

export function RegistrationManagement({ initialSettings }: RegistrationManagementProps) {
  const [settings, setSettings] = useState<RegistrationSettings>(
    initialSettings || {
      isRegistrationOpen: true,
      registrationEndDate: ''
    }
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/registration-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationEndDate: settings.registrationEndDate || null,
          isRegistrationOpen: settings.isRegistrationOpen,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update registration settings')
      }

      const data = await response.json()
      setSettings(data.settings)
      toast.success('Registration settings updated successfully!')
    } catch (error) {
      console.error('Error updating registration settings:', error)
      toast.error('Failed to update registration settings')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRegistration = () => {
    setSettings(prev => ({
      ...prev,
      isRegistrationOpen: !prev.isRegistrationOpen
    }))
  }

  const clearEndDate = () => {
    setSettings(prev => ({
      ...prev,
      registrationEndDate: ''
    }))
  }

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toISOString().slice(0, 16)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registration Management</h2>
          <p className="text-gray-600 mt-2">
            Control when new team registrations are allowed
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Registration Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Registration Status</h3>
            
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                onClick={toggleRegistration}
                className={`px-6 py-2 rounded-lg font-medium ${
                  settings.isRegistrationOpen
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {settings.isRegistrationOpen ? 'Registration Open' : 'Registration Closed'}
              </Button>
              
              <span className="text-sm text-gray-600">
                {settings.isRegistrationOpen 
                  ? 'New teams can register and create accounts'
                  : 'New team registration is disabled'
                }
              </span>
            </div>
          </div>

          {/* Registration End Date */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Automatic Registration Cutoff</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="registrationEndDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Registration End Date & Time (Optional)
                </label>
                <Input
                  type="datetime-local"
                  id="registrationEndDate"
                  value={formatDateTime(settings.registrationEndDate)}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    registrationEndDate: e.target.value
                  }))}
                  className="max-w-md"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Registration will automatically close at this date and time
                </p>
              </div>

              {settings.registrationEndDate && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Registration closes: {new Date(settings.registrationEndDate).toLocaleString()}
                  </span>
                  <Button
                    type="button"
                    onClick={clearEndDate}
                    variant="outline"
                    size="sm"
                  >
                    Clear Date
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Current Status Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Current Settings Summary</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                • Registration Status: {' '}
                <span className={settings.isRegistrationOpen ? 'text-green-600' : 'text-red-600'}>
                  {settings.isRegistrationOpen ? 'Open' : 'Closed'}
                </span>
              </li>
              <li>
                • Automatic Cutoff: {' '}
                {settings.registrationEndDate 
                  ? new Date(settings.registrationEndDate).toLocaleString()
                  : 'Not set'
                }
              </li>
              <li className="text-gray-500">
                • Existing teams can always access their dashboard regardless of registration status
              </li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Updating...
                </>
              ) : (
                'Update Settings'
              )}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}
