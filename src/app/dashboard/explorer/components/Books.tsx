import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { ReviewableBookCard } from './ReviewableBookCard/ReviewableBookCard'

interface IBook {
  name: string
  author: string
  cover_url: string
  id: string
}

interface IBooksProps {
  bookName: string
  category: string
}

export function Books({ bookName, category }: IBooksProps) {
  const { data: books } = useSuspenseQuery({
    queryKey: ['explorer-books', bookName, category],
    queryFn: async () => {
      const response = await api.get<{ books: IBook[] }>(
        `/explorer?name=${bookName}&category=${category}`,
      )

      return response.data.books
    },
  })

  return books.map((book) => {
    return <ReviewableBookCard key={book.id} bookID={book.id} />
  })
}
