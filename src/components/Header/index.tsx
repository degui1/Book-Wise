import { ElementType } from 'react'

interface HeaderProps {
  icon: ElementType
  title: string
}

export function Header({ icon: Icon, title }: HeaderProps) {
  return (
    <header className="flex items-center gap-2">
      <Icon className="h-8 w-8 fill-green-100" />
      <h1 className="text-2xl font-bold text-gray-100">{title}</h1>
    </header>
  )
}
