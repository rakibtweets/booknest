"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">404</h1>
        <span className="font-medium">Oops! Page Not Found!</span>
        <p className="text-muted-foreground text-center">
          It seems like the page you&apos;re looking for <br />
          does not exist or might have been removed.
        </p>
        <div className="mt-6 flex gap-4">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
          <Button className="cursor-pointer" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
