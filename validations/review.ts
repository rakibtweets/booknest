import mongoose from "mongoose";
import { z } from "zod";

export const bookReviewSchema = z.object({
  rating: z.number(),
  content: z
    .string()
    .min(10, {
      message: "Review must be at least 10 characters",
    })
    .max(500, {
      message: "Review must not exceed 500 characters",
    }),
});

export type ReviewFormValues = z.infer<typeof bookReviewSchema>;

export const deleleReviewSchema = z.object({
  reviewId: z.string().min(1, {
    message: "Review ID is required",
  }),
  bookId: z.string().min(1, {
    message: "Book ID is required",
  }),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  path: z.string().min(1, {
    message: "Path is required",
  }),
});
