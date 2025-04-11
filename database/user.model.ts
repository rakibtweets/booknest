import mongoose, { Schema, type Document, model, models } from "mongoose";
import baseSchema from "./base-schema";

// User Schema
export interface IUser extends Document {
  clerkId: string; // Clerk ID for authentication
  name: string;
  email: string;
  roles: string[];
  image: string;
  orders?: mongoose.Types.ObjectId[]; // Reference to orders
  wishlist?: mongoose.Types.ObjectId[]; // Reference to books in wishlist
  cart?: {
    book: mongoose.Types.ObjectId;
    quantity: number;
    addedAt: Date;
  }[];
  reviews?: mongoose.Types.ObjectId[]; // Reference to reviews
  status: "active" | "inactive" | "suspended";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: { type: [String], default: ["user"] },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  cart: [
    {
      book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
      quantity: { type: Number, required: true, default: 1 },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  image: { type: String },
});
UserSchema.add(baseSchema);

// Create and export the model
const User = models?.User || model<IUser>("User", UserSchema);

export default User;
