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

  // const { userID } = params

  // if (!userID) {
  //   return new NextResponse('UserID not provided', {
  //     status: 400,
  //   })
  // }

  const response = await prisma.$queryRaw`
    SELECT
      COALESCE(SUM(ratings.id), 0) as total_ratings
      COALESCE(SUM(books.total_pages), 0) as total_pages,
      COUNT(books.id) as total_read_books
    FROM books
    INNER JOIN ratings ON (ratings.book_id = books.id)
    GROUP BY
      books.id
  `

  return NextResponse.json({ teste: '', response })
}
