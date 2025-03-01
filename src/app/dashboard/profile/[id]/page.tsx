'use client'

import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { UserRatedBooks } from '../components/UserRatedBooks'
import { MagnifyingGlass, User } from '@/components/Icons'
import { useParams } from 'next/navigation'
import { useDeferredValue, useState } from 'react'
import { ProfileInfoCard } from '../components/ProfileInfoCard'
import { UserRatedBooksLoading } from '../components/UserRatedBooks.loading'
import { ProfileInfoCardLoading } from '../components/ProfileInfoCard.loading'
import { Header } from '@/components/Header'
import { SafeSuspense } from '@/components/SafeSuspense'

export default function Profile() {
  const { id: userID } = useParams<{ id: string }>()
  const [filter, setFilter] = useState('')
  const query = useDeferredValue(filter)

  return (
    <div className="flex w-full flex-col items-center justify-center xl:space-y-10">
      <div className="w-full max-w-7xl">
        <Header title="Perfil" icon={User} />
      </div>

      <div className="flex w-full max-w-7xl flex-col-reverse xl:grid xl:grid-cols-profile xl:gap-16">
        <div className="mt-4 w-full space-y-8 xl:mt-0">
          <form className="flex flex-1">
            <InputRoot>
              <InputControl
                placeholder="Buscar livro avaliado"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
              <InputIcon icon={MagnifyingGlass} />
            </InputRoot>
          </form>

          <main className="space-y-6">
            <SafeSuspense fallback={<UserRatedBooksLoading />}>
              <UserRatedBooks userID={userID} filter={query} />
            </SafeSuspense>
          </main>
        </div>

        <aside className="space-y-4 xl:space-y-8 xl:border-l xl:border-gray-700">
          <SafeSuspense fallback={<ProfileInfoCardLoading />}>
            <ProfileInfoCard userID={userID} />
          </SafeSuspense>
        </aside>
      </div>
    </div>
  )
}
