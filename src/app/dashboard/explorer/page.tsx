'use client'

import { Binoculars, SealPercent } from '@phosphor-icons/react'
import { Header } from '../components/Header'
import { InputControl, InputIcon, InputRoot } from '@/app/components/Form/Input'
import { Checkbox } from '@/app/components/Form/Checkbox'
import { Rating } from '@/app/components/Rating'

import BookImage from '@/app/assets/book.png'
import Image from 'next/image'
import { BookCard } from '../BookCard'

export default function Explorer() {
  return (
    <>
      <div className="flex justify-between">
        <Header title="Explorar" icon={Binoculars} />
        <InputRoot>
          <InputControl />
          <InputIcon icon={SealPercent} />
        </InputRoot>
      </div>
      <div className="space-y-12">
        <form className="flex gap-3">
          <Checkbox title="Tudo" checked />
          <Checkbox title="Computação" />
          <Checkbox title="Educação" />
          <Checkbox title="Fantasia" />
          <Checkbox title="Ficção científica" />
          <Checkbox title="Horror" />
          <Checkbox title="HQs" />
          <Checkbox title="Suspense" />
        </form>

        <main className="grid grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((book) => {
            return <BookCard key={book} />
          })}
        </main>
      </div>
    </>
  )
}
