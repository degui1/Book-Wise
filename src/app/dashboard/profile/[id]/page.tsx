'use client'

import { Header } from '../../../../components/Header'
import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { UserRatedBooks } from '../components/UserRatedBooks'
import { MagnifyingGlass, User } from '@/components/Icons'
import { useParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { ProfileInfoCard } from '../components/ProfileInfoCard'

export default function Profile() {
  const { id: userID } = useParams<{ id: string }>()
  const [filter, setFilter] = useState('')
  // const query = useDeferredValue(filter)

  return (
    <>
      <Header title="Perfil" icon={User} />

      <div className="flex flex-col-reverse xl:grid xl:grid-cols-profile xl:gap-16">
        <div className="mt-4 space-y-8 xl:mt-0">
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
            <Suspense fallback={<div>Loading...</div>}>
              <UserRatedBooks userID={userID} />
            </Suspense>
          </main>
        </div>

        <aside className="space-y-4 xl:space-y-8 xl:border-l xl:border-gray-700">
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileInfoCard userID={userID} />
          </Suspense>
        </aside>
      </div>
    </>
  )
}
