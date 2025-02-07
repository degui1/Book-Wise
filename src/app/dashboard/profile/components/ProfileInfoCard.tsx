'use client'

import Image from 'next/image'
import { BookmarkSimple, BookOpen, Books, UserList } from '@/components/Icons'
import { Records } from '@/components/Records'
import { useSuspenseQueries } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ProfileInfoCardProps {
  userID: string
}

interface IProfileInfoCardResponse {
  total_ratings: string
  total_pages: string
  total_read_books: string
  most_read_category: string
  name: string
  created_at: Date | null
  avatar_url: string
}

export function ProfileInfoCard({ userID }: ProfileInfoCardProps) {
  const [{ data: profile }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['basic-info-card', userID],
        queryFn: async () => {
          const response = await api.get<IProfileInfoCardResponse>(
            `/profile/${userID}`,
          )

          return response.data
        },
      },
    ],
  })

  return (
    <>
      <div className="flex flex-col items-center">
        {profile.avatar_url && (
          <div className="overflow-hidden rounded-full">
            <Image
              src={profile.avatar_url}
              width={74}
              height={74}
              alt=""
              aria-hidden
            />
          </div>
        )}
        <h2 className="mt-5 font-bold text-gray-100">{profile.name}</h2>
        {profile.created_at && (
          <p className="text-sm text-gray-400">
            membro{' '}
            {formatDistanceToNow(profile.created_at, {
              locale: ptBR,
              addSuffix: true,
            })}
          </p>
        )}
      </div>

      <div className="mx-auto hidden h-1 w-8 rounded-full bg-horizontal-gradient xl:block" />

      <section className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-between xl:flex-col xl:items-center xl:gap-10">
        <Records
          icon={BookOpen}
          title={profile.total_pages}
          description="Páginas lidas"
        />
        <Records
          icon={Books}
          title={profile.total_ratings}
          description="Livros avaliados"
        />
        <Records
          icon={UserList}
          title={profile.total_read_books}
          description="Autores lidos"
        />
        <Records
          icon={BookmarkSimple}
          title={profile.most_read_category}
          description="Categoria mais lida"
        />
      </section>
    </>
  )
}
