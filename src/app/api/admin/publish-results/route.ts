import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only super admins can publish results
    if (session.user.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Only Super Admins can publish results' }, { status: 403 })
    }

    const { publishedBy } = await request.json()

    // Get all teams with evaluated (non-draft) submissions
    const acceptedTeams = await db.team.findMany({
      where: {
        projectIdea: {
          isDraft: false,
          status: 'ACCEPTED'
        }
      },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        projectIdea: {
          select: {
            title: true,
            status: true
          }
        }
      }
    })

    const waitlistedTeams = await db.team.findMany({
      where: {
        projectIdea: {
          isDraft: false,
          status: 'WAITLIST'
        }
      },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        projectIdea: {
          select: {
            title: true,
            status: true
          }
        }
      }
    })

    // Here you would typically:
    // 1. Send congratulation emails to accepted teams
    // 2. Send waitlist notifications to waitlisted teams
    // 3. Update a "results_published" flag in the database
    // 4. Log the publication event

    // For now, we'll just simulate the notification sending
    const acceptedNotifications = acceptedTeams.map(team => ({
      teamId: team.id,
      teamName: team.name,
      leaderEmail: team.leader.email,
      projectTitle: team.projectIdea?.title,
      status: 'ACCEPTED',
      message: `Congratulations! Your team "${team.name}" has been accepted for the hackathon. Your project idea "${team.projectIdea?.title}" impressed our judges!`
    }))

    const waitlistNotifications = waitlistedTeams.map(team => ({
      teamId: team.id,
      teamName: team.name,
      leaderEmail: team.leader.email,
      projectTitle: team.projectIdea?.title,
      status: 'WAITLIST',
      message: `Thank you for your submission! Your team "${team.name}" has been waitlisted. We'll notify you if a spot becomes available.`
    }))

    // Log the publication event
    const publicationRecord = await db.resultPublication.create({
      data: {
        publishedById: publishedBy,
        acceptedTeamsCount: acceptedTeams.length,
        waitlistedTeamsCount: waitlistedTeams.length,
        rejectedTeamsCount: 0, // We'll add this if needed
        totalNotifications: acceptedTeams.length + waitlistedTeams.length
      }
    })

    // TODO: Implement actual email sending logic here
    // For now, we'll just return the notifications that would be sent

    return NextResponse.json({
      success: true,
      message: 'Results published successfully',
      notificationsSent: publicationRecord.totalNotifications,
      acceptedTeams: acceptedNotifications,
      waitlistedTeams: waitlistNotifications,
      publicationRecord: {
        id: publicationRecord.id,
        publishedAt: publicationRecord.publishedAt,
        acceptedTeamsCount: publicationRecord.acceptedTeamsCount,
        waitlistedTeamsCount: publicationRecord.waitlistedTeamsCount,
        totalNotifications: publicationRecord.totalNotifications
      }
    })

  } catch (error) {
    console.error('Error publishing results:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
