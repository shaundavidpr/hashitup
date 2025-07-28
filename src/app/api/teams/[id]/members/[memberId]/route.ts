import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  try {
    const { id, memberId } = await params
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
      include: { leader: true }
    })
    if (!team) {
      return new NextResponse('Team not found', { status: 404 })
    }
    
    // Only team leader can update member information
    if (team.leaderId !== currentUser.id) {
      return new NextResponse('Forbidden', { status: 403 })
    }
    
    const body = await request.json()
    const { name, email, phone } = body
    
    const updatedMember = await db.user.update({
      where: { id: memberId },
      data: {
        name,
        email,
        phone
      }
    })
    
    return NextResponse.json(updatedMember)
  } catch (error) {
    console.error('[MEMBER_UPDATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 
