import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export interface IRatedBook {
  bookName: string
  bookAuthor: string
  bookCoverURL: string
  rate: number
  description: string
  createdAt: Date
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userID: string }> },
) {
  if (req.method !== 'GET') {
    return NextResponse.json('Method not allowed', {
      status: 405,
    })
  }

  const { userID } = await params

  const url = new URL(req.url)

  const filter = url.searchParams.get('book') || ''

  if (!userID) {
    return new NextResponse('UserID not provided', {
      status: 400,
    })
  }

  const ratings = await prisma.rating.findMany({
    where: {
      user_id: userID,
      AND: {
        book: {
          name: { contains: filter },
        },
      },
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
    createdAt: rating.created_at,
  }))

  return NextResponse.json({ ratedBooks })
}
