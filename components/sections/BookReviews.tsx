/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Star } from "lucide-react";
import mongoose from "mongoose";
import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { IBookReview } from "@/database/review.model";
import { getBookReviewsByBookId } from "@/lib/actions/review-actions";
import { getUserByClerkId } from "@/lib/actions/user-actions";
import { getTimeStamp } from "@/lib/utils";

import ServerPagination from "./ServerPagination";
import Votes from "./Votes";
import ReviewActionButton from "../buttons/ReviewActionButton";
import ReviewForm from "../forms/review-form";
import SignInAlert from "../ui/signin-alert";

interface BookReviewsProps {
  bookId: string | undefined;
  page?: number;
}

export default async function BookReviews({
  bookId,
  page = 1,
}: BookReviewsProps) {
  const { userId } = await auth();
  const userResult = await getUserByClerkId(userId as string);
  const mongoUser = userResult.data?.user;

  const result = await getBookReviewsByBookId({
    bookId,
    page: Number(page),
    pageSize: 8,
  });

  const reviews = result.data?.reviews || [];

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

        {reviews?.length > 0 ? (
          reviews?.map((review: IBookReview) => (
            <div key={review?._id as string} className="mb-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={
                      // @ts-ignore
                      review.user.picture as string
                    }
                    alt={
                      //@ts-ignore
                      review.user?.name as string
                    }
                  />
                  <AvatarFallback>
                    {//@ts-ignore
                    review?.user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">
                      {
                        //@ts-ignore
                        review.user.name as string
                      }
                    </h4>
                    {review?.verified && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                    {review.clerkId === userId ? (
                      <ReviewActionButton
                        reviewId={review?._id as string}
                        userId={review?.user?._id as unknown as string}
                        bookId={review?.book?._id as unknown as string}
                        clerkId={review.clerkId}
                      />
                    ) : null}
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 fill-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {getTimeStamp(review?.createdAt)}
                    </span>
                  </div>
                  {/* <h5 className="font-medium mt-2">{review.title}</h5> */}
                  <p className="text-sm mt-1">{review.content}</p>

                  <Votes
                    reviewId={review?._id as string}
                    userId={userId as string}
                    upvotes={review?.upvotes?.length}
                    downvotes={review?.downvotes?.length}
                    hasdownVoted={review?.downvotes?.includes(
                      mongoUser?._id as mongoose.Types.ObjectId
                    )}
                    hasupVoted={review?.upvotes?.includes(
                      mongoUser?._id as mongoose.Types.ObjectId
                    )}
                  />
                </div>
              </div>
              <Separator className="mt-4" />
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            No reviews yet. Be the first to write a review!
          </div>
        )}
      </div>

      <div className="mb-8">
        <ServerPagination
          currentPage={result.data?.currentPage}
          totalPages={result.data?.totalPages}
          nextPage={result.data?.nextPage}
          prevPage={result.data?.prevPage}
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <SignedIn>
          <ReviewForm bookId={bookId} />
        </SignedIn>
        <SignedOut>
          <SignInAlert />
        </SignedOut>
      </div>
    </div>
  );
}
