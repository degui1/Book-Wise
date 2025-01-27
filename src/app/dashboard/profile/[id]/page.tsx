'use client'

import { Header } from '../../../../components/Header'
import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { UserRatedBooks } from '../components/UserRatedBooks'
import { MagnifyingGlass, User } from '@/components/Icons'
import { BasicInfoCard } from '../components/BasicInfoCard'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

export default function Profile() {
  const { id: userID } = useParams<{ id: string }>()

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
            <Suspense fallback={<div>Loading...</div>}>
              <UserRatedBooks userID={userID} />
            </Suspense>
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
