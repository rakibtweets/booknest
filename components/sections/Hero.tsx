import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative py-12 md:py-16 bg-muted rounded-lg overflow-hidden mb-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover Your Next Favorite Book
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Explore our vast collection of books across all genres. From
                bestsellers to rare finds, we have something for every reader.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/books">Browse Books</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/categories">Explore Categories</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 transform rotate-6">
                  <div className="h-40 w-32 bg-background shadow-lg rounded-md transform -rotate-6"></div>
                  <div className="h-40 w-32 bg-background shadow-lg rounded-md transform rotate-3"></div>
                  <div className="h-40 w-32 bg-background shadow-lg rounded-md transform rotate-12"></div>
                  <div className="h-40 w-32 bg-background shadow-lg rounded-md transform -rotate-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
