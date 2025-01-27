import { InputControl, InputIcon, InputRoot } from '@/components/Form/Input'
import { Header } from '../../../components/Header'
import { BookCard } from './components/BookCard/BookCard'
import { Filter } from './components/Filter'
import { Binoculars, MagnifyingGlass } from '@/components/Icons'

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
        <Filter />

        <main className="flex flex-col gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((book) => {
            return <BookCard key={book} />
          })}
        </main>
      </div>
    </>
  )
}
