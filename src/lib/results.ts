import { db } from '@/lib/db'

export async function areResultsPublished(): Promise<boolean> {
  try {
    const latestPublication = await db.resultPublication.findFirst({
      orderBy: {
        publishedAt: 'desc'
      }
    })
    
    return !!latestPublication
  } catch (error) {
    console.error('Error checking result publication status:', error)
    return false
  }
}

export async function getLatestResultPublication() {
  try {
    return await db.resultPublication.findFirst({
      orderBy: {
        publishedAt: 'desc'
      },
      include: {
        publishedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  } catch (error) {
    console.error('Error fetching latest result publication:', error)
    return null
  }
}
