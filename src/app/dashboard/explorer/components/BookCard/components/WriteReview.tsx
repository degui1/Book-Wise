import { Rating } from '@/components/Rating'
import { Check, X } from '@/components/Icons'
import Image from 'next/image'

export function WriteReview() {
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
        <div className="flex flex-1 flex-col justify-center">
          <h3 className="text-lg font-bold text-gray-100">John Doe</h3>
        </div>

        <Rating />
      </header>
      <form className="space-y-3">
        <div className="relative h-40 w-full">
          <textarea
            className="h-40 w-full resize-none rounded bg-gray-800 px-5 py-3 text-sm text-gray-100"
            maxLength={450}
            autoComplete="on"
            spellCheck
          />
          <span className="absolute bottom-0 right-1 text-xs text-gray-400">
            0/450
          </span>
        </div>
        <div className="flex flex-1 justify-end gap-2">
          <button className="rounded bg-gray-600 p-2 hover:bg-gray-500">
            <X className="h-6 w-6 text-purple-100" />
          </button>
          <button className="rounded bg-gray-600 p-2 hover:bg-gray-500">
            <Check className="h-6 w-6 text-green-100" />
          </button>
        </div>
      </form>
    </article>
  )
}
