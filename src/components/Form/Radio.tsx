'use client'

import { InputHTMLAttributes } from 'react'

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string
}

export function Radio({ title, ...props }: RadioProps) {
  return (
    <label className="group" aria-label="">
      <input type="radio" className="peer hidden" {...props} />
      <span className="cursor-pointer text-nowrap rounded-full border border-purple-100 px-4 py-1 text-purple-100 group-hover:border-purple-100 group-hover:bg-purple-200 group-hover:text-gray-100 peer-checked:cursor-default peer-checked:border-purple-200 peer-checked:bg-purple-200 peer-checked:text-gray-100">
        {title}
      </span>
    </label>
  )
}
