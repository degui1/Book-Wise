import { Checkbox } from '@/components/Form/Radio'

interface FilterProps {
  categories: {
    id: string
    name: string
  }[]
}

export function Filter({ categories }: FilterProps) {
  return (
    <form className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden p-3">
      <Checkbox title="Tudo" defaultChecked value={''} />
      {categories.map((category) => {
        return (
          <Checkbox
            key={category.id}
            title={category.name}
            value={category.name}
          />
        )
      })}
    </form>
  )
}
