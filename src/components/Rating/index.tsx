'use client'

import { Star } from '@/components/Icons'
import { useState } from 'react'

export interface RatingProps {
  rate: number
  isEditable?: boolean
  onChangeRate?: (rate: number) => void
}

export const Rating = ({
  rate,
  isEditable = false,
  onChangeRate,
}: RatingProps) => {
  const [previewValue, setPreviewValue] = useState(0)

  function handleMouseEnter(value: number) {
    if (isEditable) setPreviewValue(value)
  }

  function handleMouseLeave() {
    if (isEditable) setPreviewValue(rate)
  }

  function handleSetValue(rate: number) {
    if (isEditable && typeof onChangeRate === 'function') {
      onChangeRate(rate)
    }
  }

  return (
    <form className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1
        const isFilled = value <= rate || value <= previewValue
        return (
          <label
            key={`star-${index}`}
            className={isEditable ? 'cursor-pointer' : ''}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleSetValue(value)}
          >
            <input type="radio" value={value} className="sr-only" />
            <Star
              className="fill-purple-100"
              weight={isFilled ? 'fill' : 'regular'}
            />
          </label>
        )
      })}
    </form>
  )
}
