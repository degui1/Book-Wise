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
  number_of_ratings: bigint
  total_pages: number
  categories: string
}[]

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json('Method not allowed', {
      status: 405,
    })
  }

  const url = new URL(req.url)

  const skip = Number(url.searchParams.get('skip'))
  const take = Number(url.searchParams.get('take'))
  const name = url.searchParams.get('name') || ''
  const categoryID = url.searchParams.get('categoryID') || null

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
      END AS hasRead,
      AVG(avg_ratings.rate) AS average_rate,
      COUNT(avg_ratings.id) AS number_of_ratings,
      books.total_pages,
      GROUP_CONCAT(categories.name, ',') AS categories
    FROM books
      LEFT JOIN ratings AS avg_ratings ON (books.id = avg_ratings.book_id)
      LEFT JOIN ratings AS user_ratings ON (books.id = user_ratings.book_id AND user_ratings.user_id = ${userID})
      INNER JOIN categoriesOnBooks ON categoriesOnBooks.book_id = books.id
      INNER JOIN categories ON categories.id = categoriesOnBooks.category_id
    WHERE
      books.name LIKE CONCAT('%', ${name}, '%')
      AND (${categoryID} IS NULL OR categoriesOnBooks.category_id = ${categoryID})
    GROUP BY
      books.id,
      books.name,
      books.author,
      books.cover_url,
      hasRead
    ${Prisma.raw(take > 0 ? `LIMIT ${take}` : '')}
    ${Prisma.raw(skip ? `OFFSET ${skip}` : '')}
  `)

  const books = rawBooks.map(
    ({
      hasRead,
      number_of_ratings: numberOfRatings,
      categories,
      ...params
    }) => ({
      ...params,
      hasRead: Boolean(hasRead),
      numberOfRatings: numberOfRatings.toString(),
      categories: categories.split(','),
    }),
  )

  return NextResponse.json({ books })
}
