'use client'

import { CaretRight, ChartLineUp, Star } from '@phosphor-icons/react'

import { Header } from './components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Header icon={ChartLineUp} title="Início" />

      <div className="grid-cols-dashboard grid gap-16">
        <main className="flex flex-col">
          <h2 className="text-sm text-gray-100">Avaliações mais recentes</h2>

          <div className="mt-4 space-y-3">
            <article className="space-y-8 rounded-lg bg-gray-700 p-6">
              <header className="flex justify-between">
                <div className="flex flex-1 gap-4">
                  <Image
                    src="https://github.com/degui1.png"
                    width={40}
                    height={40}
                    alt=""
                    className="rounded-full"
                  />

                  <div className="">
                    <h3 className="text-lg font-bold text-gray-100">
                      John Doe
                    </h3>
                    <p className="text-sm text-gray-400">Today</p>
                  </div>
                </div>

                <div className="flex">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
              </header>
              <section className="">section</section>
            </article>

            <article className="space-y-8 rounded-lg bg-gray-700 p-6">
              <header className="">header</header>
              <section className="">section</section>
            </article>
          </div>
        </main>

        <section className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-100">Livros populares</h2>
            <span className="flex items-center gap-2 text-sm font-bold text-purple-100">
              Ver todos <CaretRight className="h-4 w-4" />
            </span>
          </div>
        </section>
      </div>
    </>
  )
}
