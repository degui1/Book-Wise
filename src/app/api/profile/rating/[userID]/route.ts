import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export interface IRatedBook {
  bookName: string
  bookAuthor: string
  bookCoverURL: string
  rate: number
  description: string
}

export async function GET(
  req: NextRequest,
  { params }: { params: { userID: string } },
) {
  if (req.method !== 'GET') {
    return NextResponse.json('Method not allowed', {
      status: 405,
    })
  }

  const { userID } = params

  if (!userID) {
    return new NextResponse('UserID not provided', {
      status: 400,
    })
  }

  const ratings = await prisma.rating.findMany({
    where: {
      user_id: userID,
    },
    include: { book: true },
  })

  if (!ratings) {
    return NextResponse.json({ ratedBooks: [] })
  }

  const ratedBooks: IRatedBook[] = ratings.map((rating) => ({
    bookName: rating.book.name,
    bookAuthor: rating.book.author,
    bookCoverURL: rating.book.cover_url,
    rate: rating.rate,
    description: rating.description,
  }))

  return NextResponse.json({ ratedBooks })
}
