import type { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    createUser: async (user) => {},

    async getUser(id) {
      const user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: '',
        emailVerified: null,
        image: user.avatar_url,
        name: user.name,
      }
    },
  }
}
