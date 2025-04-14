"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
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
import { useState } from "react";
import { toast } from "sonner";
import { deletePublisher } from "@/lib/actions/publisher-actions";

interface DeleteAuthorButtonProps {
  publisherId: string | undefined;
}

const DeletePublisherButton = ({ publisherId }: DeleteAuthorButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await deletePublisher(id);
      if (result.success) {
        toast.success("Publisher deleted successfully!");
        setIsOpen(false);
      } else {
        toast.error(result.error?.message || "Failed to delete publihser.");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to delete publihser. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(event) => event.preventDefault()}
          className="cursor-pointer text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            Publisher.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400 cursor-pointer"
            disabled={isLoading}
            onClick={() => handleDelete(publisherId as string)}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeletePublisherButton;
