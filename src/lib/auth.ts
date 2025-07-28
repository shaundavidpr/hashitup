import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from './db'

console.log('Initializing NextAuth v4 with environment variables:')
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set')
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set')
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set')

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists, if not create them
        const existingUser = await db.user.findUnique({
          where: { email: user.email! }
        })
        
        if (!existingUser) {
          // Check if this email is in any team member list
          const teamMember = await db.teamMember.findFirst({
            where: { email: user.email! }
          })
          
          let userData: any = {
            email: user.email!,
            name: user.name,
            image: user.image,
            role: 'USER' // Default role
          }
          
          // If they're a team member, assign them to that team
          if (teamMember) {
            userData.teamId = teamMember.teamId
            userData.phone = teamMember.phone // Use phone from team member record
            userData.name = teamMember.name || user.name // Use team member name if provided
          }
          
          // Create new user
          await db.user.create({
            data: userData
          })
        } else if (!existingUser.teamId) {
          // User exists but not assigned to team yet, check if they should be
          const teamMember = await db.teamMember.findFirst({
            where: { email: user.email! }
          })
          
          if (teamMember) {
            // Update existing user to assign them to the team
            await db.user.update({
              where: { email: user.email! },
              data: {
                teamId: teamMember.teamId,
                phone: teamMember.phone,
                name: teamMember.name || existingUser.name
              }
            })
          }
        }
        
        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return true // Still allow sign in even if DB operation fails
      }
    },
    async session({ session, token }) {
      if (session.user?.email) {
        try {
          // Get user from database to get the latest role and info
          const dbUser = await db.user.findUnique({
            where: { email: session.user.email }
          })
          
          if (dbUser) {
            session.user.id = dbUser.id
            session.user.role = dbUser.role as any // Cast to avoid type issues
          }
        } catch (error) {
          console.error('Error in session callback:', error)
          // Fallback values if DB query fails
          session.user.id = token.sub!
          session.user.role = 'USER'
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)

// Helper function to check if user is admin
export const isAdmin = (userEmail: string): boolean => {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  return adminEmails.includes(userEmail)
}

// Helper function to check if user can access team
export const canAccessTeam = async (userId: string, teamId: string): Promise<boolean> => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      leadingTeam: true,
      memberOfTeam: true,
    },
  })

  if (!user) return false
  if (user.role === 'ADMIN' || user.role === 'SUPERADMIN') return true
  if (user.leadingTeam?.id === teamId) return true
  if (user.memberOfTeam?.id === teamId) return true

  return false
}