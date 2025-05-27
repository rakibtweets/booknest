"use client";
import { MoreVertical, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { deleteBookReview } from "@/lib/actions/review-actions";

interface ReviewActionButtonProps {
  reviewId: string;
  userId: string;
  bookId: string;
  clerkId: string;
}

const ReviewActionButton = ({
  reviewId,
  userId,
  bookId,
  clerkId,
}: ReviewActionButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await toast.promise(
        (async () => {
          const result = await deleteBookReview({
            bookId: bookId,
            reviewId: reviewId,
            userId: userId,
            clerkId: clerkId,
            path: pathname,
          });
          if (!result.success) {
            throw new Error(
              result.error?.message || "Failed to delete review."
            );
          }
          setIsLoading(false);
          return result;
        })(),
        {
          loading: "Deleting Revew...",
          success: "Review deleted successfully!",
          error: (err) => {
            return err?.message || "Failed to delete review.";
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="text-xs cursor-pointer text-muted-foreground"
          variant="ghost"
          size="sm"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className="cursor-pointer" variant="default">
          <Edit className="mr-2" /> Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator /> */}

        <DropdownMenuItem
          className="cursor-pointer"
          disabled={isLoading}
          onClick={handleDelete}
          variant="destructive"
        >
          <Trash className="mr-2" />
          {isLoading ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ReviewActionButton;
