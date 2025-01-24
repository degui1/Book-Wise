'use client'

import GoogleImage from '@/assets/google.png'
import GithubImage from '@/assets/github.png'
import RocketImage from '@/assets/rocket.png'
import { OAuthButton } from '@/components/OAuthButton/OAuthButton'
import AuthImage from '@/assets/auth.svg'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Auth() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return (
      <div>
        <h1>Você já está logado</h1>
        <button onClick={() => router.push('/dashboard')}>
          Retornar para a home
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-screen p-5">
      <figure className="hidden h-full xl:flex">
        <Image
          src={AuthImage}
          alt=""
          objectFit="cover"
          className="h-full rounded-lg object-cover"
        />
      </figure>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-[372px] flex-col space-y-10">
          <header>
            <h1 className="text-2xl font-bold text-gray-100">Boas vindas!</h1>
            <p className="text-gray-200">
              Faça seu login ou acesse como visitante
            </p>
          </header>

          <main className="flex flex-col gap-3">
            <OAuthButton
              src={GoogleImage}
              description="Entrar com o Google"
              alt=""
              onClick={() => signIn('google')}
            />
            <OAuthButton
              src={GithubImage}
              description="Entrar com o GitHub"
              alt=""
              onClick={() => signIn('github')}
            />
            <OAuthButton
              src={RocketImage}
              description="Acessar como visitante"
              alt=""
              onClick={() => router.push('/dashboard')}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
