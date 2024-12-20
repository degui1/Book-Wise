import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito()

export const metadata: Metadata = {
  title: 'BookWise',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <div className="min-h-screen bg-gray-800">{children}</div>
      </body>
    </html>
  )
}
