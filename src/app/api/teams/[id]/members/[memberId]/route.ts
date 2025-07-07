import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; memberId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const team = await db.team.findUnique({
      where: { id: params.id },
      include: { leader: true }
    })

    if (!team) {
      return new NextResponse('Team not found', { status: 404 })
    }

    // Only team leader can update member information
    if (team.leaderId !== session.user.id) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const body = await request.json()
    const { name, email, phone } = body

    const updatedMember = await db.user.update({
      where: { id: params.memberId },
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