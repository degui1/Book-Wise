'use client'

import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { Binoculars, MagnifyingGlass } from '@/components/Icons'
import { useDeferredValue, useState } from 'react'
import { Categories } from './components/Categories'
import { SafeSuspense } from '@/components/SafeSuspense'
import { Books } from './components/Books'
import { Header } from '@/components/Header'

export default function Explorer() {
  const [bookName, setBookName] = useState('')
  const deferredBookName = useDeferredValue(bookName)
  const [category, setCategory] = useState('')
  const deferredCategory = useDeferredValue(category)

  return (
    <>
      <div className="space-y-3 xl:flex xl:justify-between xl:space-y-0">
        <Header title="Explorar" icon={Binoculars} />
        <div className="xl:min-w-96">
          <InputRoot>
            <InputControl
              placeholder="Buscar livro"
              value={bookName}
              onChange={(event) => setBookName(event.target.value)}
            />
            <InputIcon icon={MagnifyingGlass} />
          </InputRoot>
        </div>
      </div>
      <div className="space-y-12">
        <form className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden p-3">
          <SafeSuspense fallback={<div>Loading...</div>}>
            <Categories
              category={category}
              handleOnChangeCategory={setCategory}
            />
          </SafeSuspense>
        </form>

        <main className="flex flex-col gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <SafeSuspense fallback={<div>Loading...</div>}>
            <Books bookName={deferredBookName} category={deferredCategory} />
          </SafeSuspense>
        </main>
      </div>
    </>
  )
}
