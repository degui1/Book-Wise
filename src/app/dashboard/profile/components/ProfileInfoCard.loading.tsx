export function ProfileInfoCardLoading() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="overflow-hidden rounded-full">
          <div className="bg-muted h-[74px] w-[74px] animate-pulse bg-gray-600" />
        </div>
        <div className="bg-muted mt-5 h-[1rem] w-[192px] animate-pulse rounded-xl bg-gray-600"></div>
        <div className="bg-muted mt-2 h-[1rem] w-[192px] animate-pulse rounded-xl bg-gray-600"></div>
      </div>

      <div className="mx-auto hidden h-1 w-8 rounded-full bg-horizontal-gradient xl:block" />

      <section className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-between xl:flex-col xl:items-center xl:gap-10">
        <div className="bg-muted h-[44px] w-[192px] animate-pulse rounded-xl bg-gray-600"></div>
        <div className="bg-muted h-[44px] w-[192px] animate-pulse rounded-xl bg-gray-600"></div>
        <div className="bg-muted h-[44px] w-[192px] animate-pulse rounded-xl bg-gray-600"></div>
        <div className="bg-muted h-[44px] w-[192px] animate-pulse rounded-xl bg-gray-600"></div>
      </section>
    </>
  )
}
