import { Sidebar } from '@/components/Sidebar'

interface TemplateProps {
  children: React.ReactNode
}

export default function Template({ children }: TemplateProps) {
  return (
    <div className="min-h-screen xl:grid xl:grid-cols-app xl:p-5">
      <Sidebar />
      <div className="flex flex-col gap-3 px-3 xl:gap-0 xl:space-y-10 xl:px-24 xl:py-14">
        {children}
      </div>
    </div>
  )
}
