import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bookID: string }> },
) {
  const { bookID } = await params

  const rawRatings = await prisma.rating.findMany({
    where: {
      book_id: bookID,
    },
    select: {
      id: true,
      created_at: true,
      description: true,
      rate: true,
      user_id: true,
      user: {
        select: { avatar_url: true, name: true },
      },
    },
  })

  return NextResponse.json({
    ratings: rawRatings,
  })
}
