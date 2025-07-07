import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const team = await db.team.findUnique({
      where: { id: params.id },
      include: { members: true }
    })

    if (!team) {
      return new NextResponse('Team not found', { status: 404 })
    }

    // Check if user is part of the team
    const isMember = team.members.some(member => member.id === session.user.id) || team.leaderId === session.user.id
    if (!isMember) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const body = await request.json()
    const { title, description, techStack, problemStatement, solution } = body

    const projectIdea = await db.projectIdea.create({
      data: {
        title,
        description,
        techStack,
        problemStatement,
        solution,
        teamId: team.id,
        submittedById: session.user.id
      }
    })

    return NextResponse.json(projectIdea)
  } catch (error) {
    console.error('[PROJECT_IDEA_CREATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const team = await db.team.findUnique({
      where: { id: params.id },
      include: { members: true, projectIdea: true }
    })

    if (!team) {
      return new NextResponse('Team not found', { status: 404 })
    }

    // Check if user is part of the team
    const isMember = team.members.some(member => member.id === session.user.id) || team.leaderId === session.user.id
    if (!isMember) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const body = await request.json()
    const { title, description, techStack, problemStatement, solution } = body

    const updatedIdea = await db.projectIdea.update({
      where: { teamId: team.id },
      data: {
        title,
        description,
        techStack,
        problemStatement,
        solution,
        updatedById: session.user.id
      }
    })

    return NextResponse.json(updatedIdea)
  } catch (error) {
    console.error('[PROJECT_IDEA_UPDATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const team = await db.team.findUnique({
      where: { id: params.id },
      include: { members: true, projectIdea: true }
    })

    if (!team) {
      return new NextResponse('Team not found', { status: 404 })
    }

    // Check if user is part of the team
    const isMember = team.members.some(member => member.id === session.user.id) || team.leaderId === session.user.id
    if (!isMember) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    return NextResponse.json(team.projectIdea)
  } catch (error) {
    console.error('[PROJECT_IDEA_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 