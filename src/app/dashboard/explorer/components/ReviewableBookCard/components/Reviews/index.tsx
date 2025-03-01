'use client'

import { WriteReview } from '../WriteReview'
import { Comment } from '../Comment'
import { useSession } from 'next-auth/react'
import { useSuspenseQueries } from '@tanstack/react-query'
import { api } from '@/lib/axios'

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
        queryKey: ['user-write-review', bookID],
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
        {session && <WriteReview userReview={userReview} />}

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
