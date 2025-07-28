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

    // Only admins can export data
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'teams'

    if (type === 'teams') {
      // Export teams data
      const teams = await db.team.findMany({
        include: {
          leader: {
            select: {
              name: true,
              email: true,
            },
          },
          members: {
            select: {
              name: true,
              email: true,
            },
          },
          projectIdea: {
            select: {
              title: true,
              description: true,
              techStack: true,
              status: true,
              createdAt: true,
            },
          },
        },
      })

      // Convert to CSV format
      const headers = [
        'Team Name',
        'College Name',
        'University',
        'Address',
        'State',
        'Number of Members',
        'Leader Name',
        'Leader Email',
        'Member Names',
        'Member Emails',
        'Project Name',
        'Project Theme',
        'Project Type',
        'Submission Status',
        'Submission Date',
        'Team Created At',
      ]

      const csvData = teams.map((team: any) => [
        team.name,
        team.collegeName,
        team.university,
        team.address,
        team.state,
        team.numberOfMembers,
        team.leader.name || '',
        team.leader.email || '',
        team.members.map((m: any) => m.name).join('; '),
        team.members.map((m: any) => m.email).join('; '),
        team.submission?.projectName || '',
        team.submission?.theme || '',
        team.submission?.type || '',
        team.submission?.status || '',
        team.submission?.createdAt?.toISOString() || '',
        team.createdAt.toISOString(),
      ])

      // Create CSV content
      const csvContent = [headers, ...csvData]
        .map((row: any[]) => row.map((field: any) => `"${field}"`).join(','))
        .join('\n')

      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="teams_data.csv"',
        },
      })
    } else if (type === 'submissions') {
      // Export submissions data
      const submissions = await db.projectIdea.findMany({
        include: {
          team: {
            include: {
              leader: {
                select: {
                  name: true,
                  email: true,
                },
              },
              members: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      })

      const headers = [
        'Team Name',
        'Project Name',
        'Theme',
        'Type',
        'Ideology',
        'Methodology',
        'Guide Name',
        'Guide Phone',
        'Guide Email',
        'Status',
        'Leader Name',
        'Leader Email',
        'Member Names',
        'Member Emails',
        'Submitted At',
        'Updated At',
      ]

      const csvData = submissions.map((submission: any) => [
        submission.team.name,
        submission.projectName,
        submission.theme,
        submission.type,
        submission.ideology,
        submission.methodology,
        submission.guideName,
        submission.guidePhone,
        submission.guideEmail,
        submission.status,
        submission.team.leader.name || '',
        submission.team.leader.email || '',
        submission.team.members.map((m: any) => m.name).join('; '),
        submission.team.members.map((m: any) => m.email).join('; '),
        submission.createdAt.toISOString(),
        submission.updatedAt.toISOString(),
      ])

      const csvContent = [headers, ...csvData]
        .map((row: any[]) => row.map((field: any) => `"${field}"`).join(','))
        .join('\n')

      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="submissions_data.csv"',
        },
      })
    }

    return NextResponse.json({ error: 'Invalid export type' }, { status: 400 })
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 