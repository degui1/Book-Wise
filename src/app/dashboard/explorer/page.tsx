'use client'

import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { Header } from '../../../components/Header'
import { BookCard } from './components/BookCard/BookCard'
import { Binoculars, MagnifyingGlass } from '@/components/Icons'
import { useSuspenseQueries } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useState } from 'react'
import { Radio } from '@/components/Form/Radio'

interface IBook {
  name: string
  author: string
  cover_url: string
  id: string
}

interface ICategory {
  id: string
  name: string
}

export default function Explorer() {
  const [bookName, setBookName] = useState('')
  const [category, setCategory] = useState('')

  const [{ data: books }, { data: categories }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['explorer-books', bookName, category],
        queryFn: async () => {
          const response = await api.get<{ books: IBook[] }>(
            `/explorer?name=${bookName}&category=${category}`,
          )

          return response.data.books
        },
      },
      {
        queryKey: ['explorer-books-categories'],
        queryFn: async () => {
          const response = await api.get<{ categories: ICategory[] }>(
            '/explorer/categories',
          )

          return response.data.categories
        },
      },
    ],
  })

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
          <Radio
            title="Tudo"
            value=""
            checked={category === ''}
            onChange={() => setCategory('')}
          />
          {categories.map(({ id, name }) => {
            return (
              <Radio
                key={id}
                title={name}
                value={name}
                checked={name === category}
                onChange={(event) => setCategory(event.target.value)}
              />
            )
          })}
        </form>

        <main className="flex flex-col gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {books.map((book) => {
            return <BookCard key={book.id} bookID={book.id} />
          })}
        </main>
      </div>
    </>
  )
}
