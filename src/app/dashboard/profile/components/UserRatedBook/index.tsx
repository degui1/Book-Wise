import BookImage from '@/app/assets/book.png'
import { Rating } from '@/app/components/Rating'
import Image from 'next/image'

export function UserRatedBook() {
  return (
    <article className="space-y-2">
      <span className="text-sm text-gray-300">Há 2 dias</span>

      <div className="space-y-6 rounded-lg bg-gray-700 p-6">
        <div className="flex gap-6">
          <Image src={BookImage} width={98} height={134} alt="" />
          <div className="flex flex-col justify-between">
            <header>
              <h1 className="text-lg font-bold text-gray-100">
                Entendendo Algoritmos
              </h1>
              <address className="text-sm text-gray-400">
                Aditya Bhargava
              </address>
            </header>

            <Rating />
          </div>
        </div>
        <main className="text-sm text-gray-100">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio,
          similique officiis nostrum, alias nisi ad suscipit illo non assumenda
          reprehenderit dolore est laborum ipsum enim quis? Ex deserunt sequi
          inventore.
        </main>
      </div>
    </article>
  )
}
