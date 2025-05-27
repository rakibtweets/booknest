"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { downvoteReview, upvoteReview } from "@/lib/actions/review-actions";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast.error("Please sign in to vote on this review.");
    }
    // upvote
    if (action === "upvote") {
      setIsLoading(true);
      const response = await upvoteReview({
        reviewId: reviewId as string,
        userId: userId,
        hasupVoted,
        hasdownVoted,
        path: pathname,
      });
      if (response.success) {
        setIsLoading(false);
        toast.success(`Upvoted ${!hasupVoted ? "Successful" : "Removed"}`);
      } else {
        setIsLoading(false);
        toast.error("Failed to upvote review.");
      }
    }

    // downvote
    if (action === "downvote") {
      setIsLoading(true);
      const response = await downvoteReview({
        reviewId: reviewId as string,
        userId: userId,
        hasupVoted,
        hasdownVoted,
        path: pathname,
      });
      if (response.success) {
        setIsLoading(false);
        toast.success(`Downvoted ${!hasdownVoted ? "Successful" : "Removed"}`);
      } else {
        setIsLoading(false);
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
          disabled={isLoading}
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
          disabled={isLoading}
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
