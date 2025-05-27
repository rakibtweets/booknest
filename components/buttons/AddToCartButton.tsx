"use client";

import { LoaderCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/cart-actions";

interface AddToCartButtonProps {
  bookId: string;
  userId: string;
  quantity?: number;
  title?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function AddToCartButton({
  bookId,
  userId,
  quantity = 1,
  variant = "default",
  size = "default",
  className,
  title,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Login require to add items to the cart.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await addToCart(userId, bookId, quantity);

      if (result.success) {
        toast.success("Item added to cart");
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
      onClick={handleAddToCart}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          {title ? "Adding.." : null}
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {title ? title : null}
        </>
      )}
    </Button>
  );
}
