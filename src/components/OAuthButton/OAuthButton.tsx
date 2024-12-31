import Image, { ImageProps } from 'next/image'

interface OAuthButtonProps extends ImageProps {
  alt: string
  description: string
}

export function OAuthButton({ alt, description, ...props }: OAuthButtonProps) {
  return (
    <button className="flex w-full max-w-96 cursor-pointer items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 transition-all hover:bg-gray-500">
      <Image {...props} width={32} height={32} alt={alt} />
      <span className="text-lg font-semibold text-gray-100">{description}</span>
    </button>
  )
}
