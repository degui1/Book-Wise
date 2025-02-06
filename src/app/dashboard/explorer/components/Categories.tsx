import { Radio } from '@/components/Form/Radio'
import { api } from '@/lib/axios'
import { useSuspenseQuery } from '@tanstack/react-query'

interface ICategory {
  id: string
  name: string
}

interface ICategoriesProps {
  category: string
  handleOnChangeCategory: (category: string) => void
}

export function Categories({
  category,
  handleOnChangeCategory,
}: ICategoriesProps) {
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
    <>
      <Radio
        title="Tudo"
        value=""
        checked={category === ''}
        onChange={() => handleOnChangeCategory('')}
      />
      {categories.map(({ id, name }) => {
        return (
          <Radio
            key={id}
            title={name}
            value={name}
            checked={name === category}
            onChange={(event) => handleOnChangeCategory(event.target.value)}
          />
        )
      })}
    </>
  )
}
