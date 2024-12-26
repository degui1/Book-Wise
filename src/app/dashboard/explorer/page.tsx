'use client'

import {
  Binoculars,
  Bookmark,
  BookOpen,
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react'
import { InputControl, InputIcon, InputRoot } from '@/app/components/Form/Input'
import { Checkbox } from '@/app/components/Form/Checkbox'
import { Header } from '../components/Header'
import { BookCard } from './components/BookCard'
import BookImage from '@/app/assets/book.png'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { Rating } from '@/app/components/Rating'
import { UserRecords } from '../profile/components/UserRecords'

export default function Explorer() {
  return (
    <>
      <div className="space-y-3 xl:flex xl:justify-between xl:space-y-0">
        <Header title="Explorar" icon={Binoculars} />
        <div className="xl:min-w-96">
          <InputRoot>
            <InputControl placeholder="Buscar livro" />
            <InputIcon icon={MagnifyingGlass} />
          </InputRoot>
        </div>
      </div>
      <div className="space-y-12">
        <form className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden p-3">
          <Checkbox title="Tudo" defaultChecked />
          <Checkbox title="Computação" />
          <Checkbox title="Educação" />
          <Checkbox title="Fantasia" />
          <Checkbox title="Ficção científica" />
          <Checkbox title="Horror" />
          <Checkbox title="HQs" />
          <Checkbox title="Suspense" />
        </form>

        <main className="flex flex-col gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((book) => {
            return (
              <Dialog.Root key={book}>
                <Dialog.Trigger>
                  <BookCard />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                  <Dialog.Content className="fixed right-0 top-0 min-h-screen w-full max-w-screen-sm bg-gray-800 px-12 py-16">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-lg font-bold text-gray-100">
                        Deixe seu comentário
                      </Dialog.Title>
                      <Dialog.Close className="group rounded p-2">
                        <X className="h-6 w-6 text-gray-400 group-hover:text-gray-300" />
                      </Dialog.Close>
                    </div>

                    <div className="space-y-10 rounded-lg bg-gray-700 px-8 py-6">
                      <div className="flex gap-8">
                        <Image
                          src={BookImage}
                          alt=""
                          width={171}
                          height={242}
                        />
                        <div className="flex flex-col">
                          <h1 className="text-lg font-bold text-gray-100">
                            14 Hábitos de Desenvolvedores Altamente Produtivos
                          </h1>
                          <h2 className="text-gray-300">Zeno Rocha</h2>

                          <div className="mt-auto">
                            <Rating />
                            <span className="text-sm text-gray-400">
                              3 avaliações
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between border-t border-gray-600 py-6">
                        <UserRecords
                          title="Categoria"
                          description="Computação, educação"
                          icon={Bookmark}
                        />

                        <UserRecords
                          title="Páginas"
                          description="160"
                          icon={BookOpen}
                        />
                      </div>
                    </div>

                    <div className="mb-4 mt-10 flex justify-between">
                      <h2 className="text-sm text-gray-200">Avaliações</h2>
                      <span className="flex items-center gap-2 text-sm font-bold text-purple-100">
                        Avaliar
                      </span>
                    </div>

                    <div className="space-y-3">
                      <article className="space-y-5 rounded-lg bg-gray-700 p-6">
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

                          <Rating />
                        </header>
                        <section>
                          <p className="text-sm text-gray-300">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nihil saepe repudiandae corrupti doloribus
                            earum
                          </p>
                        </section>
                      </article>

                      <article className="space-y-5 rounded-lg bg-gray-700 p-6">
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

                          <Rating />
                        </header>
                        <section>
                          <p className="text-sm text-gray-300">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Nihil saepe repudiandae corrupti doloribus
                            earum
                          </p>
                        </section>
                      </article>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )
          })}
        </main>
      </div>
    </>
  )
}
