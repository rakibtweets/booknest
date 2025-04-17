import { Schema, type Document, model, models } from "mongoose";
import baseSchema from "./base-schema";

// Publisher Schema
export interface IPublisher extends Document {
  name: string;
  logo: string;
  description: string;
  longDescription?: string;
  founded: number;
  headquarters: string;
  website?: string;
  email?: string;
  phone?: string;
  imprints?: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PublisherSchema = new Schema<IPublisher>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  founded: { type: Number, required: true },
  headquarters: { type: String, required: true },
  website: { type: String },
  email: { type: String },
  phone: { type: String },
  imprints: [{ type: String }],
  featured: { type: Boolean, default: false },
});
PublisherSchema.add(baseSchema);

const Publisher =
  models?.Publisher || model<IPublisher>("Publisher", PublisherSchema);
export default Publisher;
