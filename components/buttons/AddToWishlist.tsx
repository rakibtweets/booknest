"use client";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToWishlist } from "@/lib/actions/wishlist-actions";

interface AddToWishlistProps {
  bookId: string;
  userId: string;
  isInWishlist: boolean | undefined;
}

const AddToWishlist = ({
  bookId,
  isInWishlist: initialIsInWishlist,
  userId,
}: AddToWishlistProps) => {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistToggle = async () => {
    if (!userId) {
      toast.error(
        "Authentication required, please log in to manage your wishlist."
      );
      return;
    }

    if (isInWishlist) {
      toast.error("Already in wishlist, the book is already in your wishlist.");
      return;
    }

    setIsLoading(true);

    try {
      toast.promise(
        (async () => {
          const result = await addToWishlist(userId, bookId);

          if (!result.success) {
            throw new Error(
              result.error?.message
                ? `${result.status}: ${result.error?.message}`
                : "Failed to add to wishlist"
            );
          }

          setIsInWishlist(true);
          return result;
        })(),
        {
          loading: "Adding to wishlist...",
          success: "Book added to wishlist!",
          error: (err) => err.message || "Failed to add book to wishlist.",
        }
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className="cursor-pointer"
      variant="outline"
    >
      <>
        <Heart
          className={`mr-2 h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
        />{" "}
        {isLoading ? "Adding.." : "Add to Wishlist"}
      </>
    </Button>
  );
};
export default AddToWishlist;
