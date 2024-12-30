import { Checkbox } from '@/app/components/Form/Checkbox'

export function Filter() {
  return (
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
  )
}
