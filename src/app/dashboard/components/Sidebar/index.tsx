'use client'

import Image from 'next/image'
import {
  Binoculars,
  ChartLineUp,
  SignIn,
  SignOut,
  User,
} from '@phosphor-icons/react'
import { NavItem } from './components/NavItem'
import { usePathname } from 'next/navigation'
import { OAuth } from '@/components/OAuth/OAuth'
import LogoSVG from '@/assets/logo.svg'

export function Sidebar() {
  const currentPath = usePathname()

  return (
    <aside className="flex flex-col items-center gap-6 bg-sidebar bg-cover bg-no-repeat py-10 xl:gap-16 xl:rounded-xl">
      <Image src={LogoSVG} alt="Book wise" width={128} height={32} />

      <nav className="flex xl:block xl:space-y-4">
        <NavItem
          href="/dashboard"
          icon={ChartLineUp}
          title="Home"
          isSelected={currentPath === '/dashboard'}
        />
        <NavItem
          href="/dashboard/explorer"
          icon={Binoculars}
          title="Explorer"
          isSelected={currentPath === '/dashboard/explorer'}
        />
        <NavItem
          href="/dashboard/profile"
          icon={User}
          title="Profile"
          isSelected={currentPath === '/dashboard/profile'}
        />
      </nav>

      <div className="flex xl:mt-auto xl:block">
        <OAuth>
          <button className="flex items-center gap-3 font-bold leading-3 text-gray-200">
            Login
            <SignIn className="h-5 w-5 text-green-100" />
          </button>
        </OAuth>
        <div className="flex gap-3">
          <div className="rounded-full bg-vertical-gradient p-0.5">
            <Image
              src="https://github.com/degui1.png"
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <button className="flex items-center gap-3 font-bold leading-3 text-gray-200">
            UserName
            <SignOut className="h-5 w-5 text-exit" />
          </button>
        </div>
      </div>
    </aside>
  )
}
