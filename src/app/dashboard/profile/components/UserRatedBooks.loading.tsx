export function UserRatedBooksLoading() {
  return (
    <>
      {[1, 2, 3].map((value) => {
        return (
          <div
            key={value}
            className="bg-muted h-[230px] w-full animate-pulse rounded-xl bg-gray-600"
          />
        )
      })}
    </>
  )
}
