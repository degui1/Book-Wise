import { Rating } from '@/components/Rating'
import Image from 'next/image'

export function Comment() {
  return (
    <article className="space-y-5 rounded-lg bg-gray-700 p-6">
      <header className="flex gap-4">
        <div className="flex items-center">
          <Image
            src="https://github.com/degui1.png"
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-lg font-bold text-gray-100">John Doe</h3>
          <p className="text-sm text-gray-400">Today</p>
        </div>

        <Rating />
      </header>
      <section>
        <p className="text-sm text-gray-300">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil saepe
          repudiandae corrupti doloribus earum
        </p>
      </section>
    </article>
  )
}
