import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { ReviewableBookCard } from './ReviewableBookCard/ReviewableBookCard'
import Image from 'next/image'
import { Rating } from '@/components/Rating'

type IBookResponse = {
  id: string
  name: string
  author: string
  cover_url: string
  hasRead: boolean
  average_rate: number
}[]

interface IBooksProps {
  bookName: string
  category: string
}

export function Books({ bookName, category }: IBooksProps) {
  const { data: books } = useSuspenseQuery({
    queryKey: ['explorer-books', bookName, category],
    queryFn: async () => {
      const response = await api.get<{ books: IBookResponse }>(
        `/explorer?name=${bookName}&category=${category}`,
      )

      return response.data.books
    },
  })

  return books.map((book) => {
    return (
      <ReviewableBookCard key={book.id} bookID={book.id}>
        <article className="relative flex gap-5 overflow-hidden rounded-lg bg-gray-700 px-5 py-4">
          {book.hasRead && (
            <div className="absolute right-0 top-0 rounded-bl-sm bg-green-300 px-3 py-1 text-xs uppercase text-green-100">
              lido
            </div>
          )}
          <Image src={book.cover_url} alt="" width={64} height={94} />
          <div className="space-y-8">
            <header className="flex flex-col">
              <h4 className="font-bold text-gray-100">{book.name}</h4>
              <p className="text-sm text-gray-400">{book.author}</p>
            </header>

            <Rating rate={book.average_rate} />
          </div>
        </article>
      </ReviewableBookCard>
    )
  })
}
