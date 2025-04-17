import { Skeleton } from "@/components/ui/skeleton";

export default function BooksLoadingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Skeleton className="h-10 w-64" />
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="aspect-[2/3] w-full rounded-md mb-2" />
            <Skeleton className="h-5 w-full mb-1" />
            <Skeleton className="h-4 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
