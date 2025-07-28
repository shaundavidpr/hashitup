import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { emailTemplates, sendEmail } from '@/lib/email'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// Define enums locally
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can update submission status
    if (session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const submissionId = id
    const body = await request.json()
    const { status } = body

    // Validate status
    if (!Object.values(SubmissionStatus).includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    // Get submission with team details
    const submission = await db.projectIdea.findUnique({
      where: { id: submissionId },
      include: {
        team: {
          include: {
            leader: true,
            members: true,
          },
        },
      },
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    // Update submission status
    const updatedSubmission = await db.projectIdea.update({
      where: { id: submissionId },
      data: { status },
    })

    // Send status update email to team leader
    const emailTemplate = emailTemplates.statusUpdate(
      submission.team.name,
      submission.title,
      status
    )
    
    await sendEmail({
      to: submission.team.leader.email!,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    return NextResponse.json({ submission: updatedSubmission })
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 