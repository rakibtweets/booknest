"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/lib/actions/cart-actions";
import { toast } from "sonner";
import { useState } from "react";
import { trackFallbackParamAccessed } from "next/dist/server/app-render/dynamic-rendering";

interface RemoveFromCartButtonProps {
  userId: string | undefined;
  bookId: string | undefined;
}

const RemoveFromCartButton = ({
  bookId,
  userId,
}: RemoveFromCartButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleRemoveFromCart = async (userId: string, bookId: string) => {
    if (!userId) {
      toast.error("Authentication required to remove item from cart.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await removeFromCart(userId, bookId);
      if (response.success) {
        toast.success("Item removed from cart successfully.");
        setIsLoading(false);
      } else {
        // Handle error case
        toast.error(
          response?.error?.message || "Failed to remove item from cart."
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={() => handleRemoveFromCart(userId as string, bookId as string)}
      variant="destructive"
      size="sm"
      className="h-8 px-2 cursor-pointer"
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4 " />
      )}
      <span className="sr-only">Remove item</span>
    </Button>
  );
};
export default RemoveFromCartButton;
