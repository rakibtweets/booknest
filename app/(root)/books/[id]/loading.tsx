import { Skeleton } from "@/components/ui/skeleton";

export default function BookDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-5 w-32 mb-6" />

      <div className="grid md:grid-cols-3 gap-8">
        {/* Book Cover and Actions */}
        <div>
          <Skeleton className="aspect-[2/3] w-full max-w-xs rounded-lg mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full max-w-xs" />
            <Skeleton className="h-10 w-full max-w-xs" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-6 w-36" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>

          <Skeleton className="h-5 w-32 mb-2" />
          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Book Reviews */}
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="ml-auto">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Books */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="aspect-[2/3] w-full rounded-md mb-2" />
              <Skeleton className="h-5 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
