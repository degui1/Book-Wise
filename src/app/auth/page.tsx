/* eslint-disable @next/next/no-img-element */
import GoogleImage from '@/app/assets/google.png'
import GithubImage from '@/app/assets/github.png'
import RocketImage from '@/app/assets/rocket.png'
import { OAuthButton } from '../components/OAuthButton/OAuthButton'

export default function Login() {
  return (
    <div className="flex h-screen p-5">
      <figure className="hidden h-full xl:flex">
        {/* <Image src={AuthImage} alt="" objectFit="cover" /> */}
        <img
          src="/auth.svg"
          alt=""
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
            />
            <OAuthButton
              src={GithubImage}
              description="Entrar com o GitHub"
              alt=""
            />
            <OAuthButton
              src={RocketImage}
              description="Acessar como visitante"
              alt=""
            />
          </main>
        </div>
      </div>
    </div>
  )
}
