"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { downvoteReview, upvoteReview } from "@/lib/actions/review-actions";
import { usePathname } from "next/navigation";

interface IVotesParams {
  reviewId: string | undefined;
  userId: string | undefined;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
}

const Votes = ({
  reviewId,
  userId,
  downvotes,
  hasdownVoted,
  upvotes,
  hasupVoted,
}: IVotesParams) => {
  const pathname = usePathname();

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast.error("Please sign in to vote on this review.");
    }
    // upvote
    if (action === "upvote") {
      const response = await upvoteReview({
        reviewId: reviewId as string,
        userId: userId,
        hasupVoted,
        hasdownVoted,
        path: pathname,
      });
      if (response.success) {
        toast.success(`Upvoted ${!hasupVoted ? "Successful" : "Removed"}`);
      } else {
        toast.error("Failed to upvote review.");
      }
    }

    // downvote
    if (action === "downvote") {
      const response = await downvoteReview({
        reviewId: reviewId as string,
        userId: userId,
        hasupVoted,
        hasdownVoted,
        path: pathname,
      });
      if (response.success) {
        toast.success(`Downvoted ${!hasdownVoted ? "Successful" : "Removed"}`);
      } else {
        toast.error("Failed to upvote review.");
      }
    }
  };

  return (
    <div className="flex items-center justify-start gap-2 mt-1">
      <div className="flex items-center mt-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs cursor-pointer"
          onClick={() => handleVote("upvote")}
        >
          <ThumbsUp
            className={`h-3 w-3 ${hasupVoted ? "text-green-500" : ""}`}
          />
          {upvotes}
        </Button>
      </div>
      <div className="flex items-center mt-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs cursor-pointer"
          onClick={() => handleVote("downvote")}
        >
          <ThumbsDown
            className={`h-3 w-3 ${hasdownVoted ? "text-red-500" : ""}`}
          />
          {downvotes}
        </Button>
      </div>
    </div>
  );
};
export default Votes;
