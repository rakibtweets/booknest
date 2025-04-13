import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  image: z.string().min(1, "Author image is required"),
  coverImage: z.string().optional(),
  birthDate: z.string().optional(),
  deathDate: z.string().optional(),
  birthPlace: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  awards: z.array(z.string()).optional(),
  featured: z.boolean(),
});

export type AuthorFormValues = z.infer<typeof authorSchema>;
