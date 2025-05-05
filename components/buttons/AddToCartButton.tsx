"use client";

import { useState } from "react";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/cart-actions";
import { toast } from "sonner";

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
        toast("Added to cart");
      } else {
        toast.error(result.error?.message || "Failed to add book to cart.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
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
