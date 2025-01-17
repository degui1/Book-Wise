'use client'

import Image from 'next/image'

import { NavItem } from './components/NavItem'
import { usePathname } from 'next/navigation'
import { OAuth } from '@/components/OAuth/OAuth'
import LogoSVG from '@/assets/logo.svg'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  Binoculars,
  ChartLineUp,
  SignIn,
  SignOut,
  User,
} from '@/components/Icons'

export function Sidebar() {
  const currentPath = usePathname()
  const { data: session } = useSession()

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
        {session && (
          <NavItem
            href="/dashboard/profile"
            icon={User}
            title="Profile"
            isSelected={currentPath === '/dashboard/profile'}
          />
        )}
      </nav>

      <div className="flex xl:mt-auto xl:block">
        {!session && (
          <OAuth
            className="flex items-center gap-3 font-bold leading-3 text-gray-200"
            onClick={() => signIn()}
          >
            Login
            <SignIn className="h-5 w-5 text-green-100" />
          </OAuth>
        )}
        {session && (
          <div className="flex select-none gap-3">
            {session.user?.image && (
              <div className="rounded-full bg-vertical-gradient p-0.5">
                <Image
                  src={session.user.image}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            )}
            <span className="flex items-center truncate text-nowrap font-bold leading-3 text-gray-200">
              {session.user?.name?.split(' ')[0]}
            </span>
            <button
              className="group flex items-center gap-3"
              onClick={() => signOut()}
            >
              <SignOut className="h-5 w-5 text-exit group-hover:text-exit/80" />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
