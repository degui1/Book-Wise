import { ComponentProps, ElementType } from 'react'

interface InputPrefixSuffixProps extends ComponentProps<'div'> {
  icon: ElementType
}

export function InputIcon({ icon: Icon, ...props }: InputPrefixSuffixProps) {
  return (
    <div {...props}>
      <Icon className="h-5 w-5 text-gray-500 group-focus-within:text-green-200" />
    </div>
  )
}

interface InputControlProps extends ComponentProps<'input'> {}

export function InputControl(props: InputControlProps) {
  return (
    <input
      type="text"
      className="flex-1 border-0 bg-transparent text-sm text-gray-200 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
      {...props}
    />
  )
}

interface InputRootProps {
  children: React.ReactNode
}

export function InputRoot({ children }: InputRootProps) {
  return (
    <div className="group flex w-full items-center gap-2 rounded border border-gray-500 px-5 py-3 focus-within:border-green-200">
      {children}
    </div>
  )
}
