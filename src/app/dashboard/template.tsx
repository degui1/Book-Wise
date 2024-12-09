import { Sidebar } from '@/components/Sidebar'

interface TemplateProps {
  children: React.ReactNode
}

export default function Template({ children }: TemplateProps) {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  )
}
