import Image from 'next/image'

import BookImage from '@/app/assets/book.png'
import { Rating } from '@/app/components/Rating'
import * as Dialog from '@radix-ui/react-dialog'
import { Bookmark, BookOpen, X } from '@phosphor-icons/react'
import { Records } from '@/app/components/Records'
import { WriteReview } from './components/WriteReview'
import { Comment } from './components/Commnet'

export function BookCard() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <article className="relative flex gap-5 overflow-hidden rounded-lg bg-gray-700 px-5 py-4">
          <div className="absolute right-0 top-0 rounded-bl-sm bg-green-300 px-3 py-1 text-xs uppercase text-green-100">
            lido
          </div>
          <Image src={BookImage} alt="" width={64} height={94} />
          <div className="space-y-8">
            <header>
              <h4 className="font-bold text-gray-100">
                A revolução dos bichos
              </h4>
              <p className="text-sm text-gray-400">George Orwell</p>
            </header>

            <Rating />
          </div>
        </article>
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
              <Image src={BookImage} alt="" width={171} height={242} />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-100">
                  14 Hábitos de Desenvolvedores Altamente Produtivos
                </h1>
                <h2 className="text-gray-300">Zeno Rocha</h2>

                <div className="mt-auto">
                  <Rating />
                  <span className="text-sm text-gray-400">3 avaliações</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between border-t border-gray-600 py-6">
              <Records
                title="Categoria"
                description="Computação, educação"
                icon={Bookmark}
              />

              <Records title="Páginas" description="160" icon={BookOpen} />
            </div>
          </div>

          <div className="mb-4 mt-10 flex justify-between">
            <h2 className="text-sm text-gray-200">Avaliações</h2>
            <button className="flex items-center gap-2 text-sm font-bold text-purple-100">
              Avaliar
            </button>
          </div>

          <div className="space-y-3">
            <WriteReview />

            <Comment />
            <Comment />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
