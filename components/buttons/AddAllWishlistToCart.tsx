"use client";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { addAllWishlistToCart } from "@/lib/actions/wishlist-actions";

import { Button } from "../ui/button";

interface AddWishlistToCartProps {
  userId: string;
}

const AddAllWishlistToCart = ({ userId }: AddWishlistToCartProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddWishlistToCart = async () => {
    if (!userId) {
      toast.error("Login require to add items to the cart.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await addAllWishlistToCart(userId);

      if (result.success) {
        toast.success("All wishlist items added to cart!");
      } else {
        toast.error(result.error?.message || "Failed to add book to cart.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="cursor-pointer"
      disabled={isLoading}
      onClick={handleAddWishlistToCart}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isLoading ? "Adding to cart..." : "Add Wishlist to Cart"}
    </Button>
  );
};
export default AddAllWishlistToCart;
