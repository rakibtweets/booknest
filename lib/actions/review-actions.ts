"use server";

import mongoose, { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Review, { IBookReview } from "@/database/review.model";
import User from "@/database/user.model";
import {
  createBookReviewParams,
  IGetBookReviewParams,
  ReviewVoteParams,
} from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";
import { bookReviewSchema } from "@/validations/review";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

// get all reviews for a book using book id

export const getBookReviewsByBookId = async (
  params: IGetBookReviewParams
): Promise<
  ActionResponse<{
    reviews: IBookReview[];
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  }>
> => {
  await dbConnect();
  const { page = 1, pageSize = 10, filter, bookId } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  const totalBookReviews = await Review.countDocuments({ book: bookId });
  const totalPages = Math.ceil(totalBookReviews / limit);
  let sortCriteria = {};
  const filterQuery: FilterQuery<IBookReview> = {};

  // Filters
  switch (filter) {
    case "oldest":
      sortCriteria = { createAt: -1 };
      break;
    case "newest":
      sortCriteria = { createdAt: 1 };
      break;
    case "rating":
      sortCriteria = { rating: -1 };
      break;

    default:
      sortCriteria = { createdAt: -1 };
      break;
  }
  const reviews = await Review.find(filterQuery)
    .populate([
      {
        path: "user",
        select: "name _id clerkId picture",
        model: User,
      },
    ])
    .sort(sortCriteria)
    .skip(skip)
    .limit(limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  return {
    success: true,
    data: {
      reviews: JSON.parse(JSON.stringify(reviews)),
      totalPages: totalPages,
      currentPage: page,
      nextPage,
      prevPage,
    },
  };
};

export const createBookReview = async (
  params: createBookReviewParams
): Promise<ActionResponse<IBookReview>> => {
  const validationResult = await action({
    params,
    schema: bookReviewSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // start creating a new Book
    const { bookId, userId, content, rating, path } = params;

    await dbConnect();

    // find user by userId
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const reviewData = {
      book: bookId,
      user: user._id,
      clerkId: userId,
      content,
      rating,
    };

    const [book] = await Review.create([reviewData], { session });
    if (!book) {
      throw new Error("Failed to create book review");
    }

    // update author model in books property

    await session.commitTransaction();
    revalidatePath(path);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(book)),
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const upvoteReview = async (
  params: ReviewVoteParams
): Promise<ActionResponse<IBookReview>> => {
  const validationResult = await action({
    params,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();

    const { reviewId, userId, hasupVoted, path, hasdownVoted } = params;

    // find user by userId
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: user._id } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: user._id },
        $push: { upvotes: user._id },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: user._id } };
    }

    const review = await Review.findByIdAndUpdate(reviewId, updateQuery, {
      new: true,
    });
    if (!review) {
      throw new Error("No Review found");
    }
    await session.commitTransaction();
    revalidatePath(path);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(review)),
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};
export const downvoteReview = async (
  params: ReviewVoteParams
): Promise<ActionResponse<IBookReview>> => {
  const validationResult = await action({
    params,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();

    const { reviewId, userId, hasupVoted, path, hasdownVoted } = params;

    // find user by userId
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: user._id } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: user._id },
        $push: { downvotes: user._id },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: user._id } };
    }

    const review = await Review.findByIdAndUpdate(reviewId, updateQuery, {
      new: true,
    });
    if (!review) {
      throw new Error("No Review found");
    }
    await session.commitTransaction();
    revalidatePath(path);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(review)),
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};
