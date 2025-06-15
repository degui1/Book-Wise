'use client'

import { WriteReview } from './components/WriteReview'
import { Comment } from './components/Comment'
import { useSession } from 'next-auth/react'
import { useSuspenseQueries } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Rating } from '@/components/Rating'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { ptBR } from 'date-fns/locale'

interface ReviewProps {
  bookID: string
}

type UserReviewResponse = {
  rate: number
  id: string
  description: string
  created_at: Date
} | null

interface IRatingDialogResponse {
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

export function Reviews({ bookID }: ReviewProps) {
  const { data: session } = useSession()

  const [
    {
      data: { ratings },
    },
    { data: userReview },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['reviewable-books-explorer-page', bookID],
        queryFn: async () => {
          const response = await api.get<IRatingDialogResponse>(
            `/explorer/${bookID}`,
          )

          return response.data
        },
      },
      {
        queryKey: ['get-user-review', bookID],
        async queryFn() {
          const response = await api.get<UserReviewResponse>(
            `/explorer/getUserReview/${bookID}`,
          )

          return response.data
        },
        retry: false,
      },
    ],
  })

  return (
    <>
      <div className="mb-4 mt-10 flex justify-between">
        <h2 className="text-sm text-gray-200">Avaliações</h2>
        <button className="flex items-center gap-2 text-sm font-bold text-purple-100">
          Avaliar
        </button>
      </div>

      <div className="space-y-3">
        {session && (
          <>
            {!userReview && <WriteReview bookID={bookID} />}

            {userReview && (
              <article className="space-y-5 rounded-lg bg-gray-700 p-6">
                <header className="flex gap-4">
                  <div className="flex items-center">
                    {session?.user.image && (
                      <Image
                        src={session?.user.image}
                        width={40}
                        height={40}
                        alt=""
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-lg font-bold text-gray-100">
                      {session?.user.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {formatDistanceToNow(userReview.created_at, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </p>
                  </div>

                  <Rating rate={userReview.rate} />
                </header>
                <section>
                  <p className="text-sm text-gray-300">
                    {userReview.description}
                  </p>
                </section>
              </article>
            )}
          </>
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
