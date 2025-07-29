import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// Get registration settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get the registration settings (there should only be one record)
    let settings = await db.registrationSettings.findFirst()
    
    // Create default settings if none exist
    if (!settings) {
      settings = await db.registrationSettings.create({
        data: {
          isRegistrationOpen: true,
          registrationEndDate: null,
        },
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error fetching registration settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Update registration settings
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { registrationEndDate, isRegistrationOpen } = body

    // Validate the data
    if (typeof isRegistrationOpen !== 'boolean') {
      return NextResponse.json({ error: 'isRegistrationOpen must be a boolean' }, { status: 400 })
    }

    if (registrationEndDate && new Date(registrationEndDate) <= new Date()) {
      return NextResponse.json({ error: 'Registration end date must be in the future' }, { status: 400 })
    }

    // Check if settings exist
    let settings = await db.registrationSettings.findFirst()

    if (settings) {
      // Update existing settings
      settings = await db.registrationSettings.update({
        where: { id: settings.id },
        data: {
          registrationEndDate: registrationEndDate ? new Date(registrationEndDate) : null,
          isRegistrationOpen,
        },
      })
    } else {
      // Create new settings
      settings = await db.registrationSettings.create({
        data: {
          registrationEndDate: registrationEndDate ? new Date(registrationEndDate) : null,
          isRegistrationOpen,
        },
      })
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error updating registration settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Check if registration is currently open (public endpoint for registration form)
export async function HEAD() {
  try {
    const settings = await db.registrationSettings.findFirst()
    
    // Default to open if no settings exist
    if (!settings) {
      return new NextResponse(null, { status: 200 })
    }

    // Check manual toggle
    if (!settings.isRegistrationOpen) {
      return new NextResponse(null, { status: 423 }) // 423 Locked
    }

    // Check automatic cutoff date
    if (settings.registrationEndDate && new Date() > settings.registrationEndDate) {
      return new NextResponse(null, { status: 423 }) // 423 Locked
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Error checking registration status:', error)
    return new NextResponse(null, { status: 500 })
  }
}
