import mongoose from "mongoose";
import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  coverImage: z.string().min(1, "Cover image is required"),
  price: z.coerce.number().positive("Price must be positive"),
  isbn: z.string().min(10, "ISBN must be at least 10 characters"),
  publishDate: z.date({
    required_error: "A date of publish date is required.",
  }),
  pages: z.coerce.number().int().positive("Pages must be a positive integer"),
  language: z.string().min(1, "Language is required"),
  stock: z.coerce
    .number()
    .int()
    .nonnegative("Stock must be a non-negative integer"),
  featured: z.boolean(),
  author: z.custom<mongoose.Types.ObjectId>((value) =>
    mongoose.Types.ObjectId.isValid(value as string)
  ),
  publisher: z.custom<mongoose.Types.ObjectId>((value) =>
    mongoose.Types.ObjectId.isValid(value as string)
  ),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

export type BookFormValues = z.infer<typeof bookSchema>;
