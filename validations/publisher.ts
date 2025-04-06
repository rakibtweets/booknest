import { z } from "zod";

export const publisherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.string().min(1, "Logo is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().optional(),
  founded: z.coerce
    .number()
    .int()
    .positive("Founded year must be a positive integer"),
  headquarters: z.string().min(1, "Headquarters is required"),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  imprints: z.array(z.string()).optional(),
  featured: z.boolean(),
});

export type PublisherFormValues = z.infer<typeof publisherSchema>;
