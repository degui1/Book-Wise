import type { Adapter, AdapterUser, AdapterAccount } from 'next-auth/adapters'
import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user: Omit<AdapterUser, 'id'>) {
      return await prisma.user.create({
        data: {
          name: user.name ?? '',
          email: user.email,
          emailVerified: user.emailVerified,
          avatar_url: user.image,
        },
      })
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        image: user.avatar_url,
        emailVerified: user.emailVerified,
        name: user.name,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        image: user.avatar_url,
        emailVerified: user.emailVerified,
        name: user.name,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        email: user.email,
        image: user.avatar_url,
        emailVerified: user.emailVerified,
        name: user.name,
      }
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        data: {
          name: user.name ?? '',
          email: user.email,
          emailVerified: user.emailVerified,
        },
        where: {
          id: user.id,
        },
      })

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.avatar_url,
        emailVerified: updatedUser.emailVerified,
      }
    },

    // async deleteUser(userId) {},

    async linkAccount(account: AdapterAccount) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          access_token: account.access_token,
          expires_at: account.expires_at,
          id_token: account.id_token,
          refresh_token: account.refresh_token,
          scope: account.scope,
          session_state: account.session_state,
          token_type: account.token_type,
        },
      })
    },

    // async unlinkAccount({ providerAccountId, provider }) {},

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          session_token: sessionToken,
          expires,
        },
      })

      return { sessionToken, userId, expires }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findFirst({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) return null

      const { user, ...session } = prismaSession

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
        user: {
          image: user.avatar_url,
          email: user.email,
          id: user.id,
          emailVerified: user.emailVerified,
          name: user.name,
        },
      }
    },

    async updateSession({ sessionToken, expires, userId }) {
      const prismaSession = await prisma.session.update({
        data: {
          session_token: sessionToken,
          expires,
          user_id: userId,
        },
        where: {
          session_token: sessionToken,
        },
      })

      return {
        expires: prismaSession.expires,
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
      }
    },
    // async createVerificationToken({ identifier, expires, token }) {},
    // async useVerificationToken({ identifier, token }) {},
  }
}
