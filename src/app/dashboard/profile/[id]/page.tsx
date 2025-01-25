'use client'

import { Header } from '../../components/Header'
import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { UserRatedBook } from '../components/UserRatedBook'
import { MagnifyingGlass, User } from '@/components/Icons'
import { api } from '@/lib/axios'
import { BasicInfoCard } from '../components/BasicInfoCard'
import { IRatedBook } from '@/app/api/profile/[userID]/route'

import { useQueries } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

export default function Profile() {
  const { id: userID } = useParams<{ id: string }>()

  const [{ data: ratedBooks }] = useQueries({
    queries: [
      {
        queryKey: ['rated-books', userID],
        queryFn: async () => {
          const response = await api.get<{ ratedBooks: IRatedBook[] }>(
            `/profile/${userID}`,
          )

          return response.data.ratedBooks
        },
        initialData: [],
      },
    ],
  })

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
          <Suspense fallback={<div>Loading...</div>}>
            <BasicInfoCard userID={userID} />
          </Suspense>
        </aside>
      </div>
    </>
  )
}
