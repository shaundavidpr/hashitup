import 'next-auth'

type Role = 'ADMIN' | 'SUPERADMIN' | 'LEADER' | 'MEMBER' | 'USER'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: Role
      teamId?: string | null
      leadingTeam?: any
      memberOfTeam?: any
    }
  }

  interface User {
    id: string
    role: Role
    teamId?: string | null
    leadingTeam?: any
    memberOfTeam?: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
    teamId?: string | null
  }
} 