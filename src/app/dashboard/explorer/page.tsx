'use client'

import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { Binoculars, MagnifyingGlass } from '@/components/Icons'
import { useDeferredValue, useState } from 'react'
import { Categories } from './components/Categories/Categories'
import { SafeSuspense } from '@/components/SafeSuspense'
import { Books } from './components/Books/Books'
import { Header } from '@/components/Header'
import { CategoriesLoading } from './components/Categories/Categories.loading'
import { BooksLoading } from './components/Books/Books.loading'

export default function Explorer() {
  const [bookName, setBookName] = useState('')
  const deferredBookName = useDeferredValue(bookName)
  const [categoryID, setCategoryID] = useState('')
  const deferredCategoryID = useDeferredValue(categoryID)

  return (
    <div className="flex w-full flex-col items-center justify-center xl:space-y-10">
      <div className="w-full max-w-7xl space-y-3 xl:flex xl:justify-between xl:space-y-0">
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

      <div className="max-w-7xl space-y-12">
        <form className="flex flex-row-reverse">
          <SafeSuspense fallback={<CategoriesLoading />}>
            <Categories handleOnChangeCategory={setCategoryID} />
          </SafeSuspense>
        </form>

        <main className="flex flex-col gap-5 justify-self-center sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <SafeSuspense fallback={<BooksLoading />}>
            <Books
              bookName={deferredBookName}
              categoryID={deferredCategoryID}
            />
          </SafeSuspense>
        </main>
      </div>
    </div>
  )
}
