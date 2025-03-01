import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { buildNextAuthOption } from '../../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bookID: string }> },
) {
  const session = await getServerSession(buildNextAuthOption())
  const { bookID } = await params

  if (!session) {
    return NextResponse.json(null)
  }

  const userReview = await prisma.rating.findFirst({
    where: {
      user_id: session.user.id,
      AND: {
        book_id: bookID,
      },
    },
    select: {
      description: true,
      rate: true,
      created_at: true,
      id: true,
    },
  })

  return NextResponse.json(userReview)
}
