import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const status = searchParams.get('status')

    let whereClause: any = {}
    if (status && status !== 'all') {
      if (status === 'no-submission') {
        whereClause.projectIdea = null
      } else {
        whereClause.projectIdea = {
          status: status
        }
      }
    }

    const teams = await db.team.findMany({
      where: whereClause,
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        projectIdea: {
          select: {
            id: true,
            title: true,
            description: true,
            techStack: true,
            problemStatement: true,
            solution: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (format === 'csv') {
      // Generate CSV
      const csvHeader = [
        'Team Name',
        'College',
        'University', 
        'State',
        'Leader Name',
        'Leader Email',
        'Leader Phone',
        'Members Count',
        'Project Title',
        'Project Status',
        'Tech Stack',
        'Created At'
      ].join(',')

      const csvRows = teams.map(team => [
        `"${team.name}"`,
        `"${team.collegeName}"`,
        `"${team.university}"`,
        `"${team.state}"`,
        `"${team.leader.name || ''}"`,
        `"${team.leader.email || ''}"`,
        `"${team.leader.phone || ''}"`,
        team.numberOfMembers,
        `"${team.projectIdea?.title || 'No submission'}"`,
        `"${team.projectIdea?.status || 'No submission'}"`,
        `"${team.projectIdea?.techStack || ''}"`,
        `"${team.createdAt.toISOString()}"`
      ].join(','))

      const csv = [csvHeader, ...csvRows].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="teams-export-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // Return JSON format
    return NextResponse.json({ teams })

  } catch (error) {
    console.error('Error exporting teams:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
