import { db } from '../src/lib/db'

async function makeAdmin() {
  try {
    const email = 'justinebijupaul@gmail.com' // Your email from .env
    
    console.log(`Making ${email} an admin...`)

    const user = await db.user.upsert({
      where: { email },
      update: { role: 'ADMIN' },
      create: {
        email,
        name: 'Admin User',
        role: 'ADMIN',
      },
    })

    console.log('✅ Admin user created/updated successfully!')
    console.log(`User: ${user.name} (${user.email})`)
    console.log(`Role: ${user.role}`)
    
  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    await db.$disconnect()
  }
}

makeAdmin()
