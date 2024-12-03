import Link from 'next/link'
import { ElementType } from 'react'

interface NavItemProps {
  href: string
  icon: ElementType
  title: string
  isSelected: boolean
}

export function NavItem({ title, icon: Icon, href, isSelected }: NavItemProps) {
  return (
    <Link
      href={href}
      data-active={isSelected}
      className="data-[active=true]:before:bg-vertical-gradient flex items-center gap-3 p-1 font-bold leading-5 text-gray-400 before:h-6 before:w-1 before:rounded-full before:content-[''] hover:text-gray-100 data-[active=true]:text-gray-100"
    >
      <Icon className="h-6 w-6" />
      <span>{title}</span>
    </Link>
  )
}
