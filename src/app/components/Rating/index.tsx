import { Star } from '@phosphor-icons/react'

export function Rating() {
  return (
    <div className="flex">
      <Star className="fill-purple-100" weight="fill" />
      <Star className="fill-purple-100" weight="fill" />
      <Star className="fill-purple-100" weight="fill" />
      <Star className="fill-purple-100" />
      <Star className="fill-purple-100" />
    </div>
  )
}
