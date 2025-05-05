"use client";

import { LoaderCircle, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateCartItemQuantity } from "@/lib/actions/cart-actions";
import { toast } from "sonner";

interface QuantityButtonProps {
  quantity: number;
  userId: string | undefined;
  bookId: string | undefined;
}
const QuantityButton = ({
  quantity: initialQuantity,
  bookId,
  userId,
}: QuantityButtonProps) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [isLoading, setIsLoading] = useState(false);
  const handleDecrease = async (userId: string, bookId: string) => {
    if (!userId) {
      toast.error("Authentication require to update items in the cart.");
      return;
    }
    if (quantity <= 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    try {
      setIsLoading(true);
      const response = await updateCartItemQuantity(
        userId,
        bookId,
        newQuantity
      );
      if (response.success) {
        toast.success("Quantity updated successfully!");
        setIsLoading(false);
      } else {
        toast.error(response.error?.message || "Failed to update quantity.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleIncrease = async (userId: string, bookId: string) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    try {
      setIsLoading(true);
      const response = await updateCartItemQuantity(
        userId,
        bookId,
        newQuantity
      );
      if (response.success) {
        toast.success("Quantity updated successfully!");
        setIsLoading(false);
      } else {
        toast.error(response.error?.message || "Failed to update quantity.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-r-none cursor-pointer"
        onClick={() => handleDecrease(userId as string, bookId as string)}
        disabled={isLoading}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <div className="flex h-3 w-3 items-center justify-center border-y">
        {isLoading ? (
          <LoaderCircle className="h-3 w-3 animate-spin" />
        ) : (
          quantity
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-l-none cursor-pointer"
        onClick={() => handleIncrease(userId as string, bookId as string)}
        disabled={isLoading}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
};
export default QuantityButton;
