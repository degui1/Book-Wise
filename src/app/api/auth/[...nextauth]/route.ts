import { PrismaAdapter } from '@/lib/auth/prisma-adapter'

import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export function buildNextAuthOption(): NextAuthOptions {
  return {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(),
    session: {
      strategy: 'database',
    },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID ?? '',
        clientSecret: process.env.GITHUB_SECRET ?? '',
      }),
    ],
    callbacks: {
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

const handler = NextAuth(buildNextAuthOption())

export { handler as GET, handler as POST }
