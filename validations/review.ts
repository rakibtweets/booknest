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
