'use client'

import Image from 'next/image'
import { BookmarkSimple, BookOpen, Books, UserList } from '@/components/Icons'
import { Records } from '@/components/Records'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface BasicInfoCardProps {
  userID: string
}

export function BasicInfoCard({ userID }: BasicInfoCardProps) {
  const { data: profile } = useQuery({
    queryKey: ['basic-info-card', userID],
    queryFn: async () => {
      const response = await api.get(
        `/profile/4383f783-6ce1-4f92-b1dd-7a7a693c4aef`,
      )
      console.log(response.data)
      return response.data
    },
  })

  return (
    <>
      <div className="flex flex-col items-center">
        {/* {session?.user?.image && (
          <Image
            src={session.user.image}
            width={72}
            height={72}
            alt=""
            className="rounded-full"
            aria-hidden
          />
        )} */}
        {/* <h2 className="mt-5 font-bold text-gray-100">{session?.user?.name}</h2> */}
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
    </>
  )
}
