import { CheckCircle, Clock, FileText, UserCheck, Users, XCircle } from 'lucide-react'

interface AdminStatsProps {
  stats: {
    totalTeams: number
    totalUsers: number
    totalSubmissions: number
    selectedSubmissions: number
    rejectedSubmissions: number
    waitingSubmissions: number
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statCards = [
    {
      title: 'Total Teams',
      value: stats.totalTeams,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Participants',
      value: stats.totalUsers,
      icon: UserCheck,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions,
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Waiting Review',
      value: stats.waitingSubmissions,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Selected Projects',
      value: stats.selectedSubmissions,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Rejected Projects',
      value: stats.rejectedSubmissions,
      icon: XCircle,
      color: 'bg-red-100 text-red-600',
      bgColor: 'bg-red-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
} 