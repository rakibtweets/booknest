import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function WishlistLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <Skeleton className="w-full sm:w-[120px] h-[180px]" />
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-4 w-32 mb-4" />
                          </div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <div className="mt-2 space-y-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Skeleton className="h-9 w-32" />
                          <Skeleton className="h-9 w-9" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </div>
  );
}
