import { Rating } from '@/components/Rating'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface CommentProps {
  avatarUrl: string
  username: string
  createdAt: Date
  description: string
  rate: number
}

export function Comment({
  avatarUrl,
  createdAt,
  description,
  username,
  rate,
}: CommentProps) {
  return (
    <article className="space-y-5 rounded-lg bg-gray-700 p-6">
      <header className="flex gap-4">
        <div className="flex items-center">
          <Image
            src={avatarUrl}
            width={40}
            height={40}
            alt=""
            className="rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-lg font-bold text-gray-100">{username}</h3>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(createdAt, {
              addSuffix: true,
              locale: ptBR,
            })}
          </p>
        </div>

        <Rating rate={rate} />
      </header>
      <section>
        <p className="text-sm text-gray-300">{description}</p>
      </section>
    </article>
  )
}
