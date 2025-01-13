import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
// import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

function buildNextAuthOption(): NextAuthOptions {
  return {
    adapter: PrismaAdapter(),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID ?? '',
        clientSecret: process.env.GITHUB_SECRET ?? '',
      }),
    ],
  }
}

const handler = NextAuth(buildNextAuthOption())

export { handler as GET, handler as POST }

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   return await NextAuth(req, res, buildNextAuthOption())
// }
