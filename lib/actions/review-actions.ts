"use server";

import mongoose, { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Book from "@/database/book.model";
import Review, { IBookReview } from "@/database/review.model";
import User from "@/database/user.model";
import {
  createBookReviewParams,
  DeleteBookReviewParams,
  IGetBookReviewParams,
  ReviewVoteParams,
} from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";
import { bookReviewSchema, deleleReviewSchema } from "@/validations/review";

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
      {
        path: "book",
        select: " _id ",
        model: Book,
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
    authorizeRole: "user",
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

    const [review] = await Review.create([reviewData], { session });
    if (!review) {
      throw new Error("Failed to create book review");
    }

    // update book model by finding book by id reviewCount, rating(make average of all reviews), push to review._id to book.reviews
    const book = await Book.findById(review.book)
      .session(session)
      .populate("reviews");
    if (!book) {
      throw new Error("Book not found");
    }

    book.reviewCount += 1;
    book.rating =
      (book.rating * (book.reviewCount - 1) + rating) / book.reviewCount;
    book.reviews.push(review._id);

    await book.save({ session });

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

export const upvoteReview = async (
  params: ReviewVoteParams
): Promise<ActionResponse<IBookReview>> => {
  const validationResult = await action({
    params,
    authorizeRole: "user",
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
    authorizeRole: "user",
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

// delete book review by book id and review id
export const deleteBookReview = async (
  params: DeleteBookReviewParams
): Promise<
  ActionResponse<{
    review: IBookReview;
  }>
> => {
  const { bookId, reviewId, userId, path, clerkId } = params;
  const validationResult = await action({
    params: params,
    schema: deleleReviewSchema,
    authorizeRole: "user",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();

    // find user by userId
    const user = await User.findOne({
      clerkId: clerkId,
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (user._id.toString() !== userId) {
      throw new Error("You are not allowed to perform this action.");
    }

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      book: bookId,
      user: user._id,
    });

    if (!review) {
      throw new Error("No Review found");
    }

    // update book model by finding book by id reviewCount, rating(make average of all reviews), push to review._id to book.reviews
    const book = await Book.findById(review.book).session(session);
    if (!book) {
      throw new Error("Book not found");
    }

    book.reviewCount -= 1;
    book.rating =
      book.reviewCount > 0
        ? (book.rating * (book.reviewCount + 1) - review.rating) /
          book.reviewCount
        : 0;
    book.reviews.pull(review._id);

    await book.save({ session });

    await session.commitTransaction();
    revalidatePath(path);
    return {
      success: true,
      data: {
        review: JSON.parse(JSON.stringify(review)),
      },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};
