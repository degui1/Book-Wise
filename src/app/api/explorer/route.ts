import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json('Method not allowed', {
      status: 405,
    })
  }

  // const { userID } = await params
  const url = new URL(req.url)

  const skip = Number(url.searchParams.get('skip')) || 0
  const take = Number(url.searchParams.get('take')) || 10
  const name = url.searchParams.get('name') || ''
  const category = url.searchParams.get('category') || ''

  const books = await prisma.book.findMany({
    skip,
    take,
    select: {
      name: true,
      author: true,
      cover_url: true,
      id: true,
    },
    where: {
      name: {
        contains: name,
      },
      categories: {
        some: {
          category: {
            name: {
              contains: category,
            },
          },
        },
      },
    },
  })

  return NextResponse.json({ books })
}
