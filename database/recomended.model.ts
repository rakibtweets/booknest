import mongoose, { Schema, type Document, model, models } from "mongoose";

import baseSchema from "./base-schema";
// Recommended Books Schema
export interface IRecommendedBook extends Document {
  book: mongoose.Types.ObjectId;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const RecommendedBookSchema = new Schema<IRecommendedBook>({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  position: { type: Number, required: true },
});

RecommendedBookSchema.add(baseSchema);

const RecommendedBook =
  models?.RecommendedBook ||
  model<IRecommendedBook>("RecommendedBook", RecommendedBookSchema);
export default RecommendedBook;
