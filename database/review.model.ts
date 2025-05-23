import mongoose, { Schema, type Document, model, models } from "mongoose";

import baseSchema from "./base-schema";

// Review Schema
export interface IBookReview extends Document {
  book: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  clerkId: string;
  rating: number;
  content: string;
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IBookReview>({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  clerkId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  content: { type: String, required: true },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  verified: { type: Boolean, default: false },
});

ReviewSchema.add(baseSchema);

const Review = models?.Review || model<IBookReview>("Review", ReviewSchema);
export default Review;
