import { Star } from '@/components/Icons'

export interface RatingProps {
  rate: number
}

export const Rating = ({ rate }: RatingProps) => {
  // const handleMouseEnter = (value: number) => {
  //   if (isEditable) setPreviewValue(value)
  // }

  // const handleMouseLeave = () => {
  //   if (isEditable) setPreviewValue(rating)
  // }

  // const handleSetValue = () => {
  //   if (isEditable) setRating(ratingValue)
  // }

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`star-${index}`}
          className="fill-purple-100"
          weight={index + 1 <= rate ? 'fill' : 'regular'}
          // onMouseEnter={() => handleMouseEnter(index + 1)}
          // onMouseLeave={handleMouseLeave}
          // onClick={handleSetValue}
        />
      ))}
    </div>
  )
}
