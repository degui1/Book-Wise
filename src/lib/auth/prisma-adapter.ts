import type { Adapter, AdapterUser } from 'next-auth/adapters'
import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user: Omit<AdapterUser, 'id'>) {
      return await prisma.user.create({
        data: {
          name: user.name ?? '',
          email: user.email,
          emailVerified: user.emailVerified,
          avatar_url: user.avatar_url,
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
        avatar_url: user.avatar_url,
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
        avatar_url: user.avatar_url,
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
        avatar_url: user.avatar_url,
        emailVerified: user.emailVerified,
        name: user.name,
      }
    },
    // async updateUser(user) {
    //   const updatedUser = await prisma.user.update({
    //     data: {
    //       name: user.name,
    //     },
    //   })
    // },
    // async deleteUser(userId) {},
    // async linkAccount(account) {},
    // async unlinkAccount({ providerAccountId, provider }) {},
    // async createSession({ sessionToken, userId, expires }) {},
    // async getSessionAndUser(sessionToken) {},
    // async updateSession({ sessionToken }) {},
    // async deleteSession(sessionToken) {},
    // async createVerificationToken({ identifier, expires, token }) {},
    // async useVerificationToken({ identifier, token }) {},
  }
}
