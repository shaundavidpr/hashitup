import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// Add new deadline
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only superadmin and admins can add deadlines
    if (session.user.role !== 'SUPERADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { name, startDate, endDate } = body

    const deadline = await db.deadline.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdById: session.user.id
      }
    })

    return NextResponse.json({ deadline })
  } catch (error) {
    console.error('Error adding deadline:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get all deadlines
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only superadmin and admins can view deadlines
    if (session.user.role !== 'SUPERADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const deadlines = await db.deadline.findMany({
      orderBy: {
        startDate: 'asc'
      }
    })

    return NextResponse.json({ deadlines })
  } catch (error) {
    console.error('Error fetching deadlines:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 