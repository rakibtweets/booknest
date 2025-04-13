import { Schema, type Document, model, models, Model } from "mongoose";
import baseSchema from "./base-schema";
import { slugify } from "@/lib/utils";
// Author Schema
export interface IAuthor extends Document {
  authorId: string;
  name: string;
  bio: string;
  image: string;
  coverImage?: string;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  website?: string;
  email?: string;
  genres: string[];
  awards?: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>({
  authorId: { type: String, unique: true },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  coverImage: { type: String },
  birthDate: { type: String },
  deathDate: { type: String },
  birthPlace: { type: String },
  website: { type: String },
  email: { type: String },
  genres: [{ type: String }],
  awards: [{ type: String }],
  featured: { type: Boolean, default: false },
});

AuthorSchema.add(baseSchema);

// Ensure unique authorId before saving
AuthorSchema.pre<IAuthor>("save", async function (next) {
  if (!this.isModified("name")) return next();

  const baseSlug = slugify(this.name);
  let slug = baseSlug;
  let count = 1;

  const Author = this.constructor as Model<IAuthor>;

  while (await Author.exists({ authorId: slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.authorId = slug;
  next();
});

const Author = models?.Author || model<IAuthor>("Author", AuthorSchema);
export default Author;
