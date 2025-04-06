import { Schema, type Document, model, models } from "mongoose";
import baseSchema from "./base-schema";
// Author Schema
export interface IAuthor extends Document {
  name: string;
  bio: string;
  image: string;
  coverImage?: string;
  birthDate?: string;
  birthPlace?: string;
  website?: string;
  email?: string;
  twitter?: string;
  genres: string[];
  awards?: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  coverImage: { type: String },
  birthDate: { type: String },
  birthPlace: { type: String },
  website: { type: String },
  email: { type: String },
  twitter: { type: String },
  genres: [{ type: String }],
  awards: [{ type: String }],
  featured: { type: Boolean, default: false },
});
AuthorSchema.add(baseSchema);

const Author = models?.Author || model<IAuthor>("Author", AuthorSchema);
export default Author;
