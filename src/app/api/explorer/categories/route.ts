import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json('Method not allowed', {
      status: 405,
    })
  }

  const categories = await prisma.category.findMany()

  return NextResponse.json({ categories })
}
