'use client'

import { Header } from '../components/Header'
import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import Image from 'next/image'
import { UserRatedBook } from './components/UserRatedBook'
import { Records } from '@/components/Records'
import {
  BookmarkSimple,
  BookOpen,
  Books,
  MagnifyingGlass,
  User,
  UserList,
} from '@/components/Icons'
import { useSession } from 'next-auth/react'
export default function Profile() {
  const { data: session } = useSession()
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
            <UserRatedBook />
            <UserRatedBook />
            <UserRatedBook />
            <UserRatedBook />
          </main>
        </div>
        <aside className="space-y-4 xl:space-y-8 xl:border-l xl:border-gray-700">
          <div className="flex flex-col items-center">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                width={72}
                height={72}
                alt=""
                className="rounded-full"
                aria-hidden
              />
            )}
            <h2 className="mt-5 font-bold text-gray-100">
              {session?.user?.name}
            </h2>
            <p className="text-sm text-gray-400">membro desde 2019</p>
          </div>

          <div className="mx-auto hidden h-1 w-8 rounded-full bg-horizontal-gradient xl:block" />

          <section className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-between xl:flex-col xl:items-center xl:gap-10">
            <Records icon={BookOpen} title="3853" description="Páginas lidas" />
            <Records icon={Books} title="10" description="Livros avaliados" />
            <Records icon={UserList} title="8" description="Autores lidos" />
            <Records
              icon={BookmarkSimple}
              title="Computação"
              description="Categoria mais lida"
            />
          </section>
        </aside>
      </div>
    </>
  )
}
