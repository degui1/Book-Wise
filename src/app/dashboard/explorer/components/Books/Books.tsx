import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { ReviewableBookCard } from '../ReviewableBookCard/ReviewableBookCard'
import Image from 'next/image'
import { Rating } from '@/components/Rating'

type IBookResponse = {
  hasRead: boolean
  numberOfRatings: string
  categories: string[]
  id: string
  name: string
  author: string
  cover_url: string
  average_rate: number
  total_pages: number
}[]

interface IBooksProps {
  bookName: string
  categoryID: string
}

export function Books({ bookName, categoryID }: IBooksProps) {
  const { data: books } = useSuspenseQuery({
    queryKey: ['explorer-books', bookName, categoryID],
    queryFn: async () => {
      const response = await api.get<{ books: IBookResponse }>(
        `/explorer?name=${bookName}&categoryID=${categoryID}`,
      )

      return response.data.books
    },
  })

  return books.map((book) => {
    return (
      <ReviewableBookCard key={book.id} book={book}>
        <article
          className="relative flex h-full max-h-48 w-full max-w-80 gap-5 overflow-hidden rounded-lg bg-gray-700 px-5 py-4"
          title={book.name}
        >
          {book.hasRead && (
            <div className="absolute right-0 top-0 rounded-bl-sm bg-green-300 px-3 py-1 text-xs uppercase text-green-100">
              lido
            </div>
          )}
          <div className="flex flex-col justify-center">
            <Image
              src={book.cover_url}
              alt=""
              width={108}
              height={152}
              className="max-h-[152px] max-w-[108]"
            />
          </div>
          <div className="space-y-8">
            <header className="space-y-1 text-left">
              <h4 className="line-clamp-2 font-bold text-gray-100">
                {book.name}
              </h4>
              <p className="line-clamp-2 text-sm text-gray-400">
                {book.author}
              </p>
            </header>

            <Rating rate={book.average_rate} />
          </div>
        </article>
      </ReviewableBookCard>
    )
  })
}
