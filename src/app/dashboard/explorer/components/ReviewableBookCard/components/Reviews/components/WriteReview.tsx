import { Rating } from '@/components/Rating'
import { Check, X } from '@/components/Icons'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface UserReviewResponseProps {
  bookID: string
}

export function WriteReview({ bookID }: UserReviewResponseProps) {
  const [rate, setRate] = useState(0)
  const { data: session } = useSession()
  const [review, setReview] = useState('')

  const reviewMaxLength = 450

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await api.post(`/explorer/postReview`, {
        description: review,
        rate,
        bookID,
      })
    },
  })

  function handleCleanReview() {
    setRate(0)
    setReview('')
  }

  return (
    <article className="space-y-5 rounded-lg bg-gray-700 p-6">
      <header className="flex gap-4">
        <div className="flex items-center">
          <Image
            src="https://github.com/degui1.png"
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <h3 className="text-lg font-bold text-gray-100">
            {session?.user.name}
          </h3>
        </div>

        <Rating rate={rate} isEditable onChangeRate={(rate) => setRate(rate)} />
      </header>
      <form className="space-y-3">
        <div className="relative h-40 w-full">
          <textarea
            className="h-40 w-full resize-none rounded bg-gray-800 px-5 py-3 text-sm text-gray-100"
            maxLength={reviewMaxLength}
            autoComplete="on"
            value={review}
            onChange={(event) => setReview(event.currentTarget.value)}
            spellCheck
          />
          <span className="absolute bottom-0 right-1 text-xs text-gray-400">
            {`${review.length}/${reviewMaxLength}`}
          </span>
        </div>
        <div className="flex flex-1 justify-end gap-2">
          <button
            className="rounded bg-gray-600 p-2 hover:bg-gray-500"
            type="button"
            onClick={() => handleCleanReview()}
          >
            <X className="h-6 w-6 text-purple-100" type="button" />
          </button>
          <button
            className="rounded bg-gray-600 p-2 hover:bg-gray-500"
            type="button"
            onClick={(event) => {
              event.preventDefault()
              mutateAsync()
            }}
          >
            <Check className="h-6 w-6 text-green-100" />
          </button>
        </div>
      </form>
    </article>
  )
}
