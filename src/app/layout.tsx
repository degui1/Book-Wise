import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import SessionProvider from '@/contexts/SessionProvider'
import { getServerSession } from 'next-auth'
import { buildNextAuthOption } from './api/auth/[...nextauth]/route'

const nunito = Nunito()

export const metadata: Metadata = {
  title: 'BookWise',
  description: 'Rate your favorite books',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(buildNextAuthOption())

  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <div className="min-h-screen bg-gray-800">
          <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}
