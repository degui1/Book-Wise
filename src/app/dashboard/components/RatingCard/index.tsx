import Image from 'next/image'

import BookImage from '@/app/assets/book.png'
import { Rating } from '@/app/components/Rating'

export function RatingCard() {
  return (
    <article className="space-y-8 rounded-lg bg-gray-700 p-6">
      <header className="flex justify-between">
        <div className="flex flex-1 gap-4">
          <Image
            src="https://github.com/degui1.png"
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />

          <div className="">
            <h3 className="text-lg font-bold text-gray-100">John Doe</h3>
            <p className="text-sm text-gray-400">Today</p>
          </div>
        </div>

        <Rating />
      </header>
      <section className="flex gap-5">
        <Image src={BookImage} alt="" width={108} height={152} />
        <div className="space-y-5">
          <div>
            <h4 className="font-bold text-gray-100">O Hobbit</h4>
            <p className="text-sm text-gray-400">J.R.R Tolkien</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
              saepe repudiandae corrupti doloribus earum
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
