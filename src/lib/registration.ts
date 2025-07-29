import { db } from './db'

export async function isRegistrationOpen(): Promise<boolean> {
  try {
    const settings = await db.registrationSettings.findFirst()
    
    // Default to open if no settings exist
    if (!settings) {
      return true
    }

    // Check manual toggle
    if (!settings.isRegistrationOpen) {
      return false
    }

    // Check automatic cutoff date
    if (settings.registrationEndDate && new Date() > settings.registrationEndDate) {
      return false
    }

    return true
  } catch (error) {
    console.error('Error checking registration status:', error)
    // Default to closed on error to be safe
    return false
  }
}

export async function getRegistrationSettings() {
  try {
    const settings = await db.registrationSettings.findFirst()
    return settings
  } catch (error) {
    console.error('Error fetching registration settings:', error)
    return null
  }
}
