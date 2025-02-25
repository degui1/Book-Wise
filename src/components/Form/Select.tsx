import { ComponentProps } from 'react'

interface SelectProps extends ComponentProps<'select'> {
  children: React.ReactNode
}

export function Select({ children, ...props }: SelectProps) {
  return (
    <select
      className="rounded border border-gray-500 bg-gray-800 px-3 py-3 text-gray-100 focus-within:border-green-200"
      {...props}
    >
      {children}
    </select>
  )
}
