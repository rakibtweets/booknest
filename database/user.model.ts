import mongoose, { Schema, type Document, model, models } from "mongoose";

import baseSchema from "./base-schema";

type Roles = "user" | "admin";

// User Schema
export interface IUser extends Document {
  clerkId: string; // Clerk ID for authentication
  name: string;
  email: string;
  roles: Roles[];
  picture: string;
  orders?: mongoose.Types.ObjectId[];
  wishlist?: mongoose.Types.ObjectId[];
  cart?: {
    book: mongoose.Types.ObjectId;
    quantity: number;
    addedAt: Date;
  }[];
  reviews?: mongoose.Types.ObjectId[];
  status: "active" | "inactive" | "suspended";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
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
});
UserSchema.add(baseSchema);

// Create and export the model
const User = models?.User || model<IUser>("User", UserSchema);

export default User;
