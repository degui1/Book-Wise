import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export type IRawResponse = Array<{
  total_ratings: bigint
  total_pages: bigint
  total_read_books: bigint
  most_read_category: string
  name: string
  created_at: Date
  avatar_url: string
}>

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

  if (!userID) {
    return new NextResponse('UserID not provided', {
      status: 400,
    })
  }

  const rawResponse = await prisma.$queryRaw<IRawResponse>(Prisma.sql`
    SELECT
      COUNT(ratings.id) as total_ratings,
      COALESCE(SUM(books.total_pages), 0) as total_pages,
      COUNT(books.id) as total_read_books,
      (
        SELECT categories.name
        FROM categories
          INNER JOIN categoriesOnBooks ON (categoriesOnBooks.category_id = categories.id)
          INNER JOIN books ON (books.id = categoriesOnBooks.book_id)
          INNER JOIN ratings ON (ratings.book_id = books.id)
        WHERE
          ratings.user_id = ${userID}
        GROUP BY
          categories.name
        ORDER BY COUNT(ratings.id) DESC
        LIMIT 1
      ) as most_read_category,
      users.name,
      users.created_at,
      users.avatar_url
    FROM users
      LEFT JOIN ratings ON (ratings.user_id = users.id)
      LEFT JOIN books ON (books.id = ratings.book_id)
    WHERE
      users.id = ${userID}
    GROUP BY
      ratings.user_id
  `)

  return NextResponse.json({
    total_ratings: rawResponse[0]?.total_ratings.toString() || '',
    total_pages: rawResponse[0]?.total_pages.toString() || '',
    total_read_books: rawResponse[0]?.total_read_books.toString() || '',
    most_read_category: rawResponse[0]?.most_read_category || '',
    name: rawResponse[0]?.name || '',
    created_at: rawResponse[0]?.created_at || null,
    avatar_url: rawResponse[0]?.avatar_url || '',
  })
}
