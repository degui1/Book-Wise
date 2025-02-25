'use client'

import { Rating } from '@/components/Rating'
import { Records } from '@/components/Records'
import { Bookmark, BookOpen, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { WriteReview } from './WriteReview'
import { Comment } from './Commnet'
import { useSession } from 'next-auth/react'
import { SafeSuspense } from '@/components/SafeSuspense'

interface ReviewableDialogContentProps {
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

export function ReviewableDialogContent({
  book,
  ratings,
}: ReviewableDialogContentProps) {
  const { data: session } = useSession()

  return (
    <>
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
          <Image src={book.coverUrl} alt="" width={171} height={242} />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-100">{book.name}</h1>
            <h2 className="text-gray-300">{book.author}</h2>

            <div className="mt-auto">
              <Rating rate={book.averageRate} />
              <span className="text-sm text-gray-400">
                {book.numberOfRatings} avaliações
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-gray-600 py-6">
          <Records
            title="Categoria"
            description={book.category.join(', ')}
            icon={Bookmark}
          />

          <Records
            title="Páginas"
            description={String(book.totalPages)}
            icon={BookOpen}
          />
        </div>
      </div>

      <div className="mb-4 mt-10 flex justify-between">
        <h2 className="text-sm text-gray-200">Avaliações</h2>
        <button className="flex items-center gap-2 text-sm font-bold text-purple-100">
          Avaliar
        </button>
      </div>

      <div className="space-y-3">
        {session && (
          <SafeSuspense fallback={<div>Loading...</div>}>
            <WriteReview />
          </SafeSuspense>
        )}

        {ratings.map((rating) => {
          return (
            <Comment
              key={rating.id}
              avatarUrl={rating.user.avatar_url}
              createdAt={rating.created_at}
              description={rating.description}
              rate={rating.rate}
              username={rating.user.name}
            />
          )
        })}
      </div>
    </>
  )
}
