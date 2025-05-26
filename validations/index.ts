import mongoose from "mongoose";
import { z } from "zod";

// Define the schema
export const idSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

// Define the type
export type IdType = z.infer<typeof idSchema>;
