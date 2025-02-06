import Image from 'next/image'

import { Rating } from '@/components/Rating'
import * as Dialog from '@radix-ui/react-dialog'

import { Records } from '@/components/Records'
import { WriteReview } from './components/WriteReview'
import { Comment } from './components/Commnet'
import { Bookmark, BookOpen, X } from '@/components/Icons'
import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'

interface IRatingDialogResponse {
  book: {
    category: string[]
    totalPages: number
    numberOfRatings: number
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
  bookID: string
}

export function ReviewableBookCard({ bookID }: BookCardProps) {
  const { data: session } = useSession()

  const {
    data: { book, ratings },
  } = useSuspenseQuery({
    queryKey: ['reviewable-books-explorer-page', bookID],
    queryFn: async () => {
      const response = await api.get<IRatingDialogResponse>(
        `/explorer/${bookID}`,
      )

      return response.data
    },
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <article className="relative flex gap-5 overflow-hidden rounded-lg bg-gray-700 px-5 py-4">
          <div className="absolute right-0 top-0 rounded-bl-sm bg-green-300 px-3 py-1 text-xs uppercase text-green-100">
            lido
          </div>
          <Image src={book.coverUrl} alt="" width={64} height={94} />
          <div className="space-y-8">
            <header className="flex flex-col">
              <h4 className="font-bold text-gray-100">{book.name}</h4>
              <p className="text-sm text-gray-400">{book.author}</p>
            </header>

            <Rating rate={book.averageRate} />
          </div>
        </article>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 flex min-h-screen w-full max-w-screen-sm flex-col bg-gray-800 px-12 py-16">
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
            {session && <WriteReview />}

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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
