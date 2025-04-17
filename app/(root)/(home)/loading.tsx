import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section Skeleton */}
      <div className="relative py-12 md:py-24 bg-muted rounded-lg overflow-hidden mb-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-10 w-3/4 md:h-12" />
                <Skeleton className="h-4 w-full md:h-5 mt-2" />
                <Skeleton className="h-4 w-5/6 md:h-5 mt-1" />
                <Skeleton className="h-4 w-4/6 md:h-5 mt-1" />
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Skeleton className="h-10 w-32 md:w-36" />
                <Skeleton className="h-10 w-36 md:w-40" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 transform rotate-6">
                    <Skeleton className="h-40 w-32 transform -rotate-6" />
                    <Skeleton className="h-40 w-32 transform rotate-3" />
                    <Skeleton className="h-40 w-32 transform rotate-12" />
                    <Skeleton className="h-40 w-32 transform -rotate-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Categories Section Skeleton */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={`category-${i}`} className="h-full">
                <Skeleton className="h-[140px] w-full rounded-lg" />
              </div>
            ))}
        </div>
      </section>

      {/* Popular Authors Section Skeleton */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={`author-${i}`}
                className="flex flex-col items-center text-center"
              >
                <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full mb-3" />
                <Skeleton className="h-4 w-20 md:w-24 mb-1" />
                <Skeleton className="h-3 w-16 md:w-20" />
              </div>
            ))}
        </div>
      </section>

      {/* Featured Books Section Skeleton */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={`featured-${i}`} className="group">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="mt-2">
                  <Skeleton className="h-4 w-full max-w-[180px] mb-1" />
                  <Skeleton className="h-3 w-24 mb-1" />
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Recommended Books Section Skeleton */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={`recommended-${i}`} className="group">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="mt-2">
                  <Skeleton className="h-4 w-full max-w-[180px] mb-1" />
                  <Skeleton className="h-3 w-24 mb-1" />
                  <div className="flex items-center mt-1">
                    <div className="flex space-x-1">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton
                            key={`star-${i}-${j}`}
                            className="h-3 w-3"
                          />
                        ))}
                    </div>
                    <Skeleton className="h-3 w-8 ml-1" />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
