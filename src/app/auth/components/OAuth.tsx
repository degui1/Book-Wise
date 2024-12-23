import GoogleImage from '@/app/assets/google.png'
import GithubImage from '@/app/assets/github.png'
import RocketImage from '@/app/assets/rocket.png'
import Image from 'next/image'

export function OAuth() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center gap-5 rounded-lg bg-gray-600 px-6 py-5">
        <Image src={GoogleImage} alt="" width={32} height={32} />
        <span className="text-lg font-semibold text-gray-100">
          Entrar com o Google
        </span>
      </div>
      <div className="flex w-full items-center gap-5 rounded-lg bg-gray-600 px-6 py-5">
        <Image src={GithubImage} alt="" width={32} height={32} />
        <span className="text-lg font-semibold text-gray-100">
          Entrar com o GitHub
        </span>
      </div>
      <div className="flex w-full items-center gap-5 rounded-lg bg-gray-600 px-6 py-5">
        <Image src={RocketImage} alt="" width={32} height={32} />
        <span className="text-lg font-semibold text-gray-100">
          Acessar como visitante
        </span>
      </div>
    </div>
  )
}
