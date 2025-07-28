import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get user from database using email to ensure we have the correct ID
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser) {
      return new NextResponse('User not found', { status: 404 })
    }

    const team = await db.team.findUnique({
      where: { id },
      include: { members: true }
    })
    if (!team) {
      return new NextResponse('Team not found', { status: 404 })
    }
    
    // Check if user is part of the team
    const isMember = team.members.some((member: any) => member.id === currentUser.id) || team.leaderId === currentUser.id
    if (!isMember) {
      return new NextResponse('Forbidden', { status: 403 })
    }
    
    const body = await request.json()
    const { title, description, techStack, problemStatement, solution, isDraft = true } = body
    
    const projectIdea = await db.projectIdea.create({
      data: {
        title,
        description,
        techStack,
        problemStatement,
        solution,
        teamId: id,
        submittedById: currentUser.id,
        status: 'PENDING',
        isDraft,
      },
    })
    
    return NextResponse.json(projectIdea)
  } catch (error) {
    console.error('[PROJECT_IDEA_CREATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get user from database using email to ensure we have the correct ID
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser) {
      return new NextResponse('User not found', { status: 404 })
    }

    const team = await db.team.findUnique({
      where: { id },
      include: { members: true, projectIdea: true }
    })
    if (!team) {
      return new NextResponse('Team not found', { status: 404 })
    }
    
    // Check if user is part of the team
    const isMember = team.members.some((member: any) => member.id === currentUser.id) || team.leaderId === currentUser.id
    if (!isMember) {
      return new NextResponse('Forbidden', { status: 403 })
    }
    
    if (!team.projectIdea) {
      return new NextResponse('No project idea found', { status: 404 })
    }

    // Check if project is already submitted (not a draft)
    if (!team.projectIdea.isDraft) {
      return new NextResponse('Cannot edit submitted project', { status: 403 })
    }

    const body = await request.json()
    const { title, description, techStack, problemStatement, solution, isDraft = true } = body

    const updatedProjectIdea = await db.projectIdea.update({
      where: { id: team.projectIdea.id },
      data: {
        title,
        description,
        techStack,
        problemStatement,
        solution,
        updatedById: currentUser.id,
        isDraft,
      }
    })
    return NextResponse.json(updatedProjectIdea)
  } catch (error) {
    console.error('[PROJECT_IDEA_UPDATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const team = await db.team.findUnique({
      where: { id },
      include: { projectIdea: true }
    })
    if (!team) {
      return new NextResponse('Team not found', { status: 404 })
    }
    return NextResponse.json(team.projectIdea)
  } catch (error) {
    console.error('[PROJECT_IDEA_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
