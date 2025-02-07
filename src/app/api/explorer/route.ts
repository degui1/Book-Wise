import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { buildNextAuthOption } from '../auth/[...nextauth]/route'

export type IRawBookResponse = {
  id: string
  name: string
  author: string
  cover_url: string
  hasRead: bigint
  average_rate: number
}[]

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json('Method not allowed', {
      status: 405,
    })
  }

  const url = new URL(req.url)

  const skip = Number(url.searchParams.get('skip')) || 0
  const take = Number(url.searchParams.get('take')) || 10
  const name = url.searchParams.get('name') || ''
  const category = url.searchParams.get('category') || ''

  const session = await getServerSession(buildNextAuthOption())

  const userID = session?.user.id || 0

  const rawBooks = await prisma.$queryRaw<IRawBookResponse>(Prisma.sql`
    SELECT
      books.id,
      books.name,
      books.author,
      books.cover_url,
      CASE
        WHEN user_ratings.user_id IS NOT NULL THEN TRUE
        ELSE FALSE 
      END as hasRead,
      AVG(avg_ratings.rate) as average_rate
    FROM books
      LEFT JOIN ratings as avg_ratings ON (books.id = avg_ratings.book_id)
      LEFT JOIN ratings AS user_ratings ON (books.id = user_ratings.book_id AND user_ratings.user_id = ${userID})
    WHERE
      books.name LIKE CONCAT('%', ${name}, '%')
      AND EXISTS (
        SELECT 1
        FROM categoriesOnBooks
        INNER JOIN categories ON (categoriesOnBooks.category_id = categories.id)
        WHERE
          categories.name LIKE CONCAT('%', ${category}, '%')
      )
    GROUP BY
      books.id,
      books.name,
      books.author,
      books.cover_url,
      hasRead
    LIMIT ${take} 
    OFFSET ${skip}
  `)

  const books = rawBooks.map(({ hasRead, ...params }) => ({
    ...params,
    hasRead: Boolean(hasRead),
  }))

  return NextResponse.json({ books })
}
