import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { buildNextAuthOption } from '../../auth/[...nextauth]/route'
import { z } from 'zod'

const postReviewSchema = z.object({
  description: z.string(),
  rate: z.number().min(0).max(5),
  bookID: z.string().uuid(),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(buildNextAuthOption())

  const { bookID, description, rate } = postReviewSchema.parse(await req.json())

  if (!session) {
    return NextResponse.json(null, { status: 401 })
  }

  await prisma.rating.create({
    data: {
      description,
      rate,
      book_id: bookID,
      user_id: session.user.id,
    },
  })

  return NextResponse.json(null, { status: 201 })
}
