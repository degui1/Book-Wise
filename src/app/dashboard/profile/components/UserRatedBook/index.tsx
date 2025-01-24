import { Rating } from '@/components/Rating'
import Image from 'next/image'

interface UserRatedBookProps {
  title: string
  author: string
  rate: number
  description: string
  bookCoverURL: string
}

export function UserRatedBook({
  author,
  description,
  rate,
  title,
  bookCoverURL,
}: UserRatedBookProps) {
  return (
    <article className="space-y-2">
      <span className="text-sm text-gray-300">Há 2 dias</span>

      <div className="space-y-6 rounded-lg bg-gray-700 p-6">
        <div className="flex gap-6">
          <Image src={bookCoverURL} width={98} height={134} alt="" />
          <div className="flex flex-col justify-between">
            <header>
              <h1 className="text-lg font-bold text-gray-100">{title}</h1>
              <address className="text-sm text-gray-400">{author}</address>
            </header>

            <Rating rate={rate} />
          </div>
        </div>
        <main className="text-sm text-gray-100">{description}</main>
      </div>
    </article>
  )
}
