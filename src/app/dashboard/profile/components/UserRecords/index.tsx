import { ElementType } from 'react'

interface UserRecordsProps {
  icon: ElementType
  title: string
  description: string
}

export function UserRecords({
  icon: Icon,
  description,
  title,
}: UserRecordsProps) {
  return (
    <div className="flex gap-5 sm:w-48">
      <Icon className="h-8 w-8 text-green-100" />
      <div>
        <h3 className="font-bold text-gray-100">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}
