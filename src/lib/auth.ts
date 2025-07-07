import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await db.user.findFirst({
            where: {
              email: user.email || '',
            },
            include: {
              accounts: true,
              leadingTeam: true,
            }
          })

          if (!existingUser) {
            // Check if this is the first admin user (will be superadmin)
            const adminCount = await db.user.count({
              where: {
                role: { in: ['ADMIN', 'SUPERADMIN'] }
              }
            })

            const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
            const isAdmin = adminEmails.includes(user.email!)
            
            // If this is the first admin, make them a superadmin
            const role = adminCount === 0 && isAdmin ? 'SUPERADMIN' : isAdmin ? 'ADMIN' : 'MEMBER'

            // Create the user
            const newUser = await db.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                role,
              },
            })

            // Also create the account link
            await db.account.create({
              data: {
                userId: newUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            })

            return true
          }

          // If user exists but doesn't have this account linked, link it
          const hasAccount = existingUser.accounts.some(
            (acc) => acc.provider === account.provider && acc.providerAccountId === account.providerAccountId
          )

          if (!hasAccount) {
            await db.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            })
          }

          return true
        } catch (error) {
          console.error('Error during sign in:', error)
          return false
        }
      }
      return true
    },
    async session({ session, token, user }) {
      if (session.user) {
        const dbUser = await db.user.findUnique({
          where: { email: session.user.email! },
          include: {
            leadingTeam: true,
            memberOfTeam: true,
          },
        })

        if (dbUser) {
          session.user.id = dbUser.id
          session.user.role = dbUser.role
          session.user.teamId = dbUser.teamId
          session.user.leadingTeam = dbUser.leadingTeam
          session.user.memberOfTeam = dbUser.memberOfTeam
        }
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      // Special handling for first-time users
      if (url.startsWith('/api/auth/callback')) {
        const user = await db.user.findFirst({
          where: { email: token?.email },
          include: { leadingTeam: true, memberOfTeam: true }
        })
        
        // If user has no team association, redirect to team creation
        if (user && !user.leadingTeam && !user.memberOfTeam && user.role !== 'ADMIN') {
          return `${baseUrl}/dashboard`
        }
      }

      // Default redirect logic
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else if (url.startsWith(baseUrl)) {
        return url
      }
      return baseUrl
    }
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