import { Header } from './components/Header'
import { RatingCard } from './components/RatingCard'
import { BookCard } from './BookCard'

import BookImage from '@/assets/book.png'
import Image from 'next/image'
import { Rating } from '@/components/Rating'
import { CaretRight, ChartLineUp } from '@/components/Icons'

export default function Home() {
  return (
    <>
      <Header icon={ChartLineUp} title="Início" />

      <div className="flex flex-col-reverse xl:grid xl:grid-cols-dashboard xl:gap-16">
        <main className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <h2 className="text-sm text-gray-100">Sua última leitura</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-purple-100">
              Ver todas <CaretRight className="h-4 w-4" />
            </button>
          </div>

          <article className="mb-10 mt-4 flex gap-5 rounded bg-gray-600 px-6 py-5">
            <Image src={BookImage} alt="" width={108} height={152} />
            <div className="flex-1 space-y-6">
              <header className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-300">Há 2 dias</span>

                  <Rating />
                </div>
                <div>
                  <h4 className="font-bold text-gray-100">
                    A revolução dos bichos
                  </h4>
                  <p className="text-sm text-gray-400">George Orwell</p>
                </div>
              </header>

              <p className="text-sm text-gray-300">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </article>

          <h2 className="text-sm text-gray-100">Avaliações mais recentes</h2>

          <div className="mt-4 space-y-3">
            <RatingCard />

            <RatingCard />
          </div>
        </main>

        <aside className="mb-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-100">Livros populares</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-purple-100">
              Ver todos <CaretRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <BookCard />

            <BookCard />
          </div>
        </aside>
      </div>
    </>
  )
}
