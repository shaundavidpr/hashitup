import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendBulkEmail } from '@/lib/email'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Only admins can send bulk emails
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN') {
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
            where: { role: { in: ['LEADER', 'MEMBER'] } },
          })
          recipients = allMembers.map((user: any) => user.email!).filter(Boolean)
          break

        case 'selected_teams':
          const selectedIdeas = await db.projectIdea.findMany({
            where: { status: 'ACCEPTED' },
            include: {
              team: {
                include: {
                  leader: true,
                  members: true,
                },
              },
            },
          })
          recipients = selectedIdeas.flatMap((idea: any) => [
            idea.team.leader.email!,
            ...idea.team.members.map((member: any) => member.email!),
          ]).filter(Boolean)
          break

        case 'rejected_teams':
          const rejectedIdeas = await db.projectIdea.findMany({
            where: { status: 'REJECTED' },
            include: {
              team: {
                include: {
                  leader: true,
                  members: true,
                },
              },
            },
          })
          recipients = rejectedIdeas.flatMap((idea: any) => [
            idea.team.leader.email!,
            ...idea.team.members.map((member: any) => member.email!),
          ]).filter(Boolean)
          break

        case 'waiting_teams':
          const waitingIdeas = await db.projectIdea.findMany({
            where: { status: 'PENDING' },
            include: {
              team: {
                include: {
                  leader: true,
                  members: true,
                },
              },
            },
          })
          recipients = waitingIdeas.flatMap((idea: any) => [
            idea.team.leader.email!,
            ...idea.team.members.map((member: any) => member.email!),
          ]).filter(Boolean)
          break

        case 'teams_without_submission':
          const teamsWithIdeas = await db.projectIdea.findMany({
            select: { teamId: true },
          })
          const submittedTeamIds = teamsWithIdeas.map((s: any) => s.teamId)
          
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
