export function ReviewsLoading() {
  return (
    <>
      <div className="mb-4 mt-10 flex justify-between">
        <h2 className="text-sm text-gray-200">Avaliações</h2>
        <button
          className="flex items-center gap-2 text-sm font-bold text-purple-100"
          disabled
        >
          Avaliar
        </button>
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((rating) => {
          return (
            <div
              key={rating}
              className="h-48 w-full animate-pulse rounded-xl bg-gray-700"
            >
              <div className="space-y-5 rounded-lg p-6">
                <header className="flex gap-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600" />
                  </div>
                  <div className="flex w-40 flex-col space-y-1">
                    <span className="h-3 animate-pulse rounded-xl bg-gray-600" />
                    <span className="h-3 animate-pulse rounded-xl bg-gray-600" />
                  </div>

                  <div className="ml-auto flex h-5 w-20 animate-pulse rounded-xl bg-gray-600" />
                </header>
                <section className="">
                  <div className="h-24 animate-pulse rounded-xl bg-gray-600" />
                </section>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
