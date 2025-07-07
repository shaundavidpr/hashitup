'use client'

import { Button } from '@/components/ui/Button'
import { Download, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const handleExport = async (type: 'teams' | 'submissions') => {
    try {
      const response = await fetch(`/api/admin/export?type=${type}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${type}_data.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to export data')
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data')
    }
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Code<span className="text-blue-600">N</span>Chip
            </h1>
            <span className="ml-4 text-sm text-gray-500">
              Admin Panel
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Admin Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Administrator
            </span>
            
            {/* Export Actions */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleExport('teams')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Teams
              </Button>
              <Button
                onClick={() => handleExport('submissions')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Submissions
              </Button>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.name || 'User'}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <Button
                onClick={() => signOut()}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 