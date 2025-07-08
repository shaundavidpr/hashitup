import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function makeSuperAdmin(email: string) {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.error(`User with email ${email} not found`)
      return
    }

    // Update the user's role to SUPERADMIN
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: 'SUPERADMIN' },
    })

    console.log(`Successfully made ${updatedUser.email} a superadmin`)
  } catch (error) {
    console.error('Error making superadmin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Get email from command line argument
const email = process.argv[2]

if (!email) {
  console.error('Please provide an email address')
  process.exit(1)
}

makeSuperAdmin(email)
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  }) 