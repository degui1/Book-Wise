'use client'

import * as Dialog from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { Reviews } from './components/Reviews'
import Image from 'next/image'
import { Rating } from '@/components/Rating'
import { Records } from '@/components/Records'
import { Bookmark, BookOpen, X } from '@phosphor-icons/react'
import { ReviewsLoading } from './components/Reviews/Reviews.loading'
import { SafeSuspense } from '@/components/SafeSuspense'

interface BookCardProps {
  children: React.ReactNode
  book: {
    hasRead: boolean
    numberOfRatings: string
    categories: string[]
    id: string
    name: string
    author: string
    cover_url: string
    average_rate: number
    total_pages: number
  }
}

export function ReviewableBookCard({ children, book }: BookCardProps) {
  const [isDialogActive, setIsDialogActive] = useState(false)

  return (
    <Dialog.Root
      onOpenChange={(open) => setIsDialogActive(open)}
      open={isDialogActive}
    >
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 flex h-full max-h-screen w-full max-w-screen-sm flex-col overflow-y-auto bg-gray-800 px-12 py-16">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold text-gray-100">
              Deixe seu comentário
            </Dialog.Title>
            <Dialog.Close className="group rounded p-2">
              <X className="h-6 w-6 text-gray-400 group-hover:text-gray-300" />
            </Dialog.Close>
          </div>

          <div className="space-y-10 rounded-lg bg-gray-700 px-8 py-6">
            <div className="flex gap-8">
              <Image src={book.cover_url} alt="" width={171} height={242} />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-100">{book.name}</h1>
                <h2 className="text-gray-300">{book.author}</h2>

                <div className="mt-auto">
                  <Rating rate={book.average_rate} />
                  <span className="text-sm text-gray-400">
                    {book.numberOfRatings} avaliações
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-600 py-6">
              <Records
                title="Categoria"
                description={book.categories.join(', ')}
                icon={Bookmark}
              />

              <Records
                title="Páginas"
                description={String(book.total_pages)}
                icon={BookOpen}
              />
            </div>
          </div>
          <SafeSuspense fallback={<ReviewsLoading />}>
            <Reviews bookID={book.id} />
          </SafeSuspense>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
