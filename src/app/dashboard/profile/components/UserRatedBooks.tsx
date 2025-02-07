import { IRatedBook } from '@/app/api/profile/rating/[userID]/route'
import { Rating } from '@/components/Rating'
import { api } from '@/lib/axios'
import { useSuspenseQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface UserRatedBooksProps {
  userID: string
  filter: string
}

export function UserRatedBooks({ userID, filter }: UserRatedBooksProps) {
  const { data: ratedBooks } = useSuspenseQuery({
    queryKey: ['rated-books', userID, filter],
    queryFn: async () => {
      const response = await api.get<{ ratedBooks: IRatedBook[] }>(
        `/profile/rating/${userID}?book=${filter}`,
      )

      return response.data.ratedBooks
    },
    staleTime: Infinity,
  })

  return (
    <>
      {ratedBooks.length === 0 && (
        <div className="text-center">
          <span className="text-lg text-gray-100">
            Nenhum livro encontrado.
          </span>
        </div>
      )}

      {ratedBooks.map(
        ({
          rate,
          bookAuthor,
          bookCoverURL,
          bookName,
          description,
          createdAt,
        }) => (
          <article
            className="space-y-2"
            key={`${bookName}-${bookAuthor}-userID`}
          >
            <span className="text-sm text-gray-300">
              {formatDistanceToNow(createdAt, {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>

            <div className="space-y-6 rounded-lg bg-gray-700 p-6">
              <div className="flex gap-6">
                <Image src={bookCoverURL} width={98} height={134} alt="" />
                <div className="flex flex-col justify-between">
                  <header>
                    <h1 className="text-lg font-bold text-gray-100">
                      {bookName}
                    </h1>
                    <address className="text-sm text-gray-400">
                      {bookAuthor}
                    </address>
                  </header>

                  <Rating rate={rate} />
                </div>
              </div>
              <main className="text-sm text-gray-100">{description}</main>
            </div>
          </article>
        ),
      )}
    </>
  )
}
