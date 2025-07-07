import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendBulkEmail } from '@/lib/email'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// Define enums locally since Prisma client might not be generated yet
enum Role {
  ADMIN = 'ADMIN',
  LEADER = 'LEADER',
  MEMBER = 'MEMBER'
}

enum SubmissionStatus {
  WAITING = 'WAITING',
  SELECTED = 'SELECTED',
  REJECTED = 'REJECTED'
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can send bulk emails
    if (session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { subject, message, targetGroup, customEmails } = body

    let recipients: string[] = []

    if (targetGroup) {
      switch (targetGroup) {
        case 'all_leaders':
          const allLeaders = await db.team.findMany({
            include: { leader: true },
          })
          recipients = allLeaders.map((team: any) => team.leader.email!).filter(Boolean)
          break

        case 'all_members':
          const allMembers = await db.user.findMany({
            where: { role: { in: [Role.LEADER, Role.MEMBER] } },
          })
          recipients = allMembers.map((user: any) => user.email!).filter(Boolean)
          break

        case 'selected_teams':
          const selectedSubmissions = await db.projectSubmission.findMany({
            where: { status: SubmissionStatus.SELECTED },
            include: {
              team: {
                include: {
                  leader: true,
                  members: true,
                },
              },
            },
          })
          recipients = selectedSubmissions.flatMap((submission: any) => [
            submission.team.leader.email!,
            ...submission.team.members.map((member: any) => member.email!),
          ]).filter(Boolean)
          break

        case 'rejected_teams':
          const rejectedSubmissions = await db.projectSubmission.findMany({
            where: { status: SubmissionStatus.REJECTED },
            include: {
              team: {
                include: {
                  leader: true,
                  members: true,
                },
              },
            },
          })
          recipients = rejectedSubmissions.flatMap((submission: any) => [
            submission.team.leader.email!,
            ...submission.team.members.map((member: any) => member.email!),
          ]).filter(Boolean)
          break

        case 'waiting_teams':
          const waitingSubmissions = await db.projectSubmission.findMany({
            where: { status: SubmissionStatus.WAITING },
            include: {
              team: {
                include: {
                  leader: true,
                  members: true,
                },
              },
            },
          })
          recipients = waitingSubmissions.flatMap((submission: any) => [
            submission.team.leader.email!,
            ...submission.team.members.map((member: any) => member.email!),
          ]).filter(Boolean)
          break

        case 'teams_without_submission':
          const teamsWithSubmission = await db.projectSubmission.findMany({
            select: { teamId: true },
          })
          const submittedTeamIds = teamsWithSubmission.map((s: any) => s.teamId)
          
          const teamsWithoutSubmission = await db.team.findMany({
            where: { id: { notIn: submittedTeamIds } },
            include: {
              leader: true,
              members: true,
            },
          })
          recipients = teamsWithoutSubmission.flatMap((team: any) => [
            team.leader.email!,
            ...team.members.map((member: any) => member.email!),
          ]).filter(Boolean)
          break

        default:
          return NextResponse.json({ error: 'Invalid target group' }, { status: 400 })
      }
    }

    // Add custom emails if provided
    if (customEmails && customEmails.length > 0) {
      recipients = [...recipients, ...customEmails]
    }

    // Remove duplicates
    recipients = [...new Set(recipients)]

    if (recipients.length === 0) {
      return NextResponse.json({ error: 'No recipients found' }, { status: 400 })
    }

    // Send bulk email
    const result = await sendBulkEmail({
      recipients,
      subject,
      html: message,
    })

    return NextResponse.json({
      message: 'Bulk email sent successfully',
      totalRecipients: recipients.length,
      successful: result.success,
      failed: result.failed,
    })
  } catch (error) {
    console.error('Error sending bulk email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 