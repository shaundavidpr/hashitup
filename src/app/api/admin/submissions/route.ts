import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// Get all submissions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only superadmin and admins can view submissions
    if (session.user.role !== 'SUPERADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const projectIdeas = await db.projectIdea.findMany({
      include: {
        team: {
          include: {
            leader: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        submittedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        updatedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ projectIdeas })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 