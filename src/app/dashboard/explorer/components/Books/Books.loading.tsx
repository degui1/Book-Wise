export function BooksLoading() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
        return (
          <div
            key={value}
            className="h-32 w-[350px] animate-pulse rounded-xl bg-gray-600 text-gray-600"
            aria-hidden
          />
        )
      })}
    </>
  )
}
