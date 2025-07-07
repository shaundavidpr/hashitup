import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// Add new admin
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only superadmin and admins can add new admins
    if (session.user.role !== 'SUPERADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { email } = body

    // Check if user exists
    let user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Regular admins cannot modify other admins or create superadmins
    if (session.user.role === 'ADMIN' && (user.role === 'ADMIN' || user.role === 'SUPERADMIN')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Update user role to admin
    user = await db.user.update({
      where: { email },
      data: {
        role: 'ADMIN',
        addedById: session.user.id
      }
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error adding admin:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get all admins
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only superadmin and admins can view admin list
    if (session.user.role !== 'SUPERADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const admins = await db.user.findMany({
      where: {
        role: { in: ['ADMIN', 'SUPERADMIN'] }
      },
      include: {
        addedByAdmin: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ admins })
  } catch (error) {
    console.error('Error fetching admins:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Remove admin
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only superadmin and admins can remove admins
    if (session.user.role !== 'SUPERADMIN' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(request.url)
    const email = url.searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Get user to remove
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Regular admins cannot remove other admins or superadmins
    if (session.user.role === 'ADMIN' && (user.role === 'ADMIN' || user.role === 'SUPERADMIN')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Cannot remove superadmin
    if (user.role === 'SUPERADMIN') {
      return NextResponse.json({ error: 'Cannot remove superadmin' }, { status: 403 })
    }

    // Update user role back to MEMBER
    await db.user.update({
      where: { email },
      data: {
        role: 'MEMBER',
        addedById: null
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing admin:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 