import { Sidebar } from '@/components/Sidebar'

interface TemplateProps {
  children: React.ReactNode
}

export default function Template({ children }: TemplateProps) {
  return (
    <div className="min-h-screen xl:p-5">
      <div className="sm:fixed sm:left-0 sm:top-0 sm:h-svh sm:w-60 sm:p-5">
        <Sidebar />
      </div>
      <div className="sm:ml-60">{children}</div>
    </div>
  )
}
