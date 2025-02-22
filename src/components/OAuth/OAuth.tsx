import * as Dialog from '@radix-ui/react-dialog'
import { OAuthButton } from '../OAuthButton/OAuthButton'
import GoogleImage from '@/assets/google.png'
import GithubImage from '@/assets/github.png'
import { X } from '@/components/Icons'

interface OAuthProps extends Dialog.DialogTriggerProps {
  children: React.ReactNode
}

export function OAuth({ children, ...props }: OAuthProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger {...props}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-700 px-16 py-14">
          <Dialog.Close className="absolute right-0 top-0 p-4">
            <X className="h-6 w-6 text-gray-400 hover:text-gray-300" />
          </Dialog.Close>
          <Dialog.Title className="mb-7 text-center font-bold text-gray-200">
            Faça login para deixar sua avaliação
          </Dialog.Title>
          <div className="flex flex-col gap-3">
            <OAuthButton
              src={GoogleImage}
              description="Entrar com o Google"
              alt=""
            />
            <OAuthButton
              src={GithubImage}
              description="Entrar com o GitHub"
              alt=""
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
