import mongoose, { Schema, type Document, model, models } from "mongoose";

import baseSchema from "./base-schema";

// Book Schema
export interface IBook extends Document {
  title: string;
  description: string;
  coverImage: string;
  price: number;
  isbn: string;
  publishDate: string;
  pages: number;
  language: string;
  stock: number;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  author: mongoose.Types.ObjectId;
  publisher: mongoose.Types.ObjectId;
  reviews: mongoose.Types.ObjectId[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  price: { type: Number, required: true },
  isbn: { type: String, required: true, unique: true },
  publishDate: { type: String, required: true },
  pages: { type: Number, required: true },
  language: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  inStock: { type: Boolean, default: false },
  reviewCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  publisher: { type: Schema.Types.ObjectId, ref: "Publisher", required: true },
  categories: [{ type: String }],
});

BookSchema.add(baseSchema);

const Book = models?.Book || model<IBook>("Book", BookSchema);
export default Book;
