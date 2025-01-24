import { Header } from '../../components/Header'
import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { UserRatedBook } from '../components/UserRatedBook'
import { MagnifyingGlass, User } from '@/components/Icons'
import { api } from '@/lib/axios'
// import { IRatedBook } from '@/app/api/profile/[userID]/route'
import { BasicInfoCard } from '../components/BasicInfoCard'
import { getServerSession } from 'next-auth'
import { buildNextAuthOption } from '@/app/api/auth/[...nextauth]/route'
import { IRatedBook } from '@/app/api/profile/[userID]/route'
// import { useQueries } from '@tanstack/react-query'
// import { useSession } from 'next-auth/react'

export default async function Profile() {
  const session = await getServerSession(buildNextAuthOption())

  const response = await api.get<{ ratedBooks: IRatedBook[] }>(
    `/profile/rating/4383f783-6ce1-4f92-b1dd-7a7a693c4aef`,
  )

  const { ratedBooks } = response.data

  // const [{ data: ratedBooks }] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['rated-books', session?.user.id],
  //       queryFn: async () => {
  //         const response = await api.get<{ ratedBooks: IRatedBook[] }>(
  //           `/profile/${session?.user.id}`,
  //         )

  //         return response.data.ratedBooks
  //       },
  //       initialData: [],
  //     },
  //   ],
  // })

  // const { ratedBooks } = {
  //   ratedBooks: [
  //     {
  //       bookName: 'rating.book.name',
  //       bookAuthor: 'rating.book.author',
  //       bookCoverURL: 'rating.book.cover_url',
  //       rate: 0,
  //       description: 'rating.description',
  //     },
  //   ],
  // }
  return (
    <>
      <Header title="Perfil" icon={User} />

      <div className="flex flex-col-reverse xl:grid xl:grid-cols-profile xl:gap-16">
        <div className="mt-4 space-y-8 xl:mt-0">
          <form className="flex flex-1">
            <InputRoot>
              <InputControl placeholder="Buscar livro avaliado" />
              <InputIcon icon={MagnifyingGlass} />
            </InputRoot>
          </form>

          <main className="space-y-6">
            {ratedBooks?.map(
              ({ bookAuthor, bookCoverURL, bookName, description, rate }) => (
                <UserRatedBook
                  key={bookName}
                  author={bookAuthor}
                  bookCoverURL={bookCoverURL}
                  description={description}
                  rate={rate}
                  title={bookName}
                />
              ),
            )}
          </main>
        </div>

        <aside className="space-y-4 xl:space-y-8 xl:border-l xl:border-gray-700">
          <BasicInfoCard />
        </aside>
      </div>
    </>
  )
}
