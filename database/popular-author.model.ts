import mongoose, { Schema, type Document, model, models } from "mongoose";
import baseSchema from "./base-schema";

// Popular Authors Schema
export interface IPopularAuthor extends Document {
  author: mongoose.Types.ObjectId;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const PopularAuthorSchema = new Schema<IPopularAuthor>({
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  position: { type: Number, required: true },
});
PopularAuthorSchema.add(baseSchema);

const PopularAuthor =
  models?.PopularAuthor ||
  model<IPopularAuthor>("PopularAuthor", PopularAuthorSchema);
