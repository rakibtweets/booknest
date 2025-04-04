"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddToCartButtonProps {
  bookId: string;
}

export default function AddToCartButton({ bookId }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    toast.success("Event has been created.");
  };

  return (
    <Button onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? (
        "Adding..."
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
