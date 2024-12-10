import { Sidebar } from '@/app/dashboard/components/Sidebar'

interface TemplateProps {
  children: React.ReactNode
}

export default function Template({ children }: TemplateProps) {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col space-y-10 px-24 py-14">{children}</div>
    </>
  )
}
