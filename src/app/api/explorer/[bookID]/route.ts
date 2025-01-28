import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type IRawBook = {
  categoryName: string
  total_pages: number
  number_of_ratings: bigint
  average_rate: number
  cover_url: string
  bookName: string
  author: string
}[]

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bookID: string }> },
) {
  const { bookID } = await params

  const rawBook = await prisma.$queryRaw<IRawBook>(Prisma.sql`
    SELECT 
      categories.name as categoryName,
      books.total_pages,
      books.name as bookName,
      books.cover_url,
      books.author,
      COUNT(ratings.id) AS number_of_ratings,
      AVG(ratings.rate) as average_rate
    FROM books
      INNER JOIN categoriesOnBooks ON (categoriesOnBooks.book_id = books.id)
      INNER JOIN categories ON (categories.id = categoriesOnBooks.category_id)
      LEFT JOIN ratings ON (ratings.book_id = books.id)
    WHERE 
      books.id = ${bookID}
    GROUP BY
      categories.name
  `)

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
    book: {
      category: rawBook.map(({ categoryName }) => categoryName),
      totalPages: rawBook[0]?.total_pages || 0,
      numberOfRatings: rawBook[0]?.number_of_ratings.toString() || '0',
      averageRate: rawBook[0]?.average_rate || 0,
      name: rawBook[0]?.categoryName || '',
      coverUrl: rawBook[0]?.cover_url || '',
      author: rawBook[0]?.author || '',
    },
    ratings: rawRatings,
  })
}
