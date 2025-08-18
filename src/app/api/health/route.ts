// Health check endpoint for Docker containers
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Check database connection
    await db.$queryRaw`SELECT 1`
    
    // Check if the application is ready
    const timestamp = new Date().toISOString()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp,
      service: 'hash2k25',
      version: process.env.npm_package_version || '1.13.6',
      uptime: process.uptime(),
      database: 'connected'
    }, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'hash2k25',
      error: error instanceof Error ? error.message : 'Unknown error',
      database: 'disconnected'
    }, { status: 503 })
  }
}
