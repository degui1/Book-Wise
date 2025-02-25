import { Select } from '@/components/Form/Select'
import { api } from '@/lib/axios'
import { useSuspenseQuery } from '@tanstack/react-query'

interface ICategory {
  id: string
  name: string
}

interface ICategoriesProps {
  handleOnChangeCategory: (categoryID: string) => void
}

export function Categories({ handleOnChangeCategory }: ICategoriesProps) {
  const { data: categories } = useSuspenseQuery({
    queryKey: ['explorer-books-categories'],
    queryFn: async () => {
      const response = await api.get<{ categories: ICategory[] }>(
        '/explorer/categories',
      )

      return response.data.categories
    },
  })

  return (
    <Select onChange={(event) => handleOnChangeCategory(event.target.value)}>
      <option value="">Tudo</option>
      {categories.map(({ id, name }) => {
        return (
          <option key={id} title={name} value={id}>
            {name}
          </option>
        )
      })}
    </Select>
  )
}
