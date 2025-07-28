import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { emailTemplates, sendEmail } from '@/lib/email'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      teamId,
      title,
      description,
      techStack,
      problemStatement,
      solution,
    } = body

    // Check if user is team leader or admin
    const team = await db.team.findUnique({
      where: { id: teamId },
      include: { leader: true },
    })

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    if (team.leaderId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only team leaders can submit projects' }, { status: 403 })
    }

    // Check if submission already exists
    const existingSubmission = await db.projectIdea.findUnique({
      where: { teamId },
    })

    if (existingSubmission) {
      return NextResponse.json({ error: 'Team has already submitted a project' }, { status: 400 })
    }

    // Create submission
    const submission = await db.projectIdea.create({
      data: {
        teamId,
        title,
        description,
        techStack,
        problemStatement,
        solution,
        submittedById: session.user.id,
        status: 'PENDING',
      },
    })

    // Send confirmation email
    const emailTemplate = emailTemplates.submissionReceived(team.name, title)
    await sendEmail({
      to: team.leader.email!,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    return NextResponse.json({ submission }, { status: 201 })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(_request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can view all submissions
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const submissions = await db.projectIdea.findMany({
      include: {
        team: {
          include: {
            leader: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            members: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 