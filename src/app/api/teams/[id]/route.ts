import { authOptions, canAccessTeam } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teamId = params.id

    // Check if user can access this team
    const hasAccess = await canAccessTeam(session.user.id, teamId)
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const team = await db.team.findUnique({
      where: { id: teamId },
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
        submission: true,
      },
    })

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    // Get team member details
    const teamMembers = await db.teamMember.findMany({
      where: { teamId },
    })

    return NextResponse.json({ team, teamMembers })
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teamId = params.id
    const body = await request.json()

    // Check if user is the team leader
    const team = await db.team.findUnique({
      where: { id: teamId },
      include: { leader: true },
    })

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    if (team.leaderId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only team leaders can update team details' }, { status: 403 })
    }

    const updatedTeam = await db.team.update({
      where: { id: teamId },
      data: body,
    })

    return NextResponse.json({ team: updatedTeam })
  } catch (error) {
    console.error('Error updating team:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 