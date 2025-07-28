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
      name,
      collegeName,
      university,
      address,
      state,
      numberOfMembers,
      leaderPhone,
      members,
    } = body

    // Check if user is already a team leader
    const existingTeam = await db.team.findFirst({
      where: { leaderId: session.user.id },
    })

    if (existingTeam) {
      return NextResponse.json({ error: 'User is already a team leader' }, { status: 400 })
    }

    // Check if user is already a member of another team
    const existingMembership = await db.user.findUnique({
      where: { id: session.user.id },
      include: { memberOfTeam: true },
    })

    if (existingMembership?.memberOfTeam) {
      return NextResponse.json({ error: 'User is already a member of another team' }, { status: 400 })
    }

    // Create team
    const team = await db.team.create({
      data: {
        name,
        collegeName,
        university,
        address,
        state,
        numberOfMembers,
        leaderId: session.user.id,
      },
    })

    // Update user role to LEADER and add phone number
    await db.user.update({
      where: { id: session.user.id },
      data: { 
        role: 'LEADER',
        phone: leaderPhone,
      },
    })

    // Create team member records
    if (members && members.length > 0) {
      await db.teamMember.createMany({
        data: members.map((member: any) => ({
          name: member.name,
          email: member.email,
          phone: member.phone,
          teamId: team.id,
        })),
      })
    }

    // Send welcome email
    const emailTemplate = emailTemplates.teamCreated(team.name, session.user.name || 'Team Leader')
    await sendEmail({
      to: session.user.email!,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    return NextResponse.json({ team }, { status: 201 })
  } catch (error) {
    console.error('Error creating team:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(_request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can view all teams
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const teams = await db.team.findMany({
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
        projectIdea: true,
      },
    })

    return NextResponse.json({ teams })
  } catch (error) {
    console.error('Error fetching teams:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 