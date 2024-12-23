/* eslint-disable @next/next/no-img-element */
import { OAuth } from './components/OAuth'

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

          <main className="">
            <OAuth />
          </main>
        </div>
      </div>
    </div>
  )
}
