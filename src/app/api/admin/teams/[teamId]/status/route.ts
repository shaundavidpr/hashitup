import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { status } = await request.json()

    if (!status || !['ACCEPTED', 'REJECTED', 'WAITLIST', 'PENDING'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const { teamId } = params

    // Find the team's project idea and update its status
    const team = await db.team.findUnique({
      where: { id: teamId },
      include: { projectIdea: true }
    })

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    if (!team.projectIdea) {
      return NextResponse.json({ error: 'Team has no project submission' }, { status: 400 })
    }

    // Update the project idea status
    const updatedProjectIdea = await db.projectIdea.update({
      where: { id: team.projectIdea.id },
      data: { 
        status: status as any,
        updatedById: session.user.id
      }
    })

    return NextResponse.json({ 
      success: true, 
      projectIdea: updatedProjectIdea 
    })

  } catch (error) {
    console.error('Error updating team status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
