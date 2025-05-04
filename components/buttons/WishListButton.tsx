"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { toast } from "sonner";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/actions/wishlist-actions";

interface WishlistButtonProps {
  bookId: string;
  userId: string;
  isInWishlist: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function WishlistButton({
  bookId,
  userId,
  isInWishlist: initialIsInWishlist,
  variant = "outline",
  size = "icon",
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistToggle = async () => {
    if (!userId) {
      toast.error(
        "Authentication required, please log in to manage your wishlist."
      );
      return;
    }

    setIsLoading(true);
    try {
      if (isInWishlist) {
        const result = await removeFromWishlist(userId, bookId);
        if (result.success) {
          setIsInWishlist(false);
          toast.success(
            "Removed from wishlist, The book has been removed from your wishlist"
          );
        } else {
          toast.error(
            result.error?.message || "Failed to remove from wishlist"
          );
        }
      } else {
        const result = await addToWishlist(userId, bookId);
        if (result.success) {
          setIsInWishlist(true);
          toast.success("Added to wishlist");
        } else {
          toast.error(result.error?.message || "Failed to add to wishlist");
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleWishlistToggle}
      disabled={isLoading}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={`${isInWishlist ? "text-red-500 hover:text-red-600" : ""} cursor-pointer `}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
    </Button>
  );
}
