'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import React, { Suspense, useState } from 'react'
import { ReviewableDialogContent } from './components/ReviewableDialogContent'

interface IRatingDialogResponse {
  book: {
    category: string[]
    totalPages: number
    numberOfRatings: string
    averageRate: number
    name: string
    coverUrl: string
    author: string
  }
  ratings: {
    id: string
    rate: number
    description: string
    created_at: Date
    user_id: string
    user: {
      avatar_url: string
      name: string
    }
  }[]
}

interface BookCardProps {
  children: React.ReactNode
  bookID: string
}

export function ReviewableBookCard({ children, bookID }: BookCardProps) {
  const [isDialogActive, setIsDialogActive] = useState(false)

  const {
    data: { book, ratings },
  } = useQuery({
    queryKey: ['reviewable-books-explorer-page', bookID],
    queryFn: async () => {
      const response = await api.get<IRatingDialogResponse>(
        `/explorer/${bookID}`,
      )

      return response.data
    },
    enabled: isDialogActive,
    initialData: {
      book: {
        author: '',
        averageRate: 0,
        category: [],
        coverUrl: '',
        name: '',
        numberOfRatings: '',
        totalPages: 0,
      },
      ratings: [],
    },
  })

  return (
    <Dialog.Root onOpenChange={(open) => setIsDialogActive(open)}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 flex max-h-screen w-full max-w-screen-sm flex-col overflow-y-auto bg-gray-800 px-12 py-16">
          <Suspense fallback={<div>Loading...</div>}>
            <ReviewableDialogContent book={book} ratings={ratings} />
          </Suspense>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
