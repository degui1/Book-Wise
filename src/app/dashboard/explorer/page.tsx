'use client'

import { Binoculars, SealPercent } from '@phosphor-icons/react'

import { InputControl, InputIcon, InputRoot } from '@/app/components/Form/Input'
import { Checkbox } from '@/app/components/Form/Checkbox'
import { Header } from '../components/Header'
import { BookCard } from '../BookCard'

export default function Explorer() {
  return (
    <>
      <div className="space-y-3 xl:flex xl:justify-between xl:space-y-0">
        <Header title="Explorar" icon={Binoculars} />
        <div className="xl:min-w-96">
          <InputRoot>
            <InputControl />
            <InputIcon icon={SealPercent} />
          </InputRoot>
        </div>
      </div>
      <div className="space-y-12">
        <form className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden p-3">
          <Checkbox title="Tudo" checked />
          <Checkbox title="Computação" />
          <Checkbox title="Educação" />
          <Checkbox title="Fantasia" />
          <Checkbox title="Ficção científica" />
          <Checkbox title="Horror" />
          <Checkbox title="HQs" />
          <Checkbox title="Suspense" />
        </form>

        <main className="flex flex-col gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((book) => {
            return <BookCard key={book} />
          })}
        </main>
      </div>
    </>
  )
}
