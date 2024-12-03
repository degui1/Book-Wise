'use client'

import Image from 'next/image'
import { Binoculars, ChartLineUp, SignOut, User } from '@phosphor-icons/react'
import { NavItem } from './components/NavItem'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const currentPath = usePathname()

  return (
    <aside className="bg-sidebar flex flex-col items-center gap-16 rounded-xl bg-cover bg-no-repeat py-10">
      <Image src="/logo.svg" alt="Book wise" width={128} height={32} />

      <nav className="space-y-4">
        <NavItem
          href="/"
          icon={ChartLineUp}
          title="Home"
          isSelected={currentPath === '/'}
        />
        <NavItem
          href="/explorer"
          icon={Binoculars}
          title="Explorer"
          isSelected={currentPath === '/explorer'}
        />
        <NavItem
          href="/profile"
          icon={User}
          title="Profile"
          isSelected={currentPath === '/profile'}
        />
      </nav>

      <div className="mt-auto">
        <span className="flex items-center gap-3 font-bold leading-3 text-gray-200">
          Login
          <SignOut className="h-5 w-5 text-green-100" />
        </span>
      </div>
    </aside>
  )
}
