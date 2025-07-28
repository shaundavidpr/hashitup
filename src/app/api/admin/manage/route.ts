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

    // Get user from database using email to ensure we have the correct ID
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser) {
      return NextResponse.json({ error: 'Current user not found in database' }, { status: 404 })
    }

    // Only superadmin and admins can add new admins
    if (currentUser.role !== 'SUPERADMIN' && currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if user exists
    let user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: `User with email ${email} not found in database` }, { status: 404 })
    }

    // Regular admins cannot modify other admins or create superadmins
    if (currentUser.role === 'ADMIN' && (user.role === 'ADMIN' || user.role === 'SUPERADMIN')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Update user role to admin
    user = await db.user.update({
      where: { email },
      data: {
        role: 'ADMIN',
        addedById: currentUser.id
      }
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error adding admin:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Get all admins
export async function GET(_request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database using email to ensure we have the correct ID
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Only superadmin and admins can view admin list
    if (currentUser.role !== 'SUPERADMIN' && currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const admins = await db.user.findMany({
      where: {
        role: {
          in: ['ADMIN', 'SUPERADMIN']
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        addedById: true,
        addedBy: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
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

    // Get user from database using email to ensure we have the correct ID
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email! }
    })

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Only superadmin can remove admins
    if (currentUser.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Only superadmin can remove admins' }, { status: 403 })
    }

    const body = await request.json()
    const { email } = body

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Cannot remove self
    if (user.email === currentUser.email) {
      return NextResponse.json({ error: 'Cannot remove yourself' }, { status: 400 })
    }

    // Update user role back to member
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