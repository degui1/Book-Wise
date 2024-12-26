import Image, { ImageProps } from 'next/image'

interface OAuthProps extends ImageProps {
  alt: string
  description: string
}

export function OAuth({ alt, description, ...props }: OAuthProps) {
  return (
    <div className="flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 transition-all hover:bg-gray-500">
      <Image {...props} width={32} height={32} alt={alt} />
      <span className="text-lg font-semibold text-gray-100">{description}</span>
    </div>
  )
}
