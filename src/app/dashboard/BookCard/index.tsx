import Image from 'next/image'

import BookImage from '@/assets/book.png'
import { Rating } from '@/components/Rating'

export function BookCard() {
  return (
    <article className="flex gap-5 overflow-hidden rounded-lg bg-gray-700 px-5 py-4">
      <Image src={BookImage} alt="" width={64} height={94} />
      <div className="space-y-8">
        <header>
          <h4 className="font-bold text-gray-100">A revolução dos bichos</h4>
          <p className="text-sm text-gray-400">George Orwell</p>
        </header>

        <Rating />
      </div>
    </article>
  )
}
