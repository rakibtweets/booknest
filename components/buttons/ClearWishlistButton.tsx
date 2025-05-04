"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { clearWishlist } from "@/lib/actions/wishlist-actions";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface ClearWishButtonProps {
  userId: string | undefined;
}

const ClearWishlistButton = ({ userId }: ClearWishButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClearWishlist = async (user: string) => {
    setIsLoading(true);
    try {
      const result = await clearWishlist(user);
      if (result.success) {
        toast.success("Wishlist cleared successfully!");
        setIsOpen(false);
      } else {
        toast.error(result.error?.message || "Failed to delete author.");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to delete author. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Wishlist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will remove all items from your wishlist. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400 cursor-pointer"
            disabled={isLoading}
            onClick={() => handleClearWishlist(userId as string)}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ClearWishlistButton;
